import React, { useEffect, useState } from "react";
import fileApi from "../../api/fileApi";
import api from "../../api/api";

const placeholderImage = "/product-placeholder.svg";

function ProductImage({ src, alt, className }) {
  return (
    <img
      src={src || placeholderImage}
      alt={alt}
      className={`object-cover ${className}`}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = placeholderImage;
      }}
    />
  );
}

function ApiProductImage({ productId, className, alt }) {
  const [file, setFile] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchFile = async () => {
      try {
        const response = await fileApi.getFilesByProduct(productId, true);
        const files = Array.isArray(response) ? response : response ? [response] : [];
        const fileData = files.find((item) => item.filePath);

        if (active && fileData) {
          const filePath = fileData.filePath.replace(/\\/g, "/").replace(/^\/+/, "");
          setFile({
            ...fileData,
            fullPath: new URL(`/data/${filePath}`, api.defaults.baseURL).toString(),
          });
        }
      } catch (error) {
        if (active) {
          console.error("Không thể tải ảnh sản phẩm:", error);
        }
      }
    };

    if (productId) {
      fetchFile();
    }

    return () => {
      active = false;
    };
  }, [productId]);

  return (
    <ProductImage
      src={file?.fullPath}
      alt={alt || file?.fileName || "Ảnh sản phẩm"}
      className={className}
    />
  );
}

function GetInterfaceProduct({ productId, imageUrl, alt, className }) {
  if (imageUrl) {
    return (
      <ProductImage
        src={imageUrl}
        alt={alt || "Ảnh sản phẩm"}
        className={className}
      />
    );
  }

  return <ApiProductImage productId={productId} className={className} alt={alt} />;
}

export default GetInterfaceProduct;
