import React, { useState } from "react";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addQuantity } from "../redux/CartRedux";
import Table from "../components/Table";
import num from "../util/numberWithComans";
import CheckOut from "react-stripe-checkout";

const KEY = process.env.REACT_APP_STRIPE;

function Cart() {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const dispatch = useDispatch();

  const add = (product, variable) => {
    dispatch(addQuantity({ ...product, variable }));
  };

  const onToken = (token) => {
    setStripeToken(token);
  };
  return (
    <div>
      <Section>
        <SectionTitle>GIỎ HÀNG</SectionTitle>
        <SectionBody>
          <div className="cart_table">
            <div className="cart_table__header">
              <h4 className="cart_table__header__title">SẢN PHẨM</h4>
              <h4 className="cart_table__header__title">SỐ LƯỢNG</h4>
              <h4 className="cart_table__header__title">GIÁ TIỀN</h4>
              <h4 className="cart_table__header__title">GIẢM GIÁ</h4>
              <h4 className="cart_table__header__title">TỔNG TIỀN</h4>
            </div>

            <div className="cart_table__body__list">
              {cart.products.map((product, index) => {
                return (
                  <div className="cart_table__body__item">
                    <div className="cart__col__product">
                      <img src={product.image01} />
                      <div className="cart__col__product__detail">
                        <span>{product.title}</span>
                        <span>{`Màu sắc : ${product.selectedColor}`}</span>
                        <span>{`Kính cỡ : ${product.selectedSize.toUpperCase()}`}</span>
                      </div>
                      <div>Xóa</div>
                    </div>
                    <div className="cart__col__quantity">
                      <div className="cart__col__quantity__action">
                        <div
                          className="cart__col__quantity__btn "
                          onClick={() => {
                            add(product, true);
                          }}
                        >
                          +
                        </div>
                        <div className="cart__col__quantity__input">
                          {product.productQuantity}
                        </div>
                        <div
                          className="cart__col__quantity__btn"
                          onClick={() => {
                            add(product, false);
                          }}
                        >
                          -
                        </div>
                      </div>
                    </div>
                    <div className="cart__col__product__price">
                      {num(product.regularPrice) + " ₫"}
                    </div>
                    <div className="cart__col__product__price">{0}</div>
                    <div className="cart__col__product__total__price">
                      {num(product.productQuantity * product.regularPrice)}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart_table__bottom">
              <div className="cart_table__bottom__banner">
                <img src="/assets/banners/cart-banner.svg" />
                <Link to="/">
                  <div className="continue__shopping__btn ">
                    TIẾP TỤC MUA HÀNG
                  </div>
                </Link>
              </div>
              {cart.quantity > 0 && (
                <div className="cart_table__bottom__summary">
                  <div className="cart_table__bottom__detail">
                    <span>Tổng sản phẩm</span>
                    <span>{cart.quantity}</span>
                  </div>
                  <div className="cart_table__bottom__detail">
                    <span>Giảm giá</span>
                    <span>300000 đ</span>
                  </div>
                  <div className="cart_table__bottom__detail">
                    <h4>Tạm tính</h4>
                    <span>{cart.total}</span>
                  </div>
                  <Link to="/checkout">
                    <div className="continue__shopping__btn submit_btn">
                      Thanh toán đơn hàng
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </SectionBody>
      </Section>
    </div>
  );
}

export default Cart;
