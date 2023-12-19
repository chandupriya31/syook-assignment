import { createContext, useEffect, useReducer } from 'react';
import './App.css';
import Login from './components/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import userReducer from './reducer/userReducer';
import DishList from './components/Dishes/Dishes';
import { Navbar } from './components/navbars/NavBars';
import DishRanking from './components/Dishes/DishesList';

export const UserContext = createContext()

function App() {

  useEffect(()=>{
    JSON.parse(localStorage.getItem('user'))
    JSON.parse(localStorage.getItem(userState?.user.name))
  },[])

  const [userState,userDispatch] = useReducer(userReducer,{user:{},myVotes:[]})
  // console.log(userState)
  return (
    <div>
      <UserContext.Provider value={{userState,userDispatch}}>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element = {<Login/>}/>
            <Route path='/dishes' element = {<DishList/>}/>
            <Route path='/result' element={<DishRanking/>}/>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
