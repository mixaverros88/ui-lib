import { describe, it, expect } from 'vitest'
import {
  isValidAbsoluteUrl,
  isValidJson,
  isValidXml,
  isValidBase64,
} from './validate'

describe('isValidAbsoluteUrl', () => {
  it('accepts absolute http/https URLs', () => {
    expect(isValidAbsoluteUrl('http://example.com')).toBe(true)
    expect(isValidAbsoluteUrl('https://example.com/path?q=1')).toBe(true)
    expect(isValidAbsoluteUrl('  https://example.com  ')).toBe(true)
  })

  it('rejects empty, relative and non-http schemes', () => {
    expect(isValidAbsoluteUrl('')).toBe(false)
    expect(isValidAbsoluteUrl('   ')).toBe(false)
    expect(isValidAbsoluteUrl('/relative/path')).toBe(false)
    expect(isValidAbsoluteUrl('example.com')).toBe(false)
    expect(isValidAbsoluteUrl('ftp://example.com')).toBe(false)
    expect(isValidAbsoluteUrl('mailto:a@b.c')).toBe(false)
    expect(isValidAbsoluteUrl('not a url')).toBe(false)
  })
})

describe('isValidJson', () => {
  it('treats empty input as valid', () => {
    expect(isValidJson('')).toBe(true)
    expect(isValidJson('  \n ')).toBe(true)
  })

  it('accepts well-formed JSON of any root type', () => {
    expect(isValidJson('{"a":1}')).toBe(true)
    expect(isValidJson('[1,2]')).toBe(true)
    expect(isValidJson('"str"')).toBe(true)
    expect(isValidJson('42')).toBe(true)
  })

  it('rejects malformed JSON', () => {
    expect(isValidJson('{a:1}')).toBe(false)
    expect(isValidJson('{"a":1,}')).toBe(false)
    expect(isValidJson('<xml/>')).toBe(false)
  })
})

describe('isValidXml', () => {
  it('treats empty input as valid', () => {
    expect(isValidXml('')).toBe(true)
    expect(isValidXml('   ')).toBe(true)
  })

  it('accepts well-formed XML', () => {
    expect(isValidXml('<root><child a="1"/></root>')).toBe(true)
    expect(isValidXml('<?xml version="1.0"?><r/>')).toBe(true)
  })

  it('rejects malformed XML', () => {
    expect(isValidXml('<root><unclosed></root>')).toBe(false)
    expect(isValidXml('just text')).toBe(false)
    expect(isValidXml('<a><b></a></b>')).toBe(false)
  })
})

describe('isValidBase64', () => {
  it('treats empty input as valid', () => {
    expect(isValidBase64('')).toBe(true)
    expect(isValidBase64(' \n ')).toBe(true)
  })

  it('accepts well-formed base64, ignoring embedded whitespace', () => {
    expect(isValidBase64('aGVsbG8=')).toBe(true)
    expect(isValidBase64('aGVs\nbG8=')).toBe(true)
    expect(isValidBase64('YQ==')).toBe(true)
  })

  it('rejects bad lengths, bad alphabets and undecodable input', () => {
    expect(isValidBase64('aGVsbG8')).toBe(false) // length % 4 !== 0
    expect(isValidBase64('aGV$bG8=')).toBe(false) // bad character
    expect(isValidBase64('====')).toBe(false) // padding only
  })
})
