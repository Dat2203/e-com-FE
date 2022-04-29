import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/CartRedux";
import { setNoti } from "../redux/NotiRedux";
import { wishList } from "../redux/apiCall";
import num from "../util/numberWithComans";

function ProductCard(props) {
  const colors = props.colors;
  const sizes = props.sizes;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const [selectedColor, setSelectedColor] = useState(props.colors[0]);
  const [selectedSize, setSelectedSize] = useState(props.sizes[0]);

  const handleWishList = () => {
    if (user) {
      wishList(dispatch, { userId: user._id, slugName: props.link });
    } else {
      dispatch(setNoti({ message: "bạn cần đăng nhập !!!" }));
    }
  };

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
    <div className="product-card">
      <div className="product-card__image">
        <Link to={`catalog/${props.link}`}>
          <div className="product-card__image__wraper">
            <img
              className="product-card__image__item"
              src={props.img}
              alt=""
              width={350}
            ></img>
          </div>
        </Link>

        <div className="product-card__action">
          <div
            className="product-card__btn "
            id="hover-btn"
            onClick={handleClick}
          >
            <i className="bx bx-shopping-bag"></i>
            <span>Thêm vào giỏ</span>
          </div>
          <div className="product-card__size">
            <span>Vui Lòng chọn size</span>
            <div className="product-card__size__list">
              {sizes.map((size, index) => {
                return (
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
                );
              })}
            </div>
          </div>

          <div className="product-card__btn" onClick={() => handleWishList()}>
            {user && user.Wishlist && user.Wishlist.includes(props.link) ? (
              <i className="bx bxs-heart color-red"></i>
            ) : (
              <i className="bx bx-heart"></i>
            )}

            <span>Yêu thích</span>
          </div>
        </div>
      </div>

      <div className="product-card__details">
        <div className="product-card__color">
          {colors.map((color, index) => {
            return (
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
            );
          })}
        </div>
        <div className="product-card__description">
          <div className="product-card__name">{props.name}</div>
          <div className="product-card__price">
            {num(props.regularPrice) + " ₫"}
            <span className="product-card__price__on-sale">
              <del>{num(props.regularPrice) + "đ"}</del>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  regularPrice: PropTypes.number.isRequired,
  colors: PropTypes.array.isRequired,
  size: PropTypes.array,
  link: PropTypes.string,
};

export default ProductCard;
