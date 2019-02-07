import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chatInfos, sendMessage } from '../actions';
import App from '../components/App.js';

class ChatInfosContainer extends Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    console.log("this.props in containers: ", this.props)
    return (
      <App chatInfos={this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  if (state) {
    const { chatRooms, chats } = state;

    chatRooms.allIds.forEach(id => {
      const chatList = chatRooms.byId[id].chatIds;

      chatRooms.byId[id]['lastMessage'] = chats.byId[chatList[chatList.length-1]].text;
      chatRooms.byId[id]['lastMessageId'] = chatList[chatList.length-1];
    });
  }

  return {
    chatRooms: state ? state.chatRooms : state,
    chats: state ? state.chats : state,
    users: state ? state.users : state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => {
      fetch("http://localhost:3000/chatData.json")
      .then(res => res.json())
      .then(chatData => {
        dispatch(chatInfos(chatData));
      })
      .catch(err => {
        console.log("err: ", err)
      });
    },
    sendMessage: (message) => {
      dispatch(sendMessage(message));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInfosContainer);
