import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { getProductsByCategory } from "../../../../ApiServices/ApiService";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
export const SingleProduct = () => {
  const subCategory = "Bag";

  let { ProductId } = useParams();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);

  // const shuffleArray = (array) => {
  // 	const newArray = [...array];
  // 	for (let i = newArray.length - 1; i > 0; i--) {
  // 		const j = Math.floor(Math.random() * (i + 1));
  // 		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  // 	}
  // 	return newArray;
  // };
  // const filteredItems = products?.filter((items) => {
  // 	return (
  // 		//   String(items.id) === ProductId
  // 		items.category === subCategory
  // 		// items.tag === "PartyDresses"
  // 	);
  // });
  // const shuffledNames = shuffleArray(filteredItems);
  const getSingleProduct = async () => {
    let result = await fetch(`${apiUrl}/products/${ProductId}`);
    result = await result.json();
    console.log(result);
    setProduct(result);
    // console.log("SingleProduct info : ", result);
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  useEffect(() => {
    // getCategoryProducts();
    getProductsByCategory(setProducts, product?.subcategory, product?.category);
  }, [product?._id]);

  return (
    <div>
      <div className="bg-[#] mt-[78px]">
        <div className="container px-5 pt-10 mx-auto">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <Carousel
                autoPlay={false}
                width="60%"
                className="flex flex-col justify-center items-center"
              >
                {product?.imageUrls?.map((img) => {
                  <>
                    <div>
                      <img src={img} className="" />
                    </div>
                  </>;
                })}

                {/* <div>
									<img src={product?.image} className='' />
								</div> */}
              </Carousel>
            </div>

            <div className="lg:w-1/2 w-full  ">
              <h1 className="text-gray-900 md:text-[38px] text-xl title-font font-medium mb-1">
                {product?.name}
              </h1>
              <h3 className="title-font font-medium text-2xl py-3 text-gray-900">
                {product?.price}
              </h3>
              <p className="leading-relaxed text-[16px] text-[#2d2d2d] py-10">
                {product?.description}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex gap-5 items-center">
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                  <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Book Now
                  </button>
                </div>
              </div>
              <div className="uppercase font-['Montserrat']">
                <p className="text-[13px] text-[#3d3d3d]">SKU: 038</p>
                <p className="text-[13px] text-[#3d3d3d] py-2">
                  category: {product?.category}
                </p>
                <p className="text-[13px] text-[#3d3d3d]">TAGS: Bag</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="">
        <h1 className="text-[26px] text-center py-14 font-bold">
          Related Products
        </h1>

        <div className="grid gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-lg">
          {products.slice(0, 4).map((prod) => {
            return (
              <Link key={prod?._id} to={`/products/singleProduct/${prod?._id}`}>
                <div>
                  {prod.newArrival ? (
                    <div className=" h-fit group">
                      <div className="relative overflow-hidden">
                        <img
                          className="h-96 w-full object-cover group-hover:scale-125 duration-500"
                          src={prod.image}
                          alt=""
                        />
                        <div className="absolute h-full w-full bg-black/20 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button className="bg-black text-white py-2 px-5">
                            Book Now
                          </button>
                        </div>
                        <div className="absolute top-[15px] bg-white px-5 rotate-90 ">
                          <h1>New</h1>
                        </div>
                      </div>
                      <div className="flex justify-between items-start ">
                        <div>
                          <h2 className="mt-2 text-[15px] capitalize font-bold">
                            {prod?.name}
                          </h2>

                          <p className="text-[10px] mt-2 ml-1 inline-block">
                            {prod?.category}
                          </p>
                        </div>
                        <div>
                          <h1 className="mt-2 text-sm ml-1 inline-block">
                            <span>
                              {" "}
                              <del className="text-red-700 text-lg pr-2">
                                $49
                              </del>
                            </span>
                            <span className="group-hover:font-bold">
                              {" "}
                              {prod?.price}
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className=" h-fit group">
                      <div className="relative overflow-hidden">
                        <img
                          className="h-96 w-full object-cover group-hover:scale-125 duration-500"
                          src={prod?.image}
                          alt=""
                        />
                        <div className="absolute h-full w-full bg-black/20 flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button className="bg-black text-white py-2 px-5">
                            Book Now
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-start ">
                        <div>
                          <h2 className="mt-2 text-[15px] capitalize font-bold">
                            {prod?.name}
                          </h2>

                          <p className="text-[10px] mt-2 ml-1 inline-block">
                            {prod?.category}
                          </p>
                        </div>
                        <div>
                          <h1 className="mt-2 text-sm ml-1 inline-block">
                            <span>
                              {" "}
                              <del className="text-red-700 text-lg pr-2">
                                $49
                              </del>
                            </span>
                            <span className="group-hover:font-bold">
                              {" "}
                              {prod?.price}
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};
