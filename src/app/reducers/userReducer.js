const initialState = {
    isLogged: false,
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN_USER':
            state={
                isLogged: action.login.logged,
            }
            return state;
        default:
            return state;
    }
}
export default userReducer
