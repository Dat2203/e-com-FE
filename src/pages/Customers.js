import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Section, { SectionBody } from "../components/Section";
import { getAllUser } from "../redux/apiCall";
import { TOKEN } from "../requestMethod";
import axios from "axios";
import { useSelector } from "react-redux";

const headerTableCustome = [
  "Mã khách hàng",
  "Tên khách hàng",
  "Email",
  "Số điện thoại",
];
const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;
const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td className="table__id">{item._id}</td>
    <td>{item.username}</td>
    <td>{item.email}</td>
    <td>{item.phoneNumber}</td>
  </tr>
);

const Account = () => {
  const [customerList, setCustomerList] = useState();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/user`, {
          headers: { token: `Bearer ${TOKEN}` },
        });
        console.log(res.data);
        setCustomerList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Section>
        <div className="page__title">Danh sách khách hành</div>
        <SectionBody>
          <div className="account">
            <Sidebar></Sidebar>
            <div className="account__main sd-box">
              <div className="card__header">
                <h3>Danh sách khách hàng</h3>
              </div>
              <div className="card__body">
                {customerList && (
                  <Table
                    headData={headerTableCustome}
                    renderHead={(item, index) => renderCusomerHead(item, index)}
                    bodyData={customerList}
                    renderBody={(item, index) => renderCusomerBody(item, index)}
                  />
                )}
              </div>
              <div className="card__footer">
                <Link to="">View all</Link>
              </div>
            </div>
          </div>
        </SectionBody>
      </Section>
    </div>
  );
};

Account.propTypes = {};

export default Account;
