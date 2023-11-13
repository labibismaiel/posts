import { mount } from '@vue/test-utils'
import HistoryContainer from '@/components/HistoryContainer.vue'
import HistoryItem from '@/components/HistoryItem.vue'
import { useHistoryStore } from '@/stores/historyStore'
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

describe('HistoryContainer', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should display a list of history items when there are items in historyStore', async () => {
    const historyStore = useHistoryStore()
    // Add some history items to the store for testing
    historyStore.addHistoryItem('Action 1', [])
    historyStore.addHistoryItem('Action 2', [])

    const wrapper = mount(HistoryContainer)

    // Check if the title is displayed
    expect(wrapper.find('.title').text()).toBe('List of actions committed')

    // Check if the history items are displayed
    const historyItems = wrapper.findAllComponents(HistoryItem)
    expect(historyItems).toHaveLength(2) // Assuming you added two history items

    // check the text/content of each displayed history item
    expect(historyItems[1].text()).toContain('Action 1')
    expect(historyItems[0].text()).toContain('Action 2')
  })

  it('should not display anything when historyStore is empty', async () => {
    const wrapper = mount(HistoryContainer)

    // Check if the component is not displayed when historyStore is empty
    expect(wrapper.find('.title').exists()).toBe(false)
    expect(wrapper.find('.container').exists()).toBe(false)
  })
})
