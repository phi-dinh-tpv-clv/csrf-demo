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
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const loggedIn = ref(false);
const route = useRoute();
const router = useRouter();

watch(
  () => route.fullPath,
  () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    console.log("document.cookie", document.cookie);
    console.log("loggedIn 12312312", token, loggedIn.value);

    if (token) {
      loggedIn.value = true;
    }
  }
);

onMounted(() => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  if (token) {
    loggedIn.value = true;
  } else {
    router.push("/login");
  }
});

const handleLogout = async () => {
  await fetch("http://localhost:5001/logout", {
    method: "POST",
    credentials: "include",
  });
};
</script>
