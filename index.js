var escapeHtml = require('escape-html')

var voidElements = [
  'area', 'base', 'br', 'col', 'command', 'embed', 'hr',
  'img', 'input', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr'
]

var reserved = ['tag', 'className', 'htmlFor', 'text', 'children', 'order', 'attrs']

function attr(key, value) {
  if (value === false)
    return ''
  else if (value === true || value === null)
    return ' ' + escapeHtml(key)
  else
    return ' ' + escapeHtml(key) + '="' + escapeHtml(value) + '"'
}

function hill(node) {
  var key, i
  var result = '<' + escapeHtml(node.tag)
  if (node.hasOwnProperty('htmlFor')) {
    result += attr('for', node.htmlFor)
  }
  if (node.hasOwnProperty('className')) {
    result += attr('class', node.className)
  }
  for (key in node) {
    if (node.hasOwnProperty(key) && reserved.indexOf(key) == -1) {
      result += attr(key, node[key])
    }
  }
  if (node.attrs !== null && typeof node.attrs === 'object') {
    for (key in node.attrs) {
      if (node.attrs.hasOwnProperty(key)) {
        result += ' ' + escapeHtml(key) + '="' + escapeHtml(node.attrs[key]) + '"'
      }
    }
  }
  result += '>'
  if (voidElements.indexOf(node.tag) == -1) {
    var children
    if (typeof node.children !== 'undefined' && Array.isArray(node.children)) {
      children = node.children.slice()
    } else if (node.children != null && typeof node.children === 'object') {
      var order = Array.isArray(node.order) ? node.order : []
      children = []
      for (i=0; i < order.length; i++) {
        if (node.children.hasOwnProperty(order[i])) {
          children.push(node.children[order[i]])
        }
      }
      for (key in node.children) {
        if (node.children.hasOwnProperty(key) && order.indexOf(key) === -1) {
          children.push(node.children[key])
        }
      }
    } else {
      children = []
    }
    if (typeof node.text === 'string') {
      children.push(node.text)
    }
    for (i=0; i < children.length; i++) {
      if (typeof children[i] === 'string') {
        result += escapeHtml(children[i])
      } else if (children[i] !== null && typeof children[i] === 'object') {
        result += hill(children[i])
      }
    }
    result += '</' + escapeHtml(node.tag) + '>'
  }
  return result
}

module.exports = hill
