import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseLoginForm from './BaseLoginForm.vue'

describe('BaseLoginForm', () => {
  it('emits submit with the entered credentials', async () => {
    const wrapper = mount(BaseLoginForm)
    await wrapper.find('input[type="email"]').setValue('user@example.com')
    await wrapper.find('input[name="password"]').setValue('hunter2')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('submit')).toEqual([
      [{ email: 'user@example.com', password: 'hunter2' }],
    ])
  })

  it('includes remember when the checkbox is enabled', async () => {
    const wrapper = mount(BaseLoginForm, { props: { showRemember: true } })
    await wrapper.find('input[type="email"]').setValue('a@b.com')
    await wrapper.find('input[name="password"]').setValue('pw')
    await wrapper.find('input[type="checkbox"]').setValue(true)
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('submit')![0]).toEqual([
      { email: 'a@b.com', password: 'pw', remember: true },
    ])
  })

  it('emits google-sign-in when the Google button is clicked', async () => {
    const wrapper = mount(BaseLoginForm)
    // The Google button renders a <button> with the brand label.
    const googleBtn = wrapper
      .findAll('button')
      .find((b) => b.text().includes('Sign in with Google'))
    expect(googleBtn, 'expected a Google sign-in button').toBeTruthy()
    await googleBtn!.trigger('click')
    expect(wrapper.emitted('google-sign-in')).toHaveLength(1)
  })

  it('does not submit while loading', async () => {
    const wrapper = mount(BaseLoginForm, { props: { loading: true } })
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('renders the error banner', () => {
    const wrapper = mount(BaseLoginForm, { props: { error: 'Invalid credentials' } })
    const alert = wrapper.find('[role="alert"]')
    expect(alert.exists()).toBe(true)
    expect(alert.text()).toContain('Invalid credentials')
  })
})
