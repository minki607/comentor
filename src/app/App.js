import { Switch, Route, Redirect } from "react-router-dom";
import Header from "containers/Header/Header";
import PageContainer from "containers/PageContainer.js/PageContainer";
import FeedAllPage from "pages/FeedAllPage/FeedAllPage";
import FeedPage from "pages/FeedPage/FeedPage";

const App = () => {
  return (
    <div className="App">
      <Header>[2021-05-18] 서민기</Header>
      <PageContainer>
        <Switch>
          <Route path="/" exact component={FeedAllPage} />
          <Route path="/post/:id" exact component={FeedPage} />
        </Switch>
      </PageContainer>
    </div>
  );
};

export default App;
