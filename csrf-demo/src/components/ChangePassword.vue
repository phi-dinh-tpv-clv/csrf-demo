<template>
  <div class="login">
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <div class="form-group">
        <label for="confirm_password">Confirm Password</label>
        <input
          type="confirm_password"
          id="confirm_password"
          v-model="confirm_password"
          required
        />
      </div>

      <button type="submit">Change Password</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ChangePassword",
  setup() {
    const password = ref("");
    const confirm_password = ref("");

    const handleLogin = () => {
      // Simple login handler logic here
      alert(`Logging in with email: ${password.value}`);
    };

    return {
      password,
      confirm_password,
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
