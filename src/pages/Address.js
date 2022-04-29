import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Picklocation from "../components/PickLocation";
import Section, { SectionBody } from "../components/Section";
import Sidebar from "../components/Sidebar";
import { createAdress } from "../redux/apiCall";

export default function Address() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const form = useRef();

  const [isDefautAdress, setIsDefautAdress] = useState(false);
  const [addresses, setAddress] = useState([]);
  const [recivedName, setRecivedName] = useState("");
  const [recivedNumber, setRecivedNumber] = useState("");
  const [recivedAddress, setRecivedAddress] = useState("");
  const [openAddForm, setOpenAddForm] = useState(false);

  useEffect(() => {
    const newProduct = async () => {
      const res = await axios.get(
        `http://localhost:4000/address/${user.currentUser._id}`
      );
      setAddress(res.data);
    };
    newProduct();
  }, [openAddForm]);

  const handleCreatAddress = () => {
    const province = form.current.province.value.split("   ")[1];
    const district = form.current.district.value.split("   ")[1];
    const ward = form.current.ward.value.split("   ")[1];

    if (
      province === undefined ||
      district === undefined ||
      ward === undefined ||
      recivedAddress === ""
    ) {
      alert("vui lòng nhập địa chỉ");
    } else if (recivedName === "") {
      alert("vui lòng nhập tên ");
    } else if (recivedNumber === "") {
      alert("vui lòng nhập tên ");
    } else {
      createAdress(dispatch, {
        id: user.currentUser._id,
        recivedName,
        recivedNumber,
        recivedAddress: `${recivedAddress},${ward},${district},${province}`,
        isDefautAdress,
      });
    }
  };

  return (
    <div>
      <Section>
        <div className="page__title">Sổ địa chỉ</div>
        <SectionBody>
          <div className="account">
            <Sidebar></Sidebar>
            {openAddForm ? (
              <div className="account__address--form  account__main">
                <div className="account__title">
                  <h3>
                    <i
                      className="bx bx-left-arrow-alt back__btn"
                      onClick={() => setOpenAddForm(false)}
                    ></i>{" "}
                    Thêm địa chỉ mới
                  </h3>
                </div>
                <form className="account__adress__form">
                  <div className="account__address__form__field ">
                    <input
                      className="adress__form"
                      placeholder=" "
                      onChange={(e) => setRecivedName(e.target.value)}
                    ></input>
                    <label>Họ và tên</label>
                  </div>
                  <div className="account__address__form__field ">
                    <input
                      className="adress__form"
                      placeholder=" "
                      onChange={(e) => setRecivedNumber(e.target.value)}
                    ></input>
                    <label>Số điện thoại</label>
                  </div>
                  <Picklocation ref={form}></Picklocation>
                  <div className="account__address__form__field ">
                    <input
                      className="adress__form"
                      placeholder=" "
                      onChange={(e) => setRecivedAddress(e.target.value)}
                    ></input>
                    <label>Nhập địa chỉ</label>
                  </div>
                  <div className="check__default">
                    <input
                      onChange={(e) => {
                        setIsDefautAdress(!isDefautAdress);
                      }}
                      name="isDefautAdress"
                      type="checkbox"
                    ></input>
                    <label>Đặt làm địa chỉ mặc định</label>
                  </div>
                  <div
                    className="save__btn"
                    onClick={() => handleCreatAddress()}
                  >
                    Lưu
                  </div>
                </form>
              </div>
            ) : (
              <div className="account__main">
                <div className="account__title">
                  <h3>Địa chỉ nhận hàng</h3>
                  <div
                    className="account__address__add-btn bg-red"
                    onClick={() => setOpenAddForm(true)}
                  >
                    <i className="bx bx-plus-circle"></i>
                    <span>Thêm địa chỉ </span>
                  </div>
                </div>
                {addresses.length > 0 ? (
                  <div className="account__address__list">
                    {addresses.map((address, index) => {
                      return (
                        <div
                          key={index}
                          className={`account__address__item ${
                            address.isDefautAdress && "default"
                          }`}
                        >
                          <div className="account__address__item__infor">
                            <span>
                              {address.recivedName}
                              <span className="default__color">
                                {address.isDefautAdress && "    (Mặc định)"}
                              </span>
                            </span>
                            <span>{address.recivedNumber}</span>
                            <span>{address.recivedAddress}</span>
                          </div>
                          <div className="account__address__item__btn">
                            <div> Chỉnh sửa </div>
                            <div> Xóa </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="account__address__empty">
                    Hiện tại chưa có địa chỉ nhận hàng. Hãy thêm địa chị ngay
                    nào !!!!!!!{" "}
                  </div>
                )}
              </div>
            )}
          </div>
        </SectionBody>
      </Section>
    </div>
  );
}
