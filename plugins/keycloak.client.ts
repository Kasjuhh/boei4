import { vueKeycloak } from '@josempgon/vue-keycloak'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vueKeycloak, {
    config: {
      url: 'https://aaad01.avans.nl:8000',
      realm: 'Boei4',
      clientId: 'MyApplication',
      redirect_uri: 'https://boei4-gqenfxb7fsa6cjg7.westeurope-01.azurewebsites.net/'
    },
    init: {
      onLoad: 'login-required'
    }
  })
})