import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutCart } from "../redux/CartRedux";
import { logout } from "../redux/UserRedux";
import { setNoti } from "../redux/NotiRedux";

const sideBarUser = [
  {
    display: "Đơn hàng của tôi",
    icon: "bx bx-package",
    path: "/my-account-order-history",
  },
  {
    display: "C-point",
    icon: "bx bx-user-circle",
    path: "/my-account-order-history",
  },
  { display: "Sổ địa chỉ", icon: "bx bx-home", path: "/shipping-details" },
  { display: "Yêu thích", icon: "bx bx-heart", path: "/wishlist" },
  { display: "Tài khoản", icon: "bx bx-user", path: "/my-account" },
];

const sideBarAdmin = [
  {
    display: "Tổng quát",
    icon: "bx bx-folder-minus",
    path: "/admin-account",
  },
  {
    display: "Khách hàng",
    icon: "bx bx-user-pin",
    path: "/customers",
  },
  {
    display: "Đơn hàng",
    icon: "bx bx-cart",
    path: "/orders",
  },
  { display: "Sản phẩm", icon: "bx bx-cube", path: "/products" },
  {
    display: "Phân tích",
    icon: "bx bx-bar-chart-alt",
    path: "/analyst",
  },
  ,
];

const Sidebar = () => {
  const user = useSelector((state) => state.user.currentUser);
  let sideBar = user && user.isAdmin ? sideBarAdmin : sideBarUser;

  const { pathname } = useLocation();
  const activeNav = sideBar.findIndex((e) => e.path === pathname);
  const dispatch = useDispatch();

  const hanldeLogout = () => {
    dispatch(logoutCart());
    dispatch(logout());
    dispatch(setNoti({ message: "Đăng xuất thành công !" }));
  };

  return (
    <div className="sidebar">
      <div className="sidebar__name">{user.username}</div>
      <div className="sidebar__point">
        <div className="sidebar__point__item">
          C-Point <div className="point color-red">0</div>
        </div>
        <span></span>
        <div className="sidebar__point__item">
          Điểm KHTT <div className="point color-blue">0</div>
        </div>
        <span></span>
        <div className="sidebar__point__item">Hạng thẻ</div>
      </div>
      <div className="sidebar__main__list">
        {sideBar.map((item, index) => {
          return (
            <Link key={index} to={item.path}>
              <div
                className={`sidebar__main__item  ${
                  index === activeNav ? "active" : ""
                }`}
              >
                <div className="sidebar__active"></div>
                <i className={item.icon} />
                <span>{item.display}</span>
              </div>
            </Link>
          );
        })}

        <div className="sidebar__main__item " onClick={hanldeLogout}>
          <div className="sidebar__active"></div>
          <i className="bx bx-log-out" />
          <span>Đăng xuất</span>
        </div>
      </div>

      <div className="sidebar__support">
        <h4> Bạn cần hỗ trợ</h4>
        <span> Vui lòng gọi 1800 6061 (miễn phí cước gọi)</span>
      </div>
    </div>
  );
};

export default Sidebar;
