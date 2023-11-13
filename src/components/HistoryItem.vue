<script setup>
import { useHistoryStore } from '@/stores/historyStore'

const historyStore = useHistoryStore()

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="history-item flex bg-white rounded-sm px-2 shadow-lg">
    <div class="text-gray-600 w-96 py-5 truncate">
      {{ data.action }}
    </div>
    <button type="button" class="btn m-auto py-2 px-5 rounded-md" @click="historyStore.resetHistory(data.id)">
      Time travel
    </button>
  </div>
</template>

<style scoped>
.btn {
  background-color: #25ff90;
}
</style>
