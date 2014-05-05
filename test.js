var hill = require('./')
var expect = require('expect.js')

describe('void element', function() {
  it('should create a button', function() {
    var node = {
      tag: 'input',
      type: 'submit',
      value: 'save'
    }
    expect(hill(node)).to.be('<input type="submit" value="save">')
  })
})

describe('non-void element', function() {
  it('should create a simple script tag', function() {
    var node = {
      tag: 'script',
      src: 'foo.js'
    }
    expect(hill(node)).to.be('<script src="foo.js"></script>')
  })
})

describe('element containing text', function() {
  it('should create a header with text in *children*', function() {
    var node = {
      tag: 'h1',
      children: ['Hello, world']
    }
    expect(hill(node)).to.be('<h1>Hello, world</h1>')
  })

  it('should create a header with text in *text*', function() {
    var node = {
      tag: 'h1',
      text: 'Hello, world'
    }
    expect(hill(node)).to.be('<h1>Hello, world</h1>')
  })
})

describe('element containing children', function() {
  it('should create a div with a label and an input tag', function() {
    var node = {
      tag: 'div',
      children: [
        {
          tag: 'label',
          'for': 'name',
          text: 'Name:'
        },
        ' ',
        {
          tag: 'input',
          type: 'text',
          name: 'name',
          id: 'name'
        }
      ]
    }
    expect(hill(node)).to.be('<div><label for="name">Name:</label> <input type="text" name="name" id="name"></div>')
  })

  it('should create a div with a label and an input with object', function() {
    var node = {
      tag: 'div',
      children: {
        label: {
          tag: 'label',
          'for': 'name',
          text: 'Name: '
        },
        input: {
          tag: 'input',
          type: 'text',
          name: 'name',
          id: 'name'
        }
      }
    }
    expect(hill(node)).to.be('<div><label for="name">Name: </label><input type="text" name="name" id="name"></div>')
  })

  it('should create a div with a label and an input with an ordered object', function() {
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
    expect(hill(node)).to.be('<div><label for="name">Name: </label><input type="text" name="name" id="name"></div>')
  })

  it('should create a header with text in *text*', function() {
    var node = {
      tag: 'h1',
      text: 'Hello, world'
    }
    expect(hill(node)).to.be('<h1>Hello, world</h1>')
  })
})

describe('attributes', function() {
  it("should create a true attribute as a bare attribute", function() {
    var node = {
      tag: 'input',
      type: 'checkbox',
      checked: true
    }
    expect(hill(node)).to.be('<input type="checkbox" checked>')
  })

  it("should create a null attribute as a bare attribute", function() {
    var node = {
      tag: 'div',
      bare: null
    }
    expect(hill(node)).to.be('<div bare></div>')
  })

  it("should omit a false attribute", function() {
    var node = {
      tag: 'input',
      type: 'checkbox',
      checked: false
    }
    expect(hill(node)).to.be('<input type="checkbox">')
  })

  it("should use className attribute so quoting isn't needed", function() {
    var node = {
      tag: 'div',
      className: 'test'
    }
    expect(hill(node)).to.be('<div class="test"></div>')
  })

  it("should use htmlFor attribute so quoting isn't needed", function() {
    var node = {
      tag: 'label',
      htmlFor: 'name',
      text: 'Name:'
    }
    expect(hill(node)).to.be('<label for="name">Name:</label>')
  })

  it('should create a reserved attr when specifying in *attrs*', function() {
    var node = {
      tag: 'div',
      attrs: {
        text: 'Hello, world'
      }
    }
    expect(hill(node)).to.be('<div text="Hello, world"></div>')
  })
})
