<template>
    <li class="item">
        <input 
            type="checkbox"
            :checked="todo.done"
            @change="emit('toggle', todo.id)"
        >

        <template v-if="editing">
            <input v-model.trim="draft" @keyup.enter="saveEdit">
            <button @click="saveEdit">保存</button>
        </template>
        <template v-else>
            <span :class="{done: todo.done}">{{ todo.text }}</span>
            <button @click="startEdit">编辑</button>
            <button @click="emit('remove', todo.id)">删除</button>
        </template>
    </li>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    todo: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['toggle', 'remove', 'edit'])
const editing = ref(false)
const draft = ref('')

function startEdit() {
    draft.value = props.todo.text
    editing.value = true
}
function saveEdit() {
    const text = draft.value.trim()
    if (text) emit('edit', { id: props.todo.id, text})
    editing.value = false
}
</script>

<style scoped>
.item { display: flex; align-items: center; gap: 8px; margin: 8px 0; list-style: none;}
.item span {flex: 1;}
.done { text-decoration: line-through; color: #999;}
button { cursor: pointer;}
</style>