import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Main from './Pages/Main/Main';
import MenuList from './Pages/MenuList/MenuList';
import ProdDetail from './Pages/ProdDetail/ProdDetail';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/menuList" component={MenuList} />
          <Route exact path="/prodDetail" component={ProdDetail} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
