import { Switch, Route, Redirect } from "react-router-dom";
import Header from "containers/Header/Header";
import PageContainer from "containers/PageContainer/PageContainer";
import FeedAllPage from "pages/FeedAllPage/FeedAllPage";
import FeedPage from "pages/FeedPage/FeedPage";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import { useSelector, useDispatch } from "react-redux";
import Error from "components/Error/Error";
import { hideError } from "redux/error/error";

const App = () => {
  const { error, isOpen } = useSelector((state) => state.error);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Header info="[2021-05-18] 서민기" />
      {error && isOpen && (
        <Error message={error} onClick={() => dispatch(hideError())} />
      )}
      <PageContainer>
        <Switch>
          <Route path="/" exact component={FeedAllPage} />
          <Route path="/feed/:id" exact component={FeedPage} />
          <Route path="/page-not-found" component={PageNotFound} />
          <Redirect to="/page-not-found" />
        </Switch>
      </PageContainer>
    </div>
  );
};

export default App;
