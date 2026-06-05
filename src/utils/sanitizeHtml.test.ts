import { describe, it, expect } from 'vitest'
import { sanitizeHtml, isSafeHref } from './sanitizeHtml'

describe('sanitizeHtml', () => {
  it('returns empty string for falsy input', () => {
    expect(sanitizeHtml(null)).toBe('')
    expect(sanitizeHtml(undefined)).toBe('')
    expect(sanitizeHtml('')).toBe('')
  })

  it('keeps allow-listed formatting tags', () => {
    expect(sanitizeHtml('<b>bold</b>')).toBe('<b>bold</b>')
    expect(sanitizeHtml('<p>para</p>')).toBe('<p>para</p>')
  })

  it('drops script tags and their contents', () => {
    expect(sanitizeHtml('<p>Hi<script>alert(1)</script></p>')).toBe('<p>Hi</p>')
  })

  it('drops style/iframe contents entirely', () => {
    expect(sanitizeHtml('<div><style>.x{}</style>text</div>')).toBe('<div>text</div>')
    expect(sanitizeHtml('<iframe src="x"></iframe>after')).toBe('after')
  })

  it('unwraps disallowed elements to their text', () => {
    expect(sanitizeHtml('<h1>Title</h1>')).toBe('Title')
  })

  it('strips inline event handlers and other attributes', () => {
    expect(sanitizeHtml('<p onclick="evil()">hi</p>')).toBe('<p>hi</p>')
    expect(sanitizeHtml('<span class="x" style="color:red">y</span>')).toBe('<span>y</span>')
  })

  it('hardens safe anchors with rel/target', () => {
    const out = sanitizeHtml('<a href="https://example.com">link</a>')
    expect(out).toContain('href="https://example.com"')
    expect(out).toContain('rel="noopener noreferrer"')
    expect(out).toContain('target="_blank"')
  })

  it('strips unsafe href schemes', () => {
    const out = sanitizeHtml('<a href="javascript:alert(1)">x</a>')
    expect(out).not.toContain('javascript')
    expect(out).not.toContain('href')
    // No surviving href means no link-hardening attributes are added.
    expect(out).not.toContain('target')
  })

  it('preserves the title attribute on anchors', () => {
    const out = sanitizeHtml('<a href="https://x.io" title="hi">x</a>')
    expect(out).toContain('title="hi"')
  })
})

describe('isSafeHref', () => {
  it('accepts safe schemes and relative/anchor links', () => {
    expect(isSafeHref('http://x.com')).toBe(true)
    expect(isSafeHref('https://x.com')).toBe(true)
    expect(isSafeHref('mailto:a@b.com')).toBe(true)
    expect(isSafeHref('tel:+123')).toBe(true)
    expect(isSafeHref('/relative/path')).toBe(true)
    expect(isSafeHref('#anchor')).toBe(true)
    expect(isSafeHref('')).toBe(true)
  })

  it('rejects dangerous schemes', () => {
    expect(isSafeHref('javascript:alert(1)')).toBe(false)
    expect(isSafeHref('data:text/html,<script>')).toBe(false)
    expect(isSafeHref('vbscript:msgbox')).toBe(false)
    expect(isSafeHref('file:///etc/passwd')).toBe(false)
  })

  it('is case- and whitespace-insensitive', () => {
    expect(isSafeHref('  JAVASCRIPT:alert(1)  ')).toBe(false)
    expect(isSafeHref('  HTTPS://x.com  ')).toBe(true)
  })
})
