import React, { useEffect, useState } from "react";
import { Gallery } from "react-grid-gallery";
import { IoIosLink } from "react-icons/io";
import Slider from "react-slick";
import "./Gallery.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "@iconify/react";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const Gallerys = () => {
  const [images, setImages] = useState([]);

  const getGallery = async () => {
    try {
      const res = await fetch(`${apiUrl}/banner/getgallery`);

      if (res.ok) {
        const data = await res.json();
        setImages(data);
      } else {
        console.error("Failed to fetch banners");
      }
    } catch (error) {
      console.error("An error occurred while fetching banners:", error);
    }
  };

  useEffect(() => {
    getGallery();
  }, []);

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="slick-arrow slick-next z-40 absolute top-[50%] translate-y-[-50%] right-[50px]"
        onClick={onClick}
      >
        Next
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="slick-arrow  slick-prev z-40 absolute top-[50%] translate-y-[-50%] left-[20px]"
        onClick={onClick}
      >
        Prev
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const slicedImages = images.slice(0, 5);

  return (
    <div className="pt-48 max-w-screen-2xl mx-auto px-2 md:px-0 py-10">
      <div className="py-20">
        <h3 className="tracking-[0.42em] text-center text-[#3d3d3d]">
          OUR COLLECTION
        </h3>
        <h1 className="tracking- text-center font-bold text-[38px] text-[#3d3d3d] py-5">
          Gallery
        </h1>
        <p className="text-center mb-2">
          Unveiling the Chic and Cozy Styles of Our Latest Winter, Summer & Eid
          Collection!
          <br />
        </p>
      </div>
      <Slider {...settings}>
        {slicedImages.reverse().map((item, index) => (
          <div key={index} className=" ">
            <picture className="w-[1000px] relative group transition-transform delay-75 overflow-hidden pb-20">
              <img
                src={item.image}
                className="object-fill w-full h-full transition-all "
                alt=""
              />

              <a href={item.link} target="_blank" rel="noreferrer">
                <div className="absolute top-[100%]  delay-75 group-hover:top-0 left-0 w-full h-full flex justify-center items-center bg-black/30">
                  <Icon icon="lucide:link" className="text-5xl text-white" />
                </div>
              </a>
            </picture>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Gallerys;
