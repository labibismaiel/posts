<script setup>
import { usePostsStore } from '@/stores/postsStore'
import { useHistoryStore } from '@/stores/historyStore'

const postsStore = usePostsStore()
const historyStore = useHistoryStore()

defineProps({
  data: {
    type: Object,
    required: true
  }
})
const move = (item, direction) => {
  historyStore.addHistoryItem(
    `Moved Post ${item.id} from index ${item.order} to index ${item.order + direction}`,
    postsStore.posts
  )
  postsStore.movePost(item, direction)
}
</script>

<template>
  <div class="post-card flex bg-white mb-5 shadow-lg rounded-md">
    <div class="font-semibold text-gray-500 w-96 py-10 px-3 truncate">Post {{ data.id }}</div>
    <div class="controls flex flex-col m-auto pr-2">
      <button type="button" class="p-2 arrow-up" @click="move(data, -1)" v-if="data.order !== 0">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#6357b1]" fill="none" viewBox="0 0 24 24"
          stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
      <button class="p-2 arrow-down" @click="move(data, 1)" v-if="data.order !== 4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6 text-[#6357b1]">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
