import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register";
import LogIn from "../pages/LogIn";
import ProductDetails from "../pages/productDetails/ProductDetails";
import PrivateRoute from "./PrivateRoute";
import AddFeedback from "../pages/addFeedback/AddFeedback";
import MyFeedbacks from "../pages/myFeedbacks/MyFeedbacks";
import UpdateFeedback from "../pages/updateFeedback/UpdateFeedback";
import UserConcerns from "../pages/userConcerns/UserConcerns";
import QueryDetails from "../pages/queryDetails/QueryDetails";
import ShopAllProducts from "../pages/shopAllProducts/ShopAllProducts";
import Recommendations from "../pages/recommendations/Recommendations";


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
        path: "/shopAllProducts",
        element: <ShopAllProducts></ShopAllProducts>,
      },
      {
        path: "/products/:id",
        element: (
         
            <ProductDetails></ProductDetails>
     
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
        path: "/updateFeedback/:id",
        element: (
          <PrivateRoute>
            <UpdateFeedback></UpdateFeedback>
          </PrivateRoute>
        ),
      },
      {
        path: "/query-details",
        element: <UserConcerns></UserConcerns>,
      },
      {
        path: "/query-details/:id",
        element: <QueryDetails></QueryDetails>,
      },
      {
        path: "/product/:queryId",
        element: <Recommendations></Recommendations>,
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
