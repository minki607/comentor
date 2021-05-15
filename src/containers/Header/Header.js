import React from "react";
import { header, content } from "./Header.module.scss";
import { useHistory, useLocation } from "react-router-dom";
import Button from "components/Button/Button";

const Header = ({ info, ...restProps }) => {
  const location = useLocation();
  const history = useHistory();
  // 피드 자세히 보기 페이지에서만 뒤로가기 버튼 보이도록 설정
  const text =
    location.pathname.split("/")[1] === "feed" ? (
      <Button
        onClick={() => history.goBack()}
        aria-label="뒤로 가기"
        title="뒤로가기"
        bold
      >
        &lt;
      </Button>
    ) : (
      info
    );
  return (
    <header className={header} {...restProps}>
      <div className={content}>{text}</div>
    </header>
  );
};

export default Header;
