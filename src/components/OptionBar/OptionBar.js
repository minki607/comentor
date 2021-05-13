import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSortMethod, fetchFeed } from "redux/storage/feedAll/feedAll";
import { option, sortOption, active } from "./OptionBar.module.scss";

const OptionBar = () => {
  const { ord } = useSelector((state) => state.feedAll);
  const [openFilter, setOpenFilter] = useState(false);
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
      <Button onClick={() => setOpenFilter(true)} $width={45} $height={24}>
        필터
      </Button>
      <Modal
        isVisible={openFilter}
        onClick={() => setOpenFilter(false)}
        heading="필터"
      >
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
      </Modal>
    </div>
  );
};

export default OptionBar;
