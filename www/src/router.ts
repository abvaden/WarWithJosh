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
            path: '/design',
            component: () => import("@/views/AIDesign.vue")
        },
        {
            path: '/glossary',
            component: () => import("@/views/Glossary.vue")
        },
        {
            path: '/glossary/:CurrentWord',
            component: () => import("@/views/Glossary.vue"),
            props: true
        },
        {
            // Default if no other routes are matched then return back to the home page
            path: '*',
            redirect: 'home'
        }
    ]
});