import React from "react";
import { ads, adsContainer, textContainer } from "./AdsContent.module.scss";

const AdsContent = () => {
  return (
    <article className={ads}>
      <span>sponsered</span>
      <div className={adsContainer}>
        <img
          src="https://cdn.comento.kr/assignment/test1.jpg"
          alt="placeholder"
        />
        <div className={textContainer}>
          <h2>32132131</h2>
          <p>d21k3j21l3</p>
        </div>
      </div>
    </article>
  );
};

export default AdsContent;
