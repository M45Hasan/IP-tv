import { Link } from "react-router-dom";
// import products from "../../../Api/Product/Product";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../../redux/reduxSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const Product = () => {
  const dipatch = useDispatch();
  const [products, setProducts] = useState([]);
  // console.log("products:", products);

  let handelAdd = (item) => {
    // console.log("kire", item);
    dipatch(
      addToCart({
        _id: item._id,
        product: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
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

  useEffect(() => {
    fetch(`${apiUrl}/products/displayProducts`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);
        setProducts(data.data);
      });
  }, []);
  return (
    <>
      <section className="bg-[#F1F5F9] pt-20 mt-20 pb-10">
        <div>
          <h3 className="tracking-[0.42em] text-center text-[#3d3d3d]">
            WINTER COLLECTION
          </h3>
          <h1 className="text-center font-bold text-3xl lg:text-[38px] text-[#3d3d3d] py-3 lg:py-5">
            Shopping Every Day
          </h1>
          <p className="text-center px-5">
            A fusion of fashion and comfort, designed to elevate your seasonal
            style effortlessly.
          </p>
        </div>
      </section>
      <section className="flex items-center bg-[#F1F5F9] pb-40">
        <div className="p-4 mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              return (
                <div key="">
                  {product.new ? (
                    <div className="overflow-hidden bg-white rounded shadow group">
                      <div className="relative block h-64 overflow-hidden">
                        <img
                          className="object-fill w-full h-full transition-all group-hover:scale-110"
                          src={product?.image}
                          alt=""
                        />
                      </div>
                      <div className="relative z-20 p-8 -mt-14 ">
                        <span className="inline-block px-4 py-2 mb-3 text-base font-bold text-white bg-blue-400 rounded">
                          BDT {product?.price}
                        </span>

                        <h2 className="mb-2 text-base font-bold text-black h-16">
                          {product.name}
                        </h2>

                        <div className="flex justify-between items-center pb-1">
                          <p className="text-[10px] mt-2 font-normal inline-block uppercase tracking-widest">
                            {product?.category}
                          </p>
                          <p className="text-[10px] mt-2 font-normal inline-block uppercase tracking-widest">
                            {product?.subcategory}
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
                          BDT {product?.price}
                        </span>

                        <h2 className="mb-2 text-base font-semibold text-black h-16 capitalize">
                          {product?.name}
                        </h2>

                        <div className="flex justify-between items-center pb-1">
                          <p className="text-[10px] mt-2 font-normal inline-block uppercase tracking-widest">
                            {product?.category}
                          </p>
                          <p className="text-[10px] mt-2 font-normal inline-block uppercase tracking-widest">
                            {product?.subcategory}
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
        </div>
      </section>

      {/* /old code */}
      {/* <div className="bg-slate-100 mt-20">
        <div className="max-w-screen-xl mx-auto py-32 px-2 md:px-0">
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
          <ToastContainer />
          <div>
            <h3 className="tracking-[0.42em] text-center text-[#3d3d3d]">
              WINTER COLLECTION
            </h3>
            <h1 className="tracking- text-center font-bold text-[38px] text-[#3d3d3d] py-5">
              Shopping Every Day
            </h1>
            <p className="text-center">
              Autem neglegentur in duo, ex aperiam fabulas mei, exerci menandri{" "}
              <br />
              explicari ut mei. Eam cibo et.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-3 2xl:grid-cols-4 justify-items-center items-center gap-10 py-10">
            {products.map((product) => {
              return (
                <div className="" key="">
                  {product.new ? (
                    <div className=" h-fit group">
                      <div className="relative overflow-hidden h-80">
                        <img
                          className=" group-hover:scale-125 transition-all duration-300"
                          src={product.image}
                          alt=""
                        />
                        <div
                          className="absolute h-full w-full flex
                     items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 
                     group-hover:opacity-100 transition-all duration-500"
                        >
                          <button className="bg-primary_hov text-white py-2 px-5">
                            Booking Now
                          </button>
                          <button className="bg-primary_hov text-white py-2 px-5">
                            Add to Card
                          </button>
                        </div>
                        <div className="absolute top-[15px] bg-white px-5 rotate-90 ">
                          <h1>New</h1>
                        </div>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="mt-2 text-[15px] capitalize font-bold">
                            {product.name}
                          </h2>

                          <p className="text-[10px] mt-2 ml-1 inline-block">
                            {product.category}
                          </p>
                        </div>
                        <div>
                          <h1 className="mt-2 text-sm ml-1 inline-block">
                            {product.price}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[45vh] group border">
                      <div className="relative w-full overflow-hidden h-80">
                        <img
                          className="w-full  group-hover:scale-125 transition-all duration-300"
                          src={product.image}
                          alt=""
                        />
                        <div
                          className="absolute h-full flex-col gap-4 w-full flex
                   items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 
                   group-hover:opacity-100 transition-all duration-500"
                        >
                          <Link
                            key={product._id}
                            to={`/products/singleProduct/${product._id}`}
                          >
                            <button className="bg-primary_hov text-white py-2 px-5">
                              View Details
                            </button>
                          </Link>
                          <Link to={`/products/singleProduct/${product._id}`}>
                            <button className="bg-primary_hov text-white py-2 px-6">
                              Add To Cart
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="px-2">
                        <div>
                          <h2 className="mt-2 text-[16px] capitalize font-bold">
                            {product.name}
                          </h2>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] mt-2 font-normal inline-block uppercase tracking-widest">
                            {product.category}
                          </p>
                          <h1 className="mt-2 text-sm ml-1 inline-block">
                            BDT {product.price}
                          </h1>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Product;
