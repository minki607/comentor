import { ReactComponent as LoadingSpinner } from "assets/spinner.svg";
import Button from "components/Button/Button";
import Card from "components/Card/Card";
import AdsContent from "components/Contents/AdsContent/AdsContent";
import FeedContent from "components/Contents/FeedContent/FeedContent";
import OptionBar from "components/OptionBar/OptionBar";
import React, { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAds, fetchMoreAds } from "redux/storage/ads/ads";
import { fetchFeed, fetchMoreFeed } from "redux/storage/feedAll/feedAll";
import {
  cardList,
  feedSection,
  page,
  userSection,
} from "./FeedAllPage.module.scss";

const FeedAllPage = () => {
  const { feeds, isLoading: isFeedLoading } = useSelector(
    (state) => state.feedAll
  );
  const { ads, isLoading: isAdsLoading } = useSelector((state) => state.ads);
  const { previewLine } = useSelector((state) => state.feedOption);
  const dispatch = useDispatch();

  // 피드 정보 요청
  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  // 광고 정보 요청
  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  // 무한스크롤 로직
  const onInfiniteScroll = useCallback(() => {
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
      dispatch(fetchMoreAds());
    }
  }, [dispatch]);

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("scroll", onInfiniteScroll);
    return () => window.removeEventListener("scroll", onInfiniteScroll);
  }, [onInfiniteScroll]);

  return (
    <div className={page}>
      <section className={userSection}>
        <Button primary bold $width={235} $height={60}>
          로그인
        </Button>
      </section>

      <section className={feedSection}>
        <OptionBar />
        {isFeedLoading ? (
          <LoadingSpinner title="로딩중" />
        ) : (
          <ul>
            {feeds?.data.map((feed, index) => {
              return (
                // 처음을 제외한 3의 배수번째 인덱스마다 광고 하나씩 삽입
                <Fragment key={feed.id}>
                  {index !== 0 &&
                    index % 3 === 0 &&
                    (isAdsLoading ? (
                      <LoadingSpinner title="로딩중" />
                    ) : (
                      <li className={cardList}>
                        <Card>
                          <AdsContent ads={ads?.data[index / 3 - 1]} />
                        </Card>
                      </li>
                    ))}
                  <li className={cardList}>
                    <Card linkTo={`feed/${feed.id}`}>
                      <FeedContent feed={feed} preview={previewLine} />
                    </Card>
                  </li>
                </Fragment>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default FeedAllPage;
