import { defineStore } from 'pinia'
import { usePostsStore } from '@/stores/postsStore'

export const useHistoryStore = defineStore('history', {
  state: () => {
    return {
      history: []
    }
  },

  actions: {
    resetHistory(index) {
      const postsStore = usePostsStore()
      postsStore.resetHistory(this.history[this.history.length - index - 1].state)
      this.history = this.history.slice(this.history.length - index)
    },
    addHistoryItem(action, state) {
      this.history.unshift({
        id: this.history.length,
        action,
        state
      })
    }
  }
})
