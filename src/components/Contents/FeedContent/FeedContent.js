import Tag from "components/Tag/Tag";
import React from "react";
import { useSelector } from "react-redux";
import {
  feed,
  feedId,
  feedMeta,
  preview1,
  preview2,
  preview3,
} from "./FeedContent.module.scss";

const FeedContent = ({
  feed: { category_id, id, user_id, created_at, title, contents } = {},
  preview,
}) => {
  // css 선택 적용 (미리보기 줄)
  const previewClass = () => {
    switch (preview) {
      default:
      case "1":
        return preview1;
      case "2":
        return preview2;
      case "3":
        return preview3;
    }
  };

  const { category: categoryData } = useSelector((state) => state.feedCategory);
  return (
    <article className={feed}>
      <header>
        <span>
          {categoryData?.find((category) => category.id === category_id).name}
        </span>
        <div className={feedId}>
          <Tag>피드 ID</Tag>
          <span>{id}</span>
        </div>
      </header>
      <div className={feedMeta}>
        <span>{user_id}</span>
        <time dateTime={created_at}>
          {created_at && created_at.split("T")[0]}
        </time>
      </div>
      <h2 className={previewClass()}>{title}</h2>
      <p className={previewClass()}>{contents}</p>
    </article>
  );
};

export default FeedContent;
