import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAndSaveFiles } from "../redux/fileSlice";

const FileList = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.files);

  useEffect(() => {
    dispatch(fetchAndSaveFiles());
  }, [dispatch]);

  if (loading) {
    return <div>Đang tải file...</div>;
  }

  if (error) {
    return <div>Không thể tải file: {error}</div>;
  }

  return <>{children}</>;
};

export default FileList;
