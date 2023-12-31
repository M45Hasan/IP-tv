import Inspired from "../Inspired/Inspired";

import Product from "../Product/Product";
import Summer from "../Summar/Summer";
// import Testomonials from "../Testomonials/Testomonials";
// import Brand from "../Brand/Brand";
import TimeToShine from "../../TImeToShine/TimeToShine";
import Slevees from "../Sleeves/Slevees";
// import Banner from "../Banner/banner";
import Banner1 from "../Banner/Banner1";
import ElegentSlider from "../ElegentSlider/ElegentSlider";
import Gallerys from "../Gallery/Gallerys";

const Home = () => {
  return (
    <div>
      <Banner1 />
      <ElegentSlider />
      <Inspired />
      <Product />
      <Slevees />
      {/* <Summer /> */}
      {/* <Testomonials /> */}
      {/* <Brand /> */}
      <TimeToShine />
      <Gallerys />
    </div>
  );
};

export default Home;
