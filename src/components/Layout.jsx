import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Routers from "../routers/router";
import SendTop from "./SendTop";
import Notification from "./Notification";
import Slider from "react-slick";
import { withRouter, useLocation } from "react-router-dom";

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

const Layout = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route
            render={(props) => (
              <div>
                <Navbar {...props} />
                <div className=""></div>
                <Slider
                  className="policy__carousel"
                  infinite={true}
                  autoplay={true}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  vertical={true}
                >
                  <span>
                    Thêm vào giỏ hàng 499.000 đ để được miễn phí vận chuyển
                  </span>
                  <span>
                    ĐỔI HÀNG MIỄN PHÍ - Tại tất cả cửa hàng trong 30 ngày{" "}
                  </span>
                </Slider>
                <div className="container">
                  <div className="main">
                    <Routers />
                  </div>
                </div>
                <Footer />
                <Notification></Notification>
                <SendTop />
              </div>
            )}
          />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default Layout;
