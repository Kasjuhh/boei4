<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 class="sr-only">Afwijkingen</h1>
    <div class="flex items-center">
      <div class="flex justify-center items-center w-full">
        <div class="w-full">
          <ul class="bg-white rounded-lg shadow overflow-y-auto max-h-96">
            <li
              v-for="(af, index) in afwijkingen"
              :key="index"
              class="px-6 py-4 border-b hover:bg-gray-50 cursor-pointer"
            >
              <strong>metingId:</strong> {{ af.metingId }}
              <strong class="pl-8">afwijkingType:</strong> {{ af.afwijkingType }}
              <strong class="pl-8">ernst:</strong> {{ af.ernst }}
              <strong class="pl-8">beschrijving:</strong> {{ af.beschrijving }}
            </li>
          </ul>

                <!-- Debug Logs -->
      <div class="debug-logs mt-4 p-4 bg-gray-100 rounded-lg">
        <h2 class="text-xl font-semibold mb-2">Keycloak Debug Information</h2>
        <p><strong>isAuthenticated:</strong> {{ isAuthenticated }}</p>
        <p><strong>isPending:</strong> {{ isPending }}</p>
        <p><strong>hasFailed:</strong> {{ hasFailed }}</p>
        <p><strong>token:</strong> {{ token }}</p>
        <p><strong>decodedToken:</strong> {{ decodedToken }}</p>
        <p><strong>username:</strong> {{ username }}</p>
        <p><strong>userId:</strong> {{ userId }}</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useKeycloak } from '@josempgon/vue-keycloak'
import { ref } from 'vue'
const {
  // Reactive State
  keycloak,
  isAuthenticated,
  isPending,
  hasFailed,
  token,
  decodedToken,
  username,
  userId,
  roles,
  resourceRoles,

  // Functions
  hasRoles,
  hasResourceRoles,
} = useKeycloak()
function randomSeverity() {
  const levels = ['Laag', 'Middel', 'Hoog']
  return levels[Math.floor(Math.random() * levels.length)]
}

const messages = [
  'PH Waarde verschil',
  'Lichtinval te hoog',
  'Netwerkonderbreking',
  'Lage batterij',
  'Drempelwaarde overschreden'
]

const afwijkingen = ref(
  Array.from({ length: 10 }, () => ({
    metingId: Math.floor(Math.random() * 1000) + 1,
    afwijkingType: messages[Math.floor(Math.random() * messages.length)],
    ernst: randomSeverity(),
    beschrijving: 'Beschrijving van de afwijking...'
  }))
)

console.error('Keycloak', keycloak, 'isAuthenticated', isAuthenticated, 'isPending', isPending, 'hasFailed', hasFailed, 'token', token, 'decodedToken', decodedToken, 'username', username, 'userId', userId, 'roles', roles, 'resourceRoles', resourceRoles);


</script>