import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AllRoutes from './routes/routes'
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AllRoutes />
    <ToastContainer />
  </StrictMode>
);
