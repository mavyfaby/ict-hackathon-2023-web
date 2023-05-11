import { createRouter, createWebHistory } from "vue-router";
import { setTitle } from "../utils/page";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("../pages/LandingPage.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/login/LoginPage.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../pages/signup/SignupPage.vue")
  },
  {
    path: "/intern",
    name: "Intern",
    component: () => import("../pages/intern/InternPage.vue")
  },
  {
    path: "/mentor",
    name: "Mentor",
    component: () => import("../pages/mentor/MentorPage.vue")
  },
  {
    path: "/mentors",
    name: "Mentors",
    component: () => import("../pages/mentors/MentorsPage.vue")
  },
  {
    path: "/challenges",
    name: "Challenges",
    component: () => import("../pages/challenge/ChallengesPage.vue")
  },
  {
    path: "/challenge/:id",
    name: "Challenge",
    component: () => import("../pages/challenge/ChallengePage.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  setTitle(to.name as string);
});

/**
 * Navigation guards
 */

export default router;