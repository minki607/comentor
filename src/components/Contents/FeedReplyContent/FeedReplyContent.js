import React from "react";
import { reply } from "./FeedReplyContent.module.scss";

const FeedReplyContent = ({ reply: { user, created_at, contents } }) => {
  return (
    <article className={reply}>
      <header>
        <span>{user.name}</span>
      </header>
      <p>{contents}</p>
      <time>{created_at && created_at.split("T")[0]}</time>
    </article>
  );
};

export default FeedReplyContent;
