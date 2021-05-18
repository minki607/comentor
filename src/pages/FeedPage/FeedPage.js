import Card from "components/Card/Card";
import React, { useEffect } from "react";
import { feedSection, replyCount, replies } from "./FeedPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleFeedContent from "containers/Contents/SingleFeedContent/SingleFeedContent";
import { fetchFeedDetail } from "redux/storage/feedDetail/feedDetail";
import { ReactComponent as LoadingSpinner } from "assets/spinner.svg";
import FeedReplyContent from "containers/Contents/FeedReplyContent/FeedReplyContent";
import { a11yHidden } from "styles/modules/common.module.scss";

const FeedPage = () => {
  const { id } = useParams(); // path 파라미터 추출
  const { feed, isLoading } = useSelector((state) => state.feedDetail); // 피드 상세 정보 관련

  const dispatch = useDispatch();

  //추출된 아이디 정보로 상세 정보 요청
  useEffect(() => {
    dispatch(fetchFeedDetail(id));
  }, [dispatch, id]);

  return (
    <section className={feedSection}>
      <h1 className={a11yHidden}>피드 상세 정보</h1>
      {isLoading ? (
        <LoadingSpinner title="피드 상세 정보 로딩중" />
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
