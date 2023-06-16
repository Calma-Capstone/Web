const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    };

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
            };
        
        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                token : null
            };
        default:
            return state;
    }
};

export { initialState, authReducer };