import React, { useEffect, useState } from "react";
import axios from "axios";

import ProductView from "../components/productView";
import ProductAction from "../components/ProductAction";

export default function Product(props) {
  const slug = props.match.params.slug;
  const [product, setProduct] = useState();
  console.log(slug);
  console.log(product);

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(`http://localhost:4000/product/find/${slug}`);
      setProduct(res.data);
    };
    getProduct();
  }, [slug]);

  return (
    <div className="product">
      {product && <ProductView product={product}></ProductView>}
      {product && <ProductAction product={product}></ProductAction>}
    </div>
  );
}
