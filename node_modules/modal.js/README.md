# Modal.js

> A modern and simple modal

[![npm][npm-image]][npm-url] [![license][license-image]][license-url] [![changelog][changelog-image]][changelog-url]
 

**NPM**

```sh
npm install --save modal.js
```

## What does it do?

* Build a modal customizable.
* By default create text, image modal.
* You can customize it with parameters
* Its possible to create different styles of the same modal and then choose one


## Browser support (Only tested on)

* Chrome (last two)
* Firefox (last two)


## Modal on!

#### Default mode

Not recommended! My use of styles is disgusting, You are warned! 

```javascript
$().modal({"content": {"type":"text","data": "Hola mundo!" }});
$().modal({"content": {"type":"image", "data": "http://lorempixel.com/400/200/"}})
```

#### Newbie mode

The parameter is json with this structure:

```javascript
'content' : {                    //<-- Content!
    'type' : String,             //<-- Type of data entry. Default: text. It must exist on plugin.json
    'data' : Object,             //<-- Any data to show. Here.
    'className' : String,        //<-- Name of class on css who define style of content.
},
'shape' : {                      //<-- Shape!
    'className' : String,        //<-- Name of class on css who define style of the shape literally*
    'style' : String             //<-- Name of class on css who define style of the canvas of content*
}
'layout' : String,               //<-- Define layout of modal*
'header' : {					 //<-- Header!
    'icon' : String,             //<-- If you wanna set a icon or a something on header but not content.
    'title' : {                  //<-- Title!
        'className' : String,    //<-- Name of class on css who define style of title header.
        'content' : String       //<-- Text of title
	}
},
'close' : {                      //<-- Close modal!
    'button' : Boolean,          //<-- True or empty or null create a close button. False dont.
    'escape' : Boolean           //<-- True or empty or null set key 'Esc' to close modal.
},
'acc' : {                        //<-- Accessibility time!
    'text' : String              //<-- Text to read for accessibility readers.
},
'btns' : [{                      //<-- Buttons everywhere! Is an array of buttons.
    'value' : String,            //<-- Text display on button.
    'shape' : String,            //<-- Name of class on css who define a style of button.
    'type' : String,             //<-- Define event of button. Function, link or close modal.
    'action' : String,           //<-- Define funcion or link of type button.
    'close' : Boolean,           //<-- True or empty or null button close modal. False dont.
    'key' : CharCode             //<-- Charcode of key trigger of btn.
}],
'overlay' : {                    //<-- Overlay!
    'className' : String,        //<-- Overwrite style of overlay.
    'click' : Boolean            //<-- True, empty or null close modal on click overlay. False dont.
},
'width' : String                 //<-- Set with of modal. Auto for default.
```

#### Pro mode

You can modify defaults modal.json.

```javascript
"dfts" : {
    "shapeClassname":"modalShape-dft",  
    "shapeStyle":"modalStyle-dft",
    "layout":"modalType-dft",
    "icon":"",
    "contentClassname":"modalContent-dft",
    "acc":"Ventana modal abierta. Presiona escape para cerrar la ventana",
    "show": ""
}
```

Use text plugin for guide you.


#### God mode

Not only can create a different templates of same modal, different modal too!
You have access a args (parameter of modal), and you add custom variables on parameters.

I create a youtube video modal:

```javascript
"iframe" : {                             //<-- name of new plugin or modal type.
    "element" : "iframe",				 //<-- element create on body of modal
    "objAttrs" :{						 //<-- objAttrs set attributes on obj element
        "id": "'mFrame-content'",   	 //<-- iframe.id
        "width": "args.content.width",   //<-- iframe.width
        "height": "args.content.height", //<-- iframe.height
        "src" : "data"					 //<-- iframe.src
	},
	"attrs" : {							 //<-- attrs set attributes on dom element
        "frameborder" : "'0'",		 //<-- iframe.setAttribute("frameborder","0")
        "allowfullscreen" : "''",	     //<-- iframe.setAttribute("allowfullscreen","")
        "mozallowfullscreen" : "''",   
        "webkitallowfullscreen" : "''",
        "hspace" : "'0'",
        "vspace" : "'0'",
        "scrolling" : "'auto'"
	},
    "dfts" : {
        "shapeClassname":"",
        "shapeStyle":"",
        "layout":"",
        "icon":"",
        "contentClassname":"",
        "acc":""
	}
}
```
**NOTE: Important! objAttrs and attrs is under eval. You can use variables of args (parameter of modal) and set new parameters. Example: width, height and id. If you pass string need double quotes " ' ' ".**


#### Json url

Url of "plugins" or types of modals need this structure:
* index.html -> calls modal js
* js/modal.json
* js/modal.js

but before call modal js you can overwrite url:
urlModal = "js/modal.json" -> Default


## Acknowledgements

Modal.js is a project by [Rodrigo Perrote](https://github.com/rperrote).


[changelog-image]: https://img.shields.io/badge/changelog-md-blue.svg?style=flat
[changelog-url]: CHANGELOG.md
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE.md
[npm-image]: https://img.shields.io/badge/npm-1.1.7-blue.svg?style=flat
[npm-url]: https://www.npmjs.com/package/modal.js
