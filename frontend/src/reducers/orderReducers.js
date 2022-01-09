import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_RESET,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loding: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loding: false,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        loding: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myOrderReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return {
        loding: true,
      };
    case MY_ORDER_SUCCESS:
      return {
        loding: false,
        order: action.payload,
      };
    case MY_ORDER_FAIL:
      return {
        loding: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loding: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loding: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loding: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_REQUEST:
      return {
        loding: true,
      };
    case ALL_ORDER_SUCCESS:
      return {
        loding: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      };
    case ALL_ORDER_FAIL:
      return {
        loding: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

  
export const orderReducer = (state = {}, action) =>{
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        loding: true,
        ...state,
      };
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loding: false,
        isUpdated: action.payload,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loding: false,
        isDeleted: action.payload,
      };
    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        loding: false,
        error: action.payload,
      };

    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      }
    case DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
