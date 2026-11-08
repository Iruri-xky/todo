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
.input-row { display: flex; gap: 8px; margin-bottom: 16px }
input { flex: 1; padding: 6px 10px; font-size: 14px }
button { padding: 8px 16px; cursor: pointer }
</style>