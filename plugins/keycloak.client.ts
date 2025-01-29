import { vueKeycloak } from '@josempgon/vue-keycloak'

export default defineNuxtPlugin((nuxtApp) => {
  const silentCheckSsoRedirectUri = `${window.location.origin}/assets/silent-check-sso.html`
  nuxtApp.vueApp.use(vueKeycloak, {
    config: {
      url: 'https://aaad01.avans.nl:8000',
      realm: 'Boei4',
      clientId: 'MyApplication',
    },
    init: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri,
    }
  })
})