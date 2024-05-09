<script setup lang="ts">
import type { Todo, TodoStatus } from '@/types'
import { reactive, ref } from 'vue'
import useTodos from '@/store/useTodos'

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

const handleOnSubmit = () => {
  addNewTodo({
    id: Math.random() * 10000000000000000,
    ...newTodo
  })

  resetForm()
}
</script>

<template>
  <div>
    <h3 v-if="!shouldDisplayForm" @click="shouldDisplayForm = !shouldDisplayForm">Add New</h3>
    <template v-else>
      <form @submit.prevent="handleOnSubmit">
        <div>
          <input type="text" placeholder="Title" v-model="newTodo.title" />
        </div>
        <div>
          <textarea type="text" placeholder="Description" v-model="newTodo.description" />
        </div>

        <button type="submit" class="submit-button">Submit</button>
        <button type="button" class="cancel-button" @click="resetForm">Cancel</button>
      </form>
    </template>
  </div>
</template>
<style scoped>
.submit-button,
.cancel-button {
  border-radius: 9%;
  padding: 8px 16px;
  margin-right: 8px;
}

.submit-button {
  background-color: #007bff;
  color: white;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
}
</style>
