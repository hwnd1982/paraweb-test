import React from 'react';
import 'normalize.css';
import ReactDOM from 'react-dom/client';
import {App} from './app';
import { Provider } from 'react-redux';
import { store } from './shared/store/store';

const container = document.getElementById("root")

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}

