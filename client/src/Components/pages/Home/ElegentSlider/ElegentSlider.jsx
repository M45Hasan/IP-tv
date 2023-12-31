// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation, Autoplay } from "swiper/modules";
// import { useEffect, useRef, useState } from "react";

// import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import {
//   getCategories,
//   getProductsByCategory,
//   getProductsByCategorys,
// } from "../../../../ApiServices/ApiService";
// import { Icon } from "@iconify/react";
// const ElegentSlider = () => {
//   const [isBeginning, setIsBeginning] = useState(true);
//   const [isEnd, setIsEnd] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [winterSubCategory, setwinterSubCategory] = useState([]);
//   const [currentProductIndex, setCurrentProductIndex] = useState(0);

//   const swiperrRef = useRef(null);

//   const goPrevButton = () => {
//     if (swiperrRef.current && swiperrRef.current.swiper) {
//       swiperrRef.current.swiper.slidePrev();
//     }
//   };

//   const goNextButton = () => {
//     if (swiperrRef.current && swiperrRef.current.swiper) {
//       swiperrRef.current.swiper.slideNext();
//     }
//   };

//   const onSwiperSlideChange = (swiper) => {
//     setIsBeginning(swiper.isBeginning);
//     setIsEnd(swiper.isEnd);
//     setCurrentProductIndex(swiper.realIndex);
//   };

//   const handleMouseEnter = () => {
//     if (swiperrRef.current) {
//       swiperrRef.current.swiper.autoplay.stop();
//     }
//   };

//   const handleMouseLeave = () => {
//     if (swiperrRef.current) {
//       swiperrRef.current.swiper.autoplay.start();
//     }
//   };

//   useEffect(() => {
//     getCategories(setwinterSubCategory, "winter");
//   }, []);

//   useEffect(() => {
//     getProductsByCategory(setProducts, "winter");
//   }, [winterSubCategory]);

//   return (
//     <div className="max-w-screen-xl mx-auto md:pt-24 pt-10 relative">
//       <div className="flex flex-col md:flex-row md:gap-20 px-5">
//         <div className="flex flex-col md:flex-row  md:justify-start md:items-center justify-center items-center ">
//           <div className="flex flex-col md:justify-start justify-center items-center pb-5 md:items-start relative pr-5">
//             <div>
//               <h1 className="font-bold text-[25px] leading-tight py-5 ">
//                 Elegant and <br /> Stylish Look
//               </h1>
//               <Link className="font-bold text-sm link link-underline link-underline-black">
//                 See Whole Collection
//               </Link>
//             </div>
//           </div>
//           <div className="md:max-w-xl">
//             <div className="" id="team">
//               <div className=" justify-center items-center">
//                 <div
//                   className=" justify-end lg:order-1 order-2 relative"
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <Swiper
//                     ref={swiperrRef}
//                     slidesPerView={1}
//                     spaceBetween={20}
//                     autoplay={{
//                       delay: 2000,
//                       disableOnInteraction: false,
//                     }}
//                     onSwiper={(swiper) => {
//                       onSwiperSlideChange(swiper);
//                       swiper.on("slideChange", () =>
//                         onSwiperSlideChange(swiper)
//                       );
//                     }}
//                     breakpoints={{
//                       "@0.00": {
//                         slidesPerView: 1,
//                         spaceBetween: 10,
//                       },
//                       "@0.75": {
//                         slidesPerView: 1,
//                         spaceBetween: 20,
//                       },
//                       "@1.00": {
//                         slidesPerView: 1,
//                         spaceBetween: 40,
//                       },
//                     }}
//                     navigation={{
//                       prevEl: ".prev-button",
//                       nextEl: ".next-button",
//                     }}
//                     modules={[Autoplay, Navigation]}
//                     className="mySwiper overflow-hidden md:w-[400px] w-[330px] relative"
//                   >
//                     {products && products.length > 0 ? (
//                       products.map((product) =>
//                         product.imageUrls.map((item, idx) => (
//                           <SwiperSlide key={idx}>
//                             <div className="shadow border text-center relative">
//                               <div className="">
//                                 <Link
//                                   to={{
//                                     pathname: `/${product.subcategory}`,
//                                     search: `?category=${product.category}`,
//                                   }}
//                                 >
//                                   <img src={item} alt="" className="" />
//                                 </Link>
//                                 <div className="flex absolute gap-10 text-black left-8 top-5 ">
//                                   <h1>BDT  100.00</h1>
//                                 </div>
//                               </div>
//                             </div>
//                           </SwiperSlide>
//                         ))
//                       )
//                     ) : (
//                       <p>No products available</p>
//                     )}
//                   </Swiper>

//                   <div className="flex justify-center items-center gap-3  text-center bg-primary p-3 w-20 h-10 absolute right-0 bottom-3 z-[999] shadow-lg">
//                     <button
//                       className={`prev-button duration-500 text-secondary ${
//                         isBeginning ? "opacity-50" : ""
//                       }`}
//                       onClick={goPrevButton}
//                       disabled={isBeginning}
//                     >
//                       <Icon icon="ep:arrow-left-bold" width={25} />
//                     </button>
//                     <button
//                       className={`next-button duration-500 text-secondary ${
//                         isEnd ? "opacity-50" : ""
//                       }`}
//                       onClick={goNextButton}
//                       disabled={isEnd}
//                     >
//                       <Icon icon="ep:arrow-right-bold" width={25} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-center items-center mx-auto pb-10 md:pb-0">
//           <img
//             src={products[currentProductIndex]?.imageUrls[0]}
//             alt=""
//             className="max-w-96 object-contain h-[314px]"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ElegentSlider;
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import {
  getCategories,
  getProductsByCategory,
  getProductsByCategorys,
} from "../../../../ApiServices/ApiService";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const ElegentSlider = () => {
  const swiperRefs = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [products, setProducts] = useState([]);
  const [mensSubCategory, setMensSubCategory] = useState([]);
  const [randomIndex, setRandomIndex] = useState();

  const product = products[0];

  const goPrevButton = (swiperIndex) => {
    if (swiperRefs[swiperIndex] && swiperRefs[swiperIndex].swiper) {
      swiperRefs[swiperIndex].swiper.slidePrev();
    }
  };

  const goNextButton = (swiperIndex) => {
    if (swiperRefs[swiperIndex] && swiperRefs[swiperIndex].swiper) {
      swiperRefs[swiperIndex].swiper.slideNext();
    }
  };

  useEffect(() => {
    if (swiperRefs.length > 0 && swiperRefs[0].swiper) {
      swiperRefs[0].swiper.autoplay.start();
    }

    return () => {
      if (swiperRefs.length > 0 && swiperRefs[0].swiper) {
        swiperRefs[0].swiper.autoplay.stop();
      }
    };
  }, []);

  const onSwiperSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleMouseEnter = () => {
    if (swiperRefs.current) {
      swiperRefs.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRefs.current) {
      swiperRefs.current.swiper.autoplay.start();
    }
  };

  useEffect(() => {
    getCategories(setMensSubCategory, "winter");
  }, []);

  useEffect(() => {
    // Generate random index only once when the component mounts
    setRandomIndex(Math.floor(Math.random() * mensSubCategory?.length));
  }, [mensSubCategory]);
  // Use mensSubCategory as a dependenc

  useEffect(() => {
    getProductsByCategorys(setProducts, mensSubCategory[randomIndex], "winter");
  }, [mensSubCategory[randomIndex]]);

  return (
    <div className="max-w-screen-xl mx-auto md:pt-24 pt-10 relative">
      <div className="flex flex-col md:flex-row gap-20 px-5">
        <div className="flex flex-col md:flex-row  md:justify-start md:items-center w-[100%] justify-center items-center  ">
          <div className="flex flex-col justify-start items-start relative  md:w-[23%] py-5 md:py-0">
            <div>
              <h1 className="font-bold text-[25px] leading-tight py-5 ">
                Inspired by <br />
                Fresh Colors
              </h1>
              <Link
                to={{
                  pathname: `/${"winter"}`,
                  search: "?category=winter",
                }}
                className="font-bold text-sm link link-underline link-underline-black"
              >
                See Whole Collection
              </Link>
            </div>
          </div>
          <div className="max-w-xl  relative">
            <div className=" relative " id="team">
              <div className=" justify-center items-center relative">
                <div
                  className=" justify-end lg:order-1 order-2 border"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* team swiper slider */}
                  <Swiper
                    // navigation={true}
                    ref={swiperRefs}
                    slidesPerView={1} // Set to 1 to show one slide at a time
                    spaceBetween={20}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    onSwiper={(swiper) => {
                      onSwiperSlideChange(swiper);

                      swiper.on("slideChange", () =>
                        onSwiperSlideChange(swiper)
                      );
                    }}
                    breakpoints={{
                      "@0.00": {
                        slidesPerView: 1,
                        spaceBetween: 10,
                      },
                      "@0.75": {
                        slidesPerView: 1,
                        spaceBetween: 20,
                      },
                      "@1.00": {
                        slidesPerView: 1,
                        spaceBetween: 40,
                      },
                    }}
                    navigation={{
                      prevEl: ".prev-button",
                      nextEl: ".next-button",
                    }}
                    // loop={true}
                    modules={[Autoplay, Navigation]}
                    className="mySwiper  overflow-hidden md:w-[400px] w-[330px] relative"
                  >
                    {product &&
                      product?.imageUrls.map((item, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="drop-shadow-2xl text-center relative">
                            <div className="">
                              <Link
                                to={{
                                  pathname: `/${product.subcategory}`,
                                  search: `?category=${product.category}`,
                                }}
                              >
                                <img src={item} alt="" className="w-full" />
                              </Link>
                              <div className="flex absolute gap-10 left-5 top-5 px-4 py-1 text-xs text-white rounded  sale bg-rose-500">
                                <h1>BDT {product.price}</h1>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                  {/* <div className="flex justify-center items-center gap-3  text-center bg-white p-3 w-20 h-10 absolute right-0 bottom-3 z-[999] shadow-lg">
                    <div className="flex justify-center items-center gap-3  text-center bg-secondary p-3">
                      <button
                        className={`prev-button duration-500 text-primary ${
                          isBeginning ? "opacity-50" : ""
                        }`}
                        onClick={goPrevButton}
                        disabled={isBeginning}
                      >
                        <Icon icon="ep:arrow-left-bold" width={25} />
                      </button>
                      <button
                        className={`next-button duration-500 text-primary ${
                          isEnd ? "opacity-50" : ""
                        }`}
                        onClick={goNextButton}
                        disabled={isEnd}
                      >
                        <Icon icon="ep:arrow-right-bold" width={25} />
                      </button>
                    </div>
                  </div> */}
                  {/* <h1
                    className="rotate-90 absolute  md:-right-[180%]  md:top-[130%] top-[25%] 
                    -left-[74%] 
                   z-[999] text-black tracking-[0.42em] font-thin"
                  >
                    SALE UP TO 30% OFF
                  </h1> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mx-auto">
          <img
            src={product?.image}
            alt=""
            className=" max-h[314px] w-96 object-contain "
          />
        </div>
      </div>
    </div>
  );
};

export default ElegentSlider;
