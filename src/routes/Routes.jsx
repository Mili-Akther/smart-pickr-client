import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register";
import LogIn from "../pages/LogIn";
import ProductDetails from "../pages/productDetails/ProductDetails";
import PrivateRoute from "./PrivateRoute";
import AddFeedback from "../pages/addFeedback/AddFeedback";
import MyFeedbacks from "../pages/myFeedbacks/MyFeedbacks";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h2>Route not Found</h2>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/${params.id}`),
      },
      {
        path: "/productFeedback/:id",
        element: (
          <PrivateRoute>
            <AddFeedback></AddFeedback>
          </PrivateRoute>
        ),
      },
      {
        path: "/myFeedbacks",
        element: (
          <PrivateRoute>
            <MyFeedbacks></MyFeedbacks>
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
    ],
  },
]);

export default routes;
