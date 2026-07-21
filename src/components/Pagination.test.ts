import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from './Pagination.vue'

/** Visible cell labels in DOM order ('…' for the ellipsis span). */
function cellLabels(wrapper: ReturnType<typeof mount>): string[] {
  return wrapper.findAll('li').map(li => li.text().trim())
}

async function clickPage(wrapper: ReturnType<typeof mount>, page: number) {
  const link = wrapper.findAll('button').find(b => b.text().trim() === String(page))
  expect(link, `expected a visible cell for page ${page}`).toBeTruthy()
  await link!.trigger('click')
}

describe('Pagination', () => {
  it('renders every page without an ellipsis when totalPages <= 5', () => {
    const wrapper = mount(Pagination, {
      props: { totalItems: 100, itemsPerPage: 20 },
    })
    expect(cellLabels(wrapper)).toEqual(['1', '2', '3', '4', '5'])
  })

  it('renders a window with a trailing ellipsis on the first page', () => {
    const wrapper = mount(Pagination, {
      props: { totalItems: 200, itemsPerPage: 20 },
    })
    expect(cellLabels(wrapper)).toEqual(['1', '2', '3', '...', '10'])
  })

  it('keeps cells in ascending order around a middle page', async () => {
    const wrapper = mount(Pagination, {
      props: { totalItems: 200, itemsPerPage: 20 },
    })
    await clickPage(wrapper, 3)
    expect(cellLabels(wrapper)).toEqual(['1', '2', '3', '4', '5', '...', '10'])

    await clickPage(wrapper, 5)
    expect(cellLabels(wrapper)).toEqual(['1', '...', '3', '4', '5', '6', '7', '...', '10'])

    expect(wrapper.emitted('page-changed')).toEqual([[3], [5]])
  })

  it('omits the ellipsis when no pages are hidden next to the edges', async () => {
    const wrapper = mount(Pagination, {
      props: { totalItems: 200, itemsPerPage: 20 },
    })
    await clickPage(wrapper, 3)
    await clickPage(wrapper, 4)
    // window is 2..6, so only page 1 precedes it — no gap, no ellipsis
    expect(cellLabels(wrapper)).toEqual(['1', '2', '3', '4', '5', '6', '...', '10'])
  })

  it('renders the trailing window on the last page', async () => {
    const wrapper = mount(Pagination, {
      props: { totalItems: 200, itemsPerPage: 20 },
    })
    await clickPage(wrapper, 3)
    await clickPage(wrapper, 5)
    await clickPage(wrapper, 7)
    await clickPage(wrapper, 9)
    await clickPage(wrapper, 10)
    expect(cellLabels(wrapper)).toEqual(['1', '...', '8', '9', '10'])
  })

  it('does not emit when the active page is clicked again', async () => {
    const wrapper = mount(Pagination, {
      props: { totalItems: 200, itemsPerPage: 20 },
    })
    await clickPage(wrapper, 1)
    expect(wrapper.emitted('page-changed')).toBeUndefined()
  })

  it('clamps the current page when the item count shrinks', async () => {
    const wrapper = mount(Pagination, {
      props: { totalItems: 200, itemsPerPage: 20 },
    })
    await clickPage(wrapper, 3)
    await clickPage(wrapper, 5)
    await clickPage(wrapper, 7)
    await wrapper.setProps({ totalItems: 40 })
    expect(cellLabels(wrapper)).toEqual(['1', '2'])
    expect(wrapper.find('button.active').text()).toBe('2')
  })
})
