import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";
import Silder from "../components/Silder";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import CategoryCarsourel from "../components/CategoryCarsourel";
import ProductCard from "../components/ProductCard";
import { productData } from "../yummi-data";
import Category from "../components/Category";
import axios from "axios";

const Home = () => {
  const [newProduct, setNewProduct] = useState([]);
  const settingCategory = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const newProduct = async () => {
      const res = await axios.get(`http://localhost:4000/product/find-new`);
      setNewProduct(res.data);
    };
    newProduct();
  }, []);

  return (
    <PageTitle title="Trang chủ">
      <Silder />
      <div className="wrapper__main">
        <Section>
          <SectionTitle>Ưu đãi riêng bạn</SectionTitle>
          <SectionBody className="row">
            <img
              alt=""
              className="section__body__img"
              src="/assets/banners/banner__promotion.png"
            ></img>
          </SectionBody>
        </Section>
        <Section>
          <SectionTitle>Stay at home</SectionTitle>
          <SectionBody>
            <CategoryCarsourel
              banner_1="/assets/banners/banner__category__4.jpg"
              banner_2="/assets/banners/banner__category__2.png"
              banner_3="/assets/banners/banner_category_1.jpg"
              dots={false}
              infinite={true}
              products={newProduct}
              speed={500}
              autoplay={true}
              slidesToShow={3}
              slidesToScroll={1}
              arrow={true}
            ></CategoryCarsourel>
          </SectionBody>
        </Section>
        <Section>
          <SectionBody className="row">
            <img
              alt=""
              className="section__body__img"
              src="/assets/banners/banner_6.jpg"
            ></img>
          </SectionBody>
        </Section>
        <Section>
          <SectionTitle>Áo nỉ gia đình</SectionTitle>
          <SectionBody>
            <CategoryCarsourel
              banner_1="/assets/banners/banner__category__1.png"
              banner_2="/assets/banners/banner__category__2.png"
              banner_3="/assets/banners/banner_category_1.jpg"
              dots={false}
              infinite={true}
              products={newProduct}
              autoplay={true}
              slidesToShow={3}
              slidesToScroll={1}
            ></CategoryCarsourel>
          </SectionBody>
        </Section>

        <Section>
          <SectionTitle> Sản Phẩm mới</SectionTitle>
          <SectionBody>
            <div className="product-container">
              {newProduct.map((product, index) => {
                return (
                  <ProductCard
                    key={index}
                    product={product}
                    name={product.title}
                    regularPrice={product.regularPrice}
                    colors={product.colors}
                    img={product.image01}
                    sizes={product.size}
                    link={product.slugName}
                  />
                );
              })}
            </div>
          </SectionBody>{" "}
        </Section>
        <Section>
          <SectionBody>
            <div className="subcribe--connect--form">
              <div className="subcribe-form ">
                <h1>Đăng kí nhận bản tin</h1>
                <input className="subcribe-form__email-sub"></input>
              </div>

              <div className="connect-form ">
                <h1>Kết nối ngay</h1>
                <i className="bx bxl-facebook-square"></i>
                <i className="bx bxl-instagram-alt"></i>
                <i className="bx bxl-youtube"></i>
              </div>
            </div>
          </SectionBody>
        </Section>
      </div>
      ;
    </PageTitle>
  );
};

export default Home;
