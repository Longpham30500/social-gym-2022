import { DeleteData } from "../actions/globalTypes";
import { MESS_TYPES } from "../actions/messageAction";

const initialState = {
  users: [],
  data: [],
  resultData: 0,
  resultUsers: 0,
  firstLoad: false,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESS_TYPES.ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case MESS_TYPES.ADD_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload],
        users: state.users.map((user) =>
          user._id === action.payload.recipient ||
          user.id === action.payload.sender
            ? {
                ...user,
                text: action.payload.text,
                media: action.payload.media,
              }
            : user
        ),
      };
    case MESS_TYPES.GET_CONVERSATIONS:
      return {
        ...state,
        users: action.payload.newArr,
        resultUsers: action.payload.result,
        firstLoad: true,
      };
    case MESS_TYPES.GET_MESSAGES:
      return {
        ...state,
        data: action.payload.messages.reverse(),
        resultData: action.payload.result,
      };
    case MESS_TYPES.DELETE_CONVERSATION:
      return {
        ...state,
        users: DeleteData(state.users, action.payload),
        data: DeleteData(state.data, action.payload),
      };
    case MESS_TYPES.DELETE_MESSAGES:
      return {
        ...state,
        data: action.payload.newData,
        resultData: action.payload.newData.length,
      };

    default:
      return state;
  }
};

export default messageReducer;
