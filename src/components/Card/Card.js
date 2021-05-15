import React from "react";
import { Link } from "react-router-dom";
import { card, selected, noBorderMobile } from "./Card.module.scss";

// 카드 컴포넌트 - 링크주소가 있으면 Link 컴포넌트로 감싸기
const Card = ({
  linkTo,
  highlight,
  borderMobile = true,
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

  if (linkTo) {
    return <Link to={linkTo}>{CardComponent}</Link>;
  }
  return CardComponent;
};

export default Card;
