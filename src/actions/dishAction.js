import axios from "axios"

export const startGetDishes = ()=>{
    return async(dispatch)=>{
        try{
            const dishes = await axios.get(' https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json')
            // console.log(dishes.data)
            dispatch(getDishes(dishes.data))
        }catch(e){
            console.log(e)
        }
    }
}

const getDishes = (data)=>{
    return {type:'START_GET_DISHES',payload:data}
}