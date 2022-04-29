import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/CartRedux";
import num from "../util/numberWithComans";

function ProductAction(props) {
  const product = props.product;

  const [selectedColor, setSelectedColor] = useState(props.product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(props.product.size[0]);
  const dispatch = useDispatch();

  const handleClick = () => {
    const productQuantity = 1;
    dispatch(
      addProduct({
        ...props.product,
        selectedColor,
        selectedSize,
        productQuantity,
      })
    );
  };
  return (
    <div className="product__detail">
      <div className="product__detail__name">{product.title}</div>
      <div className="product__detail__prices">
        <span>{num(product.regularPrice) + "  ₫"}</span>
        <del>{num(product.regularPrice) + "  ₫"} </del>
      </div>
      <div className="product__detail__item">
        <h3 className="product__detail__item__title">Màu sắc</h3>
        <div className="product__detail__item__list">
          {product.colors.map((color, index) => (
            <div
              key={index}
              className={`product-card__color__container ${
                color === selectedColor ? "active" : ""
              }`}
            >
              <div
                className={`product-card__color__item ${
                  color === selectedColor ? "active" : ""
                }  bg-${color}`}
                onClick={() => {
                  setSelectedColor(color);
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div className="product__detail__item">
        <h3 className="product__detail__item__title">Kích thước</h3>
        <div className="product__detail__item__list">
          {product.size.map((size, index) => (
            <div
              key={index}
              className={`product-card__size__item ${
                size === selectedSize ? "active" : ""
              }`}
              onClick={() => setSelectedSize(size)}
            >
              <span>{size.toUpperCase()}</span>

              <i
                className={`bx bx-check ${
                  size === selectedSize ? "active" : ""
                } `}
              ></i>
            </div>
          ))}
        </div>
      </div>

      <div className="product__detail__policy">
        <div className="product__detail__policy__list">
          <i className=" bx bxs-truck"></i>
          <div className="roduct__detail__policy_item">
            <h4>Miễn phí vận chuyển</h4>
            <span>Cho đơn hàng từ 499.000đ</span>
          </div>
        </div>
        <hr></hr>
        <div className="product__detail__policy__list">
          <i className="bx bx-undo"></i>
          <div className="roduct__detail__policy_item">
            <h4>Miễn phí vận chuyển</h4>
            <span>Cho đơn hàng từ 499.000đ</span>
          </div>
        </div>
      </div>

      <button className="btn-add add-product__to--cart" onClick={handleClick}>
        <h3>Thêm vào giỏ hàng</h3>
      </button>
      <button className="btn-find add-product__to--cart">
        <h3>Tìm tại cửa hàng</h3>
      </button>

      <div className="product__detail__description">
        <h4>Mô tả</h4>
        <span>{product.desc || "Lorem ipsum divqu  "}</span>
      </div>
    </div>
  );
}

ProductAction.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductAction;
