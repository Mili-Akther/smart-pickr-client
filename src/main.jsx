import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import routes from './routes/Routes.jsx'
import AuthProvider from '../provider/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer position="top-center" />
      <RouterProvider router={routes}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
