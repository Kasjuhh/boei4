<template>
  <Layouttemplate>
      <template #content>
          <NuxtPage/>
      </template>
  </Layouttemplate>
</template>

<script setup>
import { useKeycloak } from '@josempgon/vue-keycloak/dist/types/composable';

definePageMeta({
  middleware: ["auth"]
})

const keycloak = useKeycloak();

console.log("Auth middleware", keycloak.isAuthenticated, to.path);
console.log("Roles", keycloak.roles);
console.log("Resource roles", keycloak.resourceRoles);
console.log("User ID", keycloak.userId);
console.log("Username", keycloak.username);
console.log("Token", keycloak.token);
console.log("Decoded token", keycloak.decodedToken);
console.log("Has roles", keycloak.hasRoles(["Data-Engineer"]));
console.log("Has resource roles", keycloak.hasResourceRoles(["Data-Engineer"], "Boei4"));

</script>