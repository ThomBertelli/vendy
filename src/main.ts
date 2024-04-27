import './assets/main.css'
import 'primevue/resources/themes/lara-light-amber/theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';
import InputSwitch from 'primevue/inputswitch';
import Button from 'primevue/button';

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService);
app.mount('#app')

app.component('ToastPrime', Toast);
app.component('FloatLabel', FloatLabel);
app.component('PasswordInput', Password);
app.component('InputSwitch', InputSwitch);
app.component('ButtonPrime', Button);
app.component('InputText', InputText);