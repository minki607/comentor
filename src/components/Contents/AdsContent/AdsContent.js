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
          <h2>
            Et libero culpa corporis odit minus quasi pariatur ut aperiam animi
            odit omnis ea nobis voluptas unde minima a nisi harum aperiam labore
            odit voluptas assumenda atque vel ratione officia aut in facere.
          </h2>
          <p>
            Y박사가 대문 밖에 나서면서 나더러, \"상당히 중하시오.\" 하고 자기의
            오른편 가슴을 가리켰소. 나는 그 옥상에 얼마나 오래 섰던지를 모르오.
            내 머리와 낯과 배스로브에서는 물이 흐르오. 방에 들어오니 정임이가
            끼치고 간 향기와 추억만 남았소. 나는 방 안 구석구석에 정임의 모양이
            나타나오. 나는 불을 켜오. 또 불을 끄오. 그러면 정임이가 나에게
            대하여 한 이성으로의 사랑을 느끼는가 하고 나는 간호부를
            향하여,\"이야기 아니 시킬 테니 안심하시오. 고맙습니다.\" 하고
            간호부에게 고개를 숙였소. 그제야 간호부는 나가 버렸소.나는.
          </p>
        </div>
      </div>
    </article>
  );
};

export default AdsContent;
