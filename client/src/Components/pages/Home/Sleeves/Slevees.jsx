import bgImage from "../../../../assets/slider/m-h-content-slider-1.png";
import woman1 from "../../../../assets/slaves/slaves-1.png";
import woman2 from "../../../../assets/slaves/slaves-2.png";
import bgimg2 from "../../../../assets/slider/m-h-content-slider-2.png";

const Slevees = () => {
  return (
    <div className="relative bg-slate-100">
      <div className="max-w-screen-2xl mx-auto ">
        <div className="  relative overflow-hidden z-50">
          <div className="relative  py-20">
            <div className=" ">
              <div className="bg-[#d7d7d7] py-[200px] md:py-[305px]"></div>
            </div>

            <div className="z-30 absolute  sm:block hidden   top-20 left-0 pl-5 ">
              <img
                src={woman1}
                alt=""
                className="h-[609px] sm:h-[400px] sm:w-56 md:w-96 lg:w-full lg:h-[609px]"
              />
            </div>
            <div className="z-30 absolute sm:left-[50%]   md:h-full top-20 md:left-[45%] md:pl-5 -right-[45%] ">
              <img
                src={woman2}
                alt=""
                className="md:h-[610px]  h-[400px] relative z-50"
              />
              <h1
                className="text-white font-bold text-3xl sm:text-5xl md:text-5xl 
              lg:text-7xl 2xl:text-8xl z-50 absolute top-1/2 sm:top-[40%] md:top-[25%] pl-5"
              >
                Genuine <br /> Comfortable
              </h1>
              <p
                className="bg-[#d7d7d7] absolute top-20  md:top-[25%] 
               -z-[0] py-32 px-32 sm:px-56 md:px-48 "
              ></p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-secondary  md:py-[380px] py-[250px] px-[80px] sm:px-[200px]
        md:px-[400px] lg:px-[280px] xl:px-[350px] 2xl:px-[450px] absolute z-0 right-0 
      top-10 md:top-0 md:right-0 2xl:right-0 md:pl-5"
      ></div>
    </div>
  );
};

export default Slevees;
