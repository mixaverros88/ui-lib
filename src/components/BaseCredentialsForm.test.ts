import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import BaseCredentialsForm from './BaseCredentialsForm.vue'
import type { CredentialsView } from './BaseCredentialsForm.vue'

const view = (over: Partial<CredentialsView> = {}): CredentialsView => ({
  keyId: 'PK123',
  baseUrl: 'https://api.example.com',
  dataUrl: 'https://data.example.com',
  hasSecret: true,
  ...over,
})

const defaults = { baseUrl: 'https://default.base', dataUrl: 'https://default.data' }

function mountCard(fetchFn = vi.fn().mockResolvedValue(view()), updateFn = vi.fn()) {
  const wrapper = mount(BaseCredentialsForm, {
    props: { title: 'Alpaca API', idPrefix: 'alpaca', fetchFn, updateFn, defaults },
  })
  return { wrapper, fetchFn, updateFn }
}

beforeEach(() => {
  localStorage.clear()
})

describe('BaseCredentialsForm', () => {
  it('loads on mount and fills the form from the fetched view', async () => {
    const { wrapper, fetchFn } = mountCard()
    await flushPromises()
    expect(fetchFn).toHaveBeenCalledTimes(1)
    expect((wrapper.get('#alpaca-key-id').element as HTMLInputElement).value).toBe('PK123')
    expect((wrapper.get('#alpaca-base-url').element as HTMLInputElement).value).toBe(
      'https://api.example.com',
    )
  })

  it('falls back to the defaults when the server has no URLs stored', async () => {
    const { wrapper } = mountCard(
      vi.fn().mockResolvedValue(view({ keyId: null, baseUrl: '', dataUrl: '', hasSecret: false })),
    )
    await flushPromises()
    expect((wrapper.get('#alpaca-base-url').element as HTMLInputElement).value).toBe(
      defaults.baseUrl,
    )
    expect((wrapper.get('#alpaca-data-url').element as HTMLInputElement).value).toBe(
      defaults.dataUrl,
    )
  })

  it('emits load-error when the fetch rejects', async () => {
    const { wrapper } = mountCard(vi.fn().mockRejectedValue(new Error('boom')))
    await flushPromises()
    expect(wrapper.emitted('load-error')).toEqual([['boom']])
  })

  it('refuses to save without a key and emits the configured message', async () => {
    const { wrapper, updateFn } = mountCard(
      vi.fn().mockResolvedValue(view({ keyId: null, hasSecret: false })),
    )
    await flushPromises()
    await wrapper.get('button').trigger('click')
    expect(updateFn).not.toHaveBeenCalled()
    expect(wrapper.emitted('error')?.[0]).toEqual(['API key is required.'])
  })

  it('requires a secret only while none is stored', async () => {
    const { wrapper, updateFn } = mountCard(
      vi.fn().mockResolvedValue(view({ hasSecret: false })),
    )
    await flushPromises()
    await wrapper.get('button').trigger('click')
    expect(updateFn).not.toHaveBeenCalled()
    expect(wrapper.emitted('error')?.[0]).toEqual(['Secret key is required.'])
  })

  it('saves trimmed values, omits a blank secret, and emits saved', async () => {
    const updateFn = vi.fn().mockResolvedValue(view())
    const { wrapper } = mountCard(vi.fn().mockResolvedValue(view()), updateFn)
    await flushPromises()
    await wrapper.get('#alpaca-key-id').setValue('  PK999  ')
    await wrapper.get('button').trigger('click')
    await flushPromises()
    expect(updateFn).toHaveBeenCalledWith({
      keyId: 'PK999',
      secretKey: undefined,
      baseUrl: 'https://api.example.com',
      dataUrl: 'https://data.example.com',
    })
    expect(wrapper.emitted('saved')).toEqual([['Credentials saved.']])
  })

  it('emits error with the server message when the update rejects', async () => {
    const updateFn = vi.fn().mockRejectedValue(new Error('validation failed'))
    const { wrapper } = mountCard(vi.fn().mockResolvedValue(view()), updateFn)
    await flushPromises()
    await wrapper.get('button').trigger('click')
    await flushPromises()
    expect(wrapper.emitted('error')?.[0]).toEqual(['validation failed'])
  })

  it('exposes load() so a parent Reload can re-pull the card', async () => {
    const { wrapper, fetchFn } = mountCard()
    await flushPromises()
    await (wrapper.vm as unknown as { load: () => Promise<void> }).load()
    expect(fetchFn).toHaveBeenCalledTimes(2)
  })
})
