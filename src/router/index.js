import { createRouter, createWebHistory} from "vue-router"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@/views/Accueil.vue')
        },
        {
            path: '/films',
            component: () => import('@/views/Films.vue')
        },
        {
            path: '/genres',
            component: () => import('@/views/Genre.vue')
        },
        {
            path: '/ajouterGenre',
            component: () => import('@/views/Genre.vue')
        },
        {
            path: '/participants',
            component: () => import('@/views/Participants.vue')
        },
        {
            path: '/membres',
            component: () => import('@/views/Membres.vue')
        },
        // on charge le même template sur la vue de création et d'affichage
        {
            path: '/films/ajouterFilm',
            component: () => import('@/views/Film.vue')
        },
        /*
         routes avec un paramètre variable :id
         on pourra recupérer l'id dans le composant avec :
         import { useRoute } from 'vue-router'
         const id = useRoute().params.id
        */

        {
            path: '/films/:id',
            component: () => import('@/views/Film.vue')
        },
        {
            path: '/films/:id/avis',
            component: () => import('@/views/Avis.vue')
        },
        {
            path: '/login',
            component: () => import('@/views/Login.vue')
        },
    ]
})

export default router
