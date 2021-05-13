import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Modal from "components/Modal/Modal";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSelectedCategory,
  changeSortMethod,
  fetchCategory,
  fetchFeed,
} from "redux/storage/feedAll/feedAll";
import {
  option,
  sortOption,
  active,
  filterOption,
  optionContainer,
} from "./OptionBar.module.scss";
import { ReactComponent as LoadingSpinner } from "assets/LoadingSpinner.svg";

const OptionBar = () => {
  const {
    ord,
    category: categoryData,
    selectedCategory,
    isLoading,
  } = useSelector((state) => state.feedAll);
  const [openFilter, setOpenFilter] = useState(false);
  const [categoryArray, setCategoryArray] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      setCategoryArray(selectedCategory);
    }
  }, [selectedCategory]);

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
  const handleChangeCheck = (selected) => {
    // 이미 선택된 카테고리 상태에 추가 된 상태면 없애고 그렇지 않으면 새로 추가
    if (categoryArray.find((category) => category.id === selected.id)) {
      setCategoryArray(
        categoryArray.filter((category) => category.id !== selected.id)
      );
    } else {
      setCategoryArray([...categoryArray, selected]);
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    dispatch(changeSelectedCategory(categoryArray));
    dispatch(fetchFeed());
    setOpenFilter(false);
  };

  const handleModalClose = () => {
    // 모달을 닫으면 스토어의 상태랑 다시 동기화 되도록 설정
    setCategoryArray(selectedCategory);
    setOpenFilter(false);
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
      <Modal isVisible={openFilter} onClick={handleModalClose} heading="필터">
        <form className={filterOption} onSubmit={handleFilterSubmit}>
          <div className={optionContainer}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              categoryData?.map((category) => {
                return (
                  <Checkbox
                    key={category.id}
                    id={`category${category.id}`}
                    value={category}
                    name={category.name}
                    onChange={() => handleChangeCheck(category)}
                    checked={
                      !!categoryArray?.find(
                        (selected) => selected.id === category.id
                      )
                    }
                  >
                    {category.name}
                  </Checkbox>
                );
              })
            )}
          </div>
          <Button
            type="submit"
            primary
            $width={99}
            $height={40}
            $fontSize="1.6rem"
            disabled={categoryArray?.length === 0 && true}
          >
            저장하기
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default OptionBar;
