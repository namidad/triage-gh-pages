const initialState = {
  victims: [],
}

const victimsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_VICTIMS':
            state={
                ...state,
                victims: action.victims,
            }
            return state;
        default:
            return state;
    }
}
export default victimsReducer
