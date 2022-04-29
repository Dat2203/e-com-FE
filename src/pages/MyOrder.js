import React, { useState, useEffect } from "react";
import axios from "axios";

import num, { stringToDate } from "../util/numberWithComans";
import Table from "../components/Table";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import Section, { SectionBody } from "../components/Section";

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;
const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td className="table__id">{item._id}</td>
    <td>{stringToDate(item.createdAt)}</td>
    <td className="table__quantity">{item.quantity}</td>
    <td>{`${num(item.amount)} ₫`}</td>
    <td>{item.status}</td>
  </tr>
);
const OrderHead = [
  "Đơn hàng",
  "Ngày mua",
  "Số lượng",
  "Giá tiền",
  "Trạng thái",
];

const MyOrder = () => {
  const user = useSelector((state) => state.user.currentUser);

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const getOrderList = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/order/find/${user._id}`
        );
        setOrderList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrderList();
  }, []);
  console.log(orderList);

  return (
    <div>
      <Section>
        <div className="page__title">Đơn hàng của tôi</div>
        <SectionBody>
          <div className="account">
            <Sidebar></Sidebar>
            <div className="account__main sd-box">
              <div className="card__header">
                <h3>Đơn hàng của tôi</h3>
              </div>
              <div className="card__body">
                {orderList.length > 0 ? (
                  <Table
                    className="card__body__table"
                    headData={OrderHead}
                    renderHead={(item, index) => renderOrderHead(item, index)}
                    bodyData={orderList}
                    renderBody={(item, index) => renderOrderBody(item, index)}
                  />
                ) : (
                  <div className="account__address__empty">
                    Hiện tại chưa có địa chỉ nhận hàng. Hãy thêm địa chị ngay
                    nào !!!!!!!{" "}
                  </div>
                )}
              </div>
              <div className="card__footer"></div>
            </div>
          </div>
        </SectionBody>
      </Section>
    </div>
  );
};
export default MyOrder;
