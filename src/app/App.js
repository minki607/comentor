import Button from "components/Button/Button";
import Card from "components/Card/Card";
import FeedContent from "components/Contents/FeedContent";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeed } from "redux/storage/feedAll/feedAll";
import "./App.scss";

const App = () => {
  const { feeds } = useSelector((state) => state.feedAll);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  return (
    <div className="App">
      {/* <Button $width={235} $height={60}>
        로그인
      </Button> */}
      {feeds?.data.map((feed) => {
        return (
          <Card key={feed.id}>
            <FeedContent feed={feed} />
          </Card>
        );
      })}
    </div>
  );
};

export default App;
