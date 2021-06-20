const initialState: any[] = [];

const AuthReducer = function (state = initialState, action: any) {
  switch (action.type) {
    // case GET_NOTIFICATION: {
    //     return [...action.payload]
    // }
    // case CREATE_NOTIFICATION: {
    //     return [...action.payload]
    // }
    // case DELETE_NOTIFICATION: {
    //     return [...action.payload]
    // }
    // case DELETE_ALL_NOTIFICATION: {
    //     return [...action.payload]
    // }
    default: {
      return [...state];
    }
  }
};

export default AuthReducer;
