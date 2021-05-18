import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import Modal from "components/Modal/Modal";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed } from "redux/storage/feedAll/feedAll";
import { fetchCategory } from "redux/storage/feedCategory/feedCategory";
import {
  changePreviewLength,
  changeSortMethod,
  changeSelectedCategory,
} from "redux/storage/feedOption/feedOption";
import {
  option,
  sortOption,
  active,
  filterOption,
  selectedList,
  filterForm,
  optionContainer,
} from "./OptionBar.module.scss";
import { ReactComponent as LoadingSpinner } from "assets/spinner.svg";
import Tag from "components/Tag/Tag";
import SelectOption from "components/SelectOption/SelectOption";
import { a11yHidden } from "styles/modules/common.module.scss";

/* ---------------------------------- 옵션 관련 영역 --------------------------------- */

const OptionBar = () => {
  const { category: categoryData, isLoading } = useSelector(
    (state) => state.feedCategory
  ); // 피드 카테고리 관련

  const { previewLine, order, selectedCategory } = useSelector(
    (state) => state.feedOption
  ); // 피드 옵션 관련
  const [openFilter, setOpenFilter] = useState(false);
  const [categoryArray, setCategoryArray] = useState([]);
  const dispatch = useDispatch();

  // 전체 카테고리 요청
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  // 선택된 카테고리(selectedCategory)랑 동기화될 카테고리 배열 세팅 (controlled 폼을 위해)
  useEffect(() => {
    if (selectedCategory) {
      setCategoryArray(selectedCategory);
    }
  }, [selectedCategory]);

  // 오름차순 정렬을 위한 처리
  const handleAscSort = () => {
    if (order === "asc") return;
    dispatch(changeSortMethod("asc"));
    dispatch(fetchFeed());
  };

  // 내림차순 정렬을 위한 처리
  const handleDescSort = () => {
    if (order === "desc") return;
    dispatch(changeSortMethod("desc"));
    dispatch(fetchFeed());
  };

  // 필터 카터고리 체크 처리
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

  // 이미 선택된 카테고리 상태에 추가 된 상태면 없애고 그렇지 않으면 새로 추가
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    dispatch(changeSelectedCategory(categoryArray));
    dispatch(fetchFeed());
    setOpenFilter(false);
  };

  // 모달 닫기 처리
  const handleModalClose = () => {
    // 모달을 닫으면 스토어의 상태랑 다시 동기화 되도록 설정
    setCategoryArray(selectedCategory);
    setOpenFilter(false);
  };

  // 미리보기 줄 설정
  const handlePreviewOption = (e) => {
    dispatch(changePreviewLength(e.target.value));
  };

  return (
    <div className={option}>
      <div className={sortOption}>
        <Button
          onClick={handleAscSort}
          className={order === "asc" ? active : ""}
        >
          오름차순
        </Button>
        <Button
          onClick={handleDescSort}
          className={order === "desc" ? active : ""}
        >
          내림차순
        </Button>
        <SelectOption
          label="미리보기"
          onChange={handlePreviewOption}
          value={previewLine}
        >
          <option value={1}>1줄</option>
          <option value={2}>2줄</option>
          <option value={3}>3줄</option>
        </SelectOption>
      </div>
      <div className={filterOption}>
        {selectedCategory && (
          <>
            <p className={a11yHidden}>선택된 카테고리</p>
            <ul className={selectedList}>
              {selectedCategory.map((category) => (
                <li key={category.id}>
                  <Tag>{category.name}</Tag>
                </li>
              ))}
            </ul>
          </>
        )}

        <Button onClick={() => setOpenFilter(true)} $width={45} $height={24}>
          필터
        </Button>
      </div>
      <Modal isVisible={openFilter} onClick={handleModalClose} heading="필터">
        <form className={filterForm} onSubmit={handleFilterSubmit}>
          <div className={optionContainer}>
            {isLoading ? (
              <LoadingSpinner
                title="필터 로딩중"
                height="100px"
                width="100px"
              />
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
