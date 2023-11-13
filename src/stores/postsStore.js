import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
  state: () => {
    return {
      posts: []
    }
  },

  actions: {
    async fill() {
      await fetch('https://jsonplaceholder.typicode.com/posts', {
        headers: { 'Content-type': 'application/json' }
      })
        .then((res) => res.json())
        .then((response) => {
          this.posts = response.slice(0, 5).map((item, idx) => ({ ...item, order: idx }))
        })
    },
    movePost(item, direction) {
      // first remove the clicked item
      const temp = this.posts.filter((el) => el.id !== item.id)
      if (direction > 0) {
        // if we are moving down
        temp[item.order].order = item.order
        temp.splice(item.order + 1, 0, { ...item, order: item.order + 1 })
      } else {
        // if we are moving up
        temp[item.order - 1].order = item.order
        temp.splice(item.order - 1, 0, { ...item, order: item.order - 1 })
      }
      this.posts = temp
    },
    resetHistory(posts) {
      this.posts = posts
    },
    setPosts(posts) {
      this.posts = posts
    }
  }
})
