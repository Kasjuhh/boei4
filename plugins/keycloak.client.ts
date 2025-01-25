import { vueKeycloak } from '@josempgon/vue-keycloak'

export default defineNuxtPlugin((nuxtApp) => {
  // nuxtApp.vueApp.use(vueKeycloak, {
  //   config: {
  //     url: 'https://aaad01.avans.nl:8000/realms/Boei4/protocol/openid-connect/auth&response_type=code&scope=openid',
  //     redirect_uri: 'http://localhost:3000/dashboard/',
  //     realm: 'boei4',
  //     clientId: 'MyApplication'
  //   },
  //   // init: {
  //   //   onLoad: 'login-required'
  //   // }
  // })
})