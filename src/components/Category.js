import React from "react";
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";
import { productData } from "../yummi-data";

function Categoty() {
  let setting = {
    dot: true,
    infinite: true,
    slidesToShow: 4,
    slidestoScroll: 1,
    cssEase: "linear",
  };
  return (
    <div className="category row">
      <div className="category__content"></div>
      <div className="category__carousel">
        <Carousel {...setting}>
          {productData.map((product, index) => {
            return (
              <ProductCard
                name={product.product_Name}
                price={product.price}
                colors={product.colors}
                img={product.img}
              />
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default Categoty;
