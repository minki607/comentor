import Button from "components/Button/Button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSortMethod, fetchFeed } from "redux/storage/feedAll/feedAll";
import { option, sortOption, active } from "./OptionBar.module.scss";

const OptionBar = () => {
  const { ord } = useSelector((state) => state.feedAll);
  const dispatch = useDispatch();

  const handleAscSort = () => {
    if (ord === "asc") return;
    dispatch(changeSortMethod("asc"));
    dispatch(fetchFeed());
  };

  const handleDescSort = () => {
    if (ord === "desc") return;
    dispatch(changeSortMethod("desc"));
    dispatch(fetchFeed());
  };
  return (
    <div className={option}>
      <div className={sortOption}>
        <Button onClick={handleAscSort} className={ord === "asc" ? active : ""}>
          오름차순
        </Button>
        <Button
          onClick={handleDescSort}
          className={ord === "desc" ? active : ""}
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
