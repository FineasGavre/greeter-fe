<template>
    <button
        :disabled="loading"
        :class="{
            'bg-blue-600': loading,
            'bg-blue-400 hover:bg-blue-500 hover:cursor-pointer': !loading
        }"
        class="text-center text-white font-bold p-2 rounded-md"
    >
        {{ buttonText }}
    </button>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue"

const props = defineProps<{
    text: string,
    loading: boolean
}>()

const { text, loading } = toRefs(props)

const buttonText = computed(() => loading.value ? 'Executing...' : text.value)
</script>
