import React from "react";
import { ads, adsContainer, textContainer } from "./AdsContent.module.scss";

const AdsContent = ({ ads: { title, contents, img } = {} }) => {
  return (
    <article className={ads}>
      <span>sponsered</span>
      <div className={adsContainer}>
        <img src={`https://cdn.comento.kr/assignment/${img}`} alt="광고" />
        <div className={textContainer}>
          <h2>{title}</h2>
          <p>{contents}</p>
        </div>
      </div>
    </article>
  );
};

export default AdsContent;
