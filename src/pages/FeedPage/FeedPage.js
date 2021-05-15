import Card from "components/Card/Card";
import React, { useEffect } from "react";
import { feedSection, feedCard, replyCount } from "./FeedPage.module.scss";
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

  console.log(feed);
  return (
    <section className={feedSection}>
      {isLoading ? (
        <LoadingSpinner title="로딩중" />
      ) : (
        feed && (
          <>
            <Card highlight className={feedCard}>
              <SingleFeedContent feed={feed} />
            </Card>
            <div className={replyCount}>
              답변 <em>{feed.reply.length}</em>
            </div>
            {feed.reply.length !== 0 && (
              <ul>
                {feed.reply.map((post) => (
                  <li key={post.id}>
                    <Card>
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
