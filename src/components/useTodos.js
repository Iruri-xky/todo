import { onMounted, ref, watch, computed } from "vue"

const STORAGE_KEY = 'todo-app-v1'

export function useTodos() {
    // 状态
    const todos = ref([])
    const filter = ref('all')
    const status = ref([
        { key: 'all', label: '全部'},
        { key: 'active', label: '未完成'},
        { key: 'done', label: '已完成'}
    ])
    // 当地存储
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
    // 派生状态
    const remaining = computed(() => todos.value.filter(t => !t.done).length)
    const rate = computed(() => {
        if (todos.value.length === 0) return 0
        return Math.round(todos.value.filter(t => t.done).length / todos.value.length * 100)
    })
    const allDone = computed(() => {
        return todos.value.length > 0 && todos.value.every(t => t.done)
    })
    const filteredTodos = computed(() => {
        if (filter.value === 'active') return todos.value.filter(t => !t.done)
        if (filter.value === 'done') return todos.value.filter(t => t.done)
        return todos.value
    })
    // 单个操作
    function addTodo(text) {
        todos.value.push({ id: Date.now(), text, done: false})
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
    // 批量操作
    function setFilter(key) { filter.value = key}
    function toggleAll() {
        const target = !allDone.value
        todos.value.forEach(t => { t.done = target })
    }
    function clearCompleted() {
        todos.value = todos.value.filter(t => !t.done)
    }
    function clearAll() {
        if (!confirm('确定清空全部待办吗？')) return
        todos.value = []
    }
    // 导出
    return {
        todos, filter, status, filteredTodos, remaining, rate, allDone, 
        addTodo, toggleTodo, removeTodo, editTodo, 
        setFilter, toggleAll, clearCompleted, clearAll
    }
}