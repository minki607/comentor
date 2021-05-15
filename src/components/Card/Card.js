import React from "react";
import { Link } from "react-router-dom";
import { card, selected } from "./Card.module.scss";

// 카드 컴포넌트 - 링크주소가 있으면 Link 컴포넌트로 감싸기
const Card = ({ linkTo, highlight, children, className, ...restProps }) => {
  const CardComponent = (
    <div
      className={`${card} ${highlight && selected} ${className}`}
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
