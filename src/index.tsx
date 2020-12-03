import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import * as toastr from 'toastr';
import CssBaseline from "@material-ui/core/CssBaseline";
import {Provider} from 'react-redux';
import App from 'components/App/App';
import {store} from 'store/store';
import * as serviceWorker from './serviceWorker';

toastr.options.timeOut = 5000;
toastr.options.extendedTimeOut = 1000;
toastr.options.closeButton = true;
toastr.options.progressBar = true;
toastr.options.preventDuplicates = true;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline/>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
