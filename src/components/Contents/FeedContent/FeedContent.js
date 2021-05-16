import Tag from "components/Tag/Tag";
import React from "react";
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

  return (
    <article className={feed}>
      <header>
        <span>{category_id}</span>
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
