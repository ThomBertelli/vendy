import './assets/main.css';
import 'primevue/resources/themes/lara-light-amber/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';


import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';
import InputSwitch from 'primevue/inputswitch';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import InputNumber from 'primevue/inputnumber';
import { createPinia } from 'pinia';
import FileUpload from 'primevue/fileupload';
import Tooltip from 'primevue/tooltip';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(pinia)
app.use(ConfirmationService)

app.component('ToastPrime', Toast);
app.component('FloatLabel', FloatLabel);
app.component('PasswordInput', Password);
app.component('InputSwitch', InputSwitch);
app.component('ButtonPrime', Button);
app.component('InputText', InputText);
app.component('InputNumber',InputNumber)
app.component('FileUpload',FileUpload)
app.component('DialogPrime',Dialog)
app.component('ConfirmDialog',ConfirmDialog)

app.directive('tooltip', Tooltip);

app.mount('#app');
