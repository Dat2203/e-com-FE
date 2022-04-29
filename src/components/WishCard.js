import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import { wishList } from "../redux/apiCall";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import num from "../util/numberWithComans";

function WishCard(props) {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleWishList = () => {
    wishList(dispatch, { userId: user._id, slugName: props.link });
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
      </div>

      <div className="product-card__details wishlist">
        <div className="product-card__description">
          <div className="product-card__name">{props.name}</div>
          <div className="product-card__price">
            {num(props.regularPrice) + " ₫"}
            <span className="product-card__price__on-sale">
              <del>{num(props.regularPrice) + "đ"}</del>
            </span>
          </div>
        </div>
        <div className="product-card__wishlist__btn">
          <i
            className="bx bxs-heart color-red"
            onClick={() => handleWishList()}
          ></i>
        </div>
      </div>
    </div>
  );
}

WishCard.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  regularPrice: PropTypes.number.isRequired,
  link: PropTypes.string,
};

export default WishCard;
