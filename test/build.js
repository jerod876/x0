import fs from 'fs-extra'
import path from 'path'
import test from 'ava'
import build from '../lib/build'

const input = path.resolve('test/components')
const output = path.resolve('test/output')
const htmlFile = path.resolve('test/output/index.html')
const propsFile = path.resolve('test/output/props/index.html')
const bundleFile = path.resolve('test/output/bundle.js')

console.log('DEBUG', input)

const options = {
  input,
  dirname: input,
  outDir: output,
}

const clean = () => {
  fs.remove(output)
}

test.before(clean)
test.after(clean)

test('static renders', async t => {
  const res = await build(options)
  const html = fs.readFileSync(htmlFile, 'utf8')
  t.snapshot(html)
})

test('static uses getInitialProps method', async t => {
  const res = await build(options)
  const html = fs.readFileSync(propsFile, 'utf8')
  t.snapshot(html)
})

test('static makes a directory', async t => {
  fs.remove(output)
  const res = await build(options)
  t.pass()
})
