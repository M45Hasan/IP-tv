import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { useEffect, useState } from "react";
import { NextArrow, PrevArrow } from "./SliderArrows";

import "../Banner/Banner.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const settingsBanner = {
  dots: false,
  infinite: true,
  fade: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const Banner1 = () => {
  const sliderRefs = [];

  const handleMouseEnter = () => {
    if (sliderRefs.current) {
      sliderRefs.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (sliderRefs.current) {
      sliderRefs.current.swiper.autoplay.start();
    }
  };

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = async () => {
    try {
      const res = await fetch(`${apiUrl}/banner`, {});
      const data = await res.json();

      if (res.ok) {
        setBanners(data);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx-auto" id="team">
      <div className=" justify-center items-center">
        <div
          className="col-span-4 justify-end lg:order-1 order-2 relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="md:block hidden ">
            <Slider {...settingsBanner}>
              {banners?.map((item) => (
                <div key={item._id}>
                  <div className="text-center relative">
                    <div className="">
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-[80vh]"
                      />
                      <div className="flex absolute gap-10 text-[#EC9902] left-8 bottom-5 ">
                        <a
                          href="https://www.facebook.com/muslin.com.bd"
                          className="relative text-sm"
                        >
                          <h1>Facebook</h1>
                          <span className="w-10 h-px inline-block absolute right-1 bg-[#EC9902]"></span>
                        </a>
                        <a
                          href="https://www.instagram.com/muslin.com.bd/"
                          className="relative text-sm"
                        >
                          <h1>Instagram</h1>
                          <span className="w-10 h-px inline-block absolute right-1 bg-[#EC9902]"></span>
                        </a>
                        <a
                          href="https://www.youtube.com/@Muslin.fashion"
                          className="relative text-sm"
                        >
                          <h1>YouTube</h1>
                          <span className="w-10 h-px inline-block absolute right-1 bg-[#EC9902]"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="md:hidden block">
            <Slider {...settingsBanner}>
              {banners?.map((item) => (
                <div key={item._id}>
                  <div className="text-center relative">
                    <div className=" ">
                      <img
                        src={item.imageMobile}
                        alt=""
                        className="w-full h-[50vh]"
                      />
                      <div className="flex absolute gap-10 text-[#EC9902] left-8 bottom-5 ">
                        <a
                          href="https://www.facebook.com/muslin.com.bd"
                          className="relative text-sm"
                        >
                          <h1>Facebook</h1>
                          <span className="w-10 h-px inline-block absolute right-1 bg-[#EC9902]"></span>
                        </a>
                        <a
                          href="https://www.instagram.com/muslin.com.bd/"
                          className="relative text-sm"
                        >
                          <h1>Instagram</h1>
                          <span className="w-10 h-px inline-block absolute right-1 bg-[#EC9902]"></span>
                        </a>
                        <a
                          href="https://www.youtube.com/@Muslin.fashion"
                          className="relative text-sm"
                        >
                          <h1>YouTube</h1>
                          <span className="w-10 h-px inline-block absolute right-1 bg-[#EC9902]"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner1;
