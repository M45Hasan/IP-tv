import "./TimeToShine.css";
import image from "../../../assets/timetoshine/slaves.png";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
const TimeToShine = () => {
  const ref = useRef(null);
  const isInView = (ref, { once: true });
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);

  return (
    <div className="pt-48 max-w-screen-2xl mx-auto px-2 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 relative px-2 md:px-0">
        <div className="relative col-span-2">
          <div className="relative z-50">
            <div className="pt-2 pr-0 pb-[0px] pl-[67px] relative absolute -top-20">
              <div className="figure">
                <div className="image">
                  <img src={image} alt="" />
                </div>
              </div>
            </div>
          </div>

          <motion.div
            ref={ref}
            variants={{
              hidden: { opacity: 0, x: "-100%" },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={slideControls}
            whileInView="animate"
            transition={{ duration: 0.75, delay: 0.25 }}
            className="scroll-fade-content z-30 absolute bg-[#d7d7d7]  w-full h-full top-0 right-0 pt-[50px] pr-[33px] "
          ></motion.div>
        </div>
        <div
          className=" md:absolute md:left-[73%] md:top-[40%] md:transform md:-translate-x-1/2
         md:-translate-y-1/2 z-50"
        >
          <div className=" py-20 text-center  md:text-start">
            <div>
              <h3 className="tracking-[0.42em]  text-[#3d3d3d]">
                Winter COLLECTION
              </h3>
              <h1 className="tracking-  font-bold text-[38px] text-[#3d3d3d] py-5">
                Elevate Your Winter Wardrobe
              </h1>
              <p className="pb-5">
                Indulge in the warmth of our Winter Collection – a fusion of
                fashion and comfort, designed to elevate your seasonal style
                effortlessly.
              </p>
              <Link
                to={{
                  pathname: `/${"winter"}`,
                  search: "?category=winter",
                }}
                className="font-bold text-sm link link-underline link-underline-black "
              >
                See Whole Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeToShine;
