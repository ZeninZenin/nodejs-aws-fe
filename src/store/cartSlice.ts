import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState, store} from 'store/store';
import {Product} from "models/Product";
import {CartItem} from "models/CartItem";
import { axios } from 'api';
import API_PATHS from 'constants/apiPaths';

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
};

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async (items: CartItem[]) => {
    await axios.put(`${API_PATHS.cart}/profile/cart`, { items });
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    addToCart: (state, action: PayloadAction<Product>) => {
      const {items} = state;
      const {payload: product} = action;
      const existingItem = items.find(i => i.product.id === product.id);
      if (existingItem) {
        existingItem.count++;
        return;
      }
      items.push({product, count: 1});
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    removeFromCart: (state, action: PayloadAction<Product>) => {
      let {items} = state;
      const {payload: product} = action;
      const existingItem = items.find(i => i.product.id === product.id);
      if (!existingItem) return;
      if (existingItem.count > 1) {
        existingItem.count--;
        return;
      }
      state.items = items.filter(i => i.product.id !== product.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    }
  },
});

export const {addToCart, removeFromCart, clearCart, setCart} = cartSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.cart.value)`
export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
