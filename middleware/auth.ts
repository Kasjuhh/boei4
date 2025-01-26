import { useKeycloak } from "@josempgon/vue-keycloak";

export default defineNuxtRouteMiddleware((to, from) => {
    const keycloak = useKeycloak();

    const protectedRoutes = [
        "/gebruikers",
    ];

    const userHasAccess = (route: string): boolean => {
        const routeRolesMap: Record<string, string[]> = {
            "/gebruikers": ["Data-Engineer"],
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