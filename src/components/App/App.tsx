import React, { useEffect } from 'react';
import * as toastr from 'toastr';
import 'components/App/App.css';
import PageProducts from "components/pages/PageProducts/PageProducts";
import MainLayout from "components/MainLayout/MainLayout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PageProductForm from "components/pages/PageProductForm/PageProductForm";
import PageCart from "components/pages/PageCart/PageCart";
import PageOrders from "components/pages/PageOrders/PageOrders";
import PageOrder from "components/pages/PageOrder/PageOrder";
import PageProductImport from "components/pages/admin/PageProductImport/PageProductImport";
import { axios } from 'api';
import API_PATHS from 'constants/apiPaths';
import { CartItem } from 'models/CartItem';
import { useDispatch } from 'react-redux';
import { setCart } from 'store/cartSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
    .get<{ data: { cart: { id: string, items: CartItem[] } } }>(`${API_PATHS.cart}/profile/cart`)
    .then(({ data }) => {
      console.log(data)
      dispatch(setCart(data?.data?.cart?.items || []));
    })
    .catch(() => toastr.error('Cart service is not available', 'Error'));
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <MainLayout>
            <Route exact path="/">
              <PageProducts/>
            </Route>
            <Route exact path={["/admin/product-form/:id", '/admin/product-form']}>
              <PageProductForm/>
            </Route>
            <Route exact path="/cart">
              <PageCart />
            </Route>
            <Route exact path="/admin/orders">
              <PageOrders />
            </Route>
            <Route exact path="/admin/order/:id">
              <PageOrder />
            </Route>
            <Route exact path="/admin/products">
              <PageProductImport />
            </Route>
          </MainLayout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
