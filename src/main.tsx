import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/routes';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './app/store';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppRoutes />
      <ToastContainer position='bottom-right' />
    </Provider>
  </StrictMode>
);
