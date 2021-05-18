import { ReactComponent as LoadingSpinner } from "assets/spinner.svg";
import Button from "components/Button/Button";
import Card from "components/Card/Card";
import AdsContent from "containers/Contents/AdsContent/AdsContent";
import FeedContent from "containers/Contents/FeedContent/FeedContent";
import OptionBar from "containers/OptionBar/OptionBar";
import React, { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAds, fetchMoreAds } from "redux/storage/ads/ads";
import { fetchFeed, fetchMoreFeed } from "redux/storage/feedAll/feedAll";
import { hideAds } from "redux/storage/feedOption/feedOption";
import {
  cardList,
  feedSection,
  page,
  userSection,
  spinnerArea,
} from "./FeedAllPage.module.scss";
import { a11yHidden } from "styles/modules/common.module.scss";

/* -------------------------------- 전체 피드 페이지 ------------------------------- */

const FeedAllPage = () => {
  const {
    feeds,
    isLoading: isFeedLoading,
    isLoadingMore,
  } = useSelector((state) => state.feedAll); // 피드 정보 관련
  const { ads, isLoading: isAdsLoading } = useSelector((state) => state.ads); // 광고 정보 관련
  const { isAdsVisible, previewLine } = useSelector(
    // 피드 옵션 관련
    (state) => state.feedOption
  );
  const dispatch = useDispatch();

  // 피드 정보 요청
  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  // 광고 정보 요청
  useEffect(() => {
    if (isAdsVisible) dispatch(fetchAds());
  }, [dispatch, isAdsVisible]);

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
    // 스크롤이 화면 밑에 닿았을때 피드, 광고 정보 더 요청. 광고는 숨김 상태가 아닐경우만 요청
    if (scrollTop + clientHeight >= scrollHeight) {
      dispatch(fetchMoreFeed());
      if (isAdsVisible) dispatch(fetchMoreAds());
    }
  }, [dispatch, isAdsVisible]);

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("scroll", onInfiniteScroll);
    return () => window.removeEventListener("scroll", onInfiniteScroll);
  }, [onInfiniteScroll]);

  // 광고 숨김 처리
  const handleHideAd = () => {
    dispatch(hideAds());
  };

  return (
    <div className={page}>
      <section className={userSection}>
        <h1 className={a11yHidden}>유저 정보</h1>
        <Button primary bold $width={235} $height={60}>
          로그인
        </Button>
      </section>

      <section className={feedSection}>
        <h1 className={a11yHidden}>전체 피드</h1>
        <OptionBar />
        {isFeedLoading ? (
          <LoadingSpinner title="피드 로딩중" />
        ) : (
          <ul>
            {feeds?.data.map((feed, index) => {
              return (
                // 처음을 제외한 3의 배수번째 인덱스마다 광고 하나씩 삽입
                <Fragment key={feed.id}>
                  {index !== 0 &&
                    index % 3 === 0 &&
                    (isAdsLoading ? (
                      <LoadingSpinner title="광고 로딩중" />
                    ) : (
                      isAdsVisible && (
                        <li className={cardList}>
                          <Card>
                            <AdsContent
                              ads={ads?.data[index / 3 - 1]}
                              onClick={handleHideAd}
                            />
                          </Card>
                        </li>
                      )
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
        {/* 피드 추가 요청시 로딩 처리. 
        스피너 크기의 공간을 확보해주기 주기 위해 스피너랑 똑같은 높이를가진 div 추가 */}
        {isLoadingMore ? (
          <LoadingSpinner title="피드 추가 로딩중" height="50px" width="50px" />
        ) : (
          <div className={spinnerArea}></div>
        )}
      </section>
    </div>
  );
};

export default FeedAllPage;
