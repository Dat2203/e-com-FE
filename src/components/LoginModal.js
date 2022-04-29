import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import { login } from "../redux/apiCall";
import PropTypes from "prop-types";
import useForm from "../util/useRegisterForm";
import validation from "../util/validate";

export default function LoginModal(props) {
  //--Global State --//
  const userState = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.currentUser);

  //--Local State --//
  const [activeForm, setActiveForm] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");

  const { handleChange, handleSubmit, values, errors } = useForm(validation);

  useEffect(() => {
    user && props.function(false);
  }, [user, props.function]);

  const dispatch = useDispatch();

  const handleLoginClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  return (
    <div className={`login-view__modal ${props.isOpen ? "active" : ""}`}>
      <div className="login__container">
        <div
          className="close-modal__btn"
          onClick={() => props.function(!props.isOpen)}
        >
          <i className="bx bxs-x-circle"></i>
        </div>
        <div className="form__switch">
          <div
            className={`switch__btn ${
              activeForm === "login" ? "active" : ""
            } login__btn`}
            onClick={() => setActiveForm("login")}
          >
            Đăng nhập
          </div>
          <div
            className={`switch__btn ${
              activeForm === "register" ? "active" : ""
            } register__btn`}
            onClick={() => setActiveForm("register")}
          >
            {" "}
            Khách hàng mới
          </div>
        </div>

        <form
          className={`login__form ${activeForm === "login" ? "" : "disabled"}`}
          autoComplete="on"
        >
          <h4> Cảm ơn bạn đã quay trở lại</h4>
          <input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Vui lòng nhập email"
            type="email"
            required
            className="login__form__email"
          />
          <div className="input-line"></div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Vui lòng nhập password"
            name="password"
            type="password"
            required
            minLength="6"
            className="login__form__password"
            autoComplete="on"
          />
          <div className="input-line"></div>
          {userState.error && (
            <p className="error-message">Email và mật khẩu không hợp lệ</p>
          )}
          <button
            type="submit"
            className="submit_btn"
            onClick={(e) => handleLoginClick(e)}
          >
            Tiếp tục
          </button>
          <span>
            Bằng việc chọn tiếp tục, bạn đã đồng ý với Điều khoản & Điều kiện
            cùng Chính sách bảo mật và chia sẻ thông tin của CANIFA
          </span>
        </form>
        <form
          onSubmit={handleSubmit}
          className={`login__form ${
            activeForm === "register" ? "" : "disabled"
          }`}
        >
          <h4>Đăng ký để Canifa có cơ hội phục vụ bạn tốt hơn.</h4>
          <input
            placeholder="Vui lòng nhập họ và tên"
            name="username"
            type="text"
            className="login__form__email"
            value={values.username}
            onChange={handleChange}
          />
          <div className="input-line"></div>
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
          <input
            placeholder="Vui lòng nhập email"
            type="email"
            name="email"
            className="login__form__email"
            value={values.email}
            onChange={handleChange}
          />
          <div className="input-line"></div>
          {errors.email && <p className="error-message">{errors.email}</p>}
          <input
            placeholder="Vui lòng nhập password"
            name="password"
            type="password"
            className="login__form__password"
            autoComplete="on"
            value={values.password}
            onChange={handleChange}
          />{" "}
          <div className="input-line"></div>
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
          <input
            placeholder="Vui lòng nhập  lại password"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={(e) => handleChange(e)}
            className="login__form__password"
            autoComplete="on"
          />
          <div className="input-line"></div>
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
          <button className="submit_btn" type="submit">
            Đăng kí
          </button>
          <span>
            Bằng việc chọn tiếp tục, bạn đã đồng ý với Điều khoản & Điều kiện
            cùng Chính sách bảo mật và chia sẻ thông tin của CANIFA
          </span>
        </form>
      </div>
    </div>
  );
}

LoginModal.propTypes = {
  isOpen: PropTypes.bool,
};
