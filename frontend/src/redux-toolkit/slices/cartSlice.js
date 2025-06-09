import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (e) {
    console.error("Could not load cart from localStorage", e);
    return [];
  }
};

// Save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("cart", serializedCart);
  } catch (e) {
    console.error("Could not save cart to localStorage", e);
  }
};

const cartSlice = createSlice({
  name: "Cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.find(
        (item) => item._id === action.payload._id
      );

      if (existingProduct) {
        existingProduct.value += action.payload.value || 1;
      } else {
        state.push({
          ...action.payload,
          value: action.payload.value || 1,
        });
      }

      saveCartToLocalStorage(state);
    },
    removeToCart: (state, action) => {
      const index = state.findIndex((item) => item._id === action.payload._id);

      if (index !== -1) {
        state.splice(index, 1);

        saveCartToLocalStorage(state);
      }
    },
    updateToCart: (state, action) => {
      const index = state.findIndex((item) => item._id === action.payload._id);

      if (index !== -1) {
        state[index].value = action.payload.value;
      }
      saveCartToLocalStorage(state);
    },
    clearCart: (state, action) => {
      state.splice(0, state.length);
    },
  },
});

export const { addToCart, removeToCart, updateToCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
