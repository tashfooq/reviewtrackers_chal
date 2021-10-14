import React from "react";
import { ReactComponent as Star } from "./star.svg";

const StarRating = (props) => {
  const rating = props.rating;
  return (
    <div>
      {[...Array(rating)].map((star, index) => (
        <Star fill="#FDCC0D" key={index} />
      ))}
    </div>
  );
};

export default StarRating;
