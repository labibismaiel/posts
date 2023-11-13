import { useHistoryStore } from '@/stores/historyStore'
import { usePostsStore } from '@/stores/postsStore'
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

describe('historyStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Reset the history store's state before each test
    const historyStore = useHistoryStore()
    historyStore.$reset()
  })

  it('should reset history and update the posts store', () => {
    const historyStore = useHistoryStore()
    const postsStore = usePostsStore()

    // Add some history items
    historyStore.addHistoryItem('action1', [{ id: 1 }, { id: 2 }])
    historyStore.addHistoryItem('action2', [{ id: 3 }, { id: 4 }])

    // Reset history and update the posts store
    historyStore.resetHistory(1)

    // Check if the history has been reset
    expect(historyStore.history).toHaveLength(1)
    expect(historyStore.history[0].action).toBe('action1')

    // Check if the posts store has been updated
    expect(postsStore.posts).toEqual([{ id: 3 }, { id: 4 }])
  })

  it('should add a history item', () => {
    const historyStore = useHistoryStore()

    // Add a history item
    historyStore.addHistoryItem('action1', [{ id: 1 }, { id: 2 }])

    // Check if the history item has been added
    expect(historyStore.history).toHaveLength(1)
    expect(historyStore.history[0].action).toBe('action1')
    expect(historyStore.history[0].state).toEqual([{ id: 1 }, { id: 2 }])
  })
})
