import PropTypes from "prop-types";
import { useState } from "react";

const ProductView = (props) => {
  const product = props.product;
  const [previewImg, setPreviewImg] = useState(product.image01);
  console.log(product.image01);

  return (
    <div className="product-views">
      <div className="product-views___main">
        <img src={previewImg} />
      </div>
      <div className="product-views__list">
        <img
          className={`product-views__item ${
            previewImg === product.image01 && "active"
          }`}
          src={product.image01}
          onMouseEnter={() => setPreviewImg(product.image01)}
        ></img>
        <img
          className={`product-views__item ${
            previewImg === product.image02 && "active"
          }`}
          src={product.image02}
          onMouseEnter={() => setPreviewImg(product.image02)}
        ></img>
        <img
          className={`product-views__item ${
            previewImg === product.image03 && "active"
          }`}
          src={product.image03}
          onMouseEnter={() => setPreviewImg(product.image03)}
        ></img>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default ProductView;
