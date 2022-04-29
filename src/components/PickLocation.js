import React, { useEffect, useState } from "react";
import axios from "axios";

const Picklocation = React.forwardRef((prop, ref) => {
  const [province, setProvince] = useState({ id: "", name: "" });
  const [district, setDistrict] = useState({ id: "", name: "" });
  const [ward, setWard] = useState({ id: "", name: "" });

  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const token = "f5475433-78fc-11ec-9054-0a1729325323";

  useEffect(() => {
    const getProvince = async () => {
      const res = await axios.get(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        { headers: { token } }
      );
      setProvinceList(res.data.data);
    };
    getProvince();
  }, []);

  ////GET Call district API
  useEffect(() => {
    const getDistrist = async () => {
      const res = await axios.post(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
        { province_id: parseInt(province.id) },
        { headers: { token } }
      );
      setDistrictList(res.data.data);
    };
    province.id !== "" && getDistrist();
  }, [province]);

  ////GET Call Ward API
  useEffect(() => {
    const getWard = async () => {
      const res = await axios.post(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id",
        { district_id: parseInt(district.id) },
        { headers: { token } }
      );
      setWardList(res.data.data);
    };
    district.id !== "" && getWard();
  }, [district, province]);

  return (
    <div>
      <form className="checkout__addres picklocation_form" ref={ref}>
        <div
          className={`picklocation_form__item  ${
            province.id === "" ? "" : "active"
          }`}
        >
          <select
            name="province"
            className="adress__form"
            onChange={(e) => {
              setProvince({
                id: e.target.value.split("   ")[0],
                name: e.target.value.split("   ")[1],
              });
            }}
          >
            <option></option>
            {provinceList.length > 0 &&
              provinceList.map((e, index) => {
                return (
                  <option
                    key={index}
                    value={`${e.ProvinceID}   ${e.ProvinceName}`}
                    label={e.ProvinceName}
                  ></option>
                );
              })}
          </select>
          <label>Tỉnh/Thành Phố</label>
        </div>
        <div
          className={`picklocation_form__item  ${
            district.id === "" ? "" : "active"
          }`}
        >
          <select
            name="district"
            className="adress__form"
            onChange={(e) => {
              setDistrict({
                id: e.target.value.split("   ")[0],
                name: e.target.value.split("   ")[1],
              });
            }}
          >
            <option></option>
            {districtList.length > 0 &&
              districtList.map((e, index) => {
                return (
                  <option
                    key={index}
                    value={`${e.DistrictID}   ${e.DistrictName}`}
                    label={e.DistrictName}
                  ></option>
                );
              })}
          </select>
          <label>Quận/Huyện</label>
        </div>
        <div
          className={`picklocation_form__item  ${
            ward.id === "" ? "" : "active"
          }`}
        >
          <select
            name="ward"
            className="adress__form"
            onChange={(e) => {
              setWard({
                id: e.target.value.split("   ")[0],
                name: e.target.value.split("   ")[1],
              });
            }}
          >
            <option></option>
            {wardList.length > 0 &&
              wardList.map((e, index) => {
                return (
                  <option
                    key={index}
                    value={`${e.WardID}    ${e.WardName}`}
                    label={e.WardName}
                  ></option>
                );
              })}
          </select>
          <label>Phường/Xã</label>
        </div>
      </form>
    </div>
  );
});

export default Picklocation;
