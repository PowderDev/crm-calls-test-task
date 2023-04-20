import { ref } from "vue"
import { ArgumentTypes } from "./types"

async function sendLinks(links: string[], executionType: "sequence" | "parallel") {
  const res = await fetch(`/requests?type=${executionType}`, {
    method: "POST",
    body: JSON.stringify({ links }),
    headers: [["Content-Type", "application/json"]],
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message)
  }

  return data
}

export function useSendLinks<T>() {
  const isLoading = ref(false)
  const data = ref<T>()
  const error = ref<string>()

  const send: ArgumentTypes<typeof sendLinks> = async (links, executionType) => {
    try {
      isLoading.value = true
      error.value = undefined
      data.value = await sendLinks(links, executionType)
    } catch (err: any) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, data, error, send }
}
