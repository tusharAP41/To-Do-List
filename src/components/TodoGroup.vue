<template>
  <div class="main-group-wrapper">
    <h3>{{ groupLabel[props.status] }} : {{ getCountForStatus(props.status) }}</h3>
    <div class="group-wrapper scrollable">
      <Draggable
        class="draggable"
        :list="todoList"
        group="todos"
        itemKey="id"
        @change="onDraggableChange"
      >
        <template #item="{ element: todo }">
          <li>
            {{ todo.title }}
            <span class="delete-icon" @click="deleteTodo(todo)">x</span>
            <div>
              <span class="todo-description">{{ todo.description }}</span>
            </div>
          </li>
        </template>
      </Draggable>
    </div>
    <CreateTodo :status="props.status" />
  </div>
</template>

<script setup lang="ts">
import { TodoStatus } from '@/types'
import { ref, defineProps, computed } from 'vue'
import Draggable from 'vuedraggable'
import useTodos from '@/store/useTodos'
import CreateTodo from './CreateTodo.vue'

interface Props {
  status: TodoStatus
}

const props = defineProps<Props>()

const { getTodosByStatus, deleteTodo, updateTodo } = useTodos()
const todoList = getTodosByStatus(props.status)

const groupLabel = {
  [TodoStatus.Pending]: 'Pending',
  [TodoStatus.InProgress]: 'In Progress',
  [TodoStatus.Completed]: 'Completed'
}

const onDraggableChange = (payload: any) => {
  if (payload?.added?.element?.status) {
    updateTodo(payload?.added?.element, props.status)
  }
}

// Compute count of tasks for each status
const pendingCount = computed(() => {
  return todoList.value.filter((todo) => todo.status === TodoStatus.Pending).length
})

const inProgressCount = computed(() => {
  return todoList.value.filter((todo) => todo.status === TodoStatus.InProgress).length
})

const completedCount = computed(() => {
  return todoList.value.filter((todo) => todo.status === TodoStatus.Completed).length
})

// Method to get count for a specific status
const getCountForStatus = (status: TodoStatus) => {
  switch (status) {
    case TodoStatus.Pending:
      return pendingCount.value
    case TodoStatus.InProgress:
      return inProgressCount.value
    case TodoStatus.Completed:
      return completedCount.value
    default:
      return 0
  }
}
</script>

<style scoped>
.main-group-wrapper {
  background-color: black;
  border-radius: 30px;
  padding: 20px;
}
.group-wrapper {
  flex: 1;
  padding: 20px;
  background-color: black;
  width: 300px;
}

.group-wrapper li {
  list-style-type: none;
  background: radial-gradient(circle at 10% 20%, rgb(255, 200, 124) 0%, rgb(252, 251, 121) 90%);
  color: black;
  padding: 2px 5px;
  cursor: grab;
  margin-bottom: 10px;
  border-radius: 8px;
}
.scrollable {
  height: 300px;
  overflow-y: auto;
}
.draggable {
  min-height: 200px;
}

.delete-icon {
  font-size: 14px;
  float: right;
  cursor: pointer;
  background-color: #ec1b1b;
  color: black;
  border-radius: 7px;
  padding: 0.01px 8px;
}

.todo-description {
  font-size: 12px;
}
</style>
