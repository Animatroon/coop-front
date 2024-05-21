import React, {Suspense} from 'react';
import { createRoot } from "react-dom/client";

import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store/index';

import './18n.js';



createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
            <App />
        </Suspense>
        </Provider>
    </BrowserRouter>
    ); 