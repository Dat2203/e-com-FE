import React from "react";

import { Link } from "react-router-dom";

const footerAboutLink = [
  { display: "Giới thiệu", path: "/about" },
  { display: "Tin tức", path: "/about" },
  { display: "Tuyển dụng", path: "/about" },
  { display: "Liên hệ", path: "/about" },
];
const footerSupportLink = [
  { display: "Hỏi đáp", path: "/about" },
  { display: "Chính sách vận chuyển", path: "/about" },
  { display: "Kiểm tra đơn hàng", path: "/about" },
  { display: "Chính sách bảo mật", path: "/about" },
  { display: "Hướng dẫn chọn size", path: "/about" },
  { display: "Tra cứu điểm thẻ", path: "/about" },
];

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__information">
            <div className="footer__information__title">
              CÔNG TY CỔ PHẦN CANIFA
            </div>
            <p>
              Số ĐKKD: 0107574310, ngày cấp: 23/09/2016, nơi cấp: Sở Kế hoạch và
              đầu tư Hà Nội
            </p>
            <p>
              Trụ sở chính: Số 688, Đường Quang Trung, Phường La Khê, Quận Hà
              Đông, Hà Nội, Việt Nam
            </p>
            <p>
              Địa chỉ liên hệ: Phòng 301 Tòa nhà GP Invest, 170 La Thành, P. Ô
              Chợ Dừa, Q. Đống Đa, Hà Nội
            </p>
            <p>Số điện thoại: +8424 - 7303.0222</p>
            <p>Fax: +8424 - 6277.6419</p>
            <p>Số điện thoại: +8424 - 7303.0222</p>
          </div>

          <div className="footer__information">
            <div className="footer__information__title">Thương hiệu</div>
            <div className="footer__information__link">
              {footerAboutLink.map((item, index) => {
                return (
                  <Link key={index} to={item.path}>
                    <p>{item.display}</p>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="footer__information">
            <div className="footer__information__title">Hỗ trợ</div>
            <div className="footer__information__link">
              {footerSupportLink.map((item, index) => {
                return (
                  <Link key={index} to={item.path}>
                    <p>{item.display}</p>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="footer__information">
            <div className="footer__information__title">
              Tải ứng dụng trên điện thoại
            </div>
            <div className="footer__information__link__app">
              <img src="/assets/logo-pay/bancode.png" alt="1"></img>
              <img src="/assets/logo-pay/googleplay.png" alt="3"></img>
              <img src="/assets/logo-pay/appstore.png" alt="2"></img>
            </div>
            <div className="footer__information__title">
              Phương thức thanh toán
            </div>
            <div className="footer__information__link__app">
              <img src="/assets/logo-pay/pay.png" alt="4"></img>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="footer__social-link">
          <div className="footer__social-link__left">© 2021 CANIFA</div>
          <div className="footer__social-link__right">
            <div className="footer__social-link__span">Visit Us</div>
            <div className="footer__social-link__item">
              <i className="bx bxl-facebook-square"></i>
            </div>
            <div className="footer__social-link__item">
              <i className="bx bxl-instagram-alt"></i>
            </div>
            <div className="footer__social-link__item">
              <i className="bx bxl-youtube"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
