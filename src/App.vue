<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar-title class="title">TO  DO  LIST</v-toolbar-title>
    </v-app-bar>

    <v-main class="app-wrapper">
      <v-container>
        <TodoList />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import TodoList from "./components/TodoList.vue";
</script>

<style scoped>
.app-wrapper {
  padding: 16px;
}

.title {
  font-family: 'Roboto', sans-serif; /* Change the font to a Google Font */
  font-size: 4rem; /* Adjusted font size */
  font-weight: bold;
  color: black;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
}
</style>
