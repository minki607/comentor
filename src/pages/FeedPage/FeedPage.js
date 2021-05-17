import Card from "components/Card/Card";
import React, { useEffect } from "react";
import { feedSection, replyCount, replies } from "./FeedPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleFeedContent from "components/Contents/SingleFeedContent/SingleFeedContent";
import { fetchFeedDetail } from "redux/storage/feedDetail/feedDetail";
import { ReactComponent as LoadingSpinner } from "assets/spinner.svg";
import FeedReplyContent from "components/Contents/FeedReplyContent/FeedReplyContent";

const FeedPage = () => {
  const { id } = useParams();
  const { feed, isLoading } = useSelector((state) => state.feedDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedDetail(id));
  }, [dispatch, id]);

  return (
    <section className={feedSection}>
      {isLoading ? (
        <LoadingSpinner title="로딩중" />
      ) : (
        feed && (
          <>
            <Card highlight borderMobile={false}>
              <SingleFeedContent feed={feed} />
            </Card>
            <div className={replyCount}>
              답변 <em>{feed.reply.length}</em>
            </div>
            {feed.reply.length !== 0 && (
              <ul className={replies}>
                {feed.reply.map((post) => (
                  <li key={post.id}>
                    <Card borderMobile={false}>
                      <FeedReplyContent reply={post} />
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </>
        )
      )}
    </section>
  );
};

export default FeedPage;
