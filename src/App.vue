<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="border bg-white border-gray-300 rounded-lg shadow-red-200 shadow-lg min-w-[30%]">
            <div class="p-4">
                <div class="text-xl font-bold">Greeter Test</div>
                <div class="text-sm" v-if="address">
                    Connected to Wallet: <span class="font-bold">{{ address }}</span>
                </div>
            </div>
            <div v-if="address">
                <div class="h-[1px] bg-gray-300"></div>
                <div class="p-4"><Greeter /></div>
                <div class="h-[1px] bg-gray-300"></div>
                <div class="p-4"><ChangeGreet /></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Greeter from './components/Greeter.vue'
    import { onMounted, provide, ref } from "vue"
    import { ethers } from "ethers"
    import { getRopstenSdk, RopstenSdk } from "@dethcrypto/eth-sdk-client"
    import { ethSdkInjectionKey } from "./composables/use-eth-sdk"
    import ChangeGreet from "./components/ChangeGreet.vue"

    const address = ref<string>('')
    const sdk = ref<RopstenSdk | undefined>(undefined)

    provide(ethSdkInjectionKey, sdk)

    onMounted(async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])

        const signer = provider.getSigner()
        address.value = await signer.getAddress()

        sdk.value = getRopstenSdk(signer)
    })

</script>
