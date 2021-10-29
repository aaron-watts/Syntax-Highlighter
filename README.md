# Syntax-Highlighter

> A siple syntax highlighter for html `<pre>` elements written in javascript.

____

### Currently Supported

- JavaScript

#### Coming Soon

- HTML
- CSS

----
## How to Use

Copy _index.js_ and _styles.css_ into your project, either in a dedicated __Syntax_Highlighter__ folder, or rename them and put them in the desired directories. Link the style sheet in the header, and the script at the bottom of the body.

Place your code inside of a `pre` element within your html. The parser will only highlight syntax so you will need to format any tabs _The_ `pre`_(-formatted)_ _element preserves whitespace._

Add a class of _syntax-highlighted_ to the `pre` element, plus the language you wish to format too:

```html
<pre class="syntax-highlighted js">
    console.log("Hello, World!");
</pre>
```

The current stylings are free to be changed as you wish, although the ordering of style rules and any `!important` tags should be left as is - this allows the css to overide something such as an ___integers___ styling within a ___string___, or a ___strings___ styling within a ___comment___.

#### _Nuances_

> ___NOTE___ This is only a personal project. While I would appreciate any bugs being bought to my attention, I cannot promise that I will prioritise time to fix them.

##### JavaScript:

- You only need to escape ___greater than___ `>` (change to `&gt;`) and ___less than characters___ `<` (change to `&lt;`), the Parser can take care of the rest. The parser will also recognise `&quot;` and `&equals;` if you so choose to use them, but these escapes are not strictly necessary.

- __Do not__ use double quotes where a string immediately follows a declaration! This is to allow the parser to distinguish between declarations in your code and the attributes on the span elements that create the styling.

```javascript
let bad="This will break the parser!!";
let good = "This is correct";
let alsoGood='This is okay!';

function badFn (default="default") {};
function goodFn (default = "default") {};
function alsoGood (default='default') {};
```
- Template literal strings inner values are currently only rendered as a string - it will not break out to general highlighting rules when working within the string templates. _This feature will hopefully be added in the future._