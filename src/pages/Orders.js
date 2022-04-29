import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Sidebar from "../components/Sidebar";
import Section, { SectionBody, SectionTitle } from "../components/Section";
import num, { stringToDate } from "../util/numberWithComans";
import { userRequest } from "../requestMethod";

const headerTableOrders = [
  "Đơn hàng",
  "Khách hàng",
  "Ngày mua",
  "Số lượng",
  "Giá tiền",
  "Trạng thái",
];
const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td className="table__id">{item._id}</td>
    <td>{item.name}</td>
    <td>{stringToDate(item.createdAt)}</td>
    <td className="table__quantity">{item.quantity}</td>
    <td>{`${num(item.amount)} ₫`}</td>
    <td>{item.status}</td>
  </tr>
);
const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const res = await userRequest.get(`order`);
      setOrders(res.data);
      console.log(orders);
    };
    getProduct();
  }, []);

  return (
    <div>
      <Section>
        <SectionTitle>Danh sách đơn hàng</SectionTitle>
        <SectionBody>
          <div className="account">
            <Sidebar></Sidebar>
            <div className="account__main sd-box">
              <div className="card__header">
                <h3>Danh sách đơn hàng</h3>
              </div>
              <div className="card__body">
                {orders.length > 0 ? (
                  <Table
                    headData={headerTableOrders}
                    renderHead={(item, index) => renderOrderHead(item, index)}
                    bodyData={orders}
                    renderBody={(item, index) => renderOrderBody(item, index)}
                  />
                ) : (
                  <div></div>
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

export default Order;
