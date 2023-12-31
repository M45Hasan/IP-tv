import React, { useEffect, useState } from "react";
// import products from '../../../Api/Product/Product';
import { Link, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./singleProduct.css";

import {
  getProductsByCategory,
  getProductsByCategorys,
} from "../../../../ApiServices/ApiService";
import CustomModal from "../../../Modal/Modal";
import plusIcon from "../../../../assets/increAndDecre/plus.png";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../../redux/reduxSlice";
import { Icon } from "@iconify/react";
const SingleProduct = () => {
  let { ProductId } = useParams();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [sizes, setSizes] = useState("");
  const [formData, setFormData] = useState({});
  const dipatch = useDispatch();

  const getSingleProduct = async () => {
    let result = await fetch(`${apiUrl}/products/${ProductId}`);
    result = await result.json();

    setProduct(result);
  };

  const openModal = () => {
    // console.log("open");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const app = product.map((item) => console.log(item));
    const productDetails = {
      products: [
        {
          id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
          sizes: sizes,
        },
      ],
      price: Number(product.price) * Number(quantity),
      quantity: quantity,
      sizes: sizes,
    };

    const orderData = { ...formData, ...productDetails };

    try {
      const response = await fetch(`${apiUrl}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }
      if (response.ok) {
        toast.success("successfully order placed");
        closeModal();
      }

      const data = await response.json();
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(sizes);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // console.log(formData);

  useEffect(() => {
    getSingleProduct();
  }, [ProductId]);

  useEffect(() => {
    getProductsByCategory(setProducts, product?.category);
  }, [product?._id]);

  let handelAdd = (item) => {
    const sizeMessageElement = document.getElementById("sizeMessage");
    if (!sizes) {
      sizeMessageElement.innerText = "Please select a size  \u2191";
      // alert("Please Select your dress size");
      return;
    }
    dipatch(
      addToCart({
        _id: item._id,
        product: item.name,
        price: item.price,
        quantity: quantity,
        image: item.image,
        sizes: sizes,
      })
    );
    toast.success("Successfully Add", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const featuresList = product?.description?.split("/");

  return (
    <div>
      <div className="bg-[#] mt-[78px]">
        <div className="container px-5 pt-10 mx-auto">
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
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <Carousel
                autoPlay={false}
                width="60%"
                className="flex flex-col justify-center items-center"
              >
                {product?.imageUrls?.map((item, idx) => (
                  <div key={idx}>
                    <img src={product.imageUrls && item} className="" />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="lg:w-[70%] w-full  ">
              <h1 className="text-gray-900 md:text-[35px] leading-10 text-xl title-font font-medium mb-1 capitalize">
                {product?.name}
              </h1>
              <h3 className="title-font font-medium text-2xl py-3 text-gray-900">
                BDT {product?.price}
              </h3>
              <p className="leading-relaxed text-[16px] text-[#2d2d2d] pt-10">
                <ul className="list-none">
                  {featuresList?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </p>
              <div
                className="w-full capitalize"
                dangerouslySetInnerHTML={{ __html: product.video }}
              ></div>

              <div className="mt-10">
                <div className="flex items-center justify-between px-10">
                  <div className="relative flex items-center justify-center gap-3">
                    <span
                      onClick={() => {
                        if (quantity > 0) {
                          setQuantity((prev) => prev - 1);
                        }
                      }}
                      className="text-3xl font-extrabold  cursor-pointer"
                    >
                      -
                    </span>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        if (e.target.value == 0) {
                          return;
                        }
                        setQuantity(Number(e.target.value));
                      }}
                      className=" border w-20 rounded-sm p-2  text-xl text-center"
                    />

                    <img
                      onClick={() => {
                        setQuantity((prev) => prev + 1);
                      }}
                      src={plusIcon}
                      alt=""
                      className=" w-6 cursor-pointer"
                    />
                  </div>

                  <button
                    onClick={() => handelAdd(product)}
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 text-sm px-2 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between ">
                <div>Sizes:</div>
                <div className="flex items-center gap-2 ">
                  {product?.sizes ? (
                    JSON.parse(product.sizes)?.map((size, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSizes(size);
                        }}
                        className={`border cursor-pointer border-gray-300 px-3 py-1 rounded-lg uppercase ${
                          sizes == size ? "bg-[#f5a101] " : "bg-white"
                        }`}
                      >
                        {size}
                      </div>
                    ))
                  ) : (
                    <div>No sizes available</div>
                  )}
                </div>
              </div>

              <div
                id="sizeMessage"
                className="pt-2 pb-4 text-right text-red-600 text-sm"
              ></div>

              <div className="uppercase font-['Montserrat'] border-t-2 py-5 border-gray-100">
                <p className="text-[13px] text-[#3d3d3d]">
                  SKU: {product?.sku}
                </p>
                <p className="text-[13px] text-[#3d3d3d] py-2">
                  category: {product?.category}
                </p>
                <p className="text-[13px] text-[#3d3d3d]">
                  sub category: {product?.subcategory}
                </p>
              </div>

              <div className="">
                <div className="grid grid-cols-6 bg-slate-200 py-6 px-3 rounded-md border-b border-white">
                  <h2 className="font-bold border-r border-white">SIZE</h2>
                  <h2 className="font-bold border-r border-white text-center">
                    M
                  </h2>
                  <h2 className="font-bold border-r border-white text-center">
                    L
                  </h2>
                  <h2 className="font-bold border-r border-white text-center">
                    XL
                  </h2>
                  <h2 className="font-bold border-r border-white text-center">
                    XXL
                  </h2>
                  <h2 className="font-bold text-center">3XL</h2>
                </div>
                <div className="grid grid-cols-6 bg-slate-200 py-3 px-3">
                  <h2 className="border-r border-white">CHEST</h2>
                  <h2 className="text-center border-r border-white">38"</h2>
                  <h2 className="text-center border-r border-white">40"</h2>
                  <h2 className="text-center border-r border-white">42"</h2>
                  <h2 className="text-center border-r border-white">44"</h2>
                  <h2 className="text-center ">46"</h2>
                </div>

                <div className="grid grid-cols-6 bg-slate-200 py-3 px-3">
                  <h2 className="border-r border-white">LENGTH</h2>
                  <h2 className="text-center border-r border-white">27"</h2>
                  <h2 className="text-center border-r border-white">28"</h2>
                  <h2 className="text-center border-r border-white">29"</h2>
                  <h2 className="text-center border-r border-white">30"</h2>
                  <h2 className="text-center ">31"</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Relatred Products */}
      <section className="p-10">
        <h1 className="text-[26px] text-center py-14 font-bold">
          Related Products
        </h1>

        <div className="grid gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-xl">
          {products.slice(0, 4).map((prod) => {
            return (
              <div key="">
                {prod.newArrival ? (
                  <div className="overflow-hidden bg-white rounded shadow group">
                    <div className="relative block h-64 overflow-hidden">
                      <img
                        className="object-fill w-full h-full transition-all group-hover:scale-110"
                        src={product.image}
                        alt=""
                      />
                    </div>
                    <div className="relative z-20 p-8 -mt-14 ">
                      <span className="inline-block px-4 py-2 mb-3 text-base font-bold text-white bg-blue-400 rounded">
                        BDT {product.price}
                      </span>

                      <h2 className="mb-2 text-base font-bold text-black h-16">
                        {product.name}
                      </h2>

                      <div className="flex justify-between items-center pb-1">
                        <p className="text-[10px] mt-2 font-normal inline-block uppercase tracking-widest">
                          {product.category}
                        </p>
                        <p className="text-[10px] mt-2 font-normal inline-block uppercase tracking-widest">
                          {product.subcategory}
                        </p>
                      </div>

                      <div className="flex text-base items-center justify-between border-t border-gray-300 py-1">
                        <Link
                          key={product._id}
                          to={`/products/singleProduct/${product._id}`}
                        >
                          <button className=" text-blue-400 dark:text-blue-400">
                            {/* View Details */}
                            <Icon
                              icon="carbon:view-filled"
                              width={23}
                              className="hover:text-[#E08C02]"
                            />
                          </button>
                        </Link>

                        <Link to={`/products/singleProduct/${product._id}`}>
                          <button className=" text-blue-400 group-hover:text-[#E08C02] duration-300 hover:translate-x-1">
                            Add To Cart
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-hidden bg-white rounded shadow group">
                    <div className="relative block h-80 overflow-hidden">
                      <img
                        className="object-cover lg:object-fill w-full h-full transition-all group-hover:scale-110"
                        src={product.image}
                        alt=""
                      />
                    </div>
                    <div className="relative z-20 py-8 px-5 -mt-14 ">
                      <span className="inline-block px-4 py-2 mb-3 text-base font-bold text-white bg-blue-400 rounded">
                        BDT {product.price}
                      </span>

                      <h2 className="mb-2 text-base font-semibold text-black h-16 capitalize">
                        {product.name}
                      </h2>

                      <div className="flex justify-between items-center pb-1">
                        <p className="text-[10px] mt-2 font-normal inline-block uppercase tracking-widest">
                          {product.category}
                        </p>
                        <p className="text-[10px] mt-2 font-normal inline-block uppercase tracking-widest">
                          {product.subcategory}
                        </p>
                      </div>

                      <div className="flex text-base items-center justify-between border-t border-gray-300 py-1">
                        <Link
                          key={product._id}
                          to={`/products/singleProduct/${product._id}`}
                        >
                          <button className=" text-blue-400 ">
                            {/* View Details */}
                            <Icon
                              icon="carbon:view-filled"
                              width={23}
                              className="hover:text-[#E08C02]"
                            />
                          </button>
                        </Link>

                        <Link to={`/products/singleProduct/${product._id}`}>
                          <button className=" text-blue-400 group-hover:text-[#E08C02] duration-300 hover:translate-x-1">
                            Add To Cart
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default SingleProduct;
