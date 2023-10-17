import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartState: false,
  productsList: localStorage?.getItem("productsList")
    ? JSON.parse(localStorage?.getItem("productsList"))
    : [],
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [], // Let Suppose Database
  cartTotalAmount: 0,
  cartTotalQantity: 0,
};

const ProductsSlice = createSlice({
  initialState,
  name: "products",
  reducers: {
    setOpenCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    setCloseCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    setAddProduct: (state, action) => {
      const temp = { ...action.payload, cartQuantity: 1 };
      state.productsList.push(temp);
      toast.success(`added to Cart`);
      localStorage.setItem("productsList", JSON.stringify(state.productsList));
    },
    setAddItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.uniqId === action.payload.uniqId
      );

      if (itemIndex >= 0) {
        // If the item already exists in the cart, increase its cartQuantity.
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(`Item QTY Increased`);
      } else {
        // If the item is not in the cart, add it with cartQuantity set to 1.
        const temp = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temp);
        toast.success(`${action.payload.name} added to Cart`);
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setIncreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.uniqId === action.payload.uniqId
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;

        toast.success(`Item QTY Increased`, { autoClose: 1000 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setDecreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.uniqId === action.payload.uniqId
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.success(`Item QTY Decreased`, { autoClose: 1000 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setRemoveItemFromCart: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item.uniqId !== action.payload.uniqId
      );

      state.cartItems = removeItem;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));

      toast.success(`${action.payload.name} Removed From Cart`);
    },

    setClearCartItems: (state, action) => {
      state.cartItems = [];
      toast.success(`Cart Cleared`);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  setOpenCart,
  setCloseCart,
  setAddProduct,
  setAddItemToCart,
  setIncreaseItemQTY,
  setDecreaseItemQTY,
  setRemoveItemFromCart,
  setClearCartItems
} = ProductsSlice.actions;

export const selectProductState = (state) => state?.product?.productsList;
export const selectCartItems = (state) => state?.product?.cartItems;

export default ProductsSlice.reducer;
