<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TodoStatus } from '../types'
import TodoGroup from './TodoGroup.vue'
import { getAllToDo, addToDo } from '../utils/HandleApi'

const todoList = ref<Todo[]>([])

onMounted(async () => {
  try {
    todoList.value = await getAllToDo()
    console.log("This is Todo",todoList.value)
  } catch (error) {
    console.error('Failed to fetch todos:', error)
  }
})
</script>

<template>
  <div class="groups-wrapper">
    <TodoGroup :status="TodoStatus.Pending" />
    <TodoGroup :status="TodoStatus.InProgress" />
    <TodoGroup :status="TodoStatus.Completed" />
  </div>
</template>

<style scoped>
.groups-wrapper {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}
</style>
