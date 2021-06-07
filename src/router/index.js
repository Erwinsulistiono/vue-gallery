import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
import MyGallery from '../views/MyGallery'
import Logout from '../views/Logout'
import EditUser from '../views/EditUser'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/edit-user',
        name: 'Edit',
        component: EditUser
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/My-Gallery',
        name: 'MyGallery',
        component: MyGallery
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router