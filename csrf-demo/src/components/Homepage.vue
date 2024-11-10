<template>
  <div>
    <h1>Homepage</h1>

    <form @submit.prevent="addPost">
      <input type="text" v-model="post" />
      <button type="submit">Add Post</button>
    </form>

    <ul v-if="data">
      <li v-for="item in data" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const data = ref("");

const post = ref("this is new post " + Date.now());

onMounted(() => {
  getData();
});

const getData = async () => {
  const response = await fetch("http://localhost:5001/get-data");
  const res = await response.json();
  data.value = res.data;
};

const addPost = async () => {
  const response = await fetch("http://localhost:5001/add-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      content: post.value,
    }),
  });
  const res = await response.json();
  console.log("res", res);
  getData();
};
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
