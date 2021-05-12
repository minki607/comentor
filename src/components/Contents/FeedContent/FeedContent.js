import React from "react";
import { feed, feedMeta } from "./FeedContent.module.scss";

const FeedContent = ({
  feed: { category_id, id, user_id, created_at, title, contents } = {},
}) => {
  return (
    <article className={feed}>
      <header>
        <span>{category_id}</span>
        <span>{id}</span>
      </header>
      <div className={feedMeta}>
        <span>{user_id}</span>
        <time dateTime={created_at}>
          {created_at && created_at.split("T")[0]}
        </time>
      </div>
      <h2>{title}</h2>
      <p>{contents}</p>
    </article>
  );
};

export default FeedContent;
