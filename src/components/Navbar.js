import React, { useRef, useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./LoginModal";
import { removeProduct } from "../redux/CartRedux";
import num from "../util/numberWithComans";
import { setNoti, closeNoti } from "../redux/NotiRedux";

const mainNav = [
  { display: "Trang chủ", path: "/" },
  { display: "Nam", path: "/category/male" },
  { display: "Nữ", path: "/category/female" },
  { display: "Outlet", path: "/Outlet" },
];

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};
export default function Navbar() {
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  const [openLogin, setOpenLogin] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const navRef = useRef();
  const cartRef = useRef();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

  const handleRemoveProduct = (product) => {
    dispatch(
      removeProduct({
        ...product,
      })
    );
  };

  const cartQuantity = cart.quantity;

  let domNode = useClickOutside(() => {
    setOpenCart(false);
  });

  const menuLeft = useRef(null);
  const menuToggle = () => menuLeft.current.classList.toggle("active");

  return (
    <>
      <div className="navbar" ref={navRef}>
        <div className="container">
          <div className="navbar__logo">
            <img src={logo} alt=""></img>
          </div>
          <div className="navbar__menu">
            <div className="navbar__menu__mobile-toggle" onClick={menuToggle}>
              <i className="bx bx-menu-alt-left"></i>
            </div>

            <div className="navbar__menu__left" ref={menuLeft}>
              <div className="navbar__menu__left__close" onClick={menuToggle}>
                <i className="bx bx-chevron-left"></i>
              </div>
              {mainNav.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`navbar__menu__item navbar__menu__left__item ${
                      index === activeNav ? "active" : ""
                    }`}
                    onClick={menuToggle}
                  >
                    <Link to={item.path}>
                      <div>{item.display}</div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="navbar__menu__right">
              <div className=" navbar__menu__item navbar__menu__right__item">
                {user ? (
                  <Link to={user.isAdmin ? "/admin-account" : "/my-account"}>
                    <i className="bx bx-user-circle"></i>
                  </Link>
                ) : (
                  <i
                    className="bx bx-user-circle"
                    onClick={() => setOpenLogin(!openLogin)}
                  ></i>
                )}
              </div>
              <div className=" navbar__menu__item navbar__menu__right__item">
                <Link to="/cart">
                  <i className="bx bx-store"></i>
                </Link>
              </div>
              <div className=" navbar__menu__item navbar__menu__right__item">
                <Link to="/wishlist">
                  <i className="bx bx-heart"></i>
                </Link>
              </div>
              <div
                className=" navbar__menu__item navbar__menu__right__item"
                onClick={() => setOpenCart(true)}
              >
                <i className="bx bx-shopping-bag"></i>
                <div
                  className={`navbar__menu__item__badge ${
                    cartQuantity === 0 ? "badge__active" : ""
                  }`}
                >
                  {cartQuantity}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={domNode}
          className={`navbar__cart ${openCart ? "" : "badge__active"}`}
        >
          {cart.products.length > 0 ? (
            <div>
              {cart.products.map((product, index) => {
                return (
                  <div key={index} className=" navbar__cart__product">
                    <img
                      className="navbar__cart__product_image"
                      src={`${product.image01}`}
                    />
                    <div className="navbar__cart__product__detail">
                      <h4>{product.title}</h4>
                      <span>{`${product.productQuantity} Sản phẩm / Màu :${
                        product.selectedColor
                      } /Size : ${product.selectedSize.toUpperCase()}`}</span>
                      <div>{`Tổng : ${
                        product.regularPrice * product.productQuantity
                      }đ`}</div>
                    </div>
                    <div
                      className=" navbar__cart__product__delete"
                      onClick={() => handleRemoveProduct(product)}
                    >
                      Xóa
                    </div>
                  </div>
                );
              })}

              <Link to="/cart">
                <div className=" navbar__cart__to-cart">Xem giỏ hàng</div>
              </Link>
              <div className=" navbar__cart__total__price">
                Tạm tính <strong>{num(cart.total)}</strong> đ
              </div>
            </div>
          ) : (
            <div className="navbar__cart__empty">
              <i className="bx bx-x" onClick={() => setOpenCart(false)}></i>
              <img src="/assets/empty-cart.png" />
            </div>
          )}
        </div>
      </div>
      <Login isOpen={openLogin} function={setOpenLogin} />
    </>
  );
}
