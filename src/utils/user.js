import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/loveSlice"; // Import action từ loveSlice
import { fetchCurrentUser } from "../redux/userSlice"; // Import Thunk từ userSlice

const User = () => {
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state) => state.user); // Lấy thông tin từ userSlice

  // Đồng bộ hóa currentUserId khi thông tin user thay đổi
  useEffect(() => {
    if (accessToken && !user) {
      // Nếu có accessToken nhưng user chưa tải, gọi API để lấy thông tin
      dispatch(fetchCurrentUser())
        .unwrap()
        .then((fetchedUser) => {
          if (fetchedUser && fetchedUser.id) {
            dispatch(setCurrentUser(fetchedUser.id)); // Đồng bộ currentUserId
          }
        })
        .catch((error) => {
          console.error("Failed to fetch user:", error);
        });
    } else if (!accessToken) {
      // Nếu không có accessToken, người dùng chưa đăng nhập
      dispatch(setCurrentUser(null)); // Xóa currentUserId
    } else if (user) {
      // Nếu user đã tồn tại, đồng bộ currentUserId
      dispatch(setCurrentUser(user.id));
    }
  }, [accessToken, user, dispatch]);

  return null; // Không cần giao diện
};

export default User;
