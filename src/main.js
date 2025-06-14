import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import './assets/main.css';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const app = createApp(App);
app.use(router);

app.mount('#app');
