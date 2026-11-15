<template>
  <main class="wrap">
    <h1>我的待办清单</h1>
    <TodoInput @add="addTodo" />
    <p class="stat">共{{ todos.length }}条 - 未完成{{ remaining }}条 - 完成率{{ rate }}%</p>
    <div class="filter">
      <button
        v-for="f in status"
        :key="f.key"
        :class="{ active: filter === f.key }"
        @click="setFilter(f.key)"
      >
        {{ f.label }}
      </button>
    </div>

    <div class="actions">
      <label>
        <input type="checkbox" :checked="allDone" @change="toggleAll" />
        全选
      </label>
      <button @click="clearCompleted" :disabled="remaining === todos.length">清空已完成待办</button>
      <button @click="clearAll" :disabled="todos.length === 0">清空全部</button>
    </div>

    <transition-group name="list" tag="ul" v-if="filteredTodos.length">
      <TodoItem
        v-for="item in filteredTodos"
        :key="item.id"
        :todo="item"
        @toggle="toggleTodo"
        @remove="removeTodo"
        @edit="editTodo"
      />
    </transition-group>
    <p v-else-if="todos.length === 0" class="empty">🎉 还没有待办，加一条吧</p>
    <p v-else class="empty">📭 当前筛选下没有待办</p>
  </main>
</template>

<script setup>
import TodoInput from './components/TodoTnput.vue';
import TodoItem from './components/TodoItem.vue';
import { useTodos } from './components/useTodos.js';

const {
  todos,
  filter,
  status,
  filteredTodos,
  remaining,
  rate,
  allDone,
  addTodo,
  toggleTodo,
  removeTodo,
  editTodo,
  setFilter,
  toggleAll,
  clearCompleted,
  clearAll,
} = useTodos();
</script>

<style scoped>
.wrap {
  max-width: 640px;
  margin: 32px auto;
  padding: 24px 20px;
  background: var(--color-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
h1 {
  color: var(--color-primary);
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
}
.stat {
  color: var(--color-text-light);
  font-size: 14px;
  text-align: center;
  margin: 12px 0;
}
ul {
  padding: 0;
}
.empty {
  color: var(--color-text-light);
  text-align: center;
}
.filter {
  display: flex;
  gap: 8px;
  margin: 12px 0;
}
.filter button,
.actions button {
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: var(--color-card);
  color: var(--color-text);
  font-size: 14px;
  transition: all 0.2s;
}
.filter .active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}
.actions {
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 12px 0;
  flex-wrap: wrap;
}
.actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.list-move {
  transition: transform 0.3s ease;
}
button:active {
  transform: scale(0.96);
}
@media (max-width: 480px) {
  .wrap {
    margin: 0;
    padding: 16px 12px;
    border-radius: 0;
    box-shadow: none;
    min-height: 100vh;
  }
  h1 {
    font-size: 24px;
    margin-bottom: 16px;
  }
  .filter,
  .actions {
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 6px;
  }
  .filter button,
  .actions button {
    padding: 8px 12px;
    font-size: 13px;
    white-space: nowrap;
  }
  .item {
    padding: 10px 12px;
    gap: 8px;
  }
}
</style>
