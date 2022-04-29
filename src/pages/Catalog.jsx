import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import axios from "axios";
import Slide from "react-slick";
import ProductCard from "../components/ProductCard";
import { colors, prices, sizes } from "../assets/productCategory";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import productDatas from "../assets/product";

const categoryMale = [
  {
    display: "Áo len",
    imgURL: "/assets/banners/category_ao_len.png",
    categorySlug: "ao-len",
  },
  {
    display: "Áo khoác",
    imgURL: "/assets/banners/category_ao_khoac.png",
    categorySlug: "ao-len",
  },
  {
    display: "Áo phông",
    imgURL: "/assets/banners/category_ao_phong.png",
    categorySlug: "ao-len",
  },
  {
    display: "Áo nỉ",
    imgURL: "/assets/banners/category_ao_ni.png",
    categorySlug: "ao-len",
  },
  {
    display: "Áo ni có mũ",
    imgURL: "/assets/banners/category_ao_no_co_mu.png",
    categorySlug: "ao-len",
  },
  {
    display: "Áo len",
    imgURL: "/assets/banners/category_ao_somi.png",
    categorySlug: "ao-len",
  },
  {
    display: "Quần dài",
    imgURL: "/assets/banners/category_quan_vaii.png",
    categorySlug: "ao-len",
  },
  {
    display: "Áo len",
    imgURL: "/assets/banners/category_quan_vai.png",
    categorySlug: "ao-len",
  },
  {
    display: "Áo len",
    imgURL: "/assets/banners/category_ao_len.png",
    categorySlug: "ao-len",
  },
];
const settingCategory = {
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};

export default function Catalog(props) {
  const initFilter = {
    price: 0,
    color: [],
    category: [],
    size: [],
  };
  const sliderRef = useRef();
  const productlist = productDatas.getAllProducts;

  const [products, setProducts] = useState(productlist);
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState(initFilter);
  const [catalogProduct, setCatalogProduct] = useState([]);

  const slug = props.match.params.slug;

  console.log(filter);
  const filterOpions = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "PRICE":
          setFilter({ ...filter, price: item });
          break;
        case "COLOR":
          setFilter({ ...filter, color: [...filter.color, item] });
          break;
        case "SIZE":
          setFilter({ ...filter, size: [...filter.size, item] });
          break;
      }
    } else {
      switch (type) {
        case "PRICE":
          const newPrice = filter.price.filter((e) => e !== item);
          setFilter({ ...filter, price: newPrice });
          break;
        case "COLOR":
          const newColor = filter.color.filter((e) => e !== item);
          setFilter({ ...filter, color: newColor });
          break;
        case "SIZE":
          const newSize = filter.size.filter((e) => e !== item);
          setFilter({ ...filter, size: newSize });
          break;
      }
    }
  };

  const updateProduct = useCallback(() => {
    let temp = products;

    if (filter.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.colors.find((color) => filter.color.includes(color));
        return check !== undefined;
      });
    }

    if (filter.size.length > 0) {
      temp = temp.filter((e) => {
        const check = e.size.find((size) => filter.size.includes(size));
        return check !== undefined;
      });
    }

    setCatalogProduct(temp);
  }, [filter, setProducts]);

  useEffect(() => {
    const newProduct = async () => {
      const res = await axios.get(
        `http://localhost:4000/product/category/${slug}`
      );
      setCatalogProduct(res.data);
      setProducts(res.data);
    };
    newProduct();
  }, [slug]);

  return (
    <PageTitle title="Sản Phẩm">
      <Section>
        <SectionBody>
          <div className="catalog-banner">
            <img src="/assets/banners/banner_6.jpg"></img>
          </div>
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Danh mục sản phẩm</SectionTitle>
        <SectionBody>
          <div
            className="slider__btn slider__btn--left"
            direction="left"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <i className="bx bx-left-arrow"></i>
          </div>
          <div
            className="slider__btn slider__btn--right"
            direction="right"
            onClick={() => sliderRef.current.slickNext()}
          >
            <i className="bx bx-right-arrow"></i>
          </div>

          <Slide
            ref={sliderRef}
            className="category__carousel"
            {...settingCategory}
          >
            {categoryMale.map((product, index) => {
              return (
                <div key={index} className="category__circle">
                  <img className="category__circle__img" src={product.imgURL} />
                  <span>{product.display}</span>
                </div>
              );
            })}
          </Slide>
        </SectionBody>
      </Section>
      <Section>
        <SectionBody>
          <div className="catalog-banner">
            <img src="/assets/banners/banner__10.png"></img>
          </div>
        </SectionBody>
      </Section>

      <div className="catalog">
        <div className="catalog__filter">
          <h3>Sản phẩm mới</h3>
          <div className="catalog__filter__categoty__list">
            {categoryMale.map((category, index) => {
              return (
                <div className="catalog__filter__categoty__list__item">
                  {category.display}
                </div>
              );
            })}
          </div>
        </div>
        <div className="catalog__content">
          <div className="catalog__content__filter">
            <button
              className="catalog__content__filter__btn"
              onClick={() => setOpenFilter(!openFilter)}
            >
              <span>Bộ lọc</span>
              <i className="bx bx-filter"></i>
            </button>
            <button className="catalog__content__filter__btn">
              <span>Sắp xếp</span>
              <i className="bx bx-sort-down"></i>
            </button>
          </div>
          <div
            className={`catalog__content__filter__form ${
              openFilter ? "active-form" : ""
            }`}
          >
            <div className="catalog__content__filter__form__option filter-price">
              <h4> Khoảng giá</h4>
              {prices.map((price, index) => {
                return (
                  <div
                    key={index}
                    className="catalog__content__filter__form__size__selection"
                  >
                    <input type="radio" name="price"></input>
                    <label>{price.display} </label>
                  </div>
                );
              })}
            </div>
            <div className="catalog__content__filter__form__option  filter-price">
              <h4>Màu sắc</h4>
              {colors.map((color, index) => {
                return (
                  <div
                    key={index}
                    className="catalog__content__filter__form__option__selection"
                  >
                    <input
                      type="checkbox"
                      name="color"
                      onChange={(e) =>
                        filterOpions("COLOR", e.target.checked, e.target.value)
                      }
                      value={color.color}
                    ></input>
                    <label>{color.display} </label>
                  </div>
                );
              })}
            </div>
            <div className="catalog__content__filter__form__option">
              <h4>Size</h4>
              {sizes.map((size, index) => {
                return (
                  <div
                    key={index}
                    className="catalog__content__filter__form__option__selection"
                  >
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        filterOpions("SIZE", e.target.checked, e.target.value)
                      }
                      name="size"
                      value={size.size}
                    ></input>
                    <label>{size.display} </label>
                  </div>
                );
              })}
            </div>
            <div
              className="catalog__content__filter__apply-btn"
              onClick={() => {
                updateProduct();
                setOpenFilter(false);
              }}
            >
              Áp dụng
            </div>
          </div>
          <div className="catalog__content__grid">
            {catalogProduct.map((product, index) => {
              return (
                <ProductCard
                  product={product}
                  key={index}
                  name={product.title}
                  regularPrice={parseInt(product.regularPrice)}
                  colors={product.colors}
                  sizes={product.size}
                  img={product.image01}
                  link={product.slugName}
                />
              );
            })}
          </div>
        </div>
      </div>
    </PageTitle>
  );
}
