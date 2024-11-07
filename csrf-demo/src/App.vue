<template>
  <div>
    <h1>Hello App!</h1>
    <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>

    <nav v-if="loggedIn" aria-label="Site menu">
      <router-link to="/">Home Page</router-link>
      <router-link to="/change-password">Change Password</router-link>
      <a href="" @click="handleLogout">Logout</a>
    </nav>

    <nav v-else aria-label="Site menu">
      <router-link to="/login">Login</router-link>
    </nav>

    <main>
      <router-view :key="$route.fullPath" />
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import router from "./router";

const loggedIn = ref(false);

onMounted(() => {
  const { $cookies } = app.config.globalProperties;
  console.log("_ga", $cookies.get("_ga"));
  const token = Vue.$cookies.get("token");
  console.log("token", token);
  // const token = localStorage.getItem("token");
});

const handleLogout = () => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
};
</script>
