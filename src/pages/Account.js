import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
//
import Sidebar from "../components/Sidebar";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import DatePicker from "react-datepicker";
import Dashboard from "../components/DashBoard";

import { updateInfor } from "../redux/apiCall";

const Account = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [username, setUsername] = useState(user.username);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [Address, setAddress] = useState(user.Address);
  const [DateofBirth, setDateOfBirth] = useState(user.DateOfBirth);

  const dispatch = useDispatch();

  const handleUpdateInfor = () => {
    updateInfor(dispatch, {
      id: user._id,
      username,
      phoneNumber,
      Address,
      DateofBirth,
    });
  };
  return (
    <div>
      <Section>
        <div className="page__title">Tài khoản</div>
        <SectionBody>
          <div className="account">
            <Sidebar></Sidebar>
            {user.isAdmin ? (
              <div className="dashboard__main admin__dashboard">
                <Dashboard></Dashboard>
              </div>
            ) : (
              <form className="account__main account__infor">
                <div className="account__title">
                  <h3>Thông tin khách hàng</h3>
                </div>
                <div className="account__form account__name">
                  <label>Họ và tên</label>
                  <input
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    value={username ? username : "Vui lòng điền thông tin"}
                    type="text"
                    required
                    className="login__form__email"
                  />
                </div>
                <div className="account__form account__email">
                  <label>Số điện thoại</label>
                  <input
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    value={
                      phoneNumber || phoneNumber === ""
                        ? phoneNumber
                        : "Vui lòng điền thông tin"
                    }
                    type="email"
                    required
                    className="login__form__email"
                  />
                </div>
                <div className="account__form account__email">
                  <label>Địa chỉ</label>
                  <input
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    value={
                      Address || Address === ""
                        ? Address
                        : "Vui lòng điền thông tin"
                    }
                    required
                    type="text"
                    className="login__form__email"
                  />
                </div>
                <div className="account__form account__email">
                  <label>Ngày sinh</label>
                  <input
                    onChange={(e) => {
                      setDateOfBirth(e.target.value);
                    }}
                    type="date"
                    className="login__form__email"
                  />
                </div>

                <div className="save__btn" onClick={() => handleUpdateInfor()}>
                  Tiếp tục
                </div>
              </form>
            )}
          </div>
        </SectionBody>
      </Section>
    </div>
  );
};

Account.propTypes = {};

export default Account;
