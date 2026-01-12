import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' // We will create this next
import vuetify from './plugins/vuetify'
import './style.css' // Standard Tailwind directives go here

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')