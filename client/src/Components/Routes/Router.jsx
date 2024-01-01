import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home/Home/Home";
import About from "../pages/About/About";
import ContactUs from "../pages/ContactUs/ContactUs";

import SingleProduct from "../pages/Home/Product/SingleProduct";

// |  ADMIN HANDLER
import AdminLayout from "../Admin/Layout/AdminLayout";
import AdminSingleOrder from "../Admin/DashBoard/AdminOrders/AdminSingleOrder";
import AdminAddProducts from "../Admin/DashBoard/AdminAddProducts/AdminAddProducts";
import AdminUpdateProduct from "./../Admin/DashBoard/AdminUpdateProducts/AdminUpdateProduct";
import Dashboard from "./../Admin/DashBoard/Dashboard/Dashboard";
import AdminProducts from "./../Admin/DashBoard/AdminProducts/AdminProducts";
import AdminOrders from "../Admin/DashBoard/AdminOrders/AdminOrders";
import ProductsBySubCategory from "../pages/ProductsBySubCategory/ProductsBySubCategory";
import AddBanner from "../Admin/DashBoard/AdminBanner/AddBanner";
import AdminBanners from "../Admin/DashBoard/AdminBanner/AdminBanners";
import Login from "../Login/Login";
import AdminRoutes from "./AdminRoutes";
import AdminAddGallery from "../Admin/DashBoard/AdminAddGallery/AdminAddGallery";
import Cart from "../pages/Cart/Cart";

import Privacy from "../pages/Privacy/Privacy";
import DeliveryPolicy from "../pages/DeliveryPolicy/DeliveryPolicy";
import TermandCondition from "../pages/TermsandCondition/TermandCondition";
import ReturnsandExchanges from "../pages/ReturnsandExchanges/ReturnsandExchanges";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/Delivery_Privacy",
        element: <DeliveryPolicy />,
      },
      {
        path: "/Term_and_Condition",
        element: <TermandCondition />,
      },
      {
        path: "/Return_and_Exchanges",
        element: <ReturnsandExchanges />,
      },
      {
        path: "/contactUs",
        element: <ContactUs></ContactUs>,
      },
     

      {
        path: "/:subcategory",
        element: <ProductsBySubCategory />,
      },

    
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoutes>
        <AdminLayout></AdminLayout>
      </AdminRoutes>
    ),
    children: [
      {
        path: "/admin",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "adminAddBanner",
        element: <AddBanner />,
      },
      {
        path: "adminBanners",
        element: <AdminBanners />,
      },
      {
        path: "adminOrders",
        element: <AdminOrders></AdminOrders>,
      },
      {
        path: "adminOrders/:id",
        element: <AdminSingleOrder />,
      },
      {
        path: "adminProducts",
        element: <AdminProducts></AdminProducts>,
      },
      {
        path: "adminAddProducts",
        element: <AdminAddProducts></AdminAddProducts>,
      },
      {
        path: "adminAddGallery",
        element: <AdminAddGallery></AdminAddGallery>,
      },
    ],
  },
  
  {
    path: "adminUpdateProduct/:id",
    element: <AdminUpdateProduct></AdminUpdateProduct>,
  },
]);
export default router;
