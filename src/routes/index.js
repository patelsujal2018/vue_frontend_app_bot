import Frontend from '../layouts/Frontend';
import isjwtlogin from '../middlewares/isjwtlogin';

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register')
    },
    {
        path: '/account',
        component: Frontend,
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('../views/Home'),
                meta: {
                    middleware: [isjwtlogin],
                }
            },
            {
                path: 'settings',
                name: 'settings',
                component: () => import('../views/Settings'),
                meta: {
                    middleware: [isjwtlogin],
                }
            },
            {
                path: 'bot_menu_list',
                name: 'bot_menu_list',
                component: () => import('../views/BotMenuList'),
                meta: {
                    middleware: [isjwtlogin],
                }
            },
            {
                path: 'bot_menu_list/add',
                name: 'add_new_bot_menu',
                component: () => import('../views/AddNewBotMenu'),
                meta: {
                    middleware: [isjwtlogin],
                }
            },
            {
                path: 'bot_menu_list/edit/:id',
                name: 'edit_bot_menu',
                component: () => import('../views/EditBotMenu'),
                meta: {
                    middleware: [isjwtlogin],
                }
            }
        ]
    }
]

export default routes;