import React from "react";
import { Link } from "react-router-dom";
import { card, selected, noBorderMobile } from "./Card.module.scss";

/* --------------------------------- 카드 컴포넌트 -------------------------------- */

const Card = ({
  linkTo, // 카드가 링크로 사용시 이동할 주소
  highlight, // 카드 border를 테마 color로 하이라이트 하기위한 prop
  borderMobile = true, // 모바일뷰에 border가 보이지 않도록 설정하기 위한 prop
  children,
  className,
  ...restProps
}) => {
  const CardComponent = (
    <div
      className={`${card} ${highlight ? selected : ""}
      ${!borderMobile ? noBorderMobile : ""} ${className ? className : ""}`}
      {...restProps}
    >
      {children}
    </div>
  );

  // 링크주소가 있으면 Link 컴포넌트로 감싸기
  if (linkTo) {
    return <Link to={linkTo}>{CardComponent}</Link>;
  }
  return CardComponent;
};

export default Card;
