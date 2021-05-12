import React, { Fragment, useEffect } from "react";
import Card from "components/Card/Card";
import FeedContent from "components/Contents/FeedContent/FeedContent";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeed, fetchMoreFeed } from "redux/storage/feedAll/feedAll";
import { fetchAds, fetchMoreAds } from "redux/storage/ads/ads";
import { page, userSection, feedSection } from "./FeedAllPage.module.scss";
import { resetList } from "styles/modules/common.module.scss";
import Button from "components/Button/Button";
import AdsContent from "components/Contents/AdsContent/AdsContent";
import { ReactComponent as LoadingSpinner } from "assets/LoadingSpinner.svg";
import OptionBar from "components/OptionBar/OptionBar";

const FeedAllPage = () => {
  const { feeds, isLoading: isFeedLoading } = useSelector(
    (state) => state.feedAll
  );

  const { ads, isLoading: isAdsLoading } = useSelector((state) => state.ads);
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
      dispatch(fetchMoreAds());
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
        <Button primary $width={235} $height={60}>
          로그인
        </Button>
      </section>

      <section className={feedSection}>
        <OptionBar />
        {isFeedLoading ? (
          <LoadingSpinner title="로딩중" />
        ) : (
          <ul className={resetList}>
            {feeds?.data.map((feed, index) => {
              return (
                // 처음을 제외한 3의 배수번째 인덱스마다 광고 하나씩 삽입
                <Fragment key={feed.id}>
                  {index !== 0 &&
                    index % 3 === 0 &&
                    (isAdsLoading ? (
                      <LoadingSpinner title="로딩중" />
                    ) : (
                      <li>
                        <Card>
                          <AdsContent ads={ads?.data[index / 3 - 1]} />
                        </Card>
                      </li>
                    ))}
                  <li>
                    <Card>
                      <FeedContent feed={feed} />
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
