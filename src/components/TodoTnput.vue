<template>
    <div class="input-row">
        <input 
            v-model.trim="newText"
            @keyup.enter="submit"
            placeholder="输入待办，回车提交"
        >
        <button @click="submit">提交</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const newText = ref('')
const emit = defineEmits(['add'])

function submit(){
    const text = newText.value.trim()
    if(!text) return
    emit('add', text)
    newText.value = ''
}
</script>

<style scoped>
.input-row { 
    display: flex; 
    gap: 8px; 
    margin-bottom: 16px }
.input-row input { 
    flex: 1; 
    padding: 10px 12px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    font-size: 16px; 
    outline: none;
    transition: border-color 0.2s;
}
.input-row input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(65, 184, 131, 0.15);
}
.input-row button {
    padding: 10px 20px; 
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--radius);
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s;
}
.input-row button:hover {
    background: var(--color-primary-dark);
}
@media (max-width: 480px) {
  .input {
    font-size: 16px;
    padding: 12px;
  }
  .input-row button {
    padding: 12px 16px;
  }
}
</style>