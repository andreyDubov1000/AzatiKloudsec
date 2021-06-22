const initialState: any = {
  user: "sdfadfsda",
};

const authReducer = function (state = initialState, action: any) {
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
      return { ...state };
    }
  }
};

export default authReducer;
