const userReducer = (state,action)=>{
    switch(action.type){
        case 'REGISTER_USER':{
            return {state, user:action.payload}
        }
        case 'GET_USER':{
            return {...state,user:action.payload}
        }
        case 'UPDATE_VOTES':{
            return {...state,myVotes:{...state.myVotes,...action.payload}}
        }
        case 'GET_MY_VOTES':{
            return {...state,myVotes:action.payload}
        }
        case 'LOGOUT':{
            return {state,user:{}}
        }
        default : {
            return {...state}
        }
    }
}

export default userReducer