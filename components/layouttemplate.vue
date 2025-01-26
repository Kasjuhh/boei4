<template>
  <div class="min-h-full">
    <div class="bg-teal-950 pb-32">
      <div id="star-container pb-32">
        <Disclosure as="nav" class="bg-teal-950" v-slot="{ open }">
          <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="border-b border-neutral-600">
              <div class="flex h-16 items-center justify-between px-4 sm:px-0">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <img class="h-12 w-12" src="/img/buoy.png" alt="BUOY logo" />
                  </div>
                  <div class="hidden md:block z-50">
                    <div class="ml-10 flex items-baseline space-x-4">
                      <a v-for="item in navigation" :key="item.name" :href="item.href"
                        :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                        :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
                    </div>
                  </div>
                </div>
                <div class="hidden md:block">
                </div>
                <div class="-mr-2 flex md:hidden">
                  <!-- Mobile menu button -->
                  <DisclosureButton
                    class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span class="absolute -inset-0.5" />
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                    <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                  </DisclosureButton>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel class="border-b border-gray-700 md:hidden">
            <div class="space-y-1 px-2 py-3 sm:px-3">
              <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href"
                :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
                :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
      <header class="py-10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-white">{{ pageTitle}}</h1>
        </div>
      </header>
    </div>

    <main class="-mt-32">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white px-5 py-6 shadow drop-shadow-2xl sm:px-6 min-h-80">
          <slot name="content" />
        </div>
      </div>
    </main>
  </div>
</template>
  
<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'


const router = useRouter();
const navigation = [
  { name: 'Boeien', href: '/boeien', current: false },
  { name: 'Afwijkingen', href: '/afwijkingen', current: false },
  { name: 'Notificaties', href: '/notificaties', current: false },
  { name: 'Sensoren', href: '/sensors', current: false },
  { name: 'Metingen', href: '/metingen', current: false },
  { name: 'Gebruikers', href: '/gebruikers', current: false },
  { name: 'Logout', href: 'https://aaad01.avans.nl:8000/realms/Boei4/protocol/openid-connect/logout', current: false }
]

const pageTitle = document.title;

</script>

<style>
#star-container {
  background: radial-gradient(rgb(var(--light-gold-rgb)), rgb(var(--dark-gold-rgb)));
  height: 100%;
  overflow: hidden;
  z-index: 0;
  position: relative;
}

#star-pattern {
  background-image: url("https://assets.codepen.io/1468070/Star+Pattern+3.svg");
  background-size: 10%;
  position: absolute;
  left: 50%;
  top: 0px;
  translate: -50% 0%;
  z-index: 0;
  height: 100%;
  width: 100%;
  min-width: 1200px;
  opacity: 0.10;
  animation: pan 180s linear infinite;
  will-change: background-position;
}

@keyframes pan {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 100% 0%;
  }
}
</style>