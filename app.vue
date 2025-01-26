<!-- filepath: /c:/Users/k/Documents/School/boeifront/app.vue -->
<template>
  <Layouttemplate>
    <template #content>
      <NuxtPage />
      
      <!-- Debug Logs -->
      <div class="debug-logs mt-4 p-4 bg-gray-100 rounded-lg">
        <h2 class="text-xl font-semibold mb-2">Keycloak Debug Information</h2>
        <p><strong>isAuthenticated:</strong> {{ keycloak.isAuthenticated }}</p>
        <p><strong>Roles:</strong> {{ keycloak.roles.join(', ') }}</p>
        <p><strong>Resource Roles:</strong> {{ keycloak.resourceRoles['Boei4']?.join(', ') || 'None' }}</p>
        <p><strong>User ID:</strong> {{ keycloak.userId }}</p>
        <p><strong>Username:</strong> {{ keycloak.username }}</p>
        <p><strong>Token:</strong> {{ keycloak.token }}</p>
        <p><strong>Decoded Token:</strong> {{ decodedToken }}</p>
        <p><strong>Has roles ["Data-Engineer"]:</strong> {{ keycloak.hasRoles(['Data-Engineer']) }}</p>
        <p><strong>Has resource roles ["Data-Engineer"] on "Boei4":</strong> {{ keycloak.hasResourceRoles(['Data-Engineer'], 'Boei4') }}</p>
        <p><strong>Current Path:</strong> {{ route.path }}</p>
      </div>
    </template>
  </Layouttemplate>
</template>

<script setup>
import { useKeycloak } from '@josempgon/vue-keycloak/dist/types/composable';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

definePageMeta({
  middleware: ['auth'],
});

const keycloak = useKeycloak();
const route = useRoute();

// Compute decoded token for display purposes
const decodedToken = computed(() => {
  try {
    return JSON.stringify(keycloak.decodedToken, null, 2);
  } catch (error) {
    return 'Invalid Token';
  }
});

// Optional: Remove console logs if not needed
console.log('Auth middleware', keycloak.isAuthenticated, route.path);
console.log('Roles', keycloak.roles);
console.log('Resource roles', keycloak.resourceRoles);
console.log('User ID', keycloak.userId);
console.log('Username', keycloak.username);
console.log('Token', keycloak.token);
console.log('Decoded token', keycloak.decodedToken);
console.log('Has roles', keycloak.hasRoles(['Data-Engineer']));
console.log('Has resource roles', keycloak.hasResourceRoles(['Data-Engineer'], 'Boei4'));
</script>

<style scoped>
.debug-logs {
  font-family: Arial, sans-serif;
}

.debug-logs p {
  margin: 4px 0;
}

.debug-logs strong {
  display: inline-block;
  width: 220px;
}
</style>