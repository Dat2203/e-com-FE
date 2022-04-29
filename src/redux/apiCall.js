import {
  loginFailure,
  loginStart,
  loginSuccess,
  wishlistHandler,
} from "./UserRedux";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  // deleteProductFailure,
  // deleteProductStart,
  // deleteProductSuccess,
  // updateProductFailure,
  // updateProductStart,
  // updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./ProductRedux";
import { logoutCart } from "./CartRedux";
import { setNoti } from "../redux/NotiRedux";
import { publicRequest, userRequest } from "../requestMethod";

//--Authentication--//
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));

    dispatch(setNoti({ message: "Đăng nhập thành công !!!" }));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  try {
    await publicRequest.post("/auth/register", user);
    dispatch(setNoti({ message: "Đăng kí thành công !!!" }));
  } catch (err) {
    dispatch(setNoti({ message: "Đăng kí thất bại!!!" }));
    console.log(err);
  }
};

//Update user's information
export const updateInfor = async (dispatch, infor) => {
  try {
    console.log(infor);
    await userRequest.put(`/user/${infor.id}`, infor);
    dispatch(setNoti({ message: "Cập nhập thành công !!!" }));
  } catch (err) {
    dispatch(setNoti({ message: "Cập nhập  thất bại!!!" }));
    console.log(err);
  }
};

//Creat order

export const createOrder = async (dispatch, order) => {
  try {
    await publicRequest.post("/order/create", order);
    dispatch(setNoti({ message: "Đang xử lý!!!" }));
    window.location = "/success";
    dispatch(logoutCart());
  } catch (err) {
    dispatch(setNoti({ message: "Xảy ra lỗi khi đặt hàng!!!" }));
    console.log(err);
  }
};

//Create Address
export const createAdress = async (dispatch, user) => {
  try {
    await userRequest.post(`/address/${user.id}`, user);
    dispatch(setNoti({ message: "Thành công" }));
  } catch (err) {
    dispatch(setNoti({ message: "Thất bại" }));
  }
};

//WishList
export const wishList = async (dispatch, data) => {
  try {
    const res = await userRequest.post(`/user/wishlist/${data.userId}`, data);
    dispatch(wishlistHandler(data));
    dispatch(setNoti({ message: res.data }));
  } catch (err) {
    dispatch(setNoti({ message: "Lỗi" }));
  }
};

//GET all user requests
export const getAllUser = async () => {
  try {
    const res = await userRequest.get(`/user`);
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/product");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

// export const deleteProduct = async (id, dispatch) => {
//   dispatch(deleteProductStart());
//   try {
//     // const res = await userRequest.delete(`/products/${id}`);
//     dispatch(deleteProductSuccess(id));
//   } catch (err) {
//     dispatch(deleteProductFailure());
//   }
// };

// export const updateProduct = async (id, product, dispatch) => {
//   dispatch(updateProductStart());
//   try {
//     // update
//     dispatch(updateProductSuccess({ id, product }));
//   } catch (err) {
//     dispatch(updateProductFailure());
//   }
// };
export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/product`, product);
    dispatch(addProductSuccess(res.data));
    dispatch(setNoti({ message: "Thêm sản phẩm thành công!!!" }));
    window.location.reload(true);
  } catch (err) {
    dispatch(addProductFailure());
  }
};
