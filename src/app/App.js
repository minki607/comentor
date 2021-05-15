import { Switch, Route, Redirect } from "react-router-dom";
import Header from "containers/Header/Header";
import PageContainer from "containers/PageContainer.js/PageContainer";
import FeedAllPage from "pages/FeedAllPage/FeedAllPage";
import FeedPage from "pages/FeedPage/FeedPage";
import PageNotFound from "pages/PageNotFound/PageNotFound";

const App = () => {
  return (
    <div className="App">
      <Header info="[2021-05-18] 서민기" />
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
