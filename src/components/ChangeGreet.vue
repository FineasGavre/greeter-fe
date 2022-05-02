<template>
    <div class="flex flex-col gap-2">
        <div v-if="executed" class="bg-green-500 rounded-md px-2 py-3 mb-2 text-white">
            Created transaction!
        </div>
        <input
            class="w-full border border-gray-400 rounded-md focus:ring focus:ring-blue-300 px-2 py-2"
            placeholder="Enter new greeting here..."
            v-model="newGreet"
        />
        <SimpleButton text="Change Greeting" :loading="executingChangeGreet" @click="executeChangeGreeting" />
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue"
    import SimpleButton from "./SimpleButton.vue"
    import { useEthSdk } from "../composables/use-eth-sdk"

    const newGreet = ref('')
    const executingChangeGreet = ref(false)
    const executed = ref(false)

    const sdk = useEthSdk()

    const executeChangeGreeting = async () => {
        if (!sdk || !sdk.value || !newGreet.value) {
            return
        }

        executingChangeGreet.value = true

        try {
            const result = await sdk.value.greeter.setGreeting(newGreet.value)
            executed.value = true
            newGreet.value = ''

            setTimeout(() => executed.value = false, 3000)
        } finally {
            executingChangeGreet.value = false
        }
    }
</script>
