<script setup>
import PostItem from '@/components/PostItem.vue'
import HistoryContainer from '@/components/HistoryContainer.vue'
import { usePostsStore } from '@/stores/postsStore'

const postsStore = usePostsStore()
postsStore.fill()
</script>

<template>
  <section class="flex flex-row justify-between w-full">
    <div class="wrapper">
      <div class="text-lg p-5 pl-0 font-bold text-white">Sortable Post List</div>
      <TransitionGroup tag="div" name="list" appear>
        <PostItem v-for="post in postsStore.posts" :key="`post-${post.id}`" :data="post" />
      </TransitionGroup>
    </div>
    <div class="wrapper">
      <HistoryContainer />
    </div>
  </section>
</template>

<style scoped>
.header {
  background-color: #6357b1;
  height: 1000px;
  transform: rotate(-30deg);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
  transform: translateX(30px);
}

.list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: scale(1);
  transform: translateX(0);
}

.list-move {
  transition: all 0.5s ease;
}
</style>
