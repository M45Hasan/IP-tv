import React from "react";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

const Brand = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div className="bg-primary">
      <div className="max-w-screen-xl mx-auto px-2 md:px-0">
        <div className="pb-10">
          <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlay
            autoPlaySpeed={3000}
            // centerMode={true}
            containerClass="container-with-dots"
            customTransition="all 1s linear"
            dotListClass=""
            draggable
            focusOnSelect={true}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={2}
            swipeable={true}
            transitionDuration={1000}
          >
            <div className="opacity-50 hover:opacity-100">
              <img
                src="https://onea.qodeinteractive.com/wp-content/uploads/2018/08/client-h5.png"
                alt=""
                className="px-4 w-full "
              />
            </div>
            <div className="opacity-50 hover:opacity-100 ">
              <img
                src="https://onea.qodeinteractive.com/wp-content/uploads/2018/08/client-h3.png"
                alt=""
                className="px-4 w-full"
              />
            </div>
            <div className="opacity-50 hover:opacity-100 ">
              <img
                src="https://onea.qodeinteractive.com/wp-content/uploads/2018/08/client-h6.png"
                alt=""
                className="px-4 w-full"
              />
            </div>
            <div className="opacity-50 hover:opacity-100 ">
              <img
                src="https://onea.qodeinteractive.com/wp-content/uploads/2018/08/client-h1.png"
                alt=""
                className="px-4 w-full"
              />
            </div>
            <div className="opacity-50 hover:opacity-100">
              <img
                src="https://onea.qodeinteractive.com/wp-content/uploads/2018/08/client-h2.png"
                alt=""
                className="px-4 w-full"
              />
            </div>
            <div className="opacity-50 hover:opacity-100 ">
              <img
                src="https://onea.qodeinteractive.com/wp-content/uploads/2018/08/client-h4.png"
                alt=""
                className="px-4 w-full"
              />
            </div>
            <div className="opacity-50 hover:opacity-100 ">
              <img
                src="https://onea.qodeinteractive.com/wp-content/uploads/2018/08/client-h5.png"
                alt=""
                className="px-4 w-full"
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Brand;
