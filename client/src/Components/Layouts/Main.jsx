import { Outlet } from "react-router-dom";
import Header from "../pages/Shared/Header/Header";

import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const Main = () => {
  return (
    <div>
      <Header />
      {/* <Navbar /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
