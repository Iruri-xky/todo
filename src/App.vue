<template>
  <main class="wrap">
    <h1>我的待办清单</h1>
    <TodoInput @add="addTodo" />
    <p class="stat">共{{ todos.length }}条 - 未完成{{ remaining }}条 - 完成率{{ rate }}%</p>
    <ul v-if="todos.length">
      <TodoItem
        v-for="item in todos"
        :key="item.id"
        :todo="item"
        @toggle="toggleTodo"
        @remove="removeTodo"
        @edit="editTodo"
      />
    </ul>
    <p v-else>还没有待办，加一条吧</p>    
  </main>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import TodoInput from './components/TodoTnput.vue'
import TodoItem from './components/TodoItem.vue'

const STORAGE_KEY = 'todo-app-v1'
const todos = ref([])
const remaining = computed(() => todos.value.filter(t => !t.done).length)
const rate = computed(() => {
  if (todos.value.length === 0) return 0
  return Math.round(todos.value.filter(t => t.done).length / todos.value.length * 100)

})

onMounted(() => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try { todos.value = JSON.parse(raw) }
    catch { todos.value = [] }
  }
})

watch(todos, (val) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
}, {deep: true})

function addTodo(text) {
  todos.value.push({
    id: Date.now(),
    text,
    done: false
  })
}
function toggleTodo(id) {
  const t = todos.value.find(t => t.id === id)
  if (t) t.done = !t.done
}
function removeTodo(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}
function editTodo({ id, text }) {
  const t = todos.value.find(t => t.id === id)
  if (t) t.text = text
}
</script>

<style scoped>
.wrap {
  max-width: 640px; margin: 40px auto; padding: 0 16px; font-family: sans-serif;
}
h1 {
  color: #41b883;
}
.stat {
  color: #666; font-size: 14px;
}
ul {
  padding: 0;
}
.empty {
  color: #999;
}
</style>