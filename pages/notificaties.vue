<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 class="sr-only">Notificaties</h1>
    <div class="flex items-center">
      <div class="flex justify-center items-center w-full">
        <div class="w-full">
          <ul class="bg-white rounded-lg shadow overflow-y-auto max-h-96">
            <li
              v-for="(note, index) in notifications"
              :key="index"
              class="px-6 py-4 border-b hover:bg-gray-50 cursor-pointer"
            >
              <strong>afwijkingId:</strong> {{ note.afwijkingId }}
              <strong class="pl-8">gebruiker:</strong> {{ note.gebruikerId }}
              <strong class="pl-8">bericht:</strong> {{ note.bericht }}
              <strong class="pl-8">datum:</strong> {{ note.datum }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
function randomDate() {
  const now = new Date().getTime()
  const offset = Math.floor(Math.random() * 31536000000)
  return new Date(now - offset).toLocaleDateString()
}

// Dutch messages
const messages = [
  'PH Waarde verschil',
  'Lichtinval te hoog',
  'Netwerkonderbreking',
  'Lage batterij',
  'Drempelwaarde overschreden'
]

// Random names
const users = [
  'Jan', 'Piet', 'Klaas', 'Maria', 'Sanne',
  'Anne', 'Robin', 'Daan', 'Laura', 'Sofie'
]

const notifications = ref(
  Array.from({ length: 10 }, () => ({
    afwijkingId: Math.floor(Math.random() * 1000) + 1,
    gebruikerId: users[Math.floor(Math.random() * users.length)],
    bericht: messages[Math.floor(Math.random() * messages.length)],
    datum: randomDate()
  }))
)
</script>