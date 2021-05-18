import Button from "components/Button/Button";
import React from "react";
import { ads, adsContainer, textContainer } from "./AdsContent.module.scss";

/* ---------------------------------- 광고 영역 --------------------------------- */

const AdsContent = ({ ads: { title, contents, img } = {}, onClick }) => {
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
      <Button onClick={onClick}>광고 숨기기</Button>
    </article>
  );
};

export default AdsContent;
