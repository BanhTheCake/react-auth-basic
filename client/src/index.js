import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './app/store';
import { Provider } from 'react-redux';
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0,
        },
    },
    logger: {
        log: () => {},
        warn: () => {},
        error: () => {},
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/*' element={<App />} />
                </Routes>
            </BrowserRouter>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
);
