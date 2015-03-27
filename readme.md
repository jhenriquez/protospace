# Protospace #

The lack of namespaces in JavaScript really sucks when it comes to exporting CommonJS modules with many functions or objects.

Protospace, is a minimalistic tool that allows registering objects or functions within a namespace and then bundling (merging) them into objects.

## Registering ##

```JavaScript

/* Filename: sample_constructor.js */

/* Meanwhile, in a wild CommonJS module  */

function SomeConstructor {
  this.Hello = 'Hello, World!';
}

/* Our already familiar export ceremony, nothing changes. */
module.exports = SomeConstructor;

/* We add some protospace namespacing surgar */
require('protospace').register(SomeConstructor, 'Our.Desired.Namespace'); /* => { Our: { Desired: { Namespace: { SomeConstructor: SomeConstructor }} } } */

/* Filename: sample_module.js */

/* Meanwhile, in some other pace, within some other wild CommonJS module  */

var Some_Stuff_I_Want_Export_On_An_Object = {
  Stuff: {
    Nice: 'To have this stuff here.'
  }
};

/* Our already familiar export ceremony, would tradicionally help us do this. */
module.exports = Some_Stuff_I_Want_Export_On_An_Object;

/* We add some protospace namespacing surgar */
require('protospace').register(Some_Stuff_I_Want_Export_On_An_Object, 'Our.Desired.Namespace', 'Stuff'); /* => { Our: { Desired: { Namespace: { Stuff: Some_Stuff_I_Want_Export_On_An_Object }} } } */

```
What have we done? We've wrapped a function and object in objects to simulate namespacing. Not particularly useful.

## Bundling ##

```JavaScript

/* On another file, not far, far away. We want to export all the code we've registered. */

require('./sample_constructor');
require('./sample_module');

module.exports = new require('protospace').bundle();

/*
{ Our: { 
    Desired: {
      Namespace: { 
        SomeConstructor: SomeConstructor,
        Stuff: Some_Stuff_I_Want_Export_On_An_Object
      }
    } 
  }
}
*/


```