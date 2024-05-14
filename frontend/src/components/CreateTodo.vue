<script setup lang="ts">
import type { Todo, TodoStatus } from '../types'
import { reactive, ref } from 'vue'
import useTodos from '../store/useTodos'
import { addToDo } from '../utils/HandleApi'
interface Props {
  status: TodoStatus
}
const props = defineProps<Props>()
const shouldDisplayForm = ref(false)

const { addNewTodo } = useTodos()

const newTodo = reactive<Omit<Todo, 'id'>>({
  title: '',
  description: '',
  status: props.status
})

const resetForm = () => {
  shouldDisplayForm.value = false
  newTodo.title = ''
  newTodo.description = ''
}

const handleOnSubmit = async () => {
  if (!newTodo.title.trim() && !newTodo.description.trim()) {
    alert('Please add your task before submitting.')
    return
  }
  try {
    await addToDo(newTodo.title, newTodo.description, props.status)
    console.log(newTodo.title, newTodo.description, props.status)
    resetForm()
  } catch (error) {
    console.error('Failed to add todo:', error)
  }
}
</script>

<template>
  <div
    class="todoAdd"
    :class="{ 'before-click': !shouldDisplayForm, 'after-click': shouldDisplayForm }"
  >
    <h3
      v-if="!shouldDisplayForm"
      @click="shouldDisplayForm = !shouldDisplayForm"
      :class="{ 'bottom-position': !shouldDisplayForm, 'top-position': shouldDisplayForm }"
    >
      Add New
    </h3>
    <template v-else>
      <h1 class="task">Add New Task</h1>
      <form @submit.prevent="handleOnSubmit">
        <div class="title">
          <input type="text" placeholder="Title" v-model="newTodo.title" />
        </div>
        <div class="description">
          <textarea type="text" placeholder="Description" v-model="newTodo.description" />
        </div>

        <button type="submit" class="submit-button">Submit</button>
        <button type="button" class="cancel-button" @click="resetForm">Cancel</button>
      </form>
    </template>
  </div>
</template>
<style scoped>
.before-click {
  background-color: black;
  color: white;
}

.after-click {
  background-color: rgb(0, 255, 179);
}

.bottom-position {
  position: absolute;
  bottom: 0;
  transition: all 0.5s ease;
}

.top-position {
  position: absolute;
  top: 0;
  transition: all 0.5s ease;
}
.submit-button,
.cancel-button {
  border-radius: 9%;
  padding: 8px 16px;
  margin-right: 8px;
}
.todoAdd {
  padding: 20px;
  color: white;
  border-radius: 15px;

  margin: 20px;
}

.submit-button {
  background-color: #007bff;
  color: white;
}
h1 {
  color: black;
  font-size: 15px;
}
.cancel-button {
  background-color: #6c757d;
  color: white;
}
.task {
  width: 100px;
  border-radius: 5px;
}
textarea {
  width: 200px;
  height: 50px;
}
input {
  width: 200px;
}
h3 {
  color: rgb(134, 131, 131);
}
</style>
