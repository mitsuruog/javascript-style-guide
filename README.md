[元文書:https://github.com/airbnb/javascript](https://github.com/airbnb/javascript)

# Airbnb JavaScript スタイルガイド() {

*常に気をつけたい、JavaScriptへの正しい接し方*

他のスタイルガイドたち
 - [ES5](https://github.com/mitsuruog/javascript-style-guide/blob/master/es5/README.md)
 - [React](https://github.com/mitsuruog/javascript-style-guide/blob/master/react/README.md)
 - [CSS & Sass](https://github.com/airbnb/css)
 - [Ruby](https://github.com/airbnb/ruby)

## 目次

  1. [型(Types)](#型types)
  1. [参照(References)](#参照references)
  1. [オブジェクト(Objects)](#オブジェクトobjects)
  1. [配列(Arrays)](#配列arrays)
  1. [構造化代入(Destructuring)](#構造化代入destructuring)
  1. [文字列(Strings)](#文字列strings)
  1. [関数(Functions)](#関数functions)
  1. [アロー関数(Arrow Functions)](#アロー関数arrow-functions)
  1. [コンストラクタ(Constructors)](#コンストラクタconstructors)
  1. [モジュール(Modules)](#モジュールmodules)
  1. [イテレータとジェネレータ(Iterators and Generators)](#イテレータとジェネレータiterators-and-generators)
  1. [プロパティ(Properties)](#プロパティproperties)
  1. [変数(Variables)](#変数variables)
  1. [巻き上げ(Hoisting)](#巻き上げhoisting)
  1. [条件式と等価式(Comparison Operators & Equality)](#条件式と等価式comparison-operators--equality)
  1. [ブロック(Blocks)](#ブロックblocks)
  1. [コメント(Comments)](#コメントcomments)
  1. [空白(Whitespace)](#空白whitespace)
  1. [カンマ(Commas)](#カンマcommas)
  1. [セミコロン(Semicolons)](#セミコロンsemicolons)
  1. [型変換と強制(Type Casting & Coercion)](#型変換と強制type-casting--coercion)
  1. [命名規則(Naming Conventions)](#命名規則naming-conventions)
  1. [アクセッサ(Accessors)](#アクセッサaccessors)
  1. [イベント(Events)](#イベントevents)
  1. [jQuery(jQuery)](#jquery)
  1. [ECMAScript 5 互換性(ECMAScript 5 Compatibility)](#ECMAScript-5-互換性ecmascript-5-compatibility)
  1. [ECMAScript 6 スタイル(ECMAScript 6 Styles)](#ECMAScript-6-スタイルecmascript-6-styles)
  1. [テスト(Testing)](#テストtesting)
  1. [パフォーマンス(Performance)](#パフォーマンスperformance)
  1. [参考文献(Resources)](#参考文献resources)
  1. [共鳴者(In the Wild)](#共鳴者in-the-wild)
  1. [翻訳(Translation)](#翻訳translation)
  1. [JavaScriptスタイルガイドへの手引き(The JavaScript Style Guide Guide)](#JavaScriptスタイルガイドへの手引きthe-javascript-style-guide-guide)
  1. [Javascriptスタイルガイドについてのchat(Chat With Us About JavaScript)](#Javascriptスタイルガイドについてのchatchat-with-us-about-javascript)
  1. [貢献者(Contributors)](#貢献者contributors)
  1. [ライセンス(License)](#ライセンスlicense)

## 型(Types)

  - [1.1](#1.1) <a name='1.1'></a> **Primitives**: When you access a primitive type you work directly on its value.
  - [1.1](#1.1) <a name='1.1'></a> **プリミティブ型**: プリミティブ型は、その値を直接操作します。
    + `string`
    + `number`
    + `boolean`
    + `null`
    + `undefined`

    ```javascript
    const foo = 1;
    let bar = foo;

    bar = 9;

    console.log(foo, bar); // => 1, 9
    ```
  - [1.2](#1.2) <a name='1.2'></a> **Complex**: When you access a complex type you work on a reference to its value.
  - [1.2](#1.2) <a name='1.2'></a> **参照型**: 参照型は、参照を通して値を操作します。

    + `object`
    + `array`
    + `function`

    ```javascript
    const foo = [1, 2];
    const bar = foo;

    bar[0] = 9;

    console.log(foo[0], bar[0]); // => 9, 9
    ```

**[⬆ ページのTopへ戻る](#目次)**

## 参照(References)

  - [2.1](#2.1) <a name='2.1'></a> Use `const` for all of your references; avoid using `var`.
  - [2.1](#2.1) <a name='2.1'></a> すべての参照は `const` を使用し、`var` を使用しないでください。

  > Why? This ensures that you can't reassign your references, which can lead to bugs and difficult to comprehend code.

  > なぜ? 参照を再割り当でできないことで、バグに繋がりやすく理解しがたいコードになることを防ぎます。

    ```javascript
    // bad
    var a = 1;
    var b = 2;

    // good
    const a = 1;
    const b = 2;
    ```

  - [2.2](#2.2) <a name='2.2'></a> If you must reassign references, use `let` instead of `var`.
  - [2.2](#2.2) <a name='2.2'></a> 参照を再割当てする場合は `var` の代わりに `let` を利用してください。

  > Why? `let` is block-scoped rather than function-scoped like `var`.

  > なぜ? 関数スコープの `var` よりむしろ、ブロックスコープの `let`

    ```javascript
    // bad
    var count = 1;
    if (true) {
      count += 1;
    }

    // good, use the let.
    let count = 1;
    if (true) {
      count += 1;
    }
    ```

  - [2.3](#2.3) <a name='2.3'></a> Note that both `let` and `const` are block-scoped.
  - [2.3](#2.3) <a name='2.3'></a> `let` と `const` は共にブロックスコープであることに注意すること。

    ```javascript
    // const and let only exist in the blocks they are defined in.
    // const と let はそれらが宣言されたブロックの中でのみ存在します。
    {
      let a = 1;
      const b = 1;
    }
    console.log(a); // ReferenceError
    console.log(b); // ReferenceError
    ```

**[⬆ ページのTopへ戻る](#目次)**

## オブジェクト(Objects)

  - [3.1](#3.1) <a name='3.1'></a> Use the literal syntax for object creation.
  - [3.1](#3.1) <a name='3.1'></a> オブジェクトを作成する際は、リテラル構文を使用してください。

    ```javascript
    // bad
    const item = new Object();

    // good
    const item = {};
    ```

  - [3.2](#3.2) <a name='3.2'></a> If your code will be executed in browsers in script context, don't use [reserved words](http://es5.github.io/#x7.6.1) as keys. It won't work in IE8. [More info](https://github.com/airbnb/javascript/issues/61). It’s OK to use them in ES6 modules and server-side code.
  - [3.2](#3.2) <a name='3.2'></a> コードが、ブラウザ上のスクリプトとして実行される場合、[予約語](http://es5.github.io/#x7.6.1)をキーとして利用しないでください。これはIE8では動作しません。[More info](https://github.com/airbnb/javascript/issues/61)
  しかし、ES6モジュール内やサーバサイドでは利用可能です。

    ```javascript
    // bad
    const superman = {
      default: { clark: 'kent' },
      private: true,
    };

    // good
    const superman = {
      defaults: { clark: 'kent' },
      hidden: true,
    };
    ```

  - [3.3](#3.3) <a name='3.3'></a> Use readable synonyms in place of reserved words.
  - [3.3](#3.3) <a name='3.3'></a> 予約語の代わりに分かりやすい同義語を使用してください。

    ```javascript
    // bad
    const superman = {
      class: 'alien',
    };

    // bad
    const superman = {
      klass: 'alien',
    };

    // good
    const superman = {
      type: 'alien',
    };
    ```

  <a name="es6-computed-properties"></a>
  - [3.4](#3.4) <a name='3.4'></a> Use computed property names when creating objects with dynamic property names.
  - [3.4](#3.4) <a name='3.4'></a> 動的にプロパティ名を持つオブジェクトを作成する場合、計算されたプロパティ名(computed property names)を利用してください。

  > Why? They allow you to define all the properties of an object in one place.

  > なぜ? こうすることで、オブジェクトのプロパティを1箇所で定義することができます。

    ```javascript
    function getKey(k) {
      return a `key named ${k}`;
    }

    // bad
    const obj = {
      id: 5,
      name: 'San Francisco',
    };
    obj[getKey('enabled')] = true;

    // good
    const obj = {
      id: 5,
      name: 'San Francisco',
      ［getKey('enabled')]: true
    };
    ```

  <a name="es6-object-shorthand"></a>
  - [3.5](#3.5) <a name='3.5'></a> Use object method shorthand.
  - [3.5](#3.5) <a name='3.5'></a> メソッドの短縮構文を利用してください。

    ```javascript
    // bad
    const atom = {
      value: 1,

      addValue: function (value) {
        return atom.value + value;
      },
    };

    // good
    const atom = {
      value: 1,

      addValue(value) {
        return atom.value + value;
      },
    };
    ```

  <a name="es6-object-concise"></a>
  - [3.6](#3.6) <a name='3.6'></a> Use property value shorthand.
  - [3.6](#3.6) <a name='3.6'></a> プロパティの短縮構文を利用してください。

  > Why? It is shorter to write and descriptive.

  > Why? 記述や説明が簡潔になるからです。

    ```javascript
    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
      lukeSkywalker: lukeSkywalker,
    };

    // good
    const obj = {
      lukeSkywalker,
    };
    ```

  - [3.7](#3.7) <a name='3.7'></a> Group your shorthand properties at the beginning of your object declaration.
  - [3.7](#3.7) <a name='3.7'></a> プロパティの短縮構文はオブジェクト宣言の先頭にまとめてください。

  > Why? It's easier to tell which properties are using the shorthand.

  > なぜ? どのプロパティが短縮構文を利用しているか分かりやすいからです。

    ```javascript
    const anakinSkywalker = 'Anakin Skywalker';
    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      lukeSkywalker,
      episodeThree: 3,
      mayTheFourth: 4,
      anakinSkywalker,
    };

    // good
    const obj = {
      lukeSkywalker,
      anakinSkywalker,
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      episodeThree: 3,
      mayTheFourth: 4,
    };
    ```

**[⬆ ページのTopへ戻る](#目次)**

## 配列(Arrays)

  - [4.1](#4.1) <a name='4.1'></a> Use the literal syntax for array creation.
  - [4.1](#4.1) <a name='4.1'></a> 配列を作成する際は、リテラル構文を使用してください。

    ```javascript
    // bad
    const items = new Array();

    // good
    const items = [];
    ```

  - [4.2](#4.2) <a name='4.2'></a> Use Array#push instead of direct assignment to add items to an array.
  - [4.2](#4.2) <a name='4.2'></a> 直接配列に項目を代入せず、Array#pushを利用してください。

    ```javascript
    const someStack = [];

    // bad
    someStack[someStack.length] = 'abracadabra';

    // good
    someStack.push('abracadabra');
    ```

  <a name="es6-array-spreads"></a>
  - [4.3](#4.3) <a name='4.3'></a> Use array spreads `...` to copy arrays.
  <a name="es6-array-spreads"></a>
  - [4.3](#4.3) <a name='4.3'></a> 配列をコピーする場合は、配列の拡張演算子 `...` を利用してください。

    ```javascript
    // bad
    const len = items.length;
    const itemsCopy = [];
    let i;

    for (i = 0; i < len; i++) {
      itemsCopy[i] = items[i];
    }

    // good
    const itemsCopy = [...items];
    ```

  - [4.4](#4.4) <a name='4.4'></a> To convert an array-like object to an array, use Array#from.
  - [4.4](#4.4) <a name='4.4'></a> array-likeなオブジェクトを配列に変換する場合は、Array#fromを利用してください。

    ```javascript
    const foo = document.querySelectorAll('.foo');
    const nodes = Array.from(foo);
    ```

**[⬆ ページのTopへ戻る](#目次)**

## 構造化代入(Destructuring)

  - [5.1](#5.1) <a name='5.1'></a> Use object destructuring when accessing and using multiple properties of an object.
  - [5.1](#5.1) <a name='5.1'></a> 複数のプロパティからなるオブジェクトにアクセスする際は、オブジェクト構造化代入を利用してください。

  > Why? Destructuring saves you from creating temporary references for those properties.

  > なぜ? 構造化代入を利用することで、それらのプロパティのための中間的な参照を減らすことができます。

    ```javascript
    // bad
    function getFullName(user) {
      const firstName = user.firstName;
      const lastName = user.lastName;

      return `${firstName} ${lastName}`;
    }

    // good
    function getFullName(obj) {
      const { firstName, lastName } = obj;
      return `${firstName} ${lastName}`;
    }

    // best
    function getFullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    }
    ```

  - [5.2](#5.2) <a name='5.2'></a> Use array destructuring.
  - [5.2](#5.2) <a name='5.2'></a> 配列の構造化代入を利用してください。

    ```javascript
    const arr = [1, 2, 3, 4];

    // bad
    const first = arr[0];
    const second = arr[1];

    // good
    const [first, second] = arr;
    ```

  - [5.3](#5.3) <a name='5.3'></a> Use object destructuring for multiple return values, not array destructuring.
  - [5.3](#5.3) <a name='5.3'></a> 複数の値を返却する場合は、配列の構造化代入ではなく、オブジェクトの構造化代入を利用してください。

  > Why? You can add new properties over time or change the order of things without breaking call sites.

  > なぜ? こうすることで、後で新しいプロパティを追加したり、呼び出し元に影響することなく順序を変更することができます。

    ```javascript
    // bad
    function processInput(input) {
      // then a miracle occurs
      // その後、奇跡が起こります。
      return [left, right, top, bottom];
    }

    // the caller needs to think about the order of return data
    // 呼び出し者で返却されるデータの順番を考慮する必要があります。
    const [left, __, top] = processInput(input);

    // good
    function processInput(input) {
      // then a miracle occurs
      // その後、奇跡が起こります。
      return { left, right, top, bottom };
    }

    // the caller selects only the data they need
    // 呼び出し元は必要なデータのみ選択すればいい。
    const { left, right } = processInput(input);
    ```


**[⬆ ページのTopへ戻る](#目次)**

## 文字列(Strings)

  - [6.1](#6.1) <a name='6.1'></a> Use single quotes `''` for strings.
  - [6.1](#6.1) <a name='6.1'></a> 文字列にはシングルクオート `''` を使用してください。

    ```javascript
    // bad
    const name = "Capt. Janeway";

    // good
    const name = 'Capt. Janeway';
    ```

  - [6.2](#6.2) <a name='6.2'></a> Strings longer than 100 characters should be written across multiple lines using string concatenation.
  - [6.2](#6.2) <a name='6.2'></a> 100文字以上の文字列は、文字列連結を使用して複数行にまたがって記述する必要があります。

  - [6.3](#6.3) <a name='6.3'></a> Note: If overused, long strings with concatenation could impact performance. [jsPerf](http://jsperf.com/ya-string-concat) & [Discussion](https://github.com/airbnb/javascript/issues/40).
  - [6.3](#6.3) <a name='6.3'></a> 注意: 文字連結を多用した場合、パフォーマンスに影響を与えることがあります。 [jsPerf](http://jsperf.com/ya-string-concat) & [Discussion](https://github.com/airbnb/javascript/issues/40).

    ```javascript
    // bad
    const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

    // bad
    const errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // good
    const errorMessage = 'This is a super long error that was thrown because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.';
    ```

  <a name="es6-template-literals"></a>
  - [6.4](#6.4) <a name='6.4'></a> When programmatically building up strings, use template strings instead of concatenation.
  - [6.4](#6.4) <a name='6.4'></a> プログラムで文字列を生成する場合は、文字列連結ではなく、template stringsを利用してください。

  > Why? Template strings give you a readable, concise syntax with proper newlines and string interpolation features.

  > なぜ? Template strings は文字列補完機能・複数行文字列機能を持つ簡潔な構文で、可読性が良いからです。

    ```javascript
    // bad
    function sayHi(name) {
      return 'How are you, ' + name + '?';
    }

    // bad
    function sayHi(name) {
      return ['How are you, ', name, '?'].join();
    }

    // good
    function sayHi(name) {
      return `How are you, ${name}?`;
    }
    ```
  - [6.5](#6.5) <a name='6.5'></a> Never use `eval()` on a string, it opens too many vulnerabilities.
  - [6.5](#6.5) <a name='6.5'></a> 絶対に `eval()` を利用しないでください。これは、いままで数多くの脆弱性を作って来たからです。

**[⬆ ページのTopへ戻る](#目次)**


## 関数(Functions)

  - [7.1](#7.1) <a name='7.1'></a> Use function declarations instead of function expressions.
  - [7.1](#7.1) <a name='7.1'></a> 関数式より関数宣言を利用してください。

  > Why? Function declarations are named, so they're easier to identify in call stacks. Also, the whole body of a function declaration is hoisted, whereas only the reference of a function expression is hoisted. This rule makes it possible to always use [Arrow Functions](#アロー関数arrow-functions) in place of function expressions.

  > なぜ? 名前が付けられた関数宣言はコールスタックで簡単に見分けることができます。さらに関数宣言は関数の本体が巻き上げられます。それに対し、関数式は参照だけが巻き上げられます。
  このルールにより、関数式の部分を常に[アロー関数](#アロー関数arrow-functions)で置き換えて利用することができます。

    ```javascript
    // bad
    const foo = function () {
    };

    // good
    function foo() {
    }
    ```

  - [7.2](#7.2) <a name='7.2'></a> Function expressions:
  - [7.2](#7.2) <a name='7.2'></a> 関数式

    ```javascript
    // immediately-invoked function expression (IIFE)
    // 即時実行関数(IIFE)
    (() => {
      console.log('Welcome to the Internet. Please follow me.');
    })();
    ```

  - [7.3](#7.3) <a name='7.3'></a> Never declare a function in a non-function block (if, while, etc). Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is bad news bears.
  - [7.3](#7.3) <a name='7.3'></a> 関数以外のブロック（ifやwhileなど）の中で関数を宣言しないでください。、変数に関数を代入する代わりブラウザはそのことを許可しますが、（それはまるで「頑張れベアーズ」の悪ガキ達のように）すべて違ったように解釈されます。

  - [7.4](#7.4) <a name='7.4'></a> **Note:** ECMA-262 defines a `block` as a list of statements. A function declaration is not a statement. [Read ECMA-262's note on this issue](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97).
  - [7.4](#7.4) <a name='7.4'></a> **注意:** ECMA-262仕様では `block` はstatementsの一覧に定義されていますが、関数宣言はstatementsではありません。 [Read ECMA-262's note on this issue](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97).

    ```javascript
    // bad
    if (currentUser) {
      function test() {
        console.log('Nope.');
      }
    }

    // good
    let test;
    if (currentUser) {
      test = () => {
        console.log('Yup.');
      };
    }
    ```

  - [7.5](#7.5) <a name='7.5'></a> Never name a parameter `arguments`. This will take precedence over the `arguments` object that is given to every function scope.
  - [7.5](#7.5) <a name='7.5'></a> パラメータに `arguments` を指定しないでください。これは、関数スコープに渡される `arguments` オブジェクトの参照を上書きしてしまうためです。

    ```javascript
    // bad
    function nope(name, options, arguments) {
      // ...stuff...
    }

    // good
    function yup(name, options, args) {
      // ...stuff...
    }
    ```

  <a name="es6-rest"></a>
  - [7.6](#7.6) <a name='7.6'></a> Never use `arguments`, opt to use rest syntax `...` instead.
  - [7.6](#7.6) <a name='7.6'></a> `arguments` を利用しないでください。代わりにrest syntax `...` を利用してください。

  > Why? `...` is explicit about which arguments you want pulled. Plus rest arguments are a real Array and not Array-like like `arguments`.

  > なぜ? `...` を利用することで、いつくかのパラメータを利用したいことを明らかにすることができます。加えてrestパラメータは `arguments` の様なArray-likeなオブジェクトではなく正真正銘のArrayです。

    ```javascript
    // bad
    function concatenateAll() {
      const args = Array.prototype.slice.call(arguments);
      return args.join('');
    }

    // good
    function concatenateAll(...args) {
      return args.join('');
    }
    ```

  <a name="es6-default-parameters"></a>
  - [7.7](#7.7) <a name='7.7'></a> Use default parameter syntax rather than mutating function arguments.
  - [7.7](#7.7) <a name='7.7'></a> 関数のパラメータを突然変異させるのではなく、デフォルトパラメータを利用してください。

    ```javascript
    // really bad
    function handleThings(opts) {
      // No! We shouldn't mutate function arguments.
      // Double bad: if opts is falsy it'll be set to an object which may
      // be what you want but it can introduce subtle bugs.

      // だめ！関数のパラメータを突然変異させるべきではありません。
      // もし、optsがfalsyだった場合は、望んだようにオブジェクトが設定されます。
      // しかし、微妙なバグを引き起こすかもしれません。
      opts = opts || {};
      // ...
    }

    // still bad
    function handleThings(opts) {
      if (opts === void 0) {
        opts = {};
      }
      // ...
    }

    // good
    function handleThings(opts = {}) {
      // ...
    }
    ```

  - [7.8](#7.8) <a name='7.8'></a> Avoid side effects with default parameters.
  - [7.8](#7.8) <a name='7.8'></a> 副作用のあるデフォルトパラメータの利用は避けてください。

  > Why? They are confusing to reason about.

  > なぜ? 混乱させるからです。

  ```javascript
  var b = 1;
  // bad
  function count(a = b++) {
    console.log(a);
  }
  count();  // 1
  count();  // 2
  count(3); // 3
  count();  // 3
  ```

  - [7.9](#7.9) <a name='7.9'></a> Always put default parameters last.
  - [7.9](#7.9) <a name='7.9'></a> 常にデフォルトパラメータは末尾に配置してください。

    ```javascript
    // bad
    function handleThings(opts = {}, name) {
      // ...
    }

    // good
    function handleThings(name, opts = {}) {
      // ...
    }
    ```

- [7.10](#7.10) <a name='7.10'></a> Never use the Function constructor to create a new function.
- [7.10](#7.10) <a name='7.10'></a> 新しい関数を作成するためにFunctionコンストラクタを利用しないでください。

  > Why? Creating a function in this way evaluates a string similarly to eval(), which opens vulnerabilities.

  > なぜ? この方法で文字列を評価させて新しい関数を作成することは、eval()と同様の脆弱性を引き起こすことになります。

  ```javascript
  // bad
  var add = new Function('a', 'b', 'return a + b');

  // still bad
  var subtract = Function('a', 'b', 'return a - b');
  ```

**[⬆ ページのTopへ戻る](#目次)**

## アロー関数(Arrow Functions)

  - [8.1](#8.1) <a name='8.1'></a> When you must use function expressions (as when passing an anonymous function), use arrow function notation.
  - [8.1](#8.1) <a name='8.1'></a> (無名関数を渡すような)関数式を利用する場合、アロー関数表記を利用してください。

  > Why? It creates a version of the function that executes in the context of `this`, which is usually what you want, and is a more concise syntax.

  > なぜ? アロー関数はそのコンテキストの `this` で実行するバージョンの関数を作成します。これは通常期待通りの動作をし、より簡潔な構文だからです。

  > Why not? If you have a fairly complicated function, you might move that logic out into its own function declaration.

  > 利用するべきではない？ 複雑な関数でロジックを定義した関数の外側に移動したいケース。

    ```javascript
    // bad
    [1, 2, 3].map(function (x) {
      const y = x + 1;
      return x * y;
    });

    // good
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });
    ```

  - [8.2](#8.2) <a name='8.2'></a> If the function body consists of a single expression, feel free to omit the braces and use the implicit return. Otherwise use a `return` statement.
  - [8.2](#8.2) <a name='8.2'></a> 関数の本体が1つの式で構成されている場合は、中括弧({})を省略し、暗黙のreturnを利用することができます。それ以外は `return` 文を利用してください。

  > Why? Syntactic sugar. It reads well when multiple functions are chained together.

  > なぜ? 糖衣構文(読みやすさのために導入される構文)だからです。複数の関数が連結される場合に読みやすくなります。

  > Why not? If you plan on returning an object.

  > 使うべきではない? オブジェクトを返すケース。

    ```javascript
    // good
    [1, 2, 3].map(number => `A string containing the ${number}.`);

    // bad
    [1, 2, 3].map(number => {
      const nextNumber = number + 1;
      `A string containing the ${nextNumber}.`;
    });

    // good
    [1, 2, 3].map(number => {
      const nextNumber = number + 1;
      return `A string containing the ${nextNumber}.`;
    });
    ```

  - [8.3](#8.3) <a name='8.3'></a> In case the expression spans over multiple lines, wrap it in parentheses for better readability.
  - [8.3](#8.3) <a name='8.3'></a> 式の全長が複数行にまたがる場合は、可読性をより良くするため丸括弧()で囲ってください。

  > Why? It shows clearly where the function starts and ends.

  > なぜ? 関数の開始と終了部分が分かりやすく見えるためです。

    ```js
    // bad
    [1, 2, 3].map(number => 'As time went by, the string containing the ' +
      `${number} became much longer. So we needed to break it over multiple ` +
      'lines.'
    );

    // good
    [1, 2, 3].map(number => (
      `As time went by, the string containing the ${number} became much ` +
      'longer. So we needed to break it over multiple lines.'
    ));
    ```

  - [8.4](#8.4) <a name='8.4'></a> If your function only takes a single argument, feel free to omit the parentheses.
  - [8.4](#8.4) <a name='8.4'></a> 関数の引数が1つの場合、丸括弧()を省略することができます。

  > Why? Less visual clutter.

  > なぜ? あまり見難くないからです。

    ```javascript
    // good
    [1, 2, 3].map(x => x * x);

    // good
    [1, 2, 3].reduce((y, x) => x + y);
    ```

**[⬆ ページのTopへ戻る](#目次)**


## コンストラクタ(Constructors)

  - [9.1](#9.1) <a name='9.1'></a> Always use `class`. Avoid manipulating `prototype` directly.
  - [9.1](#9.1) <a name='9.1'></a> `prototype` を直接操作することを避け、常に `class` を利用してください。

  > Why? `class` syntax is more concise and easier to reason about.

  > なぜ? `class` 構文は簡潔で意図がわかりやすいからです。

    ```javascript
    // bad
    function Queue(contents = []) {
      this._queue = [...contents];
    }
    Queue.prototype.pop = function() {
      const value = this._queue[0];
      this._queue.splice(0, 1);
      return value;
    }

    // good
    class Queue {
      constructor(contents = []) {
        this._queue = [...contents];
      }
      pop() {
        const value = this._queue[0];
        this._queue.splice(0, 1);
        return value;
      }
    }
    ```

  - [9.2](#9.2) <a name='9.2'></a> Use `extends` for inheritance.
  - [9.2](#9.2) <a name='9.2'></a> 継承は `extends` を利用してください。

  > Why? It is a built-in way to inherit prototype functionality without breaking `instanceof`.

  > なぜ? プロトタイプ継承するためにビルトインされた方法で、`instanceof` を破壊することがないためです。

    ```javascript
    // bad
    const inherits = require('inherits');
    function PeekableQueue(contents) {
      Queue.apply(this, contents);
    }
    inherits(PeekableQueue, Queue);
    PeekableQueue.prototype.peek = function() {
      return this._queue[0];
    }

    // good
    class PeekableQueue extends Queue {
      peek() {
        return this._queue[0];
      }
    }
    ```

  - [9.3](#9.3) <a name='9.3'></a> Methods can return `this` to help with method chaining.
  - [9.3](#9.3) <a name='9.3'></a> メソッドの戻り値で `this` を返すことで、メソッドチェーンをすることができます。

    ```javascript
    // bad
    Jedi.prototype.jump = function() {
      this.jumping = true;
      return true;
    };

    Jedi.prototype.setHeight = function(height) {
      this.height = height;
    };

    const luke = new Jedi();
    luke.jump(); // => true
    luke.setHeight(20); // => undefined

    // good
    class Jedi {
      jump() {
        this.jumping = true;
        return this;
      }

      setHeight(height) {
        this.height = height;
        return this;
      }
    }

    const luke = new Jedi();

    luke.jump()
      .setHeight(20);
    ```


  - [9.4](#9.4) <a name='9.4'></a> It's okay to write a custom toString() method, just make sure it works successfully and causes no side effects.
  - [9.4](#9.4) <a name='9.4'></a> 独自のtoString()を作成することも認めますが、正しく動作すること、副作用がないことだけは確認してください。

    ```javascript
    class Jedi {
      constructor(options = {}) {
        this.name = options.name || 'no name';
      }

      getName() {
        return this.name;
      }

      toString() {
        return `Jedi - ${this.getName()}`;
      }
    }
    ```

**[⬆ ページのTopへ戻る](#目次)**


## モジュール(Modules)

  - [10.1](#10.1) <a name='10.1'></a> Always use modules (`import`/`export`) over a non-standard module system. You can always transpile to your preferred module system.
  - [10.1](#10.1) <a name='10.1'></a> 非標準のモジュールシステムではなく、常に (`import`/`export`) を利用してください。こうすることで好みのモジュールシステムへいつでもトランスパイルすることでできます。

  > Why? Modules are the future, let's start using the future now.

  > Why? モジュールは将来性があります。未来を先取りして使いましょう。

    ```javascript
    // bad
    const AirbnbStyleGuide = require('./AirbnbStyleGuide');
    module.exports = AirbnbStyleGuide.es6;

    // ok
    import AirbnbStyleGuide from './AirbnbStyleGuide';
    export default AirbnbStyleGuide.es6;

    // best
    import { es6 } from './AirbnbStyleGuide';
    export default es6;
    ```

  - [10.2](#10.2) <a name='10.2'></a> Do not use wildcard imports.
  - [10.2](#10.2) <a name='10.2'></a> ワイルドカードインポートは利用しないでください。

  > Why? This makes sure you have a single default export.

  > なぜ? single default exportであることに注意する必要があるからです。

    ```javascript
    // bad
    import * as AirbnbStyleGuide from './AirbnbStyleGuide';

    // good
    import AirbnbStyleGuide from './AirbnbStyleGuide';
    ```

  - [10.3](#10.3) <a name='10.3'></a>And do not export directly from an import.
  - [10.3](#10.3) <a name='10.3'></a> import文から直接exportするのはやめてください。

  > Why? Although the one-liner is concise, having one clear way to import and one clear way to export makes things consistent.

  > なぜ? ワンライナーは簡潔ではありますが、importとexportの方法を明確に1つとすることで一貫性を保つことができます。

    ```javascript
    // bad
    // filename es6.js
    export { es6 as default } from './airbnbStyleGuide';

    // good
    // filename es6.js
    import { es6 } from './AirbnbStyleGuide';
    export default es6;
    ```

**[⬆ ページのTopへ戻る](#目次)**

## イテレータとジェネレータ(Iterators and Generators)

  - [11.1](#11.1) <a name='11.1'></a> Don't use iterators. Prefer JavaScript's higher-order functions like `map()` and `reduce()` instead of loops like `for-of`.
  - [11.1](#11.1) <a name='11.1'></a> iteratorsを利用しないでください。`for-of` ループの代わりに `map()` や `reduce()` のようなJavascriptの高級関数(higher-order functions)を利用してください。

  > Why? This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side-effects.

  > なぜ? これはimmutable(不変)ルールを適用します。値を返ような関数の中身の処理を気にするより副作用について推測するほうが簡単です。

    ```javascript
    const numbers = [1, 2, 3, 4, 5];

    // bad
    let sum = 0;
    for (let num of numbers) {
      sum += num;
    }

    sum === 15;

    // good
    let sum = 0;
    numbers.forEach((num) => sum += num);
    sum === 15;

    // best (use the functional force)
    const sum = numbers.reduce((total, num) => total + num, 0);
    sum === 15;
    ```

  - [11.2](#11.2) <a name='11.2'></a> Don't use generators for now.
  - [11.2](#11.2) <a name='11.2'></a> 現時点ではgeneratorsは利用しないでください。

  > Why? They don't transpile well to ES5.

  > なぜ? ES5にうまくトランスパイルできないから。

**[⬆ ページのTopへ戻る](#目次)**


## プロパティ(Properties)

  - [12.1](#12.1) <a name='12.1'></a> Use dot notation when accessing properties.
  - [12.1](#12.1) <a name='12.1'></a> プロパティにアクセスする場合は、ドット `.` を使用してください。

    ```javascript
    const luke = {
      jedi: true,
      age: 28,
    };

    // bad
    const isJedi = luke['jedi'];

    // good
    const isJedi = luke.jedi;
    ```

  - [12.2](#12.2) <a name='12.2'></a> Use subscript notation `[]` when accessing properties with a variable.
  - [12.2](#12.2) <a name='12.2'></a> 変数を使用してプロパティにアクセスする場合は、角括弧 `[]` を使用してください。

    ```javascript
    const luke = {
      jedi: true,
      age: 28,
    };

    function getProp(prop) {
      return luke[prop];
    }

    const isJedi = getProp('jedi');
    ```

**[⬆ ページのTopへ戻る](#目次)**


## 変数(Variables)

  - [13.1](#13.1) <a name='13.1'></a> Always use `const` to declare variables. Not doing so will result in global variables. We want to avoid polluting the global namespace. Captain Planet warned us of that.
  - [13.1](#13.1) <a name='13.1'></a> 変数を宣言する際は、常に `const` を使用してください。使用しない場合、グローバル変数として宣言されます。グローバルな名前空間を汚染しないように、キャプテンプラネット（環境保護とエコロジーをテーマにしたスーパーヒーローアニメ）も警告しています。

    ```javascript
    // bad
    superPower = new SuperPower();

    // good
    const superPower = new SuperPower();
    ```

  - [13.2](#13.2) <a name='13.2'></a> Use one `const` declaration per variable.
  - [13.2](#13.2) <a name='13.2'></a> 1つの変数宣言に対して1つの `const` を利用してください。

    > Why? It's easier to add new variable declarations this way, and you never have to worry about swapping out a `;` for a `,` or introducing punctuation-only diffs.

    > なぜ? この方法の場合、簡単に新しい変数を追加することができます。また、二度と区切り文字の違いによる `;` を `,` に置き換える作業を心配することがありません。

    ```javascript
    // bad
    const items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';

    // bad
    // (compare to above, and try to spot the mistake)
    const items = getItems(),
        goSportsTeam = true;
        dragonball = 'z';

    // good
    const items = getItems();
    const goSportsTeam = true;
    const dragonball = 'z';
    ```

  - [13.3](#13.3) <a name='13.3'></a> Group all your `const`s and then group all your `let`s.
  - [13.3](#13.3) <a name='13.3'></a> まず `const` をグループ化して、その後 `let` をグループ化してください。

  > Why? This is helpful when later on you might need to assign a variable depending on one of the previous assigned variables.

  > なぜ? 以前に割り当てた変数に応じて、後で新しい変数を追加する場合に有用だからです。

    ```javascript
    // bad
    let i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;

    // bad
    let i;
    const items = getItems();
    let dragonball;
    const goSportsTeam = true;
    let len;

    // good
    const goSportsTeam = true;
    const items = getItems();
    let dragonball;
    let i;
    let length;
    ```

  - [13.4](#13.4) <a name='13.4'></a> Assign variables where you need them, but place them in a reasonable place.
  - [13.4](#13.4) <a name='13.4'></a> 変数を割り当てる際は、必要かつ合理的な場所で行ってください。

  > Why? `let` and `const` are block scoped and not function scoped.

  > なぜ? `let` と `const` はブロックスコープだからです。関数スコープではありません。

    ```javascript
    // good
    function() {
      test();
      console.log('doing stuff..');

      //..other stuff..

      const name = getName();

      if (name === 'test') {
        return false;
      }

      return name;
    }

    // bad - unnecessary function call
    function(hasName) {
      const name = getName();

      if (!hasName) {
        return false;
      }

      this.setFirstName(name);

      return true;
    }

    // good
    function(hasName) {
      if (!hasName) {
        return false;
      }

      const name = getName();
      this.setFirstName(name);

      return true;
    }
    ```

**[⬆ ページのTopへ戻る](#目次)**


## 巻き上げ(Hoisting)

  - [14.1](#14.1) <a name='14.1'></a> `var` declarations get hoisted to the top of their scope, their assignment does not. `const` and `let` declarations are blessed with a new concept called [Temporal Dead Zones (TDZ)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let). It's important to know why [typeof is no longer safe](http://es-discourse.com/t/why-typeof-is-no-longer-safe/15).
  - [14.1](#14.1) <a name='14.1'></a> `var` 宣言は割り当てがないままスコープの先頭へ巻き上げられます。 `const` と `let` 宣言は[時間的デットゾーン(Temporal Dead Zones (TDZ))](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let)と呼ばれる新しいコンセプトの恩恵を受けています。これは[なぜtypeofは安全ではないか](http://es-discourse.com/t/why-typeof-is-no-longer-safe/15)を知っていることが重要です。

    ```javascript
    // we know this wouldn't work (assuming there
    // is no notDefined global variable)
    // （notDefinedがグローバル変数に存在しないと仮定した場合。）
    // これはうまく動作しません。
    function example() {
      console.log(notDefined); // => throws a ReferenceError
    }

    // creating a variable declaration after you
    // reference the variable will work due to
    // variable hoisting. Note: the assignment
    // value of `true` is not hoisted.
    // その変数を参照するコードの後でその変数を宣言した場合、
    // 変数が巻上げられた上で動作します。
    // 注意：`true` という値自体は巻き上げられません。
    function example() {
      console.log(declaredButNotAssigned); // => undefined
      var declaredButNotAssigned = true;
    }

    // The interpreter is hoisting the variable
    // declaration to the top of the scope,
    // which means our example could be rewritten as:
    // インタープリンタは変数宣言をスコープの先頭に巻き上げます。
    // 上の例は次のように書き直すことが出来ます。
    function example() {
      let declaredButNotAssigned;
      console.log(declaredButNotAssigned); // => undefined
      declaredButNotAssigned = true;
    }

    // using const and let
    // const と let を利用した場合
    function example() {
      console.log(declaredButNotAssigned); // => throws a ReferenceError
      console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
      const declaredButNotAssigned = true;
    }
    ```

  - [14.2](#14.2) <a name='14.2'></a> Anonymous function expressions hoist their variable name, but not the function assignment.
  - [14.2](#14.2) <a name='14.2'></a> 無名関数の場合、関数が割当てされる前の変数が巻き上げられます。

    ```javascript
    function example() {
      console.log(anonymous); // => undefined

      anonymous(); // => TypeError anonymous is not a function

      var anonymous = function() {
        console.log('anonymous function expression');
      };
    }
    ```

  - [14.3](#14.3) <a name='14.3'></a> Named function expressions hoist the variable name, not the function name or the function body.
  - [14.3](#14.3) <a name='14.3'></a> 名前付き関数の場合も同様に変数が巻き上げられます。関数名や関数本体は巻き上げられません。

    ```javascript
    function example() {
      console.log(named); // => undefined

      named(); // => TypeError named is not a function

      superPower(); // => ReferenceError superPower is not defined

      var named = function superPower() {
        console.log('Flying');
      };
    }

    // the same is true when the function name
    // is the same as the variable name.
    // 関数名と変数名が同じ場合も同じことが起きます。
    function example() {
      console.log(named); // => undefined

      named(); // => TypeError named is not a function

      var named = function named() {
        console.log('named');
      }
    }
    ```

  - [14.4](#14.4) <a name='14.4'></a> Function declarations hoist their name and the function body.
  - [14.4](#14.4) <a name='14.4'></a> 関数宣言は関数名と関数本体が巻き上げられます。

    ```javascript
    function example() {
      superPower(); // => Flying

      function superPower() {
        console.log('Flying');
      }
    }
    ```

  - For more information refer to [JavaScript Scoping & Hoisting](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting/) by [Ben Cherry](http://www.adequatelygood.com/).
  - 詳しくはこちらを参照してください。 [JavaScript Scoping & Hoisting](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting/) by [Ben Cherry](http://www.adequatelygood.com/).

**[⬆ ページのTopへ戻る](#目次)**


## 条件式と等価式(Comparison Operators & Equality)

  - [15.1](#15.1) <a name='15.1'></a> Use `===` and `!==` over `==` and `!=`.
  - [15.1](#15.1) <a name='15.1'></a> `==` や`!=`より `===` と `!==` を使用してください。

  - [15.2](#15.2) <a name='15.2'></a> Conditional statements such as the `if` statement evaluate their expression using coercion with the `ToBoolean` abstract method and always follow these simple rules:
    + **Objects** evaluate to **true**
    + **Undefined** evaluates to **false**
    + **Null** evaluates to **false**
    + **Booleans** evaluate to **the value of the boolean**
    + **Numbers** evaluate to **false** if **+0, -0, or NaN**, otherwise **true**
    + **Strings** evaluate to **false** if an empty string `''`, otherwise **true**
  - [15.2](#15.2) <a name='15.2'></a> `if` 文のような条件式は `ToBoolean` メソッドによる強制型変換で評価され、常にこれらのシンプルなルールに従います。
    + **オブジェクト** は **true** と評価されます。
    + **undefined** は **false** と評価されます。
    + **null** は **false** と評価されます。
    + **真偽値** は **boolean型の値** として評価されます。
    + **数値** は **true** と評価されます。しかし、 **+0, -0, or NaN** の場合は **false** です。
    + **文字列** は **true** と評価されます。 しかし、空文字 `''` の場合は **false** です。

    ```javascript
    if ([0]) {
      // true
      // An array is an object, objects evaluate to true
      // 配列はオブジェクトなのでtrueとして評価されます。
    }
    ```

  - [15.3](#15.3) <a name='15.3'></a> Use shortcuts.
  - [15.3](#15.3) <a name='15.3'></a> 短縮形を使用してください。

    ```javascript
    // bad
    if (name !== '') {
      // ...stuff...
    }

    // good
    if (name) {
      // ...stuff...
    }

    // bad
    if (collection.length > 0) {
      // ...stuff...
    }

    // good
    if (collection.length) {
      // ...stuff...
    }
    ```

  - [15.4](#15.4) <a name='15.4'></a> For more information see [Truth Equality and JavaScript](http://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108) by Angus Croll.
  - [15.4](#15.4) <a name='15.4'></a> 詳しくはこちらを参照してください。 [Truth Equality and JavaScript](http://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108) by Angus Croll.

**[⬆ ページのTopへ戻る](#目次)**


## ブロック(Blocks)

  - [16.1](#16.1) <a name='16.1'></a> Use braces with all multi-line blocks.
  - [16.1](#16.1) <a name='16.1'></a> 複数行のブロックには中括弧（{}）を使用してください。

    ```javascript
    // bad
    if (test)
      return false;

    // good
    if (test) return false;

    // good
    if (test) {
      return false;
    }

    // bad
    function() { return false; }

    // good
    function() {
      return false;
    }
    ```

  - [16.2](#16.2) <a name='16.2'></a> If you're using multi-line blocks with `if` and `else`, put `else` on the same line as your
    `if` block's closing brace.
  - [16.2](#16.2) <a name='16.2'></a> 複数ブロックに渡る `if` と `else` を利用する場合、 `else` は `if` ブロックの終わりの中括弧(})と同じ行においてください。

    ```javascript
    // bad
    if (test) {
      thing1();
      thing2();
    }
    else {
      thing3();
    }

    // good
    if (test) {
      thing1();
      thing2();
    } else {
      thing3();
    }
    ```


**[⬆ ページのTopへ戻る](#目次)**


## コメント(Comments)

  - [17.1](#17.1) <a name='17.1'></a> Use `/** ... */` for multi-line comments. Include a description, specify types and values for all parameters and return values.
  - [17.1](#17.1) <a name='17.1'></a> 複数行のコメントは`/** ... */` を使用してください。その中には説明とすべてのパラメータと戻り値についての型や値を記述してください。

    ```javascript
    // bad
    // make() returns a new element
    // based on the passed in tag name
    //
    // @param {String} tag
    // @return {Element} element
    function make(tag) {

      // ...stuff...

      return element;
    }

    // good
    /**
     * make() returns a new element
     * based on the passed in tag name
     *
     * @param {String} tag
     * @return {Element} element
     */
    function make(tag) {

      // ...stuff...

      return element;
    }
    ```

  - [17.2](#17.2) <a name='17.2'></a> Use `//` for single line comments. Place single line comments on a newline above the subject of the comment. Put an empty line before the comment unless it's on the first line of a block.
  - [17.2](#17.2) <a name='17.2'></a> 単一行コメントには`//` を使用してください。コメントを加えたいコードの上部に配置してください。また、コメントの前に空行を入れてください。

    ```javascript
    // bad
    const active = true;  // is current tab

    // good
    // is current tab
    const active = true;

    // bad
    function getType() {
      console.log('fetching type...');
      // set the default type to 'no type'
      const type = this._type || 'no type';

      return type;
    }

    // good
    function getType() {
      console.log('fetching type...');

      // set the default type to 'no type'
      const type = this._type || 'no type';

      return type;
    }

    // also good
    function getType() {
      // set the default type to 'no type'
      const type = this._type || 'no type';

      return type;
    }
    ```

  - [17.3](#17.3) <a name='17.3'></a> Prefixing your comments with `FIXME` or `TODO` helps other developers quickly understand if you're pointing out a problem that needs to be revisited, or if you're suggesting a solution to the problem that needs to be implemented. These are different than regular comments because they are actionable. The actions are `FIXME -- need to figure this out` or `TODO -- need to implement`.
  - [17.3](#17.3) <a name='17.3'></a> 問題を指摘して再考を促す場合や、問題の解決策を提案する場合など、コメントの前に `FIXME` や `TODO` を付けることで他のデベロッパの素早い理解を助けることができます。これらは、何らかのアクションを伴うという意味で通常のコメントとは異なります。アクションとは `FIXME -- 解決策が必要` もしくは `TODO -- 実装が必要` です。

  - [17.4](#17.4) <a name='17.4'></a> Use `// FIXME:` to annotate problems.
  - [17.4](#17.4) <a name='17.4'></a> 問題に対する注釈として `// FIXME:` を使用してください。

    ```javascript
    class Calculator extends Abacus {
      constructor() {
        super();

        // FIXME: shouldn't use a global here
        // FIXME: グローバル変数を使用するべきではない。
        total = 0;
      }
    }
    ```

  - [17.5](#17.5) <a name='17.5'></a> Use `// TODO:` to annotate solutions to problems.
  - [17.5](#17.5) <a name='17.5'></a> 問題の解決策に対する注釈として `// TODO:` を使用してください。

    ```javascript
    class Calculator extends Abacus {
      constructor() {
        super();

        // TODO: total should be configurable by an options param
        // TODO: total はオプションパラメータとして設定されるべき。
        this.total = 0;
      }
    }
    ```

**[⬆ ページのTopへ戻る](#目次)**


## 空白(Whitespace)

  - [18.1](#18.1) <a name='18.1'></a> Use soft tabs set to 2 spaces.
  - [18.1](#18.1) <a name='18.1'></a> タブにはスペース2つを設定してください。

    ```javascript
    // bad
    function() {
    ∙∙∙∙const name;
    }

    // bad
    function() {
    ∙const name;
    }

    // good
    function() {
    ∙∙const name;
    }
    ```

  - [18.2](#18.2) <a name='18.2'></a> Place 1 space before the leading brace.
  - [18.2](#18.2) <a name='18.2'></a> 重要な中括弧（{}）の前にはスペースを1つ入れてください。

    ```javascript
    // bad
    function test(){
      console.log('test');
    }

    // good
    function test() {
      console.log('test');
    }

    // bad
    dog.set('attr',{
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });

    // good
    dog.set('attr', {
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });
    ```

  - [18.3](#18.3) <a name='18.3'></a> Place 1 space before the opening parenthesis in control statements (`if`, `while` etc.). Place no space before the argument list in function calls and declarations.
  - [18.3](#18.3) <a name='18.3'></a> 制御構文（ `if` 文や `while` 文など）の丸括弧（()）の前にはスペースを1つ入れてください。関数宣言や関数呼び出し時の引数リストの前にはスペースは入れないでください。

    ```javascript
    // bad
    if(isJedi) {
      fight ();
    }

    // good
    if (isJedi) {
      fight();
    }

    // bad
    function fight () {
      console.log ('Swooosh!');
    }

    // good
    function fight() {
      console.log('Swooosh!');
    }
    ```

  - [18.4](#18.4) <a name='18.4'></a> Set off operators with spaces.
  - [18.4](#18.4) <a name='18.4'></a> 演算子の間はスペースを入れてください。

    ```javascript
    // bad
    const x=y+5;

    // good
    const x = y + 5;
    ```

  - [18.5](#18.5) <a name='18.5'></a> End files with a single newline character.
  - [18.5](#18.5) <a name='18.5'></a> ファイルの最後は改行文字を1つ入れてください。

    ```javascript
    // bad
    (function(global) {
      // ...stuff...
    })(this);
    ```

    ```javascript
    // bad
    (function(global) {
      // ...stuff...
    })(this);↵
    ↵
    ```

    ```javascript
    // good
    (function(global) {
      // ...stuff...
    })(this);↵
    ```

  - [18.6](#18.6) <a name='18.6'></a> Use indentation when making long method chains. Use a leading dot, which
    emphasizes that the line is a method call, not a new statement.
  - [18.6](#18.6) <a name='18.6'></a> 長くメソッドを連結する場合はインデントを利用してください。行がメソッド呼び出しではなく、新しい文であることを強調するために先頭にドット(.)を配置してください。

    ```javascript
    // bad
    $('#items').find('.selected').highlight().end().find('.open').updateCount();

    // bad
    $('#items').
      find('.selected').
        highlight().
        end().
      find('.open').
        updateCount();

    // good
    $('#items')
      .find('.selected')
        .highlight()
        .end()
      .find('.open')
        .updateCount();

    // bad
    const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').class('led', true)
        .attr('width', (radius + margin) * 2).append('svg:g')
        .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
        .call(tron.led);

    // good
    const leds = stage.selectAll('.led')
        .data(data)
      .enter().append('svg:svg')
        .classed('led', true)
        .attr('width', (radius + margin) * 2)
      .append('svg:g')
        .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
        .call(tron.led);
    ```

  - [18.7](#18.7) <a name='18.7'></a> Leave a blank line after blocks and before the next statement.
  - [18.7](#18.7) <a name='18.7'></a> 文の前とブロックの後には改行を残してください。

    ```javascript
    // bad
    if (foo) {
      return bar;
    }
    return baz;

    // good
    if (foo) {
      return bar;
    }

    return baz;

    // bad
    const obj = {
      foo() {
      },
      bar() {
      },
    };
    return obj;

    // good
    const obj = {
      foo() {
      },

      bar() {
      },
    };

    return obj;

    // bad
    const arr = [
      function foo() {
      },
      function bar() {
      },
    ];
    return arr;

    // good
    const arr = [
      function foo() {
      },

      function bar() {
      },
    ];

    return arr;
    ```

  - [18.8](#18.8) <a name='18.8'></a> Do not pad your blocks with blank lines.
  - [18.8](#18.8) <a name='18.8'></a> ブロックに空行を挟み込まないでください。

    ```javascript
    // bad
    function bar() {

      console.log(foo);

    }

    // also bad
    if (baz) {

      console.log(qux);
    } else {
      console.log(foo);

    }

    // good
    function bar() {
      console.log(foo);
    }

    // good
    if (baz) {
      console.log(qux);
    } else {
      console.log(foo);
    }
    ```

  - [18.9](#18.9) <a name='18.9'></a> Do not add spaces inside parentheses.
  - [18.9](#18.9) <a name='18.9'></a> 丸括弧()の内側にスペースを追加しないでください。

    ```javascript
    // bad
    function bar( foo ) {
      return foo;
    }

    // good
    function bar(foo) {
      return foo;
    }

    // bad
    if ( foo ) {
      console.log(foo);
    }

    // good
    if (foo) {
      console.log(foo);
    }
    ```

  - [18.10](#18.10) <a name='18.10'></a> Do not add spaces inside brackets.
  - [18.10](#18.10) <a name='18.10'></a> 角括弧([])の内側にスペースを追加しないでください。

    ```javascript
    // bad
    const foo = [ 1, 2, 3 ];
    console.log(foo[ 0 ]);

    // good
    const foo = [1, 2, 3];
    console.log(foo[0]);
    ```

  - [18.11](#18.11) <a name='18.11'></a> Add spaces inside curly braces.
  - [18.11](#18.11) <a name='18.11'></a> 中括弧({})の内側にスペースを追加してください。

    ```javascript
    // bad
    const foo = {clark: 'kent'};

    // good
    const foo = { clark: 'kent' };
    ```

**[⬆ ページのTopへ戻る](#目次)**

## カンマ(Commas)

  - [19.1](#19.1) <a name='19.1'></a> Leading commas: **Nope.**
  - [19.1](#19.1) <a name='19.1'></a> 先頭のカンマ **やめてください:<**

    ```javascript
    // bad
    const story = [
        once
      , upon
      , aTime
    ];

    // good
    const story = [
      once,
      upon,
      aTime,
    ];

    // bad
    const hero = {
        firstName: 'Ada'
      , lastName: 'Lovelace'
      , birthYear: 1815
      , superPower: 'computers'
    };

    // good
    const hero = {
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthYear: 1815,
      superPower: 'computers',
    };
    ```

  - [19.2](#19.2) <a name='19.2'></a> Additional trailing comma: **Yup.**
  - [19.2](#19.2) <a name='19.2'></a> 末尾のカンマ **いいね:)**

  > Why? This leads to cleaner git diffs. Also, transpilers like Babel will remove the additional trailing comma in the transpiled code which means you don't have to worry about the [trailing comma problem](es5/README.md#commas) in legacy browsers.

  > なぜ? これはクリーンなgitの差分につながります。また、Babelの様なトランスパイラはトランスパイルする際に末尾の余計なカンマを除去します。これは、レガシーブラウザでの[余計なカンマ問題](es5/README.md#commas)を心配する必要がないことを意味します。

    ```javascript
    // bad - git diff without trailing comma
    const hero = {
         firstName: 'Florence',
    -    lastName: 'Nightingale'
    +    lastName: 'Nightingale',
    +    inventorOf: ['coxcomb graph', 'modern nursing']
    };

    // good - git diff with trailing comma
    const hero = {
         firstName: 'Florence',
         lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing'],
    };

    // bad
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully'
    };

    const heroes = [
      'Batman',
      'Superman'
    ];

    // good
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully',
    };

    const heroes = [
      'Batman',
      'Superman',
    ];
    ```

**[⬆ ページのTopへ戻る](#目次)**


## セミコロン(Semicolons)

  - [20.1](#20.1) <a name='20.1'></a> **Yup.**
  - [20.1](#20.1) <a name='20.1'></a> **もちろん使いましょう。**

    ```javascript
    // bad
    (function() {
      const name = 'Skywalker'
      return name
    })()

    // good
    (() => {
      const name = 'Skywalker';
      return name;
    })();

    // good (guards against the function becoming an argument when two files with IIFEs are concatenated)
    // good (即時関数を伴う2つのファイルを連結した場合に、引数となる部分を保護します。)
    ;(() => {
      const name = 'Skywalker';
      return name;
    })();
    ```

    [Read more](http://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function/7365214%237365214).

**[⬆ ページのTopへ戻る](#目次)**


## 型変換と強制(Type Casting & Coercion)

  - [21.1](#21.1) <a name='21.1'></a> Perform type coercion at the beginning of the statement.
  - [21.1](#21.1) <a name='21.1'></a> 文の先頭で型の強制を行います。

  - [21.2](#21.2) <a name='21.2'></a> Strings:
  - [21.2](#21.2) <a name='21.2'></a> 文字列の場合:

    ```javascript
    //  => this.reviewScore = 9;

    // bad
    const totalScore = this.reviewScore + '';

    // good
    const totalScore = String(this.reviewScore);
    ```

  - [21.3](#21.3) <a name='21.3'></a> Numbers: Use `Number` for type casting and `parseInt` always with a radix for parsing strings.
  - [21.3](#21.3) <a name='21.3'></a> 数値の場合: 型変換には `Number` を使用してください。 `parseInt` を使用する場合、常に型変換のための基数を引数に渡してください。

    ```javascript
    const inputValue = '4';

    // bad
    const val = new Number(inputValue);

    // bad
    const val = +inputValue;

    // bad
    const val = inputValue >> 0;

    // bad
    const val = parseInt(inputValue);

    // good
    const val = Number(inputValue);

    // good
    const val = parseInt(inputValue, 10);
    ```

  - [21.4](#21.4) <a name='21.4'></a> If for whatever reason you are doing something wild and `parseInt` is your bottleneck and need to use Bitshift for [performance reasons](http://jsperf.com/coercion-vs-casting/3), leave a comment explaining why and what you're doing.
  - [21.4](#21.4) <a name='21.4'></a> 何らかの理由により `parseInt` がボトルネックとなっており、[パフォーマンス的な理由](http://jsperf.com/coercion-vs-casting/3)でビットシフトを使用す必要がある場合、
  やろうとしている事について、why（なぜ）とwhat（何を）の説明をコメントとして残してください。

    ```javascript
    // good
    /**
     * parseInt was the reason my code was slow.
     * Bitshifting the String to coerce it to a
     * Number made it a lot faster.
     * parseIntがボトルネックとなっていたため、
     * ビットシフトで文字列を数値へ強制的に変換することで
     * パフォーマンスを改善させます。
     */
    const val = inputValue >> 0;
    ```

  - [21.5](#21.5) <a name='21.5'></a> **Note:** Be careful when using bitshift operations. Numbers are represented as [64-bit values](http://es5.github.io/#x4.3.19), but Bitshift operations always return a 32-bit integer ([source](http://es5.github.io/#x11.7)). Bitshift can lead to unexpected behavior for integer values larger than 32 bits. [Discussion](https://github.com/airbnb/javascript/issues/109). Largest signed 32-bit Int is 2,147,483,647:
  - [21.5](#21.5) <a name='21.5'></a> **注意:** ビットシフトを使用する場合の注意事項。数値は[64ビット倍精度](http://es5.github.io/#x4.3.19)として表現されていますが、ビットシフト演算した場合は常に32ビット単精度で返されます([エビデンス](http://es5.github.io/#x11.7))。
  32ビット以上の数値をビットシフトする場合、予期せぬ振る舞いを起こす可能性があります([議論](https://github.com/airbnb/javascript/issues/109))。符号付き32ビット整数の最大値は2,147,483,647です。

    ```javascript
    2147483647 >> 0 //=> 2147483647
    2147483648 >> 0 //=> -2147483648
    2147483649 >> 0 //=> -2147483647
    ```

  - [21.6](#21.6) <a name='21.6'></a> Booleans:
  - [21.6](#21.6) <a name='21.6'></a> 真偽値の場合:

    ```javascript
    const age = 0;

    // bad
    const hasAge = new Boolean(age);

    // good
    const hasAge = Boolean(age);

    // good
    const hasAge = !!age;
    ```

**[⬆ ページのTopへ戻る](#目次)**


## 命名規則(Naming Conventions)

  - [22.1](#22.1) <a name='22.1'></a> Avoid single letter names. Be descriptive with your naming.
  - [22.1](#22.1) <a name='22.1'></a> 1文字の名前は避けてください。名前から意図が読み取れるようにしてください。

    ```javascript
    // bad
    function q() {
      // ...stuff...
    }

    // good
    function query() {
      // ..stuff..
    }
    ```

  - [22.2](#22.2) <a name='22.2'></a> Use camelCase when naming objects, functions, and instances.
  - [22.2](#22.2) <a name='22.2'></a> オブジェクト、関数、インスタンスにはキャメルケース（小文字から始まる）を使用してください。

    ```javascript
    // bad
    const OBJEcttsssss = {};
    const this_is_my_object = {};
    function c() {}

    // good
    const thisIsMyObject = {};
    function thisIsMyFunction() {}
    ```

  - [22.3](#22.3) <a name='22.3'></a> Use PascalCase when naming constructors or classes.
  - [22.3](#22.3) <a name='22.3'></a>  クラスやコンストラクタにはパスカルケース（大文字から始まる）を使用してください。

    ```javascript
    // bad
    function user(options) {
      this.name = options.name;
    }

    const bad = new user({
      name: 'nope',
    });

    // good
    class User {
      constructor(options) {
        this.name = options.name;
      }
    }

    const good = new User({
      name: 'yup',
    });
    ```

  - [22.4](#22.4) <a name='22.4'></a> Use a leading underscore `_` when naming private properties.
  - [22.4](#22.4) <a name='22.4'></a> プライベートなプロパティ名は先頭にアンダースコア `_` を使用してください。

    ```javascript
    // bad
    this.__firstName__ = 'Panda';
    this.firstName_ = 'Panda';

    // good
    this._firstName = 'Panda';
    ```

  - [22.5](#22.5) <a name='22.5'></a> Don't save references to `this`. Use arrow functions or Function#bind.
  - [22.5](#22.5) <a name='22.5'></a> `this` への参照を保存するの避けてください。アロー関数かFunction#bindを利用してください。

    ```javascript
    // bad
    function foo() {
      const self = this;
      return function() {
        console.log(self);
      };
    }

    // bad
    function foo() {
      const that = this;
      return function() {
        console.log(that);
      };
    }

    // good
    function foo() {
      return () => {
        console.log(this);
      };
    }
    ```

  - [22.6](#22.6) <a name='22.6'></a> If your file exports a single class, your filename should be exactly the name of the class.
  - [22.6](#22.6) <a name='22.6'></a> ファイルを1つのクラスとしてexportする場合、ファイル名はクラス名と完全に一致させなければなりません。

    ```javascript
    // file contents
    class CheckBox {
      // ...
    }
    export default CheckBox;

    // in some other file
    // bad
    import CheckBox from './checkBox';

    // bad
    import CheckBox from './check_box';

    // good
    import CheckBox from './CheckBox';
    ```

  - [22.7](#22.7) <a name='22.7'></a> Use camelCase when you export-default a function. Your filename should be identical to your function's name.
  - [22.7](#22.7) <a name='22.7'></a> Default exportが関数の場合、キャメルケース（小文字から始まる）を利用してください。ファイル名は関数名と同じにしなければなりません。

    ```javascript
    function makeStyleGuide() {
    }

    export default makeStyleGuide;
    ```

  - [22.8](#22.8) <a name='22.8'></a> Use PascalCase when you export a singleton / function library / bare object.
  - [22.8](#22.8) <a name='22.8'></a> シングルトン / function library / 単なるオブジェクトをexportする場合、パスカルケース（大文字から始まる）を利用してください。

    ```javascript
    const AirbnbStyleGuide = {
      es6: {
      }
    };

    export default AirbnbStyleGuide;
    ```


**[⬆ ページのTopへ戻る](#目次)**


## アクセッサ(Accessors)

  - [23.1](#23.1) <a name='23.1'></a> Accessor functions for properties are not required.
  - [23.1](#23.1) <a name='23.1'></a> プロパティのためのアクセサ（Accessor）関数は必須ではありません。

  - [23.2](#23.2) <a name='23.2'></a> If you do make accessor functions use getVal() and setVal('hello').
  - [23.2](#23.2) <a name='23.2'></a> アクセサ関数が必要な場合、`getVal()` や `setVal('hello')` としてください。

    ```javascript
    // bad
    dragon.age();

    // good
    dragon.getAge();

    // bad
    dragon.age(25);

    // good
    dragon.setAge(25);
    ```

  - [23.3](#23.3) <a name='23.3'></a> If the property is a `boolean`, use `isVal()` or `hasVal()`.
  - [23.3](#23.3) <a name='23.3'></a> プロパティが `boolean` の場合、`isVal()` や`hasVal()` としてください。

    ```javascript
    // bad
    if (!dragon.age()) {
      return false;
    }

    // good
    if (!dragon.hasAge()) {
      return false;
    }
    ```

  - [23.4](#23.4) <a name='23.4'></a> It's okay to create get() and set() functions, but be consistent.
  - [23.4](#23.4) <a name='23.4'></a> 一貫していれば、`get()` や`set()` という関数を作成することも可能です。

    ```javascript
    class Jedi {
      constructor(options = {}) {
        const lightsaber = options.lightsaber || 'blue';
        this.set('lightsaber', lightsaber);
      }

      set(key, val) {
        this[key] = val;
      }

      get(key) {
        return this[key];
      }
    }
    ```

**[⬆ ページのTopへ戻る](#目次)**


## イベント(Events)

  - [24.1](#24.1) <a name='24.1'></a> When attaching data payloads to events (whether DOM events or something more proprietary like Backbone events), pass a hash instead of a raw value. This allows a subsequent contributor to add more data to the event payload without finding and updating every handler for the event. For example, instead of:
  - [24.1](#24.1) <a name='24.1'></a> DOMイベントやBackbone eventsのような独自の）イベントへペイロードの値を渡す場合は、生の値の代わりにハッシュ引数を渡してください。
こうすることで、後の開発者がイベントに関連する全てのハンドラを見つけて更新することなく、イベント・ぺイロードに値を追加することが出来ます。例えば、下の例より

    ```javascript
    // bad
    $(this).trigger('listingUpdated', listing.id);

    ...

    $(this).on('listingUpdated', function(e, listingId) {
      // do something with listingId
    });
    ```

    prefer:
    こちらの方が好まれます:

    ```javascript
    // good
    $(this).trigger('listingUpdated', { listingId: listing.id });

    ...

    $(this).on('listingUpdated', function(e, data) {
      // do something with data.listingId
    });
    ```

  **[⬆ ページのTopへ戻る](#目次)**


## jQuery

  - [25.1](#25.1) <a name='25.1'></a> Prefix jQuery object variables with a `$`.
  - [25.1](#25.1) <a name='25.1'></a> jQueryオブジェクトの変数は、先頭に `$` を付与してください。

    ```javascript
    // bad
    const sidebar = $('.sidebar');

    // good
    const $sidebar = $('.sidebar');

    // good
    const $sidebarBtn = $('.sidebar-btn');
    ```

  - [25.2](#25.2) <a name='25.2'></a> Cache jQuery lookups.
  - [25.2](#25.2) <a name='25.2'></a> jQueryの検索結果をキャッシュしてください。

    ```javascript
    // bad
    function setSidebar() {
      $('.sidebar').hide();

      // ...stuff...

      $('.sidebar').css({
        'background-color': 'pink'
      });
    }

    // good
    function setSidebar() {
      const $sidebar = $('.sidebar');
      $sidebar.hide();

      // ...stuff...

      $sidebar.css({
        'background-color': 'pink'
      });
    }
    ```

  - [25.3](#25.3) <a name='25.3'></a> For DOM queries use Cascading `$('.sidebar ul')` or parent > child `$('.sidebar > ul')`. [jsPerf](http://jsperf.com/jquery-find-vs-context-sel/16)
  - [25.3](#25.3) <a name='25.3'></a> DOMの検索には、 `$('.sidebar ul')` や `$('.sidebar > ul')` のカスケードを使用してください。 [jsPerf](http://jsperf.com/jquery-find-vs-context-sel/16)

  - [25.4](#25.4) <a name='25.4'></a> Use `find` with scoped jQuery object queries.
  - [25.4](#25.4) <a name='25.4'></a> jQueryオブジェクトの検索には、スコープ付きの `find` を使用してください。

    ```javascript
    // bad
    $('ul', '.sidebar').hide();

    // bad
    $('.sidebar').find('ul').hide();

    // good
    $('.sidebar ul').hide();

    // good
    $('.sidebar > ul').hide();

    // good
    $sidebar.find('ul').hide();
    ```

**[⬆ ページのTopへ戻る](#目次)**


## ECMAScript 5 互換性(ECMAScript 5 Compatibility)

  - [26.1](#26.1) <a name='26.1'></a> Refer to [Kangax](https://twitter.com/kangax/)'s ES5 [compatibility table](http://kangax.github.io/es5-compat-table/).
  - [26.1](#26.1) <a name='26.1'></a> [Kangax](https://twitter.com/kangax/) の ES5 [互換性表](http://kangax.github.io/es5-compat-table/) を参照してください。

**[⬆ ページのTopへ戻る](#目次)**

## ECMAScript 6 Styles

  - [27.1](#27.1) <a name='27.1'></a> This is a collection of links to the various es6 features.
  - [27.1](#27.1) <a name='27.1'></a> これはES6仕様についてリンクを集めたものです。

1. [Arrow Functions](#arrow-functions)
1. [Classes](#constructors)
1. [Object Shorthand](#es6-object-shorthand)
1. [Object Concise](#es6-object-concise)
1. [Object Computed Properties](#es6-computed-properties)
1. [Template Strings](#es6-template-literals)
1. [Destructuring](#destructuring)
1. [Default Parameters](#es6-default-parameters)
1. [Rest](#es6-rest)
1. [Array Spreads](#es6-array-spreads)
1. [Let and Const](#references)
1. [Iterators and Generators](#iterators-and-generators)
1. [Modules](#modules)

**[⬆ ページのTopへ戻る](#目次)**

## テスト(Testing)

  - [28.1](#28.1) <a name="28.1"></a> **Yup.**
  - [28.1](#28.1) <a name="28.1"></a> **もちろん :+1:**

    ```javascript
    function () {
      return true;
    }
    ```

  - [28.2](#28.2) <a name="28.2"></a> **No, but seriously**:
   - Whichever testing framework you use, you should be writing tests!
   - Strive to write many small pure functions, and minimize where mutations occur.
   - Be cautious about stubs and mocks - they can make your tests more brittle.
   - We primarily use [`mocha`](https://www.npmjs.com/package/mocha) at Airbnb. [`tape`](https://www.npmjs.com/package/tape) is also used occasionally for small, separate modules.
   - 100% test coverage is a good goal to strive for, even if it's not always practical to reach it.
   - Whenever you fix a bug, _write a regression test_. A bug fixed without a regression test is almost certainly going to break again in the future.
  - [28.2](#28.2) <a name="28.2"></a> **もちろん、真剣に**:
   - どのみちテストフレームワークを利用してテストを書くことになります！
   - 小さな機能の関数を多く書き、異変が起こる箇所を最小化することに努めます。
   - スタブとモックについては注意してください。テストを脆いものにすることがあります。
   - Airbnbでは [`mocha`](https://www.npmjs.com/package/mocha) を利用しています。小さく分割された個々の小さなモジュールでは [`tape`](https://www.npmjs.com/package/tape) を使うこともあります。
   - 例え到達することが現実的でない場合であっても、100%のテストカバレッジを目標とすることは良いことです。
   - バグ修正するたびに _リグレッションテストを書きます_。 リグレッションテストがないバグ修正は、将来必ず壊れるでしょう。

**[⬆ ページのTopへ戻る](#目次)**


## パフォーマンス(Performance)

  - [On Layout & Web Performance](http://www.kellegous.com/j/2013/01/26/layout-performance/)
  - [String vs Array Concat](http://jsperf.com/string-vs-array-concat/2)
  - [Try/Catch Cost In a Loop](http://jsperf.com/try-catch-in-loop-cost)
  - [Bang Function](http://jsperf.com/bang-function)
  - [jQuery Find vs Context, Selector](http://jsperf.com/jquery-find-vs-context-sel/13)
  - [innerHTML vs textContent for script text](http://jsperf.com/innerhtml-vs-textcontent-for-script-text)
  - [Long String Concatenation](http://jsperf.com/ya-string-concat)
  - Loading...

**[⬆ ページのTopへ戻る](#目次)**


## 参考文献(Resources)

**Learning ES6**

  - [Draft ECMA 2015 (ES6) Spec](https://people.mozilla.org/~jorendorff/es6-draft.html)
  - [ExploringJS](http://exploringjs.com/)
  - [ES6 Compatibility Table](https://kangax.github.io/compat-table/es6/)
  - [Comprehensive Overview of ES6 Features](http://es6-features.org/)

**Read This**

  - [Standard ECMA-262](http://www.ecma-international.org/ecma-262/6.0/index.html)

**Tools**

  - Code Style Linters
    + [ESlint](http://eslint.org/) - [Airbnb Style .eslintrc](https://github.com/airbnb/javascript/blob/master/linters/.eslintrc)
    + [JSHint](http://jshint.com/) - [Airbnb Style .jshintrc](https://github.com/airbnb/javascript/blob/master/linters/jshintrc)
    + [JSCS](https://github.com/jscs-dev/node-jscs) - [Airbnb Style Preset](https://github.com/jscs-dev/node-jscs/blob/master/presets/airbnb.json)

**Other Style Guides**

  - [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
  - [jQuery Core Style Guidelines](http://contribute.jquery.org/style-guide/js/)
  - [Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwaldron/idiomatic.js)

**Other Styles**

  - [Naming this in nested functions](https://gist.github.com/cjohansen/4135065) - Christian Johansen
  - [Conditional Callbacks](https://github.com/airbnb/javascript/issues/52) - Ross Allen
  - [Popular JavaScript Coding Conventions on Github](http://sideeffect.kr/popularconvention/#javascript) - JeongHoon Byun
  - [Multiple var statements in JavaScript, not superfluous](http://benalman.com/news/2012/05/multiple-var-statements-javascript/) - Ben Alman

**Further Reading**

  - [Understanding JavaScript Closures](http://javascriptweblog.wordpress.com/2010/10/25/understanding-javascript-closures/) - Angus Croll
  - [Basic JavaScript for the impatient programmer](http://www.2ality.com/2013/06/basic-javascript.html) - Dr. Axel Rauschmayer
  - [You Might Not Need jQuery](http://youmightnotneedjquery.com/) - Zack Bloom & Adam Schwartz
  - [ES6 Features](https://github.com/lukehoban/es6features) - Luke Hoban
  - [Frontend Guidelines](https://github.com/bendc/frontend-guidelines) - Benjamin De Cock

**Books**

  - [JavaScript: The Good Parts](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742) - Douglas Crockford
  - [JavaScript Patterns](http://www.amazon.com/JavaScript-Patterns-Stoyan-Stefanov/dp/0596806752) - Stoyan Stefanov
  - [Pro JavaScript Design Patterns](http://www.amazon.com/JavaScript-Design-Patterns-Recipes-Problem-Solution/dp/159059908X)  - Ross Harmes and Dustin Diaz
  - [High Performance Web Sites: Essential Knowledge for Front-End Engineers](http://www.amazon.com/High-Performance-Web-Sites-Essential/dp/0596529309) - Steve Souders
  - [Maintainable JavaScript](http://www.amazon.com/Maintainable-JavaScript-Nicholas-C-Zakas/dp/1449327680) - Nicholas C. Zakas
  - [JavaScript Web Applications](http://www.amazon.com/JavaScript-Web-Applications-Alex-MacCaw/dp/144930351X) - Alex MacCaw
  - [Pro JavaScript Techniques](http://www.amazon.com/Pro-JavaScript-Techniques-John-Resig/dp/1590597273) - John Resig
  - [Smashing Node.js: JavaScript Everywhere](http://www.amazon.com/Smashing-Node-js-JavaScript-Everywhere-Magazine/dp/1119962595) - Guillermo Rauch
  - [Secrets of the JavaScript Ninja](http://www.amazon.com/Secrets-JavaScript-Ninja-John-Resig/dp/193398869X) - John Resig and Bear Bibeault
  - [Human JavaScript](http://humanjavascript.com/) - Henrik Joreteg
  - [Superhero.js](http://superherojs.com/) - Kim Joar Bekkelund, Mads Mobæk, & Olav Bjorkoy
  - [JSBooks](http://jsbooks.revolunet.com/) - Julien Bouquillon
  - [Third Party JavaScript](https://www.manning.com/books/third-party-javascript) - Ben Vinegar and Anton Kovalyov
  - [Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript](http://amzn.com/0321812182) - David Herman
  - [Eloquent JavaScript](http://eloquentjavascript.net/) - Marijn Haverbeke
  - [You Don't Know JS: ES6 & Beyond](http://shop.oreilly.com/product/0636920033769.do) - Kyle Simpson

**Blogs**

  - [DailyJS](http://dailyjs.com/)
  - [JavaScript Weekly](http://javascriptweekly.com/)
  - [JavaScript, JavaScript...](http://javascriptweblog.wordpress.com/)
  - [Bocoup Weblog](https://bocoup.com/weblog)
  - [Adequately Good](http://www.adequatelygood.com/)
  - [NCZOnline](https://www.nczonline.net/)
  - [Perfection Kills](http://perfectionkills.com/)
  - [Ben Alman](http://benalman.com/)
  - [Dmitry Baranovskiy](http://dmitry.baranovskiy.com/)
  - [Dustin Diaz](http://dustindiaz.com/)
  - [nettuts](http://code.tutsplus.com/?s=javascript)

**Podcasts**

  - [JavaScript Jabber](https://devchat.tv/js-jabber/)


**[⬆ ページのTopへ戻る](#目次)**

## 共鳴者(In the Wild)

  This is a list of organizations that are using this style guide. Send us a pull request and we'll add you to the list.

  これはこのスタイルガイドを使用している組織の一覧表です。このリストに追加して欲しい場合は、pull requestかissueを挙げてください。

  - **Aan Zee**: [AanZee/javascript](https://github.com/AanZee/javascript)
  - **Adult Swim**: [adult-swim/javascript](https://github.com/adult-swim/javascript)
  - **Airbnb**: [airbnb/javascript](https://github.com/airbnb/javascript)
  - **Apartmint**: [apartmint/javascript](https://github.com/apartmint/javascript)
  - **Avalara**: [avalara/javascript](https://github.com/avalara/javascript)
  - **Billabong**: [billabong/javascript](https://github.com/billabong/javascript)
  - **Blendle**: [blendle/javascript](https://github.com/blendle/javascript)
  - **ComparaOnline**: [comparaonline/javascript](https://github.com/comparaonline/javascript-style-guide)
  - **Compass Learning**: [compasslearning/javascript-style-guide](https://github.com/compasslearning/javascript-style-guide)
  - **DailyMotion**: [dailymotion/javascript](https://github.com/dailymotion/javascript)
  - **Digitpaint** [digitpaint/javascript](https://github.com/digitpaint/javascript)
  - **Ecosia**: [ecosia/javascript](https://github.com/ecosia/javascript)
  - **Evernote**: [evernote/javascript-style-guide](https://github.com/evernote/javascript-style-guide)
  - **ExactTarget**: [ExactTarget/javascript](https://github.com/ExactTarget/javascript)
  - **Expensify** [Expensify/Style-Guide](https://github.com/Expensify/Style-Guide/blob/master/javascript.md)
  - **Flexberry**: [Flexberry/javascript-style-guide](https://github.com/Flexberry/javascript-style-guide)
  - **Gawker Media**: [gawkermedia/javascript](https://github.com/gawkermedia/javascript)
  - **General Electric**: [GeneralElectric/javascript](https://github.com/GeneralElectric/javascript)
  - **GoodData**: [gooddata/gdc-js-style](https://github.com/gooddata/gdc-js-style)
  - **Grooveshark**: [grooveshark/javascript](https://github.com/grooveshark/javascript)
  - **How About We**: [howaboutwe/javascript](https://github.com/howaboutwe/javascript-style-guide)
  - **Huballin**: [huballin/javascript](https://github.com/huballin/javascript)
  - **HubSpot**: [HubSpot/javascript](https://github.com/HubSpot/javascript)
  - **Hyper**: [hyperoslo/javascript-playbook](https://github.com/hyperoslo/javascript-playbook/blob/master/style.md)
  - **InfoJobs**: [InfoJobs/JavaScript-Style-Guide](https://github.com/InfoJobs/JavaScript-Style-Guide)
  - **Intent Media**: [intentmedia/javascript](https://github.com/intentmedia/javascript)
  - **Jam3**: [Jam3/Javascript-Code-Conventions](https://github.com/Jam3/Javascript-Code-Conventions)
  - **JSSolutions**: [JSSolutions/javascript](https://github.com/JSSolutions/javascript)
  - **Kinetica Solutions**: [kinetica/javascript](https://github.com/kinetica/Javascript-style-guide)
  - **Mighty Spring**: [mightyspring/javascript](https://github.com/mightyspring/javascript)
  - **MinnPost**: [MinnPost/javascript](https://github.com/MinnPost/javascript)
  - **MitocGroup**: [MitocGroup/javascript](https://github.com/MitocGroup/javascript)
  - **ModCloth**: [modcloth/javascript](https://github.com/modcloth/javascript)
  - **Money Advice Service**: [moneyadviceservice/javascript](https://github.com/moneyadviceservice/javascript)
  - **Muber**: [muber/javascript](https://github.com/muber/javascript)
  - **National Geographic**: [natgeo/javascript](https://github.com/natgeo/javascript)
  - **National Park Service**: [nationalparkservice/javascript](https://github.com/nationalparkservice/javascript)
  - **Nimbl3**: [nimbl3/javascript](https://github.com/nimbl3/javascript)
  - **Orion Health**: [orionhealth/javascript](https://github.com/orionhealth/javascript)
  - **Peerby**: [Peerby/javascript](https://github.com/Peerby/javascript)
  - **Razorfish**: [razorfish/javascript-style-guide](https://github.com/razorfish/javascript-style-guide)
  - **reddit**: [reddit/styleguide/javascript](https://github.com/reddit/styleguide/tree/master/javascript)
  - **REI**: [reidev/js-style-guide](https://github.com/reidev/js-style-guide)
  - **Ripple**: [ripple/javascript-style-guide](https://github.com/ripple/javascript-style-guide)
  - **SeekingAlpha**: [seekingalpha/javascript-style-guide](https://github.com/seekingalpha/javascript-style-guide)
  - **Shutterfly**: [shutterfly/javascript](https://github.com/shutterfly/javascript)
  - **Springload**: [springload/javascript](https://github.com/springload/javascript)
  - **StudentSphere**: [studentsphere/javascript](https://github.com/studentsphere/guide-javascript)
  - **Target**: [target/javascript](https://github.com/target/javascript)
  - **TheLadders**: [TheLadders/javascript](https://github.com/TheLadders/javascript)
  - **T4R Technology**: [T4R-Technology/javascript](https://github.com/T4R-Technology/javascript)
  - **VoxFeed**: [VoxFeed/javascript-style-guide](https://github.com/VoxFeed/javascript-style-guide)
  - **Weggo**: [Weggo/javascript](https://github.com/Weggo/javascript)
  - **Zillow**: [zillow/javascript](https://github.com/zillow/javascript)
  - **ZocDoc**: [ZocDoc/javascript](https://github.com/ZocDoc/javascript)

**[⬆ ページのTopへ戻る](#目次)**

## 翻訳(Translation)

  This style guide is also available in other languages:

  このスタイルガイドは他の言語でも利用できます。

  - ![br](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Brazil.png) **Brazilian Portuguese**: [armoucar/javascript-style-guide](https://github.com/armoucar/javascript-style-guide)
  - ![bg](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Bulgaria.png) **Bulgarian**: [borislavvv/javascript](https://github.com/borislavvv/javascript)
  - ![ca](https://raw.githubusercontent.com/fpmweb/javascript-style-guide/master/img/catala.png) **Catalan**: [fpmweb/javascript-style-guide](https://github.com/fpmweb/javascript-style-guide)
  - ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Chinese (Simplified)**: [sivan/javascript-style-guide](https://github.com/sivan/javascript-style-guide)
  - ![tw](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Taiwan.png) **Chinese (Traditional)**: [jigsawye/javascript](https://github.com/jigsawye/javascript)
  - ![fr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/France.png) **French**: [nmussy/javascript-style-guide](https://github.com/nmussy/javascript-style-guide)
  - ![de](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Germany.png) **German**: [timofurrer/javascript-style-guide](https://github.com/timofurrer/javascript-style-guide)
  - ![it](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Italy.png) **Italian**: [sinkswim/javascript-style-guide](https://github.com/sinkswim/javascript-style-guide)
  - ![jp](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Japan.png) **Japanese**: [mitsuruog/javascript-style-guide](https://github.com/mitsuruog/javascript-style-guide)
  - ![kr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/South-Korea.png) **Korean**: [tipjs/javascript-style-guide](https://github.com/tipjs/javascript-style-guide)
  - ![pl](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Poland.png) **Polish**: [mjurczyk/javascript](https://github.com/mjurczyk/javascript)
  - ![ru](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Russia.png) **Russian**: [uprock/javascript](https://github.com/uprock/javascript)
  - ![es](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Spain.png) **Spanish**: [paolocarrasco/javascript-style-guide](https://github.com/paolocarrasco/javascript-style-guide)
  - ![th](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Thailand.png) **Thai**: [lvarayut/javascript-style-guide](https://github.com/lvarayut/javascript-style-guide)

## JavaScriptスタイルガイドへの手引き(The JavaScript Style Guide Guide)

  - [Reference](https://github.com/airbnb/javascript/wiki/The-JavaScript-Style-Guide-Guide)

## Javascriptスタイルガイドについてのchat(Chat With Us About JavaScript)

  - Find us on [gitter](https://gitter.im/airbnb/javascript).

## 貢献者(Contributors)

  - [View Contributors](https://github.com/airbnb/javascript/graphs/contributors)


## License

(The MIT License)

Copyright (c) 2014 Airbnb

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


MITライセンス

著作権(c) 2014 Airbnb  
翻訳 2015 mitsuruog

このソフトウェアおよび関連する文書ファイル（以下「本ソフトウェア」という。）の複製物を取得するあらゆる者に対し、
以下の条件にしたがって本ソフトウェアを制限なしに扱うことを無償で許諾する。
そこには、本ソフトウェアの複製を使用し、複製し、改変し、結合し、公表し、頒布し、サブライセンスし、
および/または販売する権利、また、本ソフトウェアを与えられた者に上記のようにすることを許諾する権利を含むがそれらに限られない。

上記の著作権表示および本許諾表示は「本ソフトウェア」のすべての複製物または重要部分の中に含めなければならない。

「本ソフトウェア」は「現状のまま」で提供され、明示または黙示を問わず、
商品性、特定目的への適合性および非侵害を含むがそれに限られない、あらゆる種類の保証も伴わないものとする。
著作者または著作権者は、契約、不法行為またはその他の行為であるかにかかわらず、
ソフトウェアまたはソフトウェアの使用もしくはその他の取り扱いから、またはそれらに関連して生じた、
いかなるクレーム、損害賠償その他の責任を負わない。

**[⬆ ページのTopへ戻る](#目次)**

## 補足(Amendments)

We encourage you to fork this guide and change the rules to fit your team's style guide. Below, you may list some amendments to the style guide. This allows you to periodically update your style guide without having to deal with merge conflicts.

我々はこのガイドをforkして、あなたのチームに適したスタイルガイドとして変更することを勧めます。以下にあなたがスタイルガイドに加えた変更をリストにしてください。
こうすることで、マージの煩わしさに気を取られることなく、あなたのスタイルガイドを定期的に更新することができます。

# };
