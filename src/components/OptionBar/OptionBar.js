import Button from "components/Button/Button";
import React, { useState } from "react";
import { option, sortOption, active } from "./OptionBar.module.scss";

const OptionBar = () => {
  const [sortMethod, setSortMethod] = useState("asc");
  return (
    <div className={option}>
      <div className={sortOption}>
        <Button
          onClick={() => setSortMethod("asc")}
          className={sortMethod === "asc" ? active : ""}
        >
          오름차순
        </Button>
        <Button
          onClick={() => setSortMethod("desc")}
          className={sortMethod === "desc" ? active : ""}
        >
          내림차순
        </Button>
      </div>
      <Button $width={45} $height={24}>
        필터
      </Button>
    </div>
  );
};

export default OptionBar;
