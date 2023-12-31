import { useEffect, useState } from "react";

import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Components/Routes/Router";
import ScrollToTop from "react-scroll-to-top";
import { Toaster } from "react-hot-toast";
import MessengerCustomerChat from "react-messenger-customer-chat";

function App() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div>
        <ScrollToTop smooth color="#6f00ff" className="pl-1" />

        <RouterProvider router={router}></RouterProvider>
        <Toaster />
      </div>
      <MessengerCustomerChat pageId="106744398738922" appId="882284053208779" />
    </>
  );
}

export default App;
