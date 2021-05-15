import Card from "components/Card/Card";
import React, { useEffect } from "react";
import { feedSection } from "./FeedPage.module.scss";
import { useParams } from "react-router-dom";
import SingleFeedContent from "components/Contents/SingleFeedContent/SingleFeedContent";

const FeedPage = () => {
  const { id } = useParams();
  useEffect(() => {});
  return (
    <section className={feedSection}>
      <Card highlight>
        <SingleFeedContent>{id}</SingleFeedContent>
      </Card>
    </section>
  );
};

export default FeedPage;
