import { createRouter, createWebHistory } from 'vue-router'
import { isNotAuthenticatedGuard } from '../shared/guards';
import { useUser } from '../shared/stores';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/views/HomeView.vue')
        },
        {
            path: '/connexion',
            //  
            component: () => import('@/views/LoginView.vue')
        },
        {
            path: '/inscription',
            // beforeEnter: [isNotAuthenticatedGuard],
            component: () => import('@/views/SigninView.vue')
        },
        {
            path: '/profil',
            // beforeEnter: [isNotAuthenticatedGuard],
            component: () => import('@/views/ProfileView.vue')
        },
        {
            path: '/:notfound(.*)*',
            component: ()=> import('@/views/NotFound.vue')
        }
    ]
})

router.beforeEach(async () => {
    const userStore = useUser();
    if(!userStore.loaded){
        await userStore.fetchCurrentUser();
    }
})