import React, { useRef } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import ProductCard from "./ProductCard";

function CategoryCarsourel(props) {
  const sliderRef = useRef();
  const settingCategory = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="category">
      <Slider {...settingCategory} className="category__slide">
        <img alt="" src={props.banner_1} />
        <img alt="" src={props.banner_2} />
        <img alt="" src={props.banner_3} />
      </Slider>
      <div className="category__product__carousel product__container">
        <i
          onClick={() => sliderRef.current.slickPrev()}
          className="bx bx-chevron-left carousel__btn carousel__btn__left"
        ></i>

        <i
          onClick={() => sliderRef.current.slickNext()}
          className="bx bx-chevron-right carousel__btn carousel__btn__right"
        ></i>

        <Slider ref={sliderRef} {...props}>
          {props.products &&
            props.products.map((product, index) => {
              return (
                <ProductCard
                  key={index}
                  product={product}
                  name={product.title}
                  regularPrice={parseInt(product.regularPrice)}
                  colors={product.colors}
                  img={product.image01}
                  sizes={product.size}
                  link={product.slugName}
                />
              );
            })}
        </Slider>
      </div>
    </div>
  );
}

CategoryCarsourel.propTypes = {
  dot: PropTypes.bool,
  infinite: PropTypes.bool,
  speed: PropTypes.number,
  slidesToShow: PropTypes.number.isRequired,
  slidesToScroll: PropTypes.number.isRequired,
  banner_1: PropTypes.string.isRequired,
  banner_2: PropTypes.string,
  banner_3: PropTypes.string,
};

export default CategoryCarsourel;
