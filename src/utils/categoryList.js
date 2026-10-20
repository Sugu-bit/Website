import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/categorySlice';

const CategoryList = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // if (loading) {
  //   return <div>Đang tải danh mục...</div>;
  // }

  if (error) {
    return <div>Không thể tải danh mục: {error}</div>;
  }

  return <>{children}</>;
};

export default CategoryList;
