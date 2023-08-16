import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import App from "./App";
import NotFoundPage from "./shared/NotFound";
import HomePage from './pages/Home/Home';
import ProductInfoPage from "./pages/ProductInfoPage/ProductInfoPage";
import LoginPage from './pages/login/login';
import AboutPage from './pages/about/about';
import SignUp from './pages/signup/signup';
import CartPage from './pages/cart/cart';


import DashboardPage from "./pagesBoard/dashboard/dashboard";
import ProductBoard from './pagesBoard/productboard/productboard';
import CategoryBoard from './pagesBoard/categoryboard/categoryboard';
import UserBoard from './pagesBoard/userboard/userboard';
import OrdersUsersBoard from './pagesBoard/orderboard/orderboard';

import CreateCategory from './pagesBoard/categoryboard/createCategory/createCategory';
import CreateProduct from "./pagesBoard/productboard/createProduct/createProduct";
import UpdateCategory from './pagesBoard/categoryboard/updateCategory/updateCategory';
import UpdateProduct from './pagesBoard/productboard/updateProduct/updateProduct';
import CreateUser from "./pagesBoard/userboard/createUser/createUser";
import UpdateUser from './pagesBoard/userboard/updateUser/updateUser';

export const router = createBrowserRouter([
  {
      path: "",
      element:<App />,
      children:[
        {
          path:"/",
          element:< HomePage/>,
        },
        {
          path:"/product-details/:id",
          element:<ProductInfoPage />
        },
        {
            path: "/about",
            element: <AboutPage />,
        },
        {
          path: "/login",
          element: <LoginPage />
        },
        {
          path:"/signup",
          element:<SignUp />
        },
        {
            path: "/cart",
            element: <CartPage />
        },
        
        
        {
          path:"/dashboard",
          element:<DashboardPage />
        },
        {
          path:"/productboard",
          element:<ProductBoard />
        },
        {
          path:"/categoryBoard",
          element:<CategoryBoard />
        },
        {
          path:"/userBoard",
          element:<UserBoard />
        },
        {
          path:"/userCreate",
          element:<CreateUser/>
        },
        {
          path:"/userUpdate",
          element:<UpdateUser/>
        },
        {
          path:"/ordersUsersBoard",
          element:<OrdersUsersBoard />
        },
        {
          path:"/createCategory",
          element:<CreateCategory />
        },
        {
          path:"/createProduct",
          element:<CreateProduct />
        },
        {
          path:"/updateCategory/:id",
          element:<UpdateCategory />
        },
        {
          path:"/updateProduct/:id",
          element:<UpdateProduct />
        },
        {
          path:"*",
          element:<NotFoundPage />
        }
      ]
  },
])