<template>
  <v-app>
    <v-app-bar app color="primary" class="bar">
      <div class="left-content">
        <v-toolbar-title class="title">To Do List</v-toolbar-title>
      </div>
      <div class="right-content">
        <v-btn text @click="goHome">Home</v-btn>
        <v-btn text @click="goLogin">Login</v-btn>
        <v-btn text @click="goSignUp">SignUp</v-btn>
      </div>
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

const goHome = () => {
  // Implement logic to navigate to home page
  console.log("Navigating to home...");
};

const goLogin = () => {
  // Implement logic to navigate to login page
  console.log("Navigating to login...");
};

const goSignUp = () => {
  // Implement logic to navigate to sign up page
  console.log("Navigating to sign up...");
};
</script>

<style scoped>
.app-wrapper {
  padding: 16px;
}
.bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
}
.left-content {
  margin-left: 30px; /* Adjust as needed */
}
.right-content {
  margin-right: 30px; /* Adjust as needed */
}
.right-content > * {
  margin-left: 30px; /* Adjust as needed */
}
.title {
  font-family: 'Helvetica Neue',cursive; /* Change the font to a Google Font */
  font-size: 1.75rem; /* Adjusted font size */
  font-weight: bold;
  color: grey;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
