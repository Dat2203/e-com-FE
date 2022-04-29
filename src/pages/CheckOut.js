import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

import Picklocation from "../components/PickLocation";
import Table from "../components/Table";
import { createOrder } from "../redux/apiCall";
import logo from "../assets/logo.svg";

const KEY = process.env.REACT_APP_STRIPE;
const cartTableHeader = [
  "Sản phẩm",
  "Số lượng",
  "Giá tiền",
  "Giảm giá",
  "Tổng tiền",
];
const renderOrderHead = (item, index) => <th key={index}>{item}</th>;
const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>
      <div className="cart__col__product">
        <img src={item.image01} />
        <div className="cart__col__product__detail">
          <span>{item.title}</span>
          <span>{`Màu sắc : ${item.selectedColor}`}</span>
          <span>{`Kính cỡ : ${item.selectedSize.toUpperCase()}`}</span>
        </div>
      </div>
    </td>
    <td>{item.productQuantity}</td>
    <td>{item.regularPrice}</td>
    <td>{item.discount}</td>
    <td>{item.productQuantity * parseInt(item.regularPrice)}</td>
  </tr>
);

const Checkout = () => {
  // Globle State
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //Local State
  const [defaultAddress, setAddress] = useState("");
  const [checkoutMethod, setCheckoutMethod] = useState("");
  const [stripeToken, setStripeToken] = useState(null);
  const [recivedName, setRecivedName] = useState("");
  const [recivedAddress, setRecivedAddress] = useState("");
  const [recivedNumber, setRecivedNumber] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const form = useRef();

  //SET TOKEN
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const getDefaultAdress = async () => {
      const res = await axios.get(
        `http://localhost:4000/address/default/${user.currentUser._id}`
      );
      setAddress(res.data);
    };
    user.currentUser && getDefaultAdress();
  }, [user]);
  useEffect(() => {
    if (defaultAddress) {
      setRecivedName(defaultAddress.recivedName);
      setRecivedNumber(defaultAddress.recivedNumber);
      setRecivedAddress(defaultAddress.recivedAddress);
    }
  }, [defaultAddress, form.current]);

  const makeOrder = () => {
    if (form.current) {
      const province = form.current.province.value.split("   ")[1];
      const district = form.current.district.value.split("   ")[1];
      const ward = form.current.ward.value.split("   ")[1];
      setRecivedAddress(
        `${addressDetails}, ${ward}, ${district}, ${province} `
      );
    }
    if (recivedNumber === "" || recivedNumber === "" || recivedAddress === "") {
      alert("vui lòng nhập địa chỉ");
    } else if (checkoutMethod === "") {
      alert("vui lòng chọn phương thức thanh toán");
    } else {
      createOrder(dispatch, {
        userId: `${user.currentUser?._id}`,
        products: cart.products.map((item) => ({
          productAdress: item.title,
          productSlug: item.slugName,
          quantity: item.productQuantity,
          price: parseInt(item.price),
        })),
        quantity: cart.quantity,
        name: recivedName,
        phoneNumber: recivedNumber,
        address: recivedAddress,
        amount: cart.total,
        paymentMethod: checkoutMethod,
      });
    }
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(`http://localhost:4000/order/payment`, {
          tokenId: stripeToken.id,
          amount: cart.total,
        });
        makeOrder();
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total]);

  return (
    <div className="checkout">
      <div className="checkout__abate">
        <h2>Thanh toán</h2>
        <div className="checkout__abate__title ">1. Thông tin giao hàng</div>
        {user.currentUser && defaultAddress ? (
          <div className="account__address__item default">
            <div className="account__address__item__infor">
              <span>{recivedName}</span>
              <span>{recivedNumber}</span>
              <span>{recivedAddress}</span>
            </div>
            <div className="account__address__item__btn checkout__abate__address__btn">
              Thay đổi
            </div>
          </div>
        ) : (
          <div>
            {user.currentUser && (
              <h5>
                Bạn có thể thêm địa chỉ mặc định tại sổ địa chỉ tại{" "}
                <a className="color-equa" href="/shipping-details">
                  đây
                </a>
              </h5>
            )}

            <form className="account__adress__form">
              <div className="account__address__form__field w-100 ">
                <input
                  className="adress__form"
                  placeholder=" "
                  onChange={(e) => {
                    setRecivedName(e.target.value);
                  }}
                ></input>
                <label>Họ và tên</label>
              </div>
              <div className="account__address__form__field w-100">
                <input
                  className="adress__form"
                  placeholder=" "
                  onChange={(e) => {
                    setRecivedNumber(e.target.value);
                  }}
                ></input>
                <label>Số điện thoại</label>
              </div>

              <div className="account__address__form__field w-100">
                <input
                  className="adress__form"
                  placeholder=" "
                  onChange={(e) => {
                    setAddressDetails(e.target.value);
                  }}
                ></input>
                <label>Nhập địa chỉ</label>
              </div>
              <Picklocation ref={form} />
              <div className="account__address__form__field ">
                <input type="" className="adress__form" placeholder=" "></input>
                <label>
                  Ghi chú cho đơn hàng <span>{`(tùy chọn)`}</span>
                </label>
              </div>
            </form>
          </div>
        )}

        <hr className="checkout__line"></hr>
        <div className="checkout__abate__title">Mã giảm giá</div>
        <div className="checkout__abate__voucher">
          <input></input>
          <div className="checkout__abate__voucher__btn">Sử dụng</div>
        </div>
        <hr className="checkout__line"></hr>
        <div className="checkout__abate__title">2. Vận chuyển</div>
        <div className="checkout__abate__shipping--charges">
          <span>Phí vận chuyển</span>
          <h3>0đ</h3>
        </div>
        <hr className="checkout__line"></hr>
        <div className="checkout__abate__method">
          <div className="checkout__abate__title">
            3. Phương thức thanh toán
          </div>
          <div className="checkout__abate__method__list w-100">
            <div
              className={`checkout__abate__method__item ${
                checkoutMethod === "COD" ? "active" : ""
              }`}
              onClick={() => setCheckoutMethod("COD")}
            >
              <h4>Thanh toán khi nhận hàng (COD)</h4>
              {checkoutMethod === "COD" ? (
                <i className="bx bx-check-circle"></i>
              ) : (
                <i className="bx bx-circle"></i>
              )}
            </div>
            <div
              className={`checkout__abate__method__item ${
                checkoutMethod === "VNPay" ? "active" : ""
              }`}
              onClick={() => setCheckoutMethod("VNPay")}
            >
              <h4>Thanh toán bằng VNPAY</h4>
              {checkoutMethod === "VNPay" ? (
                <i className="bx bx-check-circle"></i>
              ) : (
                <i className="bx bx-circle"></i>
              )}
            </div>
          </div>
        </div>
        <hr></hr>
        {checkoutMethod === "VNPay" ? (
          <div className="submit_btn bg-red order-btn">
            <StripeCheckout
              name="CANIFA"
              image={logo}
              amount={parseInt(cart.total)}
              className="submit_btn bg-red order-btn"
              currency="VND"
              description={`Vui lòng thanh toán ${cart.total} đ`}
              stripeKey={KEY}
              token={onToken}
            >
              Đặt hàng
            </StripeCheckout>
          </div>
        ) : (
          <div
            className="submit_btn bg-red order-btn"
            onClick={() => makeOrder()}
          >
            Đặt hàng
          </div>
        )}
      </div>
      <div className="checkout__infor ">
        <h2>Thông tin đơn hàng</h2>
        <div className="checkout__infor__table">
          <Table
            headData={cartTableHeader}
            renderHead={(item, index) => renderOrderHead(item, index)}
            bodyData={cart.products}
            renderBody={(item, index) => renderOrderBody(item, index)}
          ></Table>
        </div>
        <hr></hr>
        <div className="checkout__infor__total">
          <div className="checkout__infor__total_1">
            <span>Tổng tiền hàng</span>
            <span>{cart.total}</span>
          </div>
          <hr></hr>
          <div className="checkout__infor__total_1" onClick={() => makeOrder()}>
            <span>Tổng tiền thanh toán</span>
            <span>{cart.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
