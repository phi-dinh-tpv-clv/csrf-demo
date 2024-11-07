<template>
  <div>
    <h1>Homepage</h1>

    <ul v-if="data">
      <li v-for="item in data" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const data = ref("");

onMounted(() => {
  getData();
});

const getData = async () => {
  const response = await fetch("http://localhost:5001/get-data");
  const res = await response.json();
  data.value = res.data;
};
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
