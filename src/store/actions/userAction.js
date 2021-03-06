import { userService } from '../../services/userService.js'


export function loadUsers(filterBy) {
    return async (dispatch) => {
        try {
            const users = await userService.query(filterBy)
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('err userAction LOAD users', err);
        }
    }
}

export function login(userCred) {
    return async (dispatch) => {
        try {
            const user = await userService.login(userCred)
            dispatch({ type: 'LOGIN', user })
        } catch (err) {
            console.log('err userAction LOGIN USER', err);
        }
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({ type: 'LOGOUT' })
        } catch (err) {
            console.log('err userAction LOGOUT USER', err);
        }
    }
}

export function signup(userCred) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(userCred)
            dispatch({ type: 'SIGNUP', user })
        } catch (err) {
            console.log('err userAction SIGNUP USER', err);
        }
    }
}

export function loadUser(userCred) {
    return async (dispatch) => {
        try {
            const user = await userService.loadUser(userCred)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('err userAction LOAD USER', err);
        }
    }
}

export function saveUser(userCred) {
    return async (dispatch) => {
        try {
            const user = await userService.saveUser(userCred)
            dispatch({ type: 'SAVE_USER', user })
        } catch (err) {
            console.log('err userAction LOAD USER', err);
        }
    }
}

export function setUserFilter(filterBy) {
    return (dispatch) => { dispatch({ type: 'SET_FILTER', filterBy }) }
}
