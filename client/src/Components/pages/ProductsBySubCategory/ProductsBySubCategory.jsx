import { Link, useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "../../../ApiServices/ApiService";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux/reduxSlice";
import { Icon } from "@iconify/react";
// import { getProductsByMainCategory } from "../../../ApiServices/ApiService";
const ProductsBySubCategory = () => {
  const [products, setProducts] = useState([]);
  const { subcategory } = useParams();
  const dipatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

  // useEffect(() => {
  //   getProductsByCategory(setProducts, subcategory, category);
  // }, [subcategory, category]);
  useEffect(() => {
    getProductsByCategory(setProducts, category);
  }, [category]);

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
    <div>
      <div className="max-w-screen-xl mx-auto py-10 mt-[73px]">
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
        <div className="grid grid-cols-1 gap-4 lg:gap-4 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            return (
              <div key="">
                {product.newArrival ? (
                  <div className="overflow-hidden bg-white rounded shadow group">
                    <div className="relative block h-80 overflow-hidden">
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
      </div>
    </div>
  );
};

export default ProductsBySubCategory;
