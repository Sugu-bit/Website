import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import named export
import { refreshAccessToken } from "../redux/userSlice";
import securityApi from "../api/securityApi";

const TokenRefresher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = useSelector((state) => state.user.refreshToken);
  const accessToken = localStorage.getItem("accessToken");

  // useEffect(() => {
  //   // Nếu không có token, điều hướng đến trang đăng nhập
  //   if (!refreshToken || !accessToken) {
  //     console.warn("Người dùng chưa đăng nhập. Điều hướng đến /test.");
  //     navigate("/test");
  //     return;
  //   }

  //   let decodedAccessToken, decodedRefreshToken;
  //   try {
  //     decodedAccessToken = jwtDecode(accessToken);
  //     decodedRefreshToken = jwtDecode(refreshToken);
  //   } catch (error) {
  //     console.error("Lỗi giải mã token:", error);
  //     navigate("/test");
  //     return;
  //   }

  //   if (!decodedAccessToken?.exp || !decodedRefreshToken?.exp) {
  //     console.error("Token không hợp lệ, thiếu 'exp'.");
  //     navigate("/test");
  //     return;
  //   }

  //   const now = Math.floor(Date.now() / 1000);

  //   // Kiểm tra thời gian hết hạn và làm mới Access Token
  //   const accessTokenExpiresIn = decodedAccessToken.exp - now;
  //   if (accessTokenExpiresIn <= 0) {
  //     securityApi
  //       .refreshToken(refreshToken)
  //       .then((data) => {
  //         localStorage.setItem("accessToken", data.accessToken);
  //       })
  //       .catch((error) => {
  //         console.error("Làm mới Access Token thất bại:", error);
  //         navigate("/test");
  //       });
  //   } else if (accessTokenExpiresIn <= 15 * 60) {
  //     const accessTokenRefreshTime = (accessTokenExpiresIn - 1) * 1000;
  //     setTimeout(() => {
  //       dispatch(refreshAccessToken());
  //     }, accessTokenRefreshTime);
  //   }

  //   // Kiểm tra thời gian hết hạn và làm mới Refresh Token
  //   const refreshTokenExpiresIn = decodedRefreshToken.exp - now;
  //   if (refreshTokenExpiresIn <= 0) {
  //     console.error("Refresh Token đã hết hạn.");
  //     navigate("/test");
  //   } else if (refreshTokenExpiresIn <= 30 * 24 * 60 * 60) {
  //     const refreshTokenRefreshTime = (refreshTokenExpiresIn - 1) * 1000;
  //     setTimeout(async () => {
  //       try {
  //         const data = await securityApi.refreshRefreshToken(refreshToken);
  //         localStorage.setItem("refreshToken", data.refreshToken);
  //       } catch (error) {
  //         console.error("Làm mới Refresh Token thất bại:", error);
  //         navigate("/test");
  //       }
  //     }, refreshTokenRefreshTime);
  //   }
  // }, [dispatch, navigate, refreshToken, accessToken]);

  return null;
};

export default TokenRefresher;
