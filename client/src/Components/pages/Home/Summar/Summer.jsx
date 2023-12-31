import { useEffect, useState } from "react";

import {
  getProductsByCategory,
  getProductsByCategorys,
} from "../../../../ApiServices/ApiService";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../../redux/reduxSlice";

const Summer = () => {
  const dipatch = useDispatch();
  const [products, setProducts] = useState([]);
  // console.log(products);
  const [randomIndex, setRandomIndex] = useState();
  const [kidsCategory, setkidsCategory] = useState(["t-shirt", "shirt"]);

  useEffect(() => {
    getProductsByCategorys(setProducts, kidsCategory[randomIndex], "summer");
  }, [randomIndex]);

  useEffect(() => {
    // Generate random index only once when the component mounts
    setRandomIndex(Math.floor(Math.random() * kidsCategory?.length));
  }, []);
  // console.log({ products });

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
  return (
    <div className="bg-slate-100">
      <div className="max-w-screen-xl mx-auto py-20 px-2 md:px-0">
        <div>
          <h3 className="tracking-[0.42em] text-center text-[#3d3d3d]">
            Summer COLLECTION
          </h3>
          {/* <h1 className="tracking- text-center font-bold text-[38px] text-[#3d3d3d] py-5">
            Eid
          </h1> */}
        </div>
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
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-3 
        2xl:grid-cols-4 justify-items-center items-center gap-10 py-10 px-5"
        >
          {products?.map((product) => {
            return (
              <div key={product._id}>
                <Link
                  to={{
                    pathname: `/${product.subcategory}`,
                    search: `?category=${product.category}`,
                  }}
                >
                  <div className=" h-fit group cursor-pointer">
                    <div className="relative overflow-hidden">
                      <img
                        className="h-96 w-full object-cover group-hover:scale-125 transition-all duration-300"
                        src={product.image}
                        alt=""
                      />
                      <div
                        className="absolute h-full w-full bg-primary/20 flex
                     items-center justify-center -bottom-10 group-hover:bottom-0
                      opacity-0 group-hover:opacity-100 transition-all duration-400"
                      >
                        <button className="bg-primary text-white py-2 px-5">
                          Book Now
                        </button>
                        <div
                          onClick={() => {
                            handelAdd(product);
                          }}
                        >
                          <button className="bg-primary_hov text-white py-2 px-6">
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-start ">
                      <div>
                        <h2 className="mt-2 text-[16px] capitalize font-bold">
                          {product.name}
                        </h2>

                        <p className="text-[10px] mt-2 tracking-widest font-normal inline-block">
                          {product.category}
                        </p>
                      </div>
                      <div>
                        <h1 className="mt-2 text-sm ml-1 inline-block">
                          $ {product.price}
                        </h1>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Summer;
