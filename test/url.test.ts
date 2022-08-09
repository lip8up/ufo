import { describe, expect, test } from 'vitest'
import { parseURL } from '../src'

describe('parseURL', () => {
  const tests = [
    { input: '//test', out: { auth: '', hash: '', host: 'test', pathname: '', protocol: '', search: '' } },
    { input: 'https://test.com', out: { auth: '', hash: '', host: 'test.com', pathname: '', protocol: 'https:', search: '' } },
    { input: 'http://test.com?foo=bar', out: { auth: '', hash: '', host: 'test.com', pathname: '', protocol: 'http:', search: '?foo=bar' } },
    { input: '/test', out: { hash: '', pathname: '/test', search: '' } },
    { input: 'file:///home/user', out: { auth: '', hash: '', host: '', pathname: '/home/user', protocol: 'file:', search: '' } },
    {
      input: 'https://host.name\\@foo.bar/meme3.php?url=http://0.0.0.0/2.svg',
      out: {
        auth: '',
        hash: '',
        host: 'host.name',
        pathname: '/@foo.bar/meme3.php',
        protocol: 'https:',
        search: '?url=http://0.0.0.0/2.svg'
      }
    },
    {
      input: 'https://domain.test:3000#owo',
      out: {
        protocol: 'https:',
        auth: '',
        host: 'domain.test:3000',
        pathname: '',
        search: '',
        hash: '#owo'
      }
    },
    {
      input: 'd:/some/path',
      out: { pathname: 'd:/some/path', search: '', hash: '' }
    },
    {
      input: 'd:/some/path.vue?macro=true&lang=tsx',
      out: { pathname: 'd:/some/path.vue', search: '?macro=true&lang=tsx', hash: '' }
    }
  ]

  for (const t of tests) {
    test(t.input.toString(), () => {
      expect(parseURL(t.input)).toEqual(t.out)
    })
  }
})
