import React from "react";
import { header, content } from "./Header.module.scss";

const Header = ({ children, ...restProps }) => {
  return (
    <header className={header} {...restProps}>
      <div className={content}>{children}</div>
    </header>
  );
};

export default Header;
