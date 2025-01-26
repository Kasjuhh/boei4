<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 class="sr-only">Gebruikers</h1>
    <div class="flex items-center">
      <div class="flex justify-center items-center w-full">
        <div class="w-full">
          <ul class="bg-white rounded-lg shadow overflow-y-auto max-h-96">
            <li
              v-for="(gebruiker, index) in gebruikers"
              :key="index"
              class="px-6 py-4 border-b hover:bg-gray-50 cursor-pointer"
            >
              <strong class="pl-8">Naam:</strong> {{ gebruiker.naam }}
              <strong class="pl-8">Email:</strong> {{ gebruiker.email }}
              <strong class="pl-8">Rol:</strong> {{ gebruiker.rol }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Reuse lists for names and roles
const namen = [
  'Jan de Vries', 'Piet Jansen', 'Klaas Bakker', 'Maria Visser', 'Sanne Smit',
  'Anne de Boer', 'Robin Mulder', 'Daan de Groot', 'Laura Dijkstra', 'Sofie van Dijk'
]

const rollen = ['Admin', 'Gebruiker', 'Moderator', 'Gast', 'Beheerder']

// Generate a random fologin (e.g., username)
function randomFologin() {
  const adjectives = ['swift', 'brave', 'calm', 'bright', 'quiet', 'happy', 'bold', 'gentle']
  const nouns = ['lion', 'eagle', 'shark', 'tiger', 'bear', 'wolf', 'hawk', 'fox']
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const number = Math.floor(Math.random() * 1000)
  return `${adjective}${noun}${number}`
}

// Generate a random email based on fologin
function randomEmail(fologin: string) {
  const domains = ['example.com', 'mail.com', 'test.com', 'domain.com']
  const domain = domains[Math.floor(Math.random() * domains.length)]
  return `${fologin}@${domain}`
}

// Generate 10 random gebruikers
const gebruikers = ref(
  Array.from({ length: 10 }, () => {
    const naam = namen[Math.floor(Math.random() * namen.length)]
    const fologin = randomFologin()
    return {
      fologin: fologin,
      naam: naam,
      email: randomEmail(fologin),
      rol: rollen[Math.floor(Math.random() * rollen.length)]
    }
  })
)

const router = useRouter()
</script>

<style scoped>
/* Optional: Add transition for smoother hover effect */
li {
  transition: background-color 0.3s;
}

li:hover {
  background-color: #f9fafb; /* Equivalent to bg-gray-50 */
}

/* Ensure the cursor changes to pointer on hover */
li {
  cursor: pointer;
}
</style>