/**
 * Credentials emitted by `BaseLoginForm` on submit.
 *
 * `remember` is only present when the form is rendered with the
 * "remember me" checkbox enabled.
 */
export interface LoginCredentials {
  email: string
  password: string
  remember?: boolean
}
