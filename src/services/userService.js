import { httpService } from './httpService.js'
import { storageService } from './sessionStorage.js'

const STORAGE_KEY = 'loggedinUser'

export const userService = {
    query,
    login,
    logout,
    signup,
    loadUser,
    saveUser
}

async function query(filterBy) {
    return httpService.get(`user`, filterBy)
}

async function login(credentials) {
    const user = await httpService.post(`auth/login`, credentials);
    return _handleLogin(user);
}

async function logout() {
    storageService.clear();
    await httpService.post(`auth/logout`);
}


async function signup(credentials) {
    const newUser = await httpService.post(`auth/signup`, credentials);
    return _handleLogin(newUser);
}

async function loadUser() {
    const user = storageService.load(STORAGE_KEY)
    return user
}
function _handleLogin(user) {
    storageService.store(STORAGE_KEY, user)
    return user
}

async function saveUser(user) {
    const updatedUser = await httpService.put(`user/${user._id}`, user)
    // console.log('updatedUser', updatedUser) 
    return updatedUser
}