import './assets/main.css'
import 'primevue/resources/themes/lara-light-amber/theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService);
app.mount('#app')

app.component('Toast', Toast);