import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../App"
import { useDispatch } from "react-redux"

export function Navbar(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userState,userDispatch} = useContext(UserContext)
    const handleLogout = ()=>{
        userDispatch({type:'LOGOUT'})
        dispatch({type:'LOGOUT'})
        navigate('/')
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link class="navbar-brand" to="">DISH POLL</Link>
        {Object.values(userState.user).length>0 && (
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to='/dishes'>Dishes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/result'>Result</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
                    </li>
                </ul>
            </div>
        )}
        </nav>
    )
}