// import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../store/actions/userAction'
import { ProfileMenu } from './HeaderHome/ProfileMenu'

export const AppHeader = (props) => {

    const {loggedInUser} = useSelector(state => state.userModule)
    let history = useHistory();
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logout())
        history.push('/')
    }

    // useEffect(()=> {
    //     console.log('user', loggedInUser)
    // }, loggedInUser)

    const goToProfile = () => {
        history.push('/profile')
    }

    return(
        <header className="app-header flex space-between">
            <h1>Weplay</h1>
            <nav>
                <ul className="nav-list flex">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/station">Stations</Link></li>
                    {!loggedInUser && <li><Link to="/login">Login</Link></li>}
                    {loggedInUser && <ProfileMenu onLogout={onLogout} goToProfile={goToProfile}/>}
                </ul>
            </nav>
        </header>
    )
}