import React from "react";

const FeedContent = ({
  feed: { category_id, id, user_id, created_at, title, contents },
}) => {
  return (
    <article>
      <h2>{title}</h2>
      <p>{contents}</p>
    </article>
  );
};

export default FeedContent;
