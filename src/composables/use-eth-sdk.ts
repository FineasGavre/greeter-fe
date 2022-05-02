import { inject, ref, Ref } from "vue"
import { RopstenSdk } from "@dethcrypto/eth-sdk-client"

export const ethSdkInjectionKey = Symbol('ETH-SDK Injection Key')

export const useEthSdk = () => {
    return inject<Ref<RopstenSdk | undefined>>(ethSdkInjectionKey)
}
