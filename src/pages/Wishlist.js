import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import WishCard from "../components/WishCard";
import Section, { SectionBody } from "../components/Section";

const ProductList = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [wishlist, setWishList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const res = await axios.get(
        `http://localhost:4000/user/wishlist/${user._id}`
      );
      setWishList(res.data);
    };
    getList();
  }, [user, user._id]);

  return (
    <div>
      <Section>
        <div className="page__title">Yêu thích</div>
        <SectionBody>
          <div class="account">
            <Sidebar></Sidebar>
            <div className="account__main">
              <h3>Yêu thích</h3>
              <div className="product-container wishlist  ">
                {wishlist.map((product, index) => {
                  return (
                    <WishCard
                      id={product._id}
                      key={index}
                      product={product}
                      name={product.title}
                      regularPrice={parseInt(product.regularPrice)}
                      img={product.image01}
                      link={product.slugName}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </SectionBody>
      </Section>
    </div>
  );
};

export default ProductList;
