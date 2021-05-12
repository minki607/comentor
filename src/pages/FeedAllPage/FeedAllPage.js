import React, { Fragment, useEffect, useCallback } from "react";
import Card from "components/Card/Card";
import FeedContent from "components/Contents/FeedContent/FeedContent";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeed, fetchMoreFeed } from "redux/storage/feedAll/feedAll";
import { page, userSection, feedSection } from "./FeedAllPage.module.scss";
import { resetList } from "styles/modules/common.module.scss";
import Button from "components/Button/Button";
import AdsContent from "components/Contents/AdsContent/AdsContent";

const FeedAllPage = () => {
  const { feeds } = useSelector((state) => state.feedAll);
  const dispatch = useDispatch();

  // 피드 정보 요청
  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  // 무한스크롤 로직
  const onInfiniteScroll = () => {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      dispatch(fetchMoreFeed());
    }
  };

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("scroll", onInfiniteScroll);
    return () => window.removeEventListener("scroll", onInfiniteScroll);
  }, []);

  return (
    <div className={page}>
      <section className={userSection}>
        <Button $width={235} $height={60}>
          로그인
        </Button>
      </section>
      <section className={feedSection}>
        <ul className={resetList}>
          {feeds?.data.map((feed, index) => {
            return (
              <Fragment key={feed.id}>
                {index !== 0 && index % 3 === 0 && (
                  <li>
                    <Card>
                      <AdsContent />
                    </Card>
                  </li>
                )}
                <li>
                  <Card>
                    <FeedContent feed={feed} />
                  </Card>
                </li>
              </Fragment>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default FeedAllPage;
