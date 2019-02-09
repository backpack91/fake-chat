import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import NoMatch from './NoMatch';
import './Chat.scss';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.inputBox = React.createRef();
    this.chatWrapper = React.createRef();
    this.sendMessageOnClick = this.sendMessageOnClick.bind(this);
    this.sendMessageOnKeyDown = this.sendMessageOnKeyDown.bind(this);
  }

  componentDidUpdate() {
    let chatWrapper;
    let inputBox;

    if (this.props.location.state) {
      chatWrapper = this.chatWrapper.current;
      inputBox = this.inputBox.current;
      chatWrapper.scrollTop = chatWrapper.scrollHeight;
      inputBox.focus();
    }
  }

  componentDidMount() {
    let chatWrapper;
    let inputBox;

    if (this.props.location.state) {
      chatWrapper = this.chatWrapper.current;
      inputBox = this.inputBox.current;
      chatWrapper.scrollTop = chatWrapper.scrollHeight;
      inputBox.focus();
    }
  }

  renderChats() {
    const { chatRoomId } = this.props.location.state;
    const { chatRooms, chats, users } = this.props.chatInfos;
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    let prevDate = new Date();

    return chatRooms.byId[chatRoomId].chatIds.map(id => {
      let timeAfterNoon;
      let timeBeforeNoon;
      let minutes;
      const sentTime = new Date(chats.byId[id].time);
      const isDifferentDate = sentTime.getDate() !== prevDate.getDate();
      const yearMonthDate = `${sentTime.getYear() + 1900}년 ${sentTime.getMonth() + 1}월 ${sentTime.getDate()}일 (${days[sentTime.getDay()]})`;
      const userImgStyle = { backgroundImage: `url(${users.byId[chats.byId[id].userId].img})` };

      String(sentTime.getMinutes()).length === 1 ?
        minutes = `0${sentTime.getMinutes()}` :
        minutes = sentTime.getMinutes();
      sentTime.getHours() <= 12 ?
        timeBeforeNoon = `오전 ${sentTime.getHours()}:${minutes}` :
        timeAfterNoon = `오후 ${sentTime.getHours() - 12}:${minutes}`;
      prevDate = sentTime;

      if (chats.byId[id].userId === 1) {
        return (
          <Fragment key={id}>
            {
              isDifferentDate ?
                <div className="dateDividerWrapper">
                  <div className="dateDivider"></div>
                  <div className="prevDate">{yearMonthDate}</div>
                </div> :
                ""
            }
            <div className="messageOfMine">
              <div className="imgWrapper" style={userImgStyle}>
              </div>
              <div className="dataWrapper">
                {sentTime.getHours() > 12 ? timeAfterNoon : timeBeforeNoon}
              </div>
              <div className="textWrapper">
                {chats.byId[id].text}
              </div>
            </div>
          </Fragment>
        );
      } else {
        return (
          <Fragment key={id}>
            {
              isDifferentDate ?
                <div className="dateDividerWrapper">
                  <div className="dateDivider"></div>
                  <div className="prevDate">{yearMonthDate}</div>
                </div> :
                ""
            }
            <div className="messagetOfTheOtherPerson">
              <div className="imgWrapper" style={userImgStyle}>
              </div>
              <div className="textWrapper">
                {chats.byId[id].text}
              </div>
              <div className="dataWrapper">
                {sentTime.getHours() > 12 ? timeAfterNoon : timeBeforeNoon}
              </div>
            </div>
          </Fragment>
        );
      }
    });
  }

  sendMessageOnClick () {
    const { sendMessage, chats } = this.props.chatInfos;
    const inputBox = this.inputBox.current;
    const newId = chats.allIds[chats.allIds.length - 1] + 1;
    const today = new Date();

    if (inputBox.value.length > 0) {
      sendMessage({
        text: inputBox.value,
        time: `${today.getYear()+1900}-${today.getMonth() + 1}-${today.getDate()}`,
        userId: 1,
        id: newId,
        chatRoomId: this.props.location.state.chatRoomId
      });

      inputBox.value = '';
      inputBox.focus();
    }
  }

  sendMessageOnKeyDown (event) {
    if(event.keyCode === 13 && event.target.value.length > 0){
      const { sendMessage, chats } = this.props.chatInfos;
      const inputBox = event.target;
      const newId = chats.allIds[chats.allIds.length - 1] + 1;
      const today = new Date();

      sendMessage({
        text: inputBox.value,
        time: `${today}`,
        userId: 1,
        id: newId,
        chatRoomId: this.props.location.state.chatRoomId
      });
      inputBox.value = '';
    }
  }

  render () {
    const { chatInfos, location } = this.props;

    return (
      <Fragment>
      {
        location.state ?
        <div className="chatList">
          <div className="header">
            <div>
              <Link to='/chatList'>
                뒤로
              </Link>
            </div>
            <div>{location.state.userName}</div>
            <div></div>
          </div>
          <div className="chatWrapper" ref={this.chatWrapper}>
            {chatInfos.chatRooms.allIds.length ? this.renderChats() : ""}
          </div>
          <div className="inputWrapper">
            <input placeholder="type here :)" ref={this.inputBox} onKeyDown={this.sendMessageOnKeyDown}></input>
            <div className="buttonWrapper">
              <button onClick={this.sendMessageOnClick}>보내기</button>
            </div>
          </div>
        </div> :
        <NoMatch />
      }
      </Fragment>
    );
  }
}

export default Chat;
