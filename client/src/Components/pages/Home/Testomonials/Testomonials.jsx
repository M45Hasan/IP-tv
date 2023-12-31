import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Testomonial.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Icon } from "@iconify/react";
const Testomonials = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const swiperRefs = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

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
  return (
    <div className="bg-primary">
      <div className="max-w-screen-2xl mx-auto py-32 px-2 md:px-0">
        <div className="max-w-screen-md mx-auto">
          <div>
            <h3 className="tracking-[0.42em] text-center text-[#3d3d3d]">
              SUMMER COLLECTION
            </h3>
            <h1 className="tracking- text-center font-bold text-[38px] text-[#3d3d3d] py-5">
              What they’re saying
            </h1>
          </div>
          <div>
            <div className="  relative">
              <div className=" relative " id="team">
                <div className=" justify-center items-center relative">
                  <div
                    className=" justify-end lg:order-1 order-2 "
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* team swiper slider */}
                    <Swiper
                      navigation={true}
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
                      className="mySwiper  overflow-hidden  relative"
                    >
                      <SwiperSlide>
                        <div className="drop-shadow-2xl text-center relative">
                          <div className="px-20 pt-10 text-center">
                            <p>
                              Ne sed vero libris, his vivendo referrentur an.
                              Torquatos voluptatum sit ad. Legendos dignissim eu
                              mea, sea ei doming inimicus adolescens. Stet iusto
                              deserunt sed in, ex quo quot invidunt.
                            </p>
                            <h1 className="text-xl font-bold py-3">
                              Joghn Hasa
                            </h1>
                            <p>Deesigner</p>
                          </div>
                        </div>
                      </SwiperSlide>

                      <SwiperSlide>
                        <div className="drop-shadow-2xl text-center relative">
                          <div className="px-20 pt-10  text-center">
                            <p>
                              Ne sed vero libris, his vivendo referrentur an.
                              Torquatos voluptatum sit ad. Legendos dignissim eu
                              mea, sea ei doming inimicus adolescens. Stet iusto
                              deserunt sed in, ex quo quot invidunt.
                            </p>
                            <h1 className="text-xl font-bold py-3">
                              Joghn Hasa
                            </h1>
                            <p>Deesigner</p>
                          </div>
                        </div>
                      </SwiperSlide>

                      <SwiperSlide>
                        <div className="drop-shadow-2xl text-center relative">
                          <div className="px-20 pt-10  text-center">
                            <p>
                              Ne sed vero libris, his vivendo referrentur an.
                              Torquatos voluptatum sit ad. Legendos dignissim eu
                              mea, sea ei doming inimicus adolescens. Stet iusto
                              deserunt sed in, ex quo quot invidunt.
                            </p>
                            <h1 className="text-xl font-bold py-3">
                              Joghn Hasa
                            </h1>
                            <p>Deesigner</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>

                    <div
                      className="flex justify-center items-center gap-3
                    z-[999] text-center"
                    >
                      {/* Swipper BUtton */}

                      <div className="absolute top-[20%] -left-0 text-[#000] z-[9999]">
                        <button
                          className={`prev-button duration-500 ${
                            isBeginning ? "opacity-50" : ""
                          }`}
                          onClick={goPrevButton}
                          disabled={isBeginning}
                        >
                          {/* <img src={leftArrow} alt="" /> */}
                          <Icon icon="ep:arrow-left-bold" width={30} />
                        </button>
                      </div>
                      <div className="absolute top-[20%] -right-0 text-[#000] z-[9999] ">
                        <button
                          className={`next-button duration-500 ${
                            isEnd ? "opacity-50" : ""
                          }`}
                          onClick={goNextButton}
                          disabled={isEnd}
                        >
                          <Icon icon="ep:arrow-right-bold" width={30} />
                          {/* <img src={rightArrow} alt="" /> */}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testomonials;
