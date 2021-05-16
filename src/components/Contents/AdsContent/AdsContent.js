import React from "react";
import { ads, adsContainer, textContainer } from "./AdsContent.module.scss";

const AdsContent = ({ ads: { title, contents, img } = {} }) => {
  return (
    <article className={ads}>
      <span>sponsored</span>
      <div className={adsContainer}>
        <img
          src={
            img
              ? `https://cdn.comento.kr/assignment/${img}`
              : "/assets/placeholder.jpg"
          }
          alt="광고(고양이 이미지)"
        />
        <div className={textContainer}>
          <h2>{title}</h2>
          <p>{contents}</p>
        </div>
      </div>
    </article>
  );
};

export default AdsContent;
