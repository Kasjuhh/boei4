import { useKeycloak } from "@josempgon/vue-keycloak";

export default defineNuxtRouteMiddleware((to, from) => {
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
    
    const protectedRoutes = [
        "/afwijkingen",
    ];

    const userHasAccess = (route: string): boolean => {
        const routeRolesMap: Record<string, string[]> = {
            "/afwijkingen": ["Data-Engineer"],
        };

        const requiredRoles = routeRolesMap[route];
        if (!requiredRoles) {
            return true;
        }
        return keycloak.hasRoles(requiredRoles);
    };

    const isProtected = protectedRoutes.some(route => to.path.startsWith(route));

    if (isProtected) {
        if (!keycloak.isAuthenticated) {
            // Let Keycloak handle the redirection to the login page
            return false;
        }

        if (!userHasAccess(to.path)) {
            // Redirect to the 403 Forbidden page
            return navigateTo('/403');
        }
    }

    return true;
});