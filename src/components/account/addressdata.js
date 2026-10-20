import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";

const AddressData = ({ onChange }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [detail, setDetail] = useState("");
  const fakeProvinces = [
    { id: "1", name: "An Giang" },
    { id: "2", name: "Bà Rịa - Vũng Tàu" },
    { id: "3", name: "Bắc Giang" },
    { id: "4", name: "Bắc Kạn" },
    { id: "5", name: "Bạc Liêu" },
    { id: "6", name: "Bắc Ninh" },
    { id: "7", name: "Bến Tre" },
    { id: "8", name: "Bình Định" },
    { id: "9", name: "Bình Dương" },
    { id: "10", name: "Bình Phước" },
    { id: "11", name: "Bình Thuận" },
    { id: "12", name: "Cà Mau" },
    { id: "13", name: "Cần Thơ" },
    { id: "14", name: "Cao Bằng" },
    { id: "15", name: "Đà Nẵng" },
    { id: "16", name: "Đắk Lắk" },
    { id: "17", name: "Đắk Nông" },
    { id: "18", name: "Điện Biên" },
    { id: "19", name: "Đồng Nai" },
    { id: "20", name: "Đồng Tháp" },
    { id: "21", name: "Gia Lai" },
    { id: "22", name: "Hà Giang" },
    { id: "23", name: "Hà Nam" },
    { id: "24", name: "Hà Nội" },
    { id: "25", name: "Hà Tĩnh" },
    { id: "26", name: "Hải Dương" },
    { id: "27", name: "Hải Phòng" },
    { id: "28", name: "Hậu Giang" },
    { id: "29", name: "Hòa Bình" },
    { id: "30", name: "Hưng Yên" },
    { id: "31", name: "Khánh Hòa" },
    { id: "32", name: "Kiên Giang" },
    { id: "33", name: "Kon Tum" },
    { id: "34", name: "Lai Châu" },
    { id: "35", name: "Lâm Đồng" },
    { id: "36", name: "Lạng Sơn" },
    { id: "37", name: "Lào Cai" },
    { id: "38", name: "Long An" },
    { id: "39", name: "Nam Định" },
    { id: "40", name: "Nghệ An" },
    { id: "41", name: "Ninh Bình" },
    { id: "42", name: "Ninh Thuận" },
    { id: "43", name: "Phú Thọ" },
    { id: "44", name: "Phú Yên" },
    { id: "45", name: "Quảng Bình" },
    { id: "46", name: "Quảng Nam" },
    { id: "47", name: "Quảng Ngãi" },
    { id: "48", name: "Quảng Ninh" },
    { id: "49", name: "Quảng Trị" },
    { id: "50", name: "Sóc Trăng" },
    { id: "51", name: "Sơn La" },
    { id: "52", name: "Tây Ninh" },
    { id: "53", name: "Thái Bình" },
    { id: "54", name: "Thái Nguyên" },
    { id: "55", name: "Thanh Hóa" },
    { id: "56", name: "Thừa Thiên Huế" },
    { id: "57", name: "Tiền Giang" },
    { id: "58", name: "TP. Hồ Chí Minh" },
    { id: "59", name: "Trà Vinh" },
    { id: "60", name: "Tuyên Quang" },
    { id: "61", name: "Vĩnh Long" },
    { id: "62", name: "Vĩnh Phúc" },
    { id: "63", name: "Yên Bái" }
  ];

  const fakeDistricts = {
    "24": [
        { id: "24-1", name: "Quận Ba Đình" },
        { id: "24-2", name: "Quận Hoàn Kiếm" },
        { id: "24-3", name: "Quận Hai Bà Trưng" },
        { id: "24-4", name: "Quận Đống Đa" },
        { id: "24-5", name: "Quận Tây Hồ" },
        { id: "24-6", name: "Quận Cầu Giấy" },
        { id: "24-7", name: "Quận Thanh Xuân" },
        { id: "24-8", name: "Quận Hoàng Mai" },
        { id: "24-9", name: "Quận Long Biên" },
        { id: "24-10", name: "Huyện Thanh Trì" },
        { id: "24-11", name: "Huyện Gia Lâm" },
        { id: "24-12", name: "Huyện Đông Anh" },
        { id: "24-13", name: "Huyện Sóc Sơn" },
        { id: "24-14", name: "Huyện Ba Vì" },
        { id: "24-15", name: "Huyện Phúc Thọ" },
        { id: "24-16", name: "Huyện Đan Phượng" },
        { id: "24-17", name: "Huyện Hoài Đức" },
        { id: "24-18", name: "Huyện Quốc Oai" },
        { id: "24-19", name: "Huyện Thạch Thất" },
        { id: "24-20", name: "Huyện Chương Mỹ" },
        { id: "24-21", name: "Huyện Thanh Oai" },
        { id: "24-22", name: "Huyện Thường Tín" },
        { id: "24-23", name: "Huyện Phú Xuyên" },
        { id: "24-24", name: "Huyện Mỹ Đức" },
        { id: "24-25", name: "Quận Hà Đông" },
        { id: "24-26", name: "Thị xã Sơn Tây" },
    ],
    "58": [
        { id: "58-1", name: "Quận 1" },
        { id: "58-2", name: "Quận 3" },
        { id: "58-3", name: "Quận 4" },
        { id: "58-4", name: "Quận 5" },
        { id: "58-5", name: "Quận 6" },
        { id: "58-6", name: "Quận 7" },
        { id: "58-7", name: "Quận 8" },
        { id: "58-8", name: "Quận 10" },
        { id: "58-9", name: "Quận 11" },
        { id: "58-10", name: "Quận 12" },
        { id: "58-11", name: "Quận Bình Tân" },
        { id: "58-12", name: "Quận Bình Thạnh" },
        { id: "58-13", name: "Quận Gò Vấp" },
        { id: "58-14", name: "Quận Phú Nhuận" },
        { id: "58-15", name: "Quận Tân Bình" },
        { id: "58-16", name: "Quận Tân Phú" },
        { id: "58-17", name: "Quận Thủ Đức" },
        { id: "58-18", name: "Thành phố Thủ Đức" },
        { id: "58-19", name: "Huyện Bình Chánh" },
        { id: "58-20", name: "Huyện Cần Giờ" },
        { id: "58-21", name: "Huyện Củ Chi" },
        { id: "58-22", name: "Huyện Hóc Môn" },
        { id: "58-23", name: "Huyện Nhà Bè" }
    ]
  };
  const fakeWards = {
    "24-25": [
        { id: "24-25-1", name: "Phường Nguyễn Trãi" },
        { id: "24-25-2", name: "Phường Hà Cầu" },
        { id: "24-25-3", name: "Phường Yết Kiêu" },
        { id: "24-25-4", name: "Phường Phú La" },
        { id: "24-25-5", name: "Phường Văn Quán" },
        { id: "24-25-6", name: "Phường Phúc La" },
        { id: "24-25-7", name: "Phường Kiến Hưng" },
        { id: "24-25-8", name: "Phường Đồng Mai" },
        { id: "24-25-9", name: "Phường Biên Giang" },
        { id: "24-25-10", name: "Phường La Khê" },
        { id: "24-25-11", name: "Phường Mộ Lao" },
        { id: "24-25-12", name: "Phường Dương Nội" }
    ],
    "24-2": [
        { id: "24-2-1", name: "Phường Chương Dương" },
        { id: "24-2-2", name: "Phường Cửa Đông" },
        { id: "24-2-3", name: "Phường Cửa Nam" },
        { id: "24-2-4", name: "Phường Đồng Xuân" },
        { id: "24-2-5", name: "Phường Hàng Bạc" },
        { id: "24-2-6", name: "Phường Hàng Bài" },
        { id: "24-2-7", name: "Phường Hàng Bồ" },
        { id: "24-2-8", name: "Phường Hàng Bông" },
        { id: "24-2-9", name: "Phường Hàng Buồm" },
        { id: "24-2-10", name: "Phường Hàng Đào" },
        { id: "24-2-11", name: "Phường Hàng Gai" },
        { id: "24-2-12", name: "Phường Hàng Mã" },
        { id: "24-2-13", name: "Phường Hàng Trống" },
        { id: "24-2-14", name: "Phường Lý Thái Tổ" },
        { id: "24-2-15", name: "Phường Phan Chu Trinh" },
        { id: "24-2-16", name: "Phường Phúc Tân" },
        { id: "24-2-17", name: "Phường Trần Hưng Đạo" },
        { id: "24-2-18", name: "Phường Tràng Tiền" }
    ]
  };

  useEffect(() => {
    setProvinces(fakeProvinces);
  }, []);

  const handleProvinceChange = (provinceId) => {
    setSelectedProvince(provinceId);
    setSelectedDistrict("");
    setSelectedWard("");
    setDetail("");
    setDistricts(fakeDistricts[provinceId] || []);
    setWards([]);
    triggerChange(provinceId, "", "", "");
  };

  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
    setSelectedWard("");
    setDetail("");
    setWards(fakeWards[districtId] || []);
    triggerChange(selectedProvince, districtId, "", "");
  };

  const handleWardChange = (wardId) => {
    setSelectedWard(wardId);
    triggerChange(selectedProvince, selectedDistrict, wardId, detail);
  };

  const handleDetailChange = (detailValue) => {
    setDetail(detailValue);
    triggerChange(selectedProvince, selectedDistrict, selectedWard, detailValue);
  };

  const triggerChange = (province, district, ward, detail) => {
    const addressParts = [
        detail,
        ward ? wards.find((w) => w.id === ward)?.name : "",
        district ? districts.find((d) => d.id === district)?.name : "",
        province ? provinces.find((p) => p.id === province)?.name : "",
    ];
    const filteredAddressParts = addressParts.filter((part) => part && part.trim() !== "");
    const fullAddress = filteredAddressParts.join(", ").trim();
    if (onChange) onChange({ province, district, ward, detail, fullAddress });
  };

  return (
    <div>
      <div>
        <label className="block text-gray-700 font-medium">Tỉnh/Thành phố:</label>
        <select
          className="w-full p-2 border rounded-lg mt-2"
          value={selectedProvince}
          onChange={(e) => handleProvinceChange(e.target.value)}
        >
          <option value="">Chọn tỉnh/thành phố</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 font-medium">Quận/Huyện:</label>
        <select
          className="w-full p-2 border rounded-lg mt-2"
          value={selectedDistrict}
          onChange={(e) => handleDistrictChange(e.target.value)}
          disabled={!selectedProvince}
        >
          <option value="">Chọn quận/huyện</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 font-medium">Phường/Xã:</label>
        <select
          className="w-full p-2 border rounded-lg mt-2"
          value={selectedWard}
          onChange={(e) => handleWardChange(e.target.value)}
          disabled={!selectedDistrict}
        >
          <option value="">Chọn phường/xã</option>
          {wards.map((ward) => (
            <option key={ward.id} value={ward.id}>
              {ward.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 font-medium">Địa chỉ chi tiết:</label>
        <input
          type="text"
          className="w-full p-2 border rounded-lg mt-2"
          placeholder="Nhập địa chỉ chi tiết"
          value={detail}
          onChange={(e) => handleDetailChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AddressData;
