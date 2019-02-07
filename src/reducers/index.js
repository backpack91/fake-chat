import * as types from '../constants/ActionTypes.js';
import _ from 'lodash';
const initialStates = {
  chatRooms: {allIds: [], byId:{}},
  users: {allIds: [], byId:{}},
  chats: {allIds: [], byId:{}}
};

export default function chatInfos (state = initialStates, action) {
  const clonedState = _.cloneDeep(state);
  console.log("clonedState: ", clonedState);

  switch (action.type) {
    case types.GET_CHAT_INFO :
      return {
        ...state,
        chatRooms: action.chatRooms,
        users: action.users,
        chats: action.chats,
      };

    case types.SEND_MESSAGE :
      const { chats, chatRooms } = clonedState;

      chats.allIds.push(action.id);
      chats.byId[action.id] = {
        id: action.id,
        text: action.text,
        time: action.time,
        userId: action.userId
      }
      chatRooms.byId[action.chatRoomId].chatIds.push(action.id);
      console.log("clonedState before RETURN: ", clonedState);
      return clonedState;

    default :
      return state;
  }
}
