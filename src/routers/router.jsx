import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Account from "../pages/Account";
import Address from "../pages/Address";
import Customer from "../pages/Customers";
import Order from "../pages/Orders";
import ProductList from "../pages/ProductSr";
import CheckOut from "../pages/CheckOut";
import WhisList from "../pages/Wishlist";
import Success from "../pages/Success";
import MyOrder from "../pages/MyOrder";

export default function Paths() {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/catalog/:slug" component={Product} />
      <Route path="/category/:slug" component={Catalog} />
      <Route path="/admin-account">
        {user ? <Account /> : <Redirect to="/" />}
      </Route>
      <Route path="/cart" component={Cart} />
      <Route path="/my-account">
        {user ? <Account /> : <Redirect to="/" />}
      </Route>
      <Route path="/shipping-details">
        {user ? <Address /> : <Redirect to="/"></Redirect>}
      </Route>
      <Route path="/customers">
        {user ? <Customer /> : <Redirect to="/" />}
      </Route>
      <Route path="/wishlist">
        {user && user.isAdmin === false ? <WhisList /> : <Redirect to="/" />}
      </Route>
      <Route path="/checkout">
        {cart.quantity ? <CheckOut /> : <Redirect to="/" />}
      </Route>
      <Route path="/orders">{user ? <Order /> : <Redirect to="/" />}</Route>
      <Route path="/products">
        {user ? <ProductList /> : <Redirect to="/" />}
      </Route>
      <Route path="/success" component={Success} />
      <Route path="/my-account-order-history">
        {user ? <MyOrder /> : <Redirect to="/" />}
      </Route>
    </Switch>
  );
}
