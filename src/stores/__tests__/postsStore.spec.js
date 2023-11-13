import { usePostsStore } from '@/stores/PostsStore'
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

describe('PostsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Reset the store's state before each test
    const postsStore = usePostsStore()
    postsStore.$reset()
  })

  it('should fill the posts array with data from an API', async () => {
    const postsStore = usePostsStore()
    await postsStore.fill()
    expect(postsStore.posts).toHaveLength(5)
  })

  it('should move a post in the list', () => {
    const postsStore = usePostsStore()

    // Add some sample posts
    postsStore.posts = [
      { id: 1, order: 0 },
      { id: 2, order: 1 },
      { id: 3, order: 2 }
    ]

    // Move the second post up
    postsStore.movePost({ id: 2, order: 1 }, -1)

    // Check if the order has changed
    expect(postsStore.posts[0].order).toBe(0)
    expect(postsStore.posts[0].id).toBe(2)
    expect(postsStore.posts[1].order).toBe(1)
    expect(postsStore.posts[1].id).toBe(1)
    expect(postsStore.posts[2].order).toBe(2)
    expect(postsStore.posts[2].id).toBe(3)
  })

  it('should reset the history of posts', () => {
    const postsStore = usePostsStore()

    // Add some sample posts
    postsStore.posts = [
      { id: 1, order: 0 },
      { id: 2, order: 1 },
      { id: 3, order: 2 }
    ]

    // Save the current state of posts
    const originalPosts = [...postsStore.posts]

    // Reset the history
    postsStore.resetHistory(originalPosts)

    // Check if the posts have been reset
    expect(postsStore.posts).toEqual(originalPosts)
  })
})
