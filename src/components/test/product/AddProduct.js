import React, { useState} from "react";
import productApi from "../../../api/productApi";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    locationAddress: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    attribute: {},
  });

  const [dataArray, setDataArray] = useState([[""]]); // Tương ứng với dữ liệu trong #test-prd-add

  // Cập nhật các trường nhập liệu cơ bản
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm thêm input mới hoặc xóa input
  const handleKeyDown = (e, row, col) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newDataArray = [...dataArray];
      
      if (e.target.value.trim() !== "") {
        // Thêm input mới
        if (!newDataArray[row]) newDataArray[row] = [];
        if (!newDataArray[row][col + 1]) newDataArray[row][col + 1] = "";
  
        setDataArray(newDataArray);
        updateAttributes(newDataArray);
  
        // Tìm input mới và focus vào nó
        setTimeout(() => {
          const nextInput = document.querySelector(`input[name="${row}_${col + 1}"]`);
          if (nextInput) nextInput.focus();
        }, 0);
      } else {
        // Xóa input
        newDataArray[row].splice(col, 1);
  
        // Nếu hàng trống, xóa hàng
        if (newDataArray[row].length === 1 && newDataArray[row][0] === "") {
          newDataArray.pop();
        }
  
        setDataArray(newDataArray);
        updateAttributes(newDataArray);
        
        if (!(newDataArray[row].length === 0)){
          // Tìm input ở hàng tiếp theo nếu còn, hoặc thêm hàng mới
          setTimeout(() => {
            if (newDataArray[row + 1]) {
              const nextRowInput = document.querySelector(`input[name="${row + 1}_0"]`);
              if (nextRowInput) nextRowInput.focus();
            } else {
              // Nếu không có hàng tiếp theo, tạo hàng mới và focus
              const newRow = [];
              newRow[0] = "";
              newDataArray.push(newRow);
              setDataArray(newDataArray);
              updateAttributes(newDataArray);

              setTimeout(() => {
                const newInput = document.querySelector(`input[name="${row + 1}_0"]`);
                if (newInput) newInput.focus();
              }, 0);
            }
          }, 0);
        }else{
          newDataArray.pop();
        }
      }
      setTimeout(() =>{
        console.log(newDataArray);
      });
      
    }
  };
  

  // Cập nhật giá trị khi người dùng nhập
  const handleInputChange = (e, row, col) => {
    const newValue = e.target.value;
    const newDataArray = [...dataArray];

    if (!newDataArray[row]) newDataArray[row] = [];
    newDataArray[row][col] = newValue;

    setDataArray(newDataArray);
    updateAttributes(newDataArray);
  };

  // Chuyển đổi dataArray thành JSON cho attribute
  const updateAttributes = (array) => {
    const attribute = array.reduce((acc, row) => {
      if (row.length > 1) {
        const [key, ...values] = row;
        acc[key] = values.filter((value) => value.trim() !== "");
      }
      return acc;
    }, {});
    setFormData({ ...formData, attribute });
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      const response = await productApi.createProduct(formData);
      console.log("Product added:", response);
  
      // Đặt lại giá trị về trạng thái ban đầu
      setFormData({
        name: "",
        locationAddress: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        attribute: {},
      });
  
      // Đặt lại mảng dataArray về trạng thái ban đầu
      setDataArray([[""]]); // Một ô nhập liệu mặc định
  
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };  

  return (
    <div>
      <h2>Add Product</h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="locationAddress"
          placeholder="Location Address"
          value={formData.locationAddress}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="categoryId"
          placeholder="Category ID"
          value={formData.categoryId}
          onChange={handleChange}
          required
        />
        <h3>Attributes</h3>
        <div id="test-prd-add">
          {dataArray.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((value, colIndex) => (
                <input
                  key={`${rowIndex}_${colIndex}`}
                  type="text"
                  name={`${rowIndex}_${colIndex}`}
                  placeholder={colIndex === 0 ? "Attribute Name. Enter" : "Attribute Value. Enter"}
                  value={value}
                  onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>

        <button onClick={handleSubmit}>Add Product</button>
      </div>
    </div>
  );
};

export default AddProduct;
