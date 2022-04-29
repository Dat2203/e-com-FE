import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      const newItem = action.payload;

      const duplicate = state.products.find(
        (e) =>
          e.slugName === newItem.slugName &&
          e.selectedColor === newItem.selectedColor &&
          e.selectedSize === newItem.selectedSize
      );
      if (duplicate) {
        duplicate.productQuantity += 1;
        const newCart = state.products.filter(
          (e) =>
            e.slugName !== duplicate.slugName ||
            e.selectedColor !== duplicate.selectedColor ||
            e.selectedSize !== duplicate.selectedSize
        );
        state.products = [...newCart, duplicate];
      } else {
        state.products.push(newItem);
      }
      state.total = state.products.reduce((total, item) => {
        return total + parseInt(item.regularPrice) * item.productQuantity;
      }, 0);
    },

    removeProduct: (state, action) => {
      const removeItem = action.payload;

      state.quantity = state.quantity - removeItem.productQuantity;

      const nextCart = state.products.filter(
        (e) =>
          e.slugName !== removeItem.slugName ||
          e.selectedColor !== removeItem.selectedColor ||
          e.selectedSize !== removeItem.selectedSize
      );

      state.products = [...nextCart];
      state.total = state.products.reduce((total, item) => {
        return total + parseInt(item.regularPrice) * item.productQuantity;
      }, 0);
    },

    addQuantity: (state, action) => {
      const addProduct = action.payload;

      const filterProduct = state.products.find(
        (e) =>
          e.slugName === addProduct.slugName &&
          e.selectedColor === addProduct.selectedColor &&
          e.selectedSize === addProduct.selectedSize
      );

      const newCart = state.products.filter(
        (e) =>
          e.slugName !== filterProduct.slugName ||
          e.selectedColor !== filterProduct.selectedColor ||
          e.selectedSize !== filterProduct.selectedSize
      );
      if (addProduct.variable) {
        filterProduct.productQuantity += 1;
        state.quantity += 1;
      } else {
        filterProduct.productQuantity += -1;
        state.quantity += -1;
      }

      state.products = [...newCart, filterProduct];

      state.total = state.products.reduce((total, item) => {
        return total + parseInt(item.regularPrice) * item.productQuantity;
      }, 0);
    },

    logoutCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, removeProduct, addQuantity, logoutCart } =
  CartSlice.actions;
export default CartSlice.reducer;
