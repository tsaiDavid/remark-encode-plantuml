'use strict'

var fs = require('fs')
var path = require('path')
var visit = require('unist-util-visit')
var plantumlEncoder = require('plantuml-encoder')

module.exports = encodePlantuml

var relative = /^\.{1,2}\//
var pumlExtension = /([a-zA-Z0-9\s_\\.\-\(\):])+(.puml|.plantuml)$/

function encodePlantuml() {
  return transformer
}

function transformer(tree, file, done) {
  var count = 0

  visit(tree, 'image', visitor)

  if (!count) {
    done()
  }

  function visitor(node) {
    var url = node.url

    if (url && relative.test(url)) {
      count++
      fs.readFile(path.resolve(file.cwd, file.dirname, url), 'utf8', one)
    }

    function one(err, data) {
      if (err) {
        count = Infinity
        return done(err)
      }

      var encodedPuml = plantumlEncoder.encode(data)

      if (pumlExtension.test(url)) {
        node.url = 'https://www.plantuml.com/plantuml/svg/' + encodedPuml
      }

      if (--count === 0) {
        done()
      }
    }
  }
}
