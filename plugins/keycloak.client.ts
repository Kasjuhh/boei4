import { vueKeycloak } from '@josempgon/vue-keycloak'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vueKeycloak, {
    config: {
      url: 'https://aaad01.avans.nl:8000/realms/Boei4/protocol/openid-connect/auth?client_id=account-console&redirect_uri=https%3A%2F%2Faaad01.avans.nl%3A8000%2Frealms%2FBoei4%2Faccount%2Fapplications&state=66d6d7bd-7964-47dd-afb8-76b03c95fdc9&response_mode=query&response_type=code&scope=openid&nonce=e6ef30f8-a51a-4e61-9cce-b33a86941eb2&code_challenge=Es2Ivo6c5lly-2N2WzyQz2Jwpr9-lFK5f2ETRDQHXjs&code_challenge_method=S256',
      realm: 'boei4',
      clientId: 'MyApplication'
    },
    init: {
      onLoad: 'login-required'
    }
  })
})