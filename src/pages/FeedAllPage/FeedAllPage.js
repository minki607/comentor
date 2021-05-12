import React, { Fragment } from "react";
import Card from "components/Card/Card";
import FeedContent from "components/Contents/FeedContent/FeedContent";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeed } from "redux/storage/feedAll/feedAll";
import { page, userSection, feedSection } from "./FeedAllPage.module.scss";
import { resetList } from "styles/modules/common.module.scss";
import Button from "components/Button/Button";
import AdsContent from "components/Contents/AdsContent/AdsContent";

const FeedAllPage = () => {
  const { feeds } = useSelector((state) => state.feedAll);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

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
                {index !== 0 && index % 4 === 0 && (
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
