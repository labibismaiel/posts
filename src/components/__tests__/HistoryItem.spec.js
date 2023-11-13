import { mount } from '@vue/test-utils'
import HistoryItem from '@/components/HistoryItem.vue'
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useHistoryStore } from '@/stores/historyStore'

describe('HistoryItem', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('should display the action and reset the history when the "Time travel" button is clicked', async () => {
    const data = {
      id: 0,
      action: 'Moved Post 1 from index 1 to index 0',
      state: []
    }
    const historyStore = useHistoryStore()
    historyStore.addHistoryItem(data)

    const wrapper = mount(HistoryItem, {
      props: {
        data
      }
    })

    // Simulate a click on the "Time travel" button
    await wrapper.find('button').trigger('click')

    expect(historyStore.history).toHaveLength(0)
  })
})
