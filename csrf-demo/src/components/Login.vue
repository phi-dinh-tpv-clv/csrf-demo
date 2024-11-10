<template>
  <div class="login">
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Username</label>
        <input type="text" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  setup() {
    const router = useRouter();

    const email = ref("user123");
    const password = ref("abcd1234");

    const handleLogin = async () => {
      // Simple login handler logic here
      console.log(
        `Logging in with: ${email.value}, password: ${password.value}`
      );
      const res = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log("res", data);
      router.push("/");
    };

    return {
      email,
      password,
      handleLogin,
    };
  },
});
</script>

<style scoped>
.login {
  max-width: 320px;
  margin: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
input {
  width: 300px;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 0.7rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
