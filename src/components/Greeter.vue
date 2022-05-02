<template>
    <div class="flex flex-col gap-2">
        <div class="mb-2 py-4 bg-purple-500 rounded-lg flex flex-col gap-2">
            <div class="text-center uppercase font-bold text-white text-sm">
                CURRENT GREET
            </div>
            <div class="text-center text-white">
                {{ greetResponse }}
            </div>
        </div>
        <SimpleButton text="Greet 👋🏻" :loading="executingGreet" @click="executeGreet()"/>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue"
    import SimpleButton from "./SimpleButton.vue"
    import { useEthSdk } from "../composables/use-eth-sdk"

    const sdk = useEthSdk()

    const executingGreet = ref(false)
    const greetResponse = ref(`Press the 'Greet' button to load the current greet!`)

    const executeGreet = async () => {
        if (!sdk || !sdk.value) {
            return
        }

        executingGreet.value = true

        greetResponse.value = await sdk.value.greeter.greet()

        executingGreet.value = false
    }
</script>
