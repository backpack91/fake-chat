import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import ChatList from './ChatList';
import Chat from './Chat';
import NoMatch from './NoMatch';
import './App.scss';

class App extends Component {

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
