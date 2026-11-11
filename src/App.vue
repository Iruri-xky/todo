<template>
  <main class="wrap">
    <h1>我的待办清单</h1>
    <TodoInput @add="addTodo" />
    <p class="stat">共{{ todos.length }}条 - 未完成{{ remaining }}条 - 完成率{{ rate }}%</p>
    <div class="filter">
      <button v-for="f in status" :key="f.key" :class="{ active: filter === f.key }" @click="setFilter(f.key)">{{ f.label }}</button>
    </div>

    <div class="actions">
      <label>
        <input type="checkbox" :checked="allDone" @change="toggleAll">
        全选
      </label>
      <button @click="clearCompleted" :disabled="remaining === todos.length">
        清空已完成待办
      </button>
      <button @click="clearAll" :disabled="todos.length === 0">清空全部</button>
    </div>

    <ul v-if="filteredTodos.length">
      <TodoItem
        v-for="item in filteredTodos"
        :key="item.id"
        :todo="item"
        @toggle="toggleTodo"
        @remove="removeTodo"
        @edit="editTodo"
      />
    </ul>
    <p v-else-if="todos.length === 0" class="empty">还没有待办，加一条吧</p>
    <p v-else class="empty">当前筛选下没有待办</p>
  </main>
</template>

<script setup>
import TodoInput from './components/TodoTnput.vue';
import TodoItem from './components/TodoItem.vue';
import { useTodos } from './components/useTodos.js'

const {
  todos, filter, status, filteredTodos, remaining, rate, allDone,
  addTodo, toggleTodo, removeTodo, editTodo,
  setFilter, toggleAll, clearCompleted, clearAll
} = useTodos()
</script>

<style scoped>
.wrap { max-width: 640px; margin: 40px auto; padding: 0 16px; font-family: sans-serif }
h1 { color: #41b883 }
.stat { color: #666; font-size: 14px }
ul { padding: 0 }
.empty { color: #999 }
.filter { display: flex; gap: 8px; margin: 12px 0; }
.filter button { padding: 6px 14px; cursor: pointer; border: 1px solid #ccc; background: #fff; }
.filter .active { background: #41b883; color: #fff; border-color: #41b883}
.actions { display: flex; gap: 8px; align-items: center; margin: 12px 0; flex-wrap: wrap; }
.actions button { padding: 6px 14px; cursor: pointer; }
button:disabled { opacity: .5; cursor: not-allowed; }
</style>  