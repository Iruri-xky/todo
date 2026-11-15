<template>
  <li class="item">
    <input type="checkbox" :checked="todo.done" @change="emit('toggle', todo.id)" />

    <template v-if="editing">
      <input v-model.trim="draft" calss="edit-input" @keyup.enter="saveEdit" maxlength="200" />
      <button @click="saveEdit">保存</button>
    </template>
    <template v-else>
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="startEdit">编辑</button>
      <button @click="emit('remove', todo.id)">删除</button>
    </template>
  </li>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['toggle', 'remove', 'edit']);
const editing = ref(false);
const draft = ref('');

function startEdit() {
  draft.value = props.todo.text;
  editing.value = true;
}
function saveEdit() {
  const text = draft.value.trim();
  if (text) emit('edit', { id: props.todo.id, text });
  editing.value = false;
}
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  margin: 8px 0;
  gap: 12px;
  border-bottom: 1px solid var(--color-border);
  transition: background 0.15s;
}
.item:last-child {
  border-bottom: none;
}
.item:hover {
  background: #f0fff4;
}
.item input[type='checkbox'] {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  accent-color: var(--color-primary);
  cursor: pointer;
}
.item span {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-height: 4.5em;
}
.done {
  text-decoration: line-through;
  color: var(--color-text-light);
}
.item button {
  flex-shrink: 0;
  padding: 6px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background: transparent;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.15s;
}
.item button:hover {
  background: var(--color-bg);
}
.item button:last-child:hover {
  color: var(--color-danger);
  border-color: var(--color-danger);
}
.edit-input {
  flex: 1;
  min-width: 0;
  padding: 6px 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}
@media (max-width: 480px) {
  .item span {
    font-size: 15px;
  }
  .item {
    padding: 10px 12px;
    gap: 8px;
  }
}
</style>
