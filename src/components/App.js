import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.scss';
import ChatList from './ChatList.js';
import Chat from './Chat.js';
import NoMatch from './NoMatch.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Switch>
            <Route
              exact path='/'
              render={()=>
              <Redirect
                to={{
                  pathname: '/chatList',
                  exact: true
                }}
              />}
            />
            <Route exact path='/chatList' render={ props => <ChatList {...props} chatInfos={this.props.chatInfos}/> }/>
            <Route exact path='/chat/:id' render={ props => <Chat {...props} chatInfos={this.props.chatInfos}/> }/>
            <Route render={() => <NoMatch />} />
          </Switch>
      </Fragment>
      </Router>
    );
  }
}

export default App;
