import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import num, { stringToDate } from "../util/numberWithComans";
import AddProductForm from "../components/AddProductForm";
import { deleteProduct, getProducts } from "../redux/apiCall";
import { useDispatch, useSelector } from "react-redux";

const headerTableProduct = [
  "Mã Sản Phẩm",
  "Tên Sản Phẩm",
  "Mẫu",
  "Giá",
  "Khuyến mãi",
  "Chỉnh sửa",
];

const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;
const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td className="table__id">{item._id}</td>
    <td className="table__name">
      <div>{item.title} </div>
      <img className="table__image" src={item.image01}></img>
    </td>
    <td>{item.categorySlug}</td>
    <td>{`${num(item.regularPrice)}₫`}</td>
    <td>{item.discount + "%"}</td>
    <td>{`x `}</td>
  </tr>
);

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [openAddForm, setOpenAddForm] = useState(false);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  return (
    <div>
      <Section>
        <div className="page__title">Danh sách sản phẩm</div>
        <SectionBody>
          <div className="account">
            <Sidebar></Sidebar>

            {openAddForm ? (
              <div className="account__address--form  account__main">
                <div className="account__title">
                  <h3>
                    <i
                      className="bx bx-left-arrow-alt back__btn"
                      onClick={() => setOpenAddForm(false)}
                    ></i>{" "}
                    Thêm địa chỉ mới
                  </h3>
                </div>
                <AddProductForm type={"new"} />
              </div>
            ) : (
              <div className="account__main sd-box">
                <div className="card__header flex">
                  <h3>Danh sách đơn hàng</h3>
                  <div
                    className="account__address__add-btn bg-red"
                    onClick={() => setOpenAddForm(true)}
                  >
                    <i className="bx bx-plus-circle"></i>
                    <span>Thêm sản phẩm </span>
                  </div>
                </div>
                <div className="card__body">
                  {products && products.length > 0 ? (
                    <Table
                      limit={7}
                      headData={headerTableProduct}
                      renderHead={(item, index) =>
                        renderCusomerHead(item, index)
                      }
                      bodyData={products}
                      renderBody={(item, index) => renderOrderBody(item, index)}
                    />
                  ) : (
                    <div className="account__address__empty">
                      Hiện tại chưa có địa chỉ nhận hàng. Hãy thêm địa chị ngay
                      nào !!!!!!!{" "}
                    </div>
                  )}
                </div>
                <div className="card__footer">
                  <Link to="/">view all</Link>
                </div>
              </div>
            )}
          </div>
        </SectionBody>
      </Section>
    </div>
  );
};

export default ProductList;
