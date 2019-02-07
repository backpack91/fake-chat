import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ChatList.scss';

class ChatList extends Component {
  renderChatRooms() {
    const { chatRooms, chats, users } = this.props.chatInfos;
    const sortetdChatRoomIds = chatRooms.allIds.sort((prevId, nextId) => {
      return chatRooms.byId[nextId].lastMessageId - chatRooms.byId[prevId].lastMessageId;
    });

    return sortetdChatRoomIds.map(id => {
      const userStyle = { backgroundImage: `url(${users.byId[chatRooms.byId[id].userId].img})` };
      const lastMessageId = chatRooms.byId[id].lastMessageId;
      const lastMessageSentTime = new Date(chats.byId[lastMessageId].time);
      let sentTimeShape;
      let minutes;

      if (lastMessageSentTime.getDate() === new Date().getDate()) {
        String(lastMessageSentTime.getMinutes()).length === 1 ?
          minutes = `0${lastMessageSentTime.getMinutes()}` :
          minutes = lastMessageSentTime.getMinutes();
        lastMessageSentTime.getHours() < 12 ?
          sentTimeShape = `오전 ${lastMessageSentTime.getHours()}:${minutes}` :
          sentTimeShape = `오후 ${lastMessageSentTime.getHours() - 12}:${minutes}`;
      } else {
        sentTimeShape = `${lastMessageSentTime.getMonth() + 1}월${lastMessageSentTime.getDate()}일`;
      }
      if (lastMessageSentTime.getYear() !== new Date().getYear()) {
        sentTimeShape = `${lastMessageSentTime.getYear() - 100}. ${lastMessageSentTime.getMonth() + 1}. ${lastMessageSentTime.getDate()}`;
      }

      return (
        <Link
          to={{
            pathname: `/chat/${users.byId[chatRooms.byId[id].userId].name}`,
            state: {
              chatRoomId: id,
              userName: users.byId[chatRooms.byId[id].userId].name,
              userId: chatRooms.byId[id].userId,
            }
          }}
          key={id}
        >
          <div className="chatRoom">
            <div className="userImg" style={userStyle}></div>
            <div className="chatRoomInfo">
              <div className="userName">
                {users.byId[chatRooms.byId[id].userId].name}
              </div>
              <div className="lastMessage">
                {chatRooms.byId[id].lastMessage}
              </div>
              <div className="lastMessageSentTime">
                {sentTimeShape}
              </div>
            </div>
          </div>
        </Link>
      );
    });
  }

  render () {
    return (
      <div className="chatList">
        <div className="title">
          CHAT
        </div>
        <div className="newMessageCreator">
          + New message
        </div>
        <div className="chatsWrapper">
          {this.props.chatInfos.chatRooms ? this.renderChatRooms() : ""}
        </div>
      </div>
    );
  }
}

export default ChatList;
