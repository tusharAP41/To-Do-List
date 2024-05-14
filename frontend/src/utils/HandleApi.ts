import axios from 'axios-typescript'
import { inject } from 'vue'
const state = inject('state')


const baseUrl = 'http://localhost:5000'

export const getAllToDo = async () => {
  try {
    const { data } = await axios.get(baseUrl)
    console.log('Type of data received:', typeof data)
    return data
  } catch (error) {
    console.error('Error fetching todos:', error)
    throw error
  }
}
export const addToDo = (title: string, description: string, status: string) => {
  console.log('Adding todo:', { title, description, status })
  axios
    .post(`${baseUrl}/save`, { title, description, status })
    .then((res) => {
      console.log(res)
      // state.push()
    })
    .catch((err) => console.log(err))
}
