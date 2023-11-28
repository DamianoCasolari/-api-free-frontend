import { createRouter, createWebHistory } from 'vue-router';

import HomeView from './views/HomeView.vue';
import CreateView from './views/CreateView.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        // All routes 
        {
            'path': '/',
            'name': 'home',
            'component': HomeView

        },
        {
            'path': '/create',
            'name': 'create',
            'component': CreateView

        }

    ]

}
)
export { router };