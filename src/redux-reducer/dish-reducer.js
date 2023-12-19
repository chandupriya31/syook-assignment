const initialState = {
    dishes:[]
}

export const dishReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'START_GET_DISHES':{
            return {...state,dishes:action.payload}
        }
        case 'LOGOUT':{
            return {}
        }
        default:{
            return {...state}
        }
    }
}