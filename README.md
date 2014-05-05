# hill - creates an HTML fragment from a JSON object

This creates an HTML fragment from a JSON object.

A node is a JavaScript object with these keys:

* `tag`: the html tag, such as `input`
* `children`: The children. Either an array or an object.
  The values can either be a string or another node. A string
  will be escaped.
* `text`: Text to go inside the node, that will be escaped. If
  there are other children it will be appended to it.
* `order`: The order of the children, if children is an
  object. An array of keys. Any that exist here but not in
  `children` will be omitted. Any that exist in children but
  not here will be *after* the keys specified here.
* `className`: the class attribute. It's given this alias
  because `class` is a reserved name in JavaScript
* `htmlFor`: the for attribute, useful for labels. It's given
  this alias
* `attrs`: html attributes. this can contain keys that have a
  special meaning for nodes (the above and `attrs` itself).
  This is an object.
* other keys: Anything that isn't reserved, as above, is an
  attribute. See the example below.

Hill escapes the HTML, but as it is in early development, one
should take care when using user input to build the object.
The author built this to use with tools like angular and
Vue.js which operate on the HTML.

The attribute values are treated differently depending on
their type:

* `null` adds a bare attribute, like `data-foo` in
  `<hr data-foo>`
* `true` adds a bare attribute, like `checked` in
  `<input type="checkbox" name="foo" checked>`
* `false` omits the attribute

## Usage

``` javascript
var hill = require('hill')
var node = {
  tag: 'div',
  children: {
    input: {
      tag: 'input',
      type: 'text',
      name: 'name',
      id: 'name'
    },
    label: {
      tag: 'label',
      'for': 'name',
      text: 'Name: '
    }
  },
  order: ['label', 'input']
}
var html = hill(node)
console.log(html)
```

## License

[MIT](bat.mit-license.org)
