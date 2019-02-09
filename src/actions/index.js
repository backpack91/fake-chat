import * as types from '../constants/ActionTypes';

export function chatInfos (chatInfos) {
  return {
    type: types.GET_CHAT_INFO,
    chatRooms: chatInfos.chatRooms,
    users: chatInfos.users,
    chats: chatInfos.chats
  };
}

export function sendMessage (message) {
  return {
    type: types.SEND_MESSAGE,
    text: message.text,
    time: message.time,
    userId: message.userId,
    id: message.id,
    chatRoomId: message.chatRoomId
  };
}
