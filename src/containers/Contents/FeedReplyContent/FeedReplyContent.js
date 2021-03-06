import React from "react";
import { reply } from "./FeedReplyContent.module.scss";

/* -------------------------------- 피드 답글 영역 -------------------------------- */

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
