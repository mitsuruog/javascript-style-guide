# Airbnb JavaScript スタイルガイド() {

*常に気をつけたい、JavaScriptへの正しい接し方*

## 目次

  1. [型](#型)
  1. [オブジェクト](#オブジェクト)
  1. [配列](#配列)
  1. [文字列](#文字列)
  1. [関数](#関数)
  1. [プロパティ](#プロパティ)
  1. [変数](#変数)
  1. [巻き上げ](#巻き上げ)
  1. [条件式と等価式](#条件式と等価式)
  1. [ブロック](#ブロック)
  1. [コメント](#コメント)
  1. [空白](#空白)
  1. [先頭のカンマ](#先頭のカンマ)
  1. [セミコロン](#セミコロン)
  1. [型変換と強制](#型変換と強制)
  1. [命名規則](#命名規則)
  1. [アクセサ（Accessors）](#アクセサ（accessors）)
  1. [コンストラクタ](#コンストラクタ)
  1. [モジュール](#モジュール)
  1. [jQuery](#jquery)
  1. [ES5 Compatibility](#es5)
  1. [Testing](#testing)
  1. [Performance](#performance)
  1. [Resources](#resources)
  1. [In the Wild](#in-the-wild)
  1. [The JavaScript Style Guide Guide](#guide-guide)
  1. [Contributors](#contributors)
  1. [License](#license)

## 型

  - **プリミティブ型**: プリミティブ型にアクセスした場合は、その値を直接操作していることになります。

    + `string`
    + `number`
    + `boolean`
    + `null`
    + `undefined`

    ```javascript
    var foo = 1,
        bar = foo;

    bar = 9;

    console.log(foo, bar); // => 1, 9
    ```
  - **参照型**: 参照型にアクセスした場合、参照を通して値を操作していることになります。

    + `object`
    + `array`
    + `function`

    ```javascript
    var foo = [1, 2],
        bar = foo;

    bar[0] = 9;

    console.log(foo[0], bar[0]); // => 9, 9
    ```

    **[[⬆]](#TOC)**

## オブジェクト

  - オブジェクトを作成する際は、リテラル構文を使用してください。

    ```javascript
    // bad
    var item = new Object();

    // good
    var item = {};
    ```

  - [予約語](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Reserved_Words)をキーとして使用しないでください。

    ```javascript
    // bad
    var superman = {
      class: 'superhero',
      default: { clark: 'kent' },
      private: true
    };

    // good
    var superman = {
      klass: 'superhero',
      defaults: { clark: 'kent' },
      hidden: true
    };
    ```
    **[[⬆]](#TOC)**

## 配列

  - 配列を作成する際は、リテラル構文を使用してください。

    ```javascript
    // bad
    var items = new Array();

    // good
    var items = [];
    ```

  - 長さが不明な場合はArray#pushを使用してください。
  
    ```javascript
    var someStack = [];


    // bad
    someStack[someStack.length] = 'abracadabra';

    // good
    someStack.push('abracadabra');
    ```

  - 配列をコピーする必要がある場合、Array #sliceを使用してください。参考（英語）→[jsPerf](http://jsperf.com/converting-arguments-to-an-array/7)

    ```javascript
    var len = items.length,
        itemsCopy = [],
        i;

    // bad
    for (i = 0; i < len; i++) {
      itemsCopy[i] = items[i];
    }

    // good
    itemsCopy = Array.prototype.slice.call(items);
    ```

    **[[⬆]](#TOC)**


## 文字列

  - 文字列にはシングルクオート `''` を使用してください。

    ```javascript
    // bad
    var name = "Bob Parr";

    // good
    var name = 'Bob Parr';

    // bad
    var fullName = "Bob " + this.lastName;

    // good
    var fullName = 'Bob ' + this.lastName;
    ```

  - 80文字以上の文字列は、文字列連結を使用して複数行にまたがって記述する必要があります。
  - 注意: 文字連結を多用した場合、パフォーマンスに影響を与えることがあります。参考（英語）→[jsPerf](http://jsperf.com/ya-string-concat) & [Discussion](https://github.com/airbnb/javascript/issues/40)

    ```javascript
    // bad
    var errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';

    // bad
    var errorMessage = 'This is a super long error that \
    was thrown because of Batman. \
    When you stop to think about \
    how Batman had anything to do \
    with this, you would get nowhere \
    fast.';


    // good
    var errorMessage = 'This is a super long error that ' +
      'was thrown because of Batman.' +
      'When you stop to think about ' +
      'how Batman had anything to do ' +
      'with this, you would get nowhere ' +
      'fast.';
    ```

  - プログラムにて文字列を生成する必要がある場合は、（特にIEは）文字列連結の代わりにArray#joinを使用してください。参考（英語）→[jsPerf](http://jsperf.com/string-vs-array-concat/2).

    ```javascript
    var items,
        messages,
        length, i;

    messages = [{
        state: 'success',
        message: 'This one worked.'
    },{
        state: 'success',
        message: 'This one worked as well.'
    },{
        state: 'error',
        message: 'This one did not work.'
    }];

    length = messages.length;

    // bad
    function inbox(messages) {
      items = '
';

      for (i = 0; i < length; i++) {
        items += '
' + messages[i].message + '
';
      }

      return items + '
';
    }

    // good
    function inbox(messages) {
      items = [];

      for (i = 0; i < length; i++) {
        items[i] = messages[i].message;
      }

      return '
' + items.join('
') + '
';
    }
    ```

    **[[⬆]](#TOC)**


## 関数

  - 関数式

    ```javascript
    // 無名関数
    var anonymous = function() {
      return true;
    };

    // 名前付き関数
    var named = function named() {
      return true;
    };

    // 即時関数
    (function() {
      console.log('Welcome to the Internet. Please follow me.');
    })();
    ```

  - （ifやwhileなど）ブロック内で、変数に関数を代入する代わりに関数を宣言しないでください。ブラウザはそのことを許可しますが、（それはまるで「頑張れベアーズ」の悪ガキ達のように）すべて違ったように解釈されます。
  - **Note:** ECMA-262 defines a `block` as a list of statements. A function declartion is not a statement. [Read ECMA-262's note on this issue](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97).

    ```javascript
    // bad
    if (currentUser) {
      function test() {
        console.log('Nope.');
      }
    }

    // good
    if (currentUser) {
      var test = function test() {
        console.log('Yup.');
      };
    }
    ```

  - パラメータに `arguments` を指定しないでください。これは、関数スコープに渡される `arguments` オブジェクトの参照を上書きしてしまうためです。

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

    **[[⬆]](#TOC)**



## プロパティ

  - プロパティにアクセスする場合は、ドット `.` を使用してください。

    ```javascript
    var luke = {
      jedi: true,
      age: 28
    };

    // bad
    var isJedi = luke['jedi'];

    // good
    var isJedi = luke.jedi;
    ```

  - 変数を使用してプロパティにアクセスする場合は、角括弧 `[]` を使用してください。

    ```javascript
    var luke = {
      jedi: true,
      age: 28
    };

    function getProp(prop) {
      return luke[prop];
    }

    var isJedi = getProp('jedi');
    ```

    **[[⬆]](#TOC)**


## 変数

  - 変数を宣言する際は、常に `var` を使用してください。使用しない場合、グローバル変数として宣言されます。グローバルな名前空間を汚染しないように、キャプテンプラネット（環境保護とエコロジーをテーマにしたスーパーヒーローアニメ）も警告しています。

    ```javascript
    // bad
    superPower = new SuperPower();

    // good
    var superPower = new SuperPower();
    ```

  - 複数の変数を宣言する場合は、1つの `var` を使用し、変数ごとに改行して宣言してください。

    ```javascript
    // bad
    var items = getItems();
    var goSportsTeam = true;
    var dragonball = 'z';

    // good
    var items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';
    ```

  - 未定義変数を最後に宣言してください。これは、後ほど既に割り当て済みの変数のいずれかを、割り当てる必要がある場合に便利です。

    ```javascript
    // bad
    var i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;

    // bad
    var i, items = getItems(),
        dragonball,
        goSportsTeam = true,
        len;

    // good
    var items = getItems(),
        goSportsTeam = true,
        dragonball,
        i, length;
    ```

  - 変数の割り当てはスコープの先頭で行ってください。これは、変数宣言と巻上げに関連する問題を回避するためです。

    ```javascript
    // bad
    function() {
      test();
      console.log('doing stuff..');

      //..other stuff..

      var name = getName();

      if (name === 'test') {
        return false;
      }

      return name;
    }

    // good
    function() {
      var name = getName();

      test();
      console.log('doing stuff..');

      //..other stuff..

      if (name === 'test') {
        return false;
      }

      return name;
    }

    // bad
    function() {
      var name = getName();

      if (!arguments.length) {
        return false;
      }

      return true;
    }

    // good
    function() {
      if (!arguments.length) {
        return false;
      }

      var name = getName();

      return true;
    }
    ```

    **[[⬆]](#TOC)**


## 巻き上げ

  - 未割当ての変数は、そのスコープの先頭に巻き上げられます。

    ```javascript
    // （notDefinedがグローバル変数に存在しないと過程した場合。）
    // これはうまく動作しません。
    function example() {
      console.log(notDefined); // => throws a ReferenceError
    }

    // その変数を参照するコードの後でその変数を宣言した場合、
    // 変数が巻上げられた上で動作します。
    // 注意：`true` という値自体は巻き上げられません。
    function example() {
      console.log(declaredButNotAssigned); // => undefined
      var declaredButNotAssigned = true;
    }

    // インタープリンタは変数宣言をスコープの先頭に巻き上げます。
    // 上の例は次のように書き直すことが出来ます。
    function example() {
      var declaredButNotAssigned;
      console.log(declaredButNotAssigned); // => undefined
      declaredButNotAssigned = true;
    }
    ```

  - 無名関数の場合、関数が割当てされる前の変数が巻き上げられます。

    ```javascript
    function example() {
      console.log(anonymous); // => undefined

      anonymous(); // => TypeError anonymous is not a function

      var anonymous = function() {
        console.log('anonymous function expression');
      };
    }
    ```

  - 名前付き関数の場合も同様に変数が巻き上げられます。関数名や関数本体は巻き上げられません。

    ```javascript
    function example() {
      console.log(named); // => undefined

      named(); // => TypeError named is not a function

      superPower(); // => ReferenceError superPower is not defined

      var named = function superPower() {
        console.log('Flying');
      };


      // 関数名と変数名が同じ場合も同じことが起きます。
      function example() {
        console.log(named); // => undefined

        named(); // => TypeError named is not a function

        var named = function named() {
          console.log('named');
        };
      }
    }
    ```

  - 関数宣言は関数名と関数本体が巻き上げられます。

    ```javascript
    function example() {
      superPower(); // => Flying

      function superPower() {
        console.log('Flying');
      }
    }
    ```

  - さらに詳細な情報を求める場合は[Ben Cherry](http://www.adequatelygood.com/)による[JavaScript Scoping & Hoisting](http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting)を参照してください。

    **[[⬆]](#TOC)**



## 条件式と等価式

  - `==` や`!=`より `===` と `!==` を使用してください。 
  - 条件式は `ToBoolean` メソッドにより厳密に比較されます。常にこのシンプルはルールに従ってください。

    + **オブジェクト** は **true** と評価されます。
    + **undefined** は **false** と評価されます。
    + **null** は **false** と評価されます。
    + **真偽値** は **boolean型の値** として評価されます。
    + **数値** は **true** と評価されます。しかし、 **+0, -0, or NaN** の場合は **false** です。
    + **文字列** は **true** と評価されます。 しかし、空文字 `''` の場合は **false** です。


    ```javascript
    if ([0]) {
      // true
      // 配列はオブジェクトなのでtrueとして評価されます。
    }
    ```

  - 短縮形を使用してください。

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

  - さらに詳細な情報を求める場合はAngus Crollによる [Truth Equality and JavaScript](http://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108)を参照してください。

    **[[⬆]](#TOC)**


## ブロック

  - 複数行のブロックには中括弧（{}）を使用してください。

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

    **[[⬆]](#TOC)**


## コメント

  - 複数行のコメントは`/** ... */` を使用してください。その中には説明とすべてのパラメータと戻り値についての型や値を記述してください。

    ```javascript
    // bad
    // make() returns a new element
    // based on the passed in tag name
    //
    // @param  tag
    // @return  element
    function make(tag) {

      // ...stuff...

      return element;
    }

    // good
    /**
     * make() returns a new element
     * based on the passed in tag name
     *
     * @param  tag
     * @return  element
     */
    function make(tag) {

      // ...stuff...

      return element;
    }
    ```

  - 単一行コメントには`//` を使用してください。コメントを加えたいコードの上部に配置してください。また、コメントの前に空行を入れてください。

    ```javascript
    // bad
    var active = true;  // is current tab

    // good
    // is current tab
    var active = true;

    // bad
    function getType() {
      console.log('fetching type...');
      // set the default type to 'no type'
      var type = this._type || 'no type';

      return type;
    }

    // good
    function getType() {
      console.log('fetching type...');

      // set the default type to 'no type'
      var type = this._type || 'no type';

      return type;
    }
    ```

    **[[⬆]](#TOC)**


## 空白

  - タブにはスペース2つを設定してください。

    ```javascript
    // bad
    function() {
    ∙∙∙∙var name;
    }

    // bad
    function() {
    ∙var name;
    }

    // good
    function() {
    ∙∙var name;
    }
    ```
  - 重要な中括弧（{}）の前にはスペースを1つ入れてください。

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
      breed: 'Bernese Mountain Dog'
    });

    // good
    dog.set('attr', {
      age: '1 year',
      breed: 'Bernese Mountain Dog'
    });
    ```
  - ファイルの最後は空行を1つ入れてください。

    ```javascript
    // bad
    (function(global) {
      // ...stuff...
    })(this);
    ```

    ```javascript
    // good
    (function(global) {
      // ...stuff...
    })(this);

    ```

    **[[⬆]](#TOC)**

  - メソッドチェーンが長くなる場合は、適宜インデントしてください。

  ```javascript
  // bad
  $('#items').find('.selected').highlight().end().find('.open').updateCount();

  // good
  $('#items')
    .find('.selected')
      .highlight()
      .end()
    .find('.open')
      .updateCount();

  // bad
  var leds = stage.selectAll('.led').data(data).enter().append("svg:svg").class('led', true)
      .attr('width',  (radius + margin) * 2).append("svg:g")
      .attr("transform", "translate(" + (radius + margin) + "," + (radius + margin) + ")")
      .call(tron.led);

  // good
  var leds = stage.selectAll('.led')
      .data(data)
    .enter().append("svg:svg")
      .class('led', true)
      .attr('width',  (radius + margin) * 2)
    .append("svg:g")
      .attr("transform", "translate(" + (radius + margin) + "," + (radius + margin) + ")")
      .call(tron.led);
  ```

## 先頭のカンマ

  - **やめてください。**

    ```javascript
    // bad
    var once
      , upon
      , aTime;

    // good
    var once,
        upon,
        aTime;

    // bad
    var hero = {
        firstName: 'Bob'
      , lastName: 'Parr'
      , heroName: 'Mr. Incredible'
      , superPower: 'strength'
    };

    // good
    var hero = {
      firstName: 'Bob',
      lastName: 'Parr',
      heroName: 'Mr. Incredible',
      superPower: 'strength'
    };
    ```

    **[[⬆]](#TOC)**


## セミコロン

  - **ええ。使いましょう。**

    ```javascript
    // bad
    (function() {
      var name = 'Skywalker'
      return name
    })()

    // good
    (function() {
      var name = 'Skywalker';
      return name;
    })();

    // good
    ;(function() {
      var name = 'Skywalker';
      return name;
    })();
    ```

    **[[⬆]](#TOC)**


## 型変換と強制

  - 文の先頭で型の強制を行います。
  - 文字列

    ```javascript
    //  => this.reviewScore = 9;

    // bad
    var totalScore = this.reviewScore + '';

    // good
    var totalScore = '' + this.reviewScore;

    // bad
    var totalScore = '' + this.reviewScore + ' total score';

    // good
    var totalScore = this.reviewScore + ' total score';
    ```

  - 数値には`parseInt` を使用てください。常に型変換のための基数を引数に渡してください。
  - If for whatever reason you are doing something wild and `parseInt` is your bottleneck and need to use Bitshift for [performance reasons](http://jsperf.com/coercion-vs-casting/3), leave a comment explaining why and what you're doing.

    ```javascript
    var inputValue = '4';

    // bad
    var val = new Number(inputValue);

    // bad
    var val = +inputValue;

    // bad
    var val = inputValue >> 0;

    // bad
    var val = parseInt(inputValue);

    // good
    var val = Number(inputValue);

    // good
    var val = parseInt(inputValue, 10);

    // good
    /**
     * parseInt was the reason my code was slow.
     * Bitshifting the String to coerce it to a
     * Number made it a lot faster.
     */
    var val = inputValue >> 0;
    ```

  - 真偽値

    ```javascript
    var age = 0;

    // bad
    var hasAge = new Boolean(age);

    // good
    var hasAge = Boolean(age);

    // good
    var hasAge = !!age;
    ```

    **[[⬆]](#TOC)**


## 命名規則

  - 1文字の名前は避けてください。 名前から意図が読み取れるようにしてください。

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

  - オブジェクト、関数、インスタンスにはキャメルケース（小文字から始まる）を使用してください。

    ```javascript
    // bad
    var OBJEcttsssss = {};
    var this_is_my_object = {};
    var this-is-my-object = {};
    function c() {};
    var u = new user({
      name: 'Bob Parr'
    });

    // good
    var thisIsMyObject = {};
    function thisIsMyFunction() {};
    var user = new User({
      name: 'Bob Parr'
    });
    ```

  - クラスやコンストラクタにはパスカルケース（大文字から始まる）を使用してください。

    ```javascript
    // bad
    function user(options) {
      this.name = options.name;
    }

    var bad = new user({
      name: 'nope'
    });

    // good
    function User(options) {
      this.name = options.name;
    }

    var good = new User({
      name: 'yup'
    });
    ```

  - プライベートなプロパティ名は先頭にアンダースコア `_` を使用してください。

    ```javascript
    // bad
    this.__firstName__ = 'Panda';
    this.firstName_ = 'Panda';
    
    // good
    this._firstName = 'Panda';
    ```

  - `this` の参照を保存する場合、 `_this` を使用してください。

    ```javascript
    // bad
    function() {
      var self = this;
      return function() {
        console.log(self);
      };
    }

    // bad
    function() {
      var that = this;
      return function() {
        console.log(that);
      };
    }

    // good
    function() {
      var _this = this;
      return function() {
        console.log(_this);
      };
    }
    ```

  - 関数には名前を付けてください。これは、スタックトレースが追跡し易くなるためです。

    ```javascript
    // bad
    var log = function(msg) {
      console.log(msg);
    };

    // good
    var log = function log(msg) {
      console.log(msg);
    };
    ```

    **[[⬆]](#TOC)**


## アクセサ（Accessors）

  - プロパティのためのアクセサ（Accessor）関数は必須ではありません。
  - アクセサ関数が必要な場合、`getVal()` や `setVal('hello')` としてください。

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

  - プロパティが真偽値の場合、`isVal()` や`hasVal()` としてください。

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

  - 一貫していれば、`get()` や`set()` という関数を作成することも可能です。

    ```javascript
    function Jedi(options) {
      options || (options = {});
      var lightsaber = options.lightsaber || 'blue';
      this.set('lightsaber', lightsaber);
    }

    Jedi.prototype.set = function(key, val) {
      this[key] = val;
    };

    Jedi.prototype.get = function(key) {
      return this[key];
    };
    ```

    **[[⬆]](#TOC)**


## コンストラクタ

  - 新しいオブジェクトでプロトタイプをオーバーライドするのではなく、プロトタイプオブジェクトにメソッドを追加してください。プロトタイプをオーバーライドすると継承が不可能になります。プロトタイプをリセットすることで、基底クラスをオーバーライドできます。

    ```javascript
    function Jedi() {
      console.log('new jedi');
    }

    // bad
    Jedi.prototype = {
      fight: function fight() {
        console.log('fighting');
      },

      block: function block() {
        console.log('blocking');
      }
    };

    // good
    Jedi.prototype.fight = function fight() {
      console.log('fighting');
    };

    Jedi.prototype.block = function block() {
      console.log('blocking');
    };
    ```

  - メソッドの戻り値で `this` を返すことで、メソッドチェーンをすることができます。

    ```javascript
    // bad
    Jedi.prototype.jump = function() {
      this.jumping = true;
      return true;
    };

    Jedi.prototype.setHeight = function(height) {
      this.height = height;
    };

    var luke = new Jedi();
    luke.jump(); // => true
    luke.setHeight(20) // => undefined

    // good
    Jedi.prototype.jump = function() {
      this.jumping = true;
      return this;
    };

    Jedi.prototype.setHeight = function(height) {
      this.height = height;
      return this;
    };

    var luke = new Jedi();

    luke.jump()
      .setHeight(20);
    ```


  - 独自のtoString()を作成することもできますが、正しく動作すること、副作用がないことだけは確認してください。


    ```javascript
    function Jedi(options) {
      options || (options = {});
      this.name = options.name || 'no name';
    }

    Jedi.prototype.getName = function getName() {
      return this.name;
    };

    Jedi.prototype.toString = function toString() {
      return 'Jedi - ' + this.getName();
    };
    ```

    **[[⬆]](#TOC)**


## モジュール

  - モジュールは `!` で始めてください。これは、文末のセミコロンを付け忘れたモジュールを連結した場合、実行時にエラーが発生しないためです。
  - ファイル名はキャメルケースを使用し、同じ名称のフォルダに格納してください。また、単独で公開する場合は、名前を一致させてください。
  - noConflict()という名称で、(名前衝突して上書きされる前の)モジュールを返すメソッドを追加してください。
  - 常にモジュールの先頭で`'use strict';` を宣言してください。

    ```javascript
    // fancyInput/fancyInput.js

    !function(global) {
      'use strict';

      var previousFancyInput = global.FancyInput;

      function FancyInput(options) {
        this.options = options || {};
      }

      FancyInput.noConflict = function noConflict() {
        global.FancyInput = previousFancyInput;
        return FancyInput;
      };

      global.FancyInput = FancyInput;
    }(this);
    ```

    **[[⬆]](#TOC)**


## jQuery

  - jQueryオブジェクトの変数は、先頭に `$` を付与してください。

    ```javascript
    // bad
    var sidebar = $('.sidebar');

    // good
    var $sidebar = $('.sidebar');
    ```

  - jQueryの検索結果をキャッシュしてください。

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
      var $sidebar = $('.sidebar');
      $sidebar.hide();

      // ...stuff...

      $sidebar.css({
        'background-color': 'pink'
      });
    }
    ```

  - DOMの検索には、 `$('.sidebar ul')` や `$('.sidebar > .ul')` のカスケードを使用してください。 参考（英語）→[jsPerf](http://jsperf.com/jquery-find-vs-context-sel/16)

  - jQueryオブジェクトの検索には、スコープ付きの `find` を使用してください。

    ```javascript
    // bad
    $('.sidebar', 'ul').hide();

    // bad
    $('.sidebar').find('ul').hide();

    // good
    $('.sidebar ul').hide();

    // good
    $('.sidebar > ul').hide();

    // good (slower)
    $sidebar.find('ul');

    // good (faster)
    $($sidebar[0]).find('ul');
    ```

    **[[⬆]](#TOC)**


## ECMAScript 5 Compatibility

  - Refer to [Kangax](https://twitter.com/kangax/)'s ES5 [compatibility table](http://kangax.github.com/es5-compat-table/)

  **[[⬆]](#TOC)**


## Testing

  - **Yup.**

    ```javascript
    function() {
      return true;
    }
    ```

    **[[⬆]](#TOC)**


## Performance

  - [String vs Array Concat](http://jsperf.com/string-vs-array-concat/2)
  - [Try/Catch Cost In a Loop](http://jsperf.com/try-catch-in-loop-cost)
  - [Bang Function](http://jsperf.com/bang-function)
  - [jQuery Find vs Context, Selector](http://jsperf.com/jquery-find-vs-context-sel/13)
  - [innerHTML vs textContent for script text](http://jsperf.com/innerhtml-vs-textcontent-for-script-text)
  - [Long String Concatenation](http://jsperf.com/ya-string-concat)
  - Loading...

  **[[⬆]](#TOC)**


## Resources


**Read This**

  - [Annotated ECMAScript 5.1](http://es5.github.com/)

**Other Styleguides**

  - [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
  - [jQuery Core Style Guidelines](http://docs.jquery.com/JQuery_Core_Style_Guidelines)
  - [Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwldrn/idiomatic.js/)

**Other Styles**

  - [Naming this in nested functions](https://gist.github.com/4135065) - Christian Johansen

**Books**

  - [JavaScript: The Good Parts](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742) - Douglas Crockford
  - [JavaScript Patterns](http://www.amazon.com/JavaScript-Patterns-Stoyan-Stefanov/dp/0596806752) - Stoyan Stefanov
  - [Pro JavaScript Design Patterns](http://www.amazon.com/JavaScript-Design-Patterns-Recipes-Problem-Solution/dp/159059908X)  - Ross Harmes and Dustin Diaz
  - [High Performance Web Sites: Essential Knowledge for Front-End Engineers](http://www.amazon.com/High-Performance-Web-Sites-Essential/dp/0596529309) - Steve Souders
  - [Maintainable JavaScript](http://www.amazon.com/Maintainable-JavaScript-Nicholas-C-Zakas/dp/1449327680) - Nicholas C. Zakas
  - [JavaScript Web Applications](http://www.amazon.com/JavaScript-Web-Applications-Alex-MacCaw/dp/144930351X) - Alex MacCaw
  - [Pro JavaScript Techniques](http://www.amazon.com/Pro-JavaScript-Techniques-John-Resig/dp/1590597273) - John Resig
  - [Smashing Node.js: JavaScript Everywhere](http://www.amazon.com/Smashing-Node-js-JavaScript-Everywhere-Magazine/dp/1119962595) - Guillermo Rauch

**Blogs**

  - [DailyJS](http://dailyjs.com/)
  - [JavaScript Weekly](http://javascriptweekly.com/)
  - [JavaScript, JavaScript...](http://javascriptweblog.wordpress.com/)
  - [Bocoup Weblog](http://weblog.bocoup.com/)
  - [Adequately Good](http://www.adequatelygood.com/)
  - [NCZOnline](http://www.nczonline.net/)
  - [Perfection Kills](http://perfectionkills.com/)
  - [Ben Alman](http://benalman.com/)
  - [Dmitry Baranovskiy](http://dmitry.baranovskiy.com/)
  - [Dustin Diaz](http://dustindiaz.com/)
  - [nettuts](http://net.tutsplus.com/?s=javascript)

  **[[⬆]](#TOC)**

## In the Wild

  This is a list of organizations that are using this style guide. Send us a pull request or open an issue and we'll add you to the list.

  - **Airbnb**: [airbnb/javascript](//github.com/airbnb/javascript)
  - **American Insitutes for Research**: [AIRAST/javascript](//github.com/AIRAST/javascript)
  - **GoodData**: [gooddata/gdc-js-style](//github.com/gooddata/gdc-js-style)
  - **How About We**: [howaboutwe/javascript](//github.com/howaboutwe/javascript)
  - **MinnPost**: [MinnPost/javascript](//github.com/MinnPost/javascript)
  - **National Geographic**: [natgeo/javascript](https://github.com/natgeo/javascript)
  - **Shutterfly**: [shutterfly/javascript](//github.com/shutterfly/javascript)

## The JavaScript Style Guide Guide

  - [Reference](//github.com/airbnb/javascript/wiki/The-JavaScript-Style-Guide-Guide)

## Contributors

  - [View Contributors](https://github.com/airbnb/javascript/graphs/contributors)


## License

(The MIT License)

Copyright (c) 2012 Airbnb

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

**[[⬆]](#TOC)**

# };
