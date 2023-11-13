import { mount } from '@vue/test-utils'
import PostItem from '@/components/PostItem.vue'
import { describe, it, expect, beforeEach } from 'vitest'
import { useHistoryStore } from '@/stores/historyStore'
import { usePostsStore } from '@/stores/postsStore'

import { setActivePinia, createPinia } from 'pinia'

describe('PostComponent', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const postsStore = usePostsStore()
    postsStore.posts = [
      { id: 1, order: 0 },
      { id: 2, order: 1 },
      { id: 3, order: 2 }
    ]
  })

  it('should move a post up when the up arrow is clicked', async () => {
    const historyStore = useHistoryStore()
    const postsStore = usePostsStore()
    const data = {
      id: 2,
      order: 1
    }

    const wrapper = mount(PostItem, {
      props: {
        data
      }
    })

    // Simulate a click on the "up" arrow
    await wrapper.find('.arrow-up').trigger('click')

    expect(historyStore.history[0].action).toContain('Moved Post 2 from index 1 to index 0')
    expect(postsStore.posts[0].id).toBe(2)
  })

  it('should move a post down when the down arrow is clicked', async () => {
    const wrapper = mount(PostItem, {
      props: {
        data: {
          id: 2,
          order: 1
        }
      }
    })

    // Simulate a click on the "down" arrow
    await wrapper.find('.arrow-down').trigger('click')

    // Assert that your component behavior has occurred
    // For example, you can check if the history has been updated and the post has moved down
    const historyStore = useHistoryStore()
    const postsStore = usePostsStore()

    expect(historyStore.history[0].action).toContain('Moved Post 2 from index 1 to index 2')
    expect(postsStore.posts[2].id).toBe(2)
  })
})
