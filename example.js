var vfile = require('to-vfile')
var remark = require('remark')
var encodePlantuml = require('./index')

remark()
  .use(encodePlantuml)
  .process(vfile.readSync('example.md'), function(err, file) {
    if (err) throw err

    if (file) {
      vfile.writeSync(file)
    }

    console.log(String(file))
  })
