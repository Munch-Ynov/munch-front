import { createRouter, createWebHistory } from "vue-router";
import { useUser } from "../shared/stores";
import { isAuthenticatedGuard } from "@/shared/guards/auth.guards";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/connexion",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/inscription",
      component: () => import("@/views/SigninView.vue"),
    },
    {
      path: "/profil",
      beforeEnter: [isAuthenticatedGuard],
      component: () => import("@/views/ProfileView.vue"),
    },
    {
      path: "/:notfound(.*)*",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

router.beforeEach(async () => {
  const userStore = useUser();
  if (!userStore.isAuth) {
    await userStore.fetchCurrentUser();
  }
});
