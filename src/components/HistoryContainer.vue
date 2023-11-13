<script setup>
import { useHistoryStore } from '@/stores/historyStore'
import HistoryItem from '@/components/HistoryItem.vue'
const historyStore = useHistoryStore()
</script>

<template>
  <div v-if="historyStore.history.length">
    <div class="title bg-white p-5 mt-5 font-bold text-gray-600 rounded-t-md">List of actions committed</div>
    <div class="container shadow-lg flex flex-col bg-white p-5 rounded-b-md">
      <div class="divide-y">
        <TransitionGroup tag="div" name="history" appear>
          <HistoryItem v-for="entry in historyStore.history" :key="`history-${entry.id}`" :data="entry" />
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
.arrow {
  color: #ccc;
}

.container {
  background-color: #f0f0f0;
}

.history-move {
  transition: all 0.5s ease;
}

.history-enter-active,
.history-leave-active {
  transition: all 0.5s ease;
}

.history-enter-from,
.history-leave-to {
  opacity: 0;
  transform: scale(0.6);
  transform: translateX(30px);
}

.history-enter-to,
.history-leave-from {
  opacity: 1;
  transform: scale(1);
  transform: translateX(0);
}
</style>
