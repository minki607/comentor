import React from "react";
import { card } from "./Card.module.scss";

const Card = ({ isButton, role, onClick, children }) => {
  return <div className={card}>{children}</div>;
};

export default Card;
