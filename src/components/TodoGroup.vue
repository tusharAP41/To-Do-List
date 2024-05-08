<script setup lang="ts">
import { TodoStatus } from "@/types";
import Draggable from "vuedraggable";
import useTodos from "@/store/useTodos";
import CreateTodo from "./CreateTodo.vue";
interface Props {
  status: TodoStatus;
}

const props = defineProps<Props>();

const { getTodosByStatus, deleteTodo, updateTodo } = useTodos();
const todoList = getTodosByStatus(props.status);

const groupLabel = {
  [TodoStatus.Pending]: "Pending",
  [TodoStatus.InProgress]: "In Progress",
  [TodoStatus.Completed]: "Completed",
};

const onDraggableChange = (payload: any) => {
  if (payload?.added?.element?.status) {
    updateTodo(payload?.added?.element, props.status);
  }
};
</script>

<template>
  <div class="group-wrapper">
    <h3>{{ groupLabel[props.status] }}</h3>

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

    <CreateTodo :status="props.status" />
  </div>
</template>

<style scoped>
.group-wrapper {
  flex: 1;
  padding: 20px;
  background-color:black;
  width: 300px;
  border-radius: 5%;
}

.group-wrapper li {
  list-style-type: none;
  background-color: rgba(241, 189, 18, 0.733);
  color:black ;
  padding: 2px 5px;
  cursor: grab;
  margin-bottom: 10px;
  border-radius: 2%;

}

.draggable {
  min-height: 200px;
}

.delete-icon {
  float: right;
  cursor: pointer;
  background-color: #ec1b1b; 
  color: white; 
  border-radius: 20%; 
  padding: 0.01px 8px; 
}

.todo-description {
  font-size: 12px;
}
</style>
