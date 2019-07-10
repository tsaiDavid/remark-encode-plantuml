'use strict'

var path = require('path')
var test = require('tape')
var remark = require('remark')
var vfile = require('to-vfile')
var encodePlantuml = require('..')

test('remark-encode-plantuml', function(t) {
  t.plan(1)

  remark()
    .use(encodePlantuml)
    .process(read('foo.md'), function(err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, String(read('foo-result.md')).replace(/\r\n/g, '\n')],
        'should transform and inline encoded plantuml'
      )
    })
})

function read(basename) {
  return vfile.readSync({cwd: __dirname, path: path.join('fixtures', basename)})
}
