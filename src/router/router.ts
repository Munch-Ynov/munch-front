import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from '../shared/guards';
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
            beforeEnter: [isNotAuthenticatedGuard], 
            component: () => import('@/views/LoginView.vue')
        },
        {
            path: '/inscription',
            beforeEnter: [isNotAuthenticatedGuard],
            component: () => import('@/views/SigninView.vue')
        },
        {
            path: '/profil',
            beforeEnter: [isAuthenticatedGuard],
            component: () => import('@/views/ProfileView.vue')
        },
        {
            path: '/search',
            component: () => import('@/views/SearchView.vue')
        },
        {
            path: '/:notfound(.*)*',
            component: ()=> import('@/views/NotFound.vue')
        }
    ]
})

router.beforeEach(async () => {
    const userStore = useUser();
    if(!userStore.isAuth ){
        try{
            await userStore.fetchCurrentUser().catch(e => console.log(e));
        }
        catch(e){  
            console.log(e);        
        }
    }

})