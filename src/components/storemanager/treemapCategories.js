import { useState, useEffect } from "react";
import categoryApi from "../../api/categoryApi";

const useTreeMapCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const buildCategoryTree = (categories) => {
    const categoryMap = {};

    categories.forEach((category) => {
      categoryMap[category.id] = { ...category, children: [] };
    });

    const tree = [];
    categories.forEach((category) => {
      const parentId = category.hierarchyPathById
        .split("/")
        .slice(-2, -1)[0];
      if (parentId && categoryMap[parentId]) {
        categoryMap[parentId].children.push(categoryMap[category.id]);
      } else {

        tree.push(categoryMap[category.id]);
      }
    });

    return tree;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryApi.getAllCategories();
        const categoryTree = buildCategoryTree(data);
        setCategories(categoryTree);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};

export default useTreeMapCategories;
