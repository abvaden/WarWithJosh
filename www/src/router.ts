import VueRouter from 'vue-router';
import Loading from '@/views/Loading.vue';

export const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Loading
        },
        { 
            path: '/game', 
            component: () => import('@/views/Game.vue')
        }
    ]
});