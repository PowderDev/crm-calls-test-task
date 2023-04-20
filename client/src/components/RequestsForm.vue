<script setup lang="ts">
import { Ref, reactive, ref } from "vue"
import { useSendLinks } from "../lib/requests"
import { computed } from "@vue/reactivity"

const { isLoading, send, data, error } = useSendLinks()

const links = reactive<Ref<string>[]>([ref("")])
const stringLinks = computed(() => links.map((l) => l.value))

const addNewLink = () => links.push(ref(""))

const sendInParallel = () => send(stringLinks.value, "parallel")
const sendInSequence = () => send(stringLinks.value, "sequence")
</script>

<template>
  <form class="contact-us">
    <input
      v-for="(_, index) in links"
      v-model="links[index].value"
      placeholder="Enter URL To Request"
      type="text"
      required
    />
    <button class="new-request" type="button" @click="addNewLink">Add New link to request</button>

    <div class="buttons">
      <button type="button" :disabled="isLoading" @click="sendInParallel">
        Send Them In Parallel
      </button>
      <button type="button" :disabled="isLoading" @click="sendInSequence">
        Send Them In Sequence
      </button>
    </div>

    <p class="error-text">{{ error }}</p>
  </form>

  <pre v-if="data">
    {{ JSON.stringify(data, null, 2) }}
  </pre>
</template>
