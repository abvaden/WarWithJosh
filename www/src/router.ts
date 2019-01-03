import VueRouter from 'vue-router';
import Loading from '@/views/Loading.vue';

export const router = new VueRouter({
    routes: [
        {
            path: '',
            component: Loading
        },
        {
            path: '/home',
            component: () => import("@/views/Home.vue")
        },
        { 
            path: '/game', 
            component: () => import('@/views/Game.vue')
        },
        {
            // will match everything
            path: '*',
            redirect: 'home'
        }
    ]
});