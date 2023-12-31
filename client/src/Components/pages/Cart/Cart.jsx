import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import TextField from "@mui/material/TextField";
import {
  decrementCart,
  deleteCart,
  incrementProduct,
  resetCart,
} from "../../../../redux/reduxSlice";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "../../Modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import { Checkbox } from "antd";

const Cart = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.reduxSlice.product);
  const [totalAmt, setTotalAmt] = useState();
  const [sizeTags, setSizeTags] = useState([]);

  useEffect(() => {
    let price = 0;
    product.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [product]);
  const [formData, setFormData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  console.log(product);
  const openModal = () => {
    // console.log("open");
    setModalOpen(true);
  };
  const handleSizeTagsChange = (newSizeTags) => {
    setSizeTags(newSizeTags);
  };
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    contactNumber: "",
    address: "",
    area: "",
    city: "",
    note: "",
  });

  const [isOutsideDhakaSelected, setIsOutsideDhakaSelected] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate each form field
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        errors[key] = "This field is required";
        isValid = false;
      } else {
        errors[key] = "";
      }
    });

    setFormErrors(errors);
    return isValid;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear the error message when the user starts typing
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.length === 0) {
      console.error("Cart is empty");
      return;
    }

    // Validate the form
    if (!validateForm()) {
      console.error("Form validation failed");
      return;
    }

    // Calculate delivery fee
    const deliveryFee = selectedOption === "in" ? 60 : 120;

    // Prepare product details for the order
    const products = product.map((item) => ({
      id: item._id,
      name: item.product,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      sizes: item.sizes,
    }));

    const orderData = {
      products,
      price: totalAmt, // Assuming totalAmt is the total price of the products in the cart
      quantity: product.reduce((acc, item) => acc + item.quantity, 0),
      deliveryFee,

      ...formData,
    };
    //server/api/v1/order
    try {
      const response = await fetch(`${apiUrl}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      // console.log("res", response);
      if (!response.ok) {
        throw new Error("Request failed");
      }

      // Reset the cart after a successful order
      dispatch(resetCart());

      const data = await response.json();
      // console.log(data);

      // Show a success message or redirect to a success page
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const [delivery, setDelivery] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // ... (existing code)

  const handleCheckboxChange = (event) => {
    const { id } = event.target;

    if (id === selectedOption) {
      setSelectedOption(null);
      setDelivery(0); // Reset the delivery fee when unselecting a checkbox
      setIsOutsideDhakaSelected(false);
    } else {
      setSelectedOption(id);
      setDelivery(id === "in" ? 60 : 120); // Set the delivery fee based on the selected checkbox
      setIsOutsideDhakaSelected(id === "out");
    }
  };

  return (
    <>
      <div className="max-w-screen-2xl mx-auto  mt-[100px] ">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {product.length > 0 ? (
          <div className="pb-20 max-w-screen-2xl mx-auto">
            <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
              <h2 className="col-span-2">Product</h2>
              <h2>Price</h2>
              <h2>Quantity</h2>
              <h2>Sub Total</h2>
            </div>
            <div className="mt-5">
              {product.map((item) => (
                <div key={item._id}>
                  <div className="w-full grid grid-cols-5 mb-4 border py-2">
                    <div className="flex col-span-5 md:col-span-2 items-center gap-4 ml-4">
                      <ImCross
                        onClick={() => dispatch(deleteCart(item._id))}
                        className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
                      />
                      <img
                        className="w-20 h-20 lg:w-32 lg:h-32"
                        src={item.image}
                        alt="productImage"
                      />
                      <h1 className="font-titleFont font-semibold capitalize text-base">
                        {item.product}
                      </h1>
                    </div>
                    <div className="col-span-5 md:col-span-3 flex items-center justify-between py-4 md:py-0 px-4 md:px-0 gap-6 md:gap-0">
                      <div className="flex w-1/3 items-center text-[12px] lg:text-lg font-semibold">
                        BDT {item.price}
                      </div>
                      <div className="flex w-1/3 items-center text-[12px] lg:text-lg font-semibold">
                        Size:{" "}
                        <span className="capitalize ml-2">{item.sizes}</span>
                      </div>
                      <div className="w-1/3 flex items-center gap-6 text-lg">
                        <span
                          onClick={() =>
                            dispatch(decrementCart({ _id: item._id }))
                          }
                          className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
                        >
                          -
                        </span>
                        <p>{item.quantity}</p>
                        <span
                          onClick={() =>
                            dispatch(incrementProduct({ _id: item._id }))
                          }
                          className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
                        >
                          +
                        </span>
                      </div>
                      <div className="w-1/3 flex items-center font-titleFont font-bold text-[12px] lg:text-lg">
                        <p>BDT {item.quantity * item.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => dispatch(resetCart())}
              className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300 mx-10 lg:mx-0"
            >
              Reset cart
            </button>

            <div className="gap-4 px-10 flex flex-col lg:flex-row justify-between text-black mt-10">
              <div className="w-full lg:w-[65%]">
                <h1 className="text-base lg:text-2xl font-semibold ">
                  Contact Info
                </h1>
                <div className="modal-box w-11/12 max-w-5xl ">
                  <form
                    className="mt-6"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    {Object.entries(formErrors).map(([key, error]) => (
                      <div key={key} className="text-red-500 my-2">
                        {error && <p>{error}</p>}
                      </div>
                    ))}
                    {/*//!Name field */}
                    <div className="relative pb-3">
                      <input
                        autoSave="off"
                        autoComplete="off"
                        onChange={handleInputChange}
                        className="appearance-none border pl-3 lg:pl-3 lg:pl-8 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                        type="text"
                        name="userName"
                        placeholder="Full Name"
                        required
                      />
                    </div>

                    <div className="lg:flex items-center gap-5">
                      {/*//!Email field */}
                      <div className="w-full pb-3 lg:pb-0">
                        <input
                          autoComplete="off"
                          // onChange={(e) => setEmail(e.target.value)}
                          className="appearance-none border pl-3 lg:pl-8 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                          type="email"
                          name="email"
                          placeholder="Email"
                          required
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-full">
                        {/* //! phone number */}
                        <input
                          autoComplete="off"
                          onChange={handleInputChange}
                          className="appearance-none border pl-3 lg:pl-8 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                          name="contactNumber"
                          type="tel"
                          pattern="[0-9]{3}[0-9]{3}[0-9]{5}"
                          placeholder="Phone Number"
                          // maxLength="11"
                          required
                        />
                      </div>
                    </div>

                    <h1 className="text-base lg:text-2xl font-semibold py-5">
                      Shipping Info
                    </h1>
                    <div className="relative mt-3">
                      {/*//!Password field */}
                      <input
                        autoComplete="off"
                        onChange={handleInputChange}
                        className="appearance-none border pl-3 lg:pl-8 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                        type="text"
                        name="address"
                        placeholder="Detailed Address"
                        required
                      />
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="relative mt-3 w-full">
                        {/*//!Password field */}
                        <input
                          autoComplete="off"
                          onChange={handleInputChange}
                          className="appearance-none border pl-3 lg:pl-8 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                          type="text"
                          name="area"
                          placeholder="Your Area"
                          required
                        />
                      </div>

                      <div className="relative pt-3 w-full">
                        {/* //! phone number */}
                        <input
                          autoComplete="off"
                          onChange={handleInputChange}
                          className="appearance-none border pl-3 lg:pl-8 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                          name="city"
                          type="text"
                          placeholder="City"
                          maxLength="11"
                          required
                        />
                      </div>
                    </div>

                    <input
                      autoComplete="off"
                      onChange={handleInputChange}
                      className="appearance-none border my-5 pl-3 lg:pl-8 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                      type="text"
                      name="note"
                      placeholder="Note for Your Dress (Optional)"
                    />

                    <div className="text-red-500 my-2">
                      {/* <p>{error}</p> */}
                    </div>

                    <button
                      type="submit"
                      className=" ml-auto text-white bg-[#F4A001] border-0 py-2 px-6 focus:outline-none rounded"
                    >
                      Order Now
                    </button>
                  </form>
                  <div className="modal-action">
                    <label
                      typeof="submit"
                      htmlFor="my-modal-5"
                      className="px-5 py-2 bg-red-500 text-white capitalize cursor-pointer "
                    >
                      close
                    </label>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[30%] flex flex-col gap-4">
                <h1 className="text-2xl font-semibold capitalize">
                  Cart totals
                </h1>
                <ul className="">
                  <li className="flex justify-between border p-1">
                    Total Cost: <p className="">{totalAmt}.</p>
                  </li>
                  <li className="flex justify-between border p-1">
                    Delivery fee: <p className="">{delivery} TK.</p>
                  </li>
                  <li className="flex justify-between border p-1 text-base font-bold bg-[#F4A001] text-white">
                    Grand Total: <p> BDT {totalAmt + delivery}</p>
                  </li>
                </ul>
                <div>
                  <h1>Cash One Delevery</h1>
                  <div className="flex justify-between">
                    <p className="flex gap-2 text-black items-center">
                      <input
                        type="checkbox"
                        id="in"
                        checked={selectedOption === "in"}
                        onChange={(e) => {
                          handleCheckboxChange(e);
                        }}
                      />
                      <p style={{ color: "black" }} htmlFor="in">
                        Dhaka City
                      </p>
                    </p>
                    <p className="flex gap-2 text-black items-center">
                      <input
                        type="checkbox"
                        id="out"
                        checked={selectedOption === "out"}
                        onChange={(e) => {
                          handleCheckboxChange(e);
                        }}
                      />
                      <p style={{ color: "black" }} htmlFor="out">
                        Outside Dhaka
                      </p>
                    </p>
                  </div>

                  {isOutsideDhakaSelected && (
                    <div
                      id="outsideDhaka"
                      className="pt-2 pb-4 text-right text-red-600 text-sm"
                    >
                      Delivery charge <span className="font-bold">120 Tk</span>{" "}
                      to be advanced to confirm your order. <br /> Bikash
                      number:
                      <span className="font-semibold">
                        {" "}
                        01580799986 (Merchent) &#x2192; Payment <br />
                        01851112374 (Personal) &#x2192; Send Money
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
          >
            <div>
              <img
                className="w-80 rounded-lg p-4 mx-auto"
                src={"./public/empty-cart.svg"}
                alt="emptyCart"
              />
            </div>
            <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
              <h1 className="font-titleFont text-xl font-bold uppercase">
                Your Cart feels lonely.
              </h1>
              <p className="text-sm text-center px-10 -mt-2">
                Your Shopping cart lives to serve. Give it purpose - fill it
                with books, electronics, videos, etc. and make it happy.
              </p>
              <Link to="/">
                <button className="bg-black rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
