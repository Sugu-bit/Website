import axios from 'axios';

// Định nghĩa baseURL duy nhất
const BASE_URL = 'https://scime.click/api';

// Tạo instance của Axios với baseURL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;  // Trạng thái làm mới token
let failedQueue = [];  // Hàng đợi các yêu cầu bị chặn do token hết hạn

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor cho request
api.interceptors.request.use((config) => {
  // Kiểm tra tùy chọn `skipAuth` trong config
  if (config.skipAuth) {
    return config;  // Bỏ qua việc thêm token nếu skipAuth = true
  }

  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Interceptor cho response
api.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;

  // Kiểm tra nếu lỗi là do hết hạn accessToken (401 Unauthorized)
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    // Lấy refreshToken từ localStorage
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      console.error('Refresh token không tồn tại. Cần đăng nhập lại.');
      // Gọi logic hiển thị thông báo tại đây nếu cần
      return Promise.reject(error);
    }

    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const response = await axios.post(`${BASE_URL}/refresh-token`, {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;

        // Cập nhật accessToken mới vào localStorage
        localStorage.setItem('accessToken', newAccessToken);

        // Tiếp tục các yêu cầu bị chặn
        processQueue(null, newAccessToken);

        isRefreshing = false;

        // Gửi lại yêu cầu ban đầu với accessToken mới
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);

        // Xử lý nếu refreshToken cũng hết hạn
        if (refreshError.response?.status === 401) {
          console.error('Refresh token cũng đã hết hạn. Cần đăng nhập lại.');
          // Gọi logic hiển thị thông báo tại đây nếu cần
        }
        return Promise.reject(refreshError);
      }
    }

    // Đợi refresh token đang xử lý và thêm yêu cầu vào hàng đợi
    return new Promise((resolve, reject) => {
      failedQueue.push({
        resolve: (token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        },
        reject: (err) => reject(err),
      });
    });
  }

  // Nếu không phải lỗi 401, trả về lỗi như bình thường
  return Promise.reject(error);
});

/**
 * Xử lý lỗi khi gọi API
 * @param {Object} error - Đối tượng lỗi từ Axios
 */
export const handleError = (error) => {
  // Lấy URL đầy đủ từ baseURL và url (nếu có)
  const fullURL = error.config?.baseURL
    ? `${error.config.baseURL}${error.config.url || ''}`
    : error.config?.url || 'Unknown URL';

  if (error.response) {
    // Lấy thông tin từ response
    const { success, error_code, message } = error.response.data;
    const httpMethod = error.config?.method?.toUpperCase() || 'UNKNOWN';
    const statusCode = error.response.status;

    // Tạo đối tượng lỗi với các thông tin bổ sung
    const errorObject = {
      success,
      error_code,
      message,
      url: fullURL,
      method: httpMethod,
      status: statusCode,
    };

    // In lỗi ra console
    console.error(`API Error:
    URL: ${fullURL}
    Method: ${httpMethod}
    HTTP Status: ${statusCode}
    Code: ${error_code}
    Message: ${message}`);

    // Trả về đối tượng lỗi
    throw errorObject;
  } else if (error.request) {
    // Xử lý lỗi không nhận được phản hồi từ server
    const httpMethod = error.config?.method?.toUpperCase() || 'UNKNOWN';
    const errorObject = {
      success: false,
      message: 'Không có phản hồi từ máy chủ.',
      url: fullURL,
      method: httpMethod,
      status: null, // Vì không có phản hồi, không có mã trạng thái HTTP
    };

    // In lỗi ra console
    console.error(`API Error:
    URL: ${fullURL}
    Method: ${httpMethod}
    Message: Không có phản hồi từ máy chủ.`);

    // Trả về đối tượng lỗi
    throw errorObject;
  } else {
    throw error; // Đẩy lỗi lên tầng trên mà không bắt lại trong hàm này
  }
};



export default api;
