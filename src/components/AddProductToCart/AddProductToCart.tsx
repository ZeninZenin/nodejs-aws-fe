import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import {Product} from "models/Product";
import CartIcon from "@material-ui/icons/ShoppingCart";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, selectCartItems, removeFromCart} from "store/cartSlice";
import { axios } from 'api';
import API_PATHS from 'constants/apiPaths';

type AddProductToCartProps = {
  product: Product
};

export default function AddProductToCart({product}: AddProductToCartProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [shouldUpdateCart, setCartUpdateNeedState] = useState(false);
  const cartItem = cartItems.find(i => i.product.id === product.id);

  const addProduct = () => {
    dispatch(addToCart(product));
    setCartUpdateNeedState(true);
  };

  const removeProduct = () => {
    dispatch(removeFromCart(product));
    setCartUpdateNeedState(true);
  };

  useEffect(() => {
    if (shouldUpdateCart) {
      axios.put(`${API_PATHS.cart}/profile/cart`, { items: cartItems });
      setCartUpdateNeedState(false);
    }
  }, [shouldUpdateCart]);

  return (
    <>
    {
      cartItem ?
        (
          <>
            <IconButton onClick={removeProduct}>
              <Remove color={"secondary"}/>
            </IconButton>
            <Typography align="center">
              {cartItem.count}
            </Typography>
            <IconButton onClick={addProduct}>
              <Add color={"secondary"}/>
            </IconButton>
            </>
        )
        :
        (
          <IconButton onClick={addProduct}>
            <CartIcon color={"secondary"}/>
          </IconButton>
        )
    }
    </>
  );
}