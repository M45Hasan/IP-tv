import { Icon } from "@iconify/react";
import React from "react";

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next" onClick={onClick}>
    <Icon icon="ep:arrow-right-bold" width={25} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev" onClick={onClick}>
    <Icon icon="ep:arrow-left-bold" width={25} />
  </div>
);

export { NextArrow, PrevArrow };
