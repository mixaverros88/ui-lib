import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BasePhotoViewer from './BasePhotoViewer.vue'

const photos = [
  { src: 'a.png', label: 'A' },
  { src: 'b.png', label: 'B' },
]

describe('BasePhotoViewer', () => {
  it('wraps around with the arrow keys and closes on Escape', async () => {
    const wrapper = mount(BasePhotoViewer, {
      props: { photos, modelValue: 0 },
      global: { stubs: { Teleport: true } },
    })
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(wrapper.emitted('close')).toHaveLength(1)
    wrapper.unmount()
  })
})
