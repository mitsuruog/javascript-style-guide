[元文書:https://github.com/airbnb/javascript](https://github.com/airbnb/javascript)

# Airbnb JavaScript スタイルガイド() {

*常に気をつけたい、JavaScriptへの正しい接し方*

## <a name='TOC'>目次</a>

  1. [型](#types)
  1. [オブジェクト](#objects)
  1. [配列](#arrays)
  1. [文字列](#strings)
  1. [関数](#functions)
  1. [プロパティ](#properties)
  1. [変数](#variables)
  1. [巻き上げ](#hoisting)
  1. [条件式と等価式](#conditionals)
  1. [ブロック](#blocks)
  1. [コメント](#comments)
  1. [空白](#whitespace)
  1. [カンマ](#commas)
  1. [セミコロン](#semicolons)
  1. [型変換と強制](#type-coercion)
  1. [命名規則](#naming-conventions)
  1. [アクセサ（Accessors）](#accessors)
  1. [コンストラクタ](#constructors)
  1. [イベント](#events)
  1. [モジュール](#modules)
  1. [jQuery](#jquery)
  1. [ECMAScript 5 互換性](#es5)
  1. [テスト](#testing)
  1. [パフォーマンスについての参考資料](#performance)
  1. [情報源](#resources)
  1. [共鳴者](#in-the-wild)
  1. [翻訳](#translation)
  1. [JavaScriptスタイルガイドへの手引き](#guide-guide)
  1. [貢献者](#contributors)
  1. [ライセンス](#license)

## <a name='types'>型</a> [原文](https://github.com/airbnb/javascript#types)

  - **プリミティブ型**: プリミティブ型は、その値を直接操作します。

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
  - **参照型**: 参照型は、参照を通して値を操作します。

    + `object`
    + `array`
    + `function`

    ```javascript
    var foo = [1, 2],
        bar = foo;

    bar[0] = 9;

    console.log(foo[0], bar[0]); // => 9, 9
    ```

    **[[⬆ ページのTopへ戻る]](#TOC)**

## <a name='objects'>オブジェクト</a> [原文](https://github.com/airbnb/javascript#objects)

  - オブジェクトを作成する際は、リテラル構文を使用してください。

    ```javascript
    // bad
    var item = new Object();

    // good
    var item = {};
    ```

  - [予約語](http://es5.github.io/#x7.6.1)をキーとして使用しないでください。これはIE8で動作しません。参照→[Issue](https://github.com/airbnb/javascript/issues/61)

    ```javascript
    // bad
    var superman = {
      default: { clark: 'kent' },
      private: true
    };

    // good
    var superman = {
      defaults: { clark: 'kent' },
      hidden: true
    };
    ````

  - 予約語の代わりに分かりやすい同義語を使用してください。

    ```javascript
    // bad
    var superman = {
      class: 'alien'
    };

    // bad
    var superman = {
      klass: 'alien'
    };

    // good
    var superman = {
      type: 'alien'
    };

    ```
    **[[⬆ ページのTopへ戻る]](#TOC)**

## <a name='arrays'>配列</a> [原文](https://github.com/airbnb/javascript#arrays)

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

  - 配列をコピーする必要がある場合、Array#sliceを使用してください。参考（英語）→[jsPerf](http://jsperf.com/converting-arguments-to-an-array/7)

    ```javascript
    var len = items.length,
        itemsCopy = [],
        i;

    // bad
    for (i = 0; i < len; i++) {
      itemsCopy[i] = items[i];
    }

    // good
    itemsCopy = items.slice();
    ```

  - Allay-LikeなオブジェクトをArrayに変換する場合は、Array#sliceを使用してください。

    ```javascript
    function trigger() {
      var args = Array.prototype.slice.call(arguments);
      ...
    }
   ```

**[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='strings'>文字列</a> [原文](https://github.com/airbnb/javascript#strings)

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
    var errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // good
    var errorMessage = 'This is a super long error that was thrown because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.';
    ```

  - プログラムにて文字列を生成する必要がある場合は、（特にIEは）文字列連結の代わりにArray#joinを使用してください。参考（英語）→[jsPerf](http://jsperf.com/string-vs-array-concat/2).

    ```javascript
    var items,
        messages,
        length,
        i;

    messages = [{
      state: 'success',
      message: 'This one worked.'
    }, {
      state: 'success',
      message: 'This one worked as well.'
    }, {
      state: 'error',
      message: 'This one did not work.'
    }];

    length = messages.length;

    // bad
    function inbox(messages) {
      items = '<ul>';

      for (i = 0; i < length; i++) {
        items += '<li>' + messages[i].message + '</li>';
      }

      return items + '</ul>';
    }

    // good
    function inbox(messages) {
      items = [];

      for (i = 0; i < length; i++) {
        items[i] = messages[i].message;
      }

      return '<ul><li>' + items.join('</li><li>') + '</li></ul>';
    }
    ```

    **[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='functions'>関数</a> [原文](https://github.com/airbnb/javascript#functions)

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
  - **注意:** ECMA-262 では `block` はstatementsの一覧に定義されていますが、関数宣言はstatementsではありません。[この問題についてはECMA-262の記述を参照してください。](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97).

    ```javascript
    // bad
    if (currentUser) {
      function test() {
        console.log('Nope.');
      }
    }

    // good
    var test;
    if (currentUser) {
      test = function test() {
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

    **[[⬆ ページのTopへ戻る]](#TOC)**



## <a name='properties'>プロパティ</a> [原文](https://github.com/airbnb/javascript#properties)

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

    **[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='variables'>変数</a> [原文](https://github.com/airbnb/javascript#variables)

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
        i,
        length;
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

    **[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='hoisting'>巻き上げ</a> [原文](https://github.com/airbnb/javascript#hoisting)

  - 未割当ての変数は、そのスコープの先頭に巻き上げられます。

    ```javascript
    // （notDefinedがグローバル変数に存在しないと仮定した場合。）
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

    **[[⬆ ページのTopへ戻る]](#TOC)**



## <a name='conditionals'>条件式と等価式</a> [原文](https://github.com/airbnb/javascript#conditionals)

  - `==` や`!=`より `===` と `!==` を使用してください。
  - 条件式は `ToBoolean` メソッドによる強制型変換で評価され、常にこれらのシンプルなルールに従います。


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

    **[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='blocks'>ブロック</a> [原文](https://github.com/airbnb/javascript#blocks)

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

    **[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='comments'>コメント</a> [原文](https://github.com/airbnb/javascript#comments)

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

  - 問題を指摘して再考を促す場合や、問題の解決策を提案する場合など、コメントの前に `FIXME` や `TODO` を付けることで他のデベロッパの素早い理解を助けることができます。これらは、何らかのアクションを伴うという意味で通常のコメントとは異なります。アクションとは `FIXME -- 解決策が必要` もしくは `TODO -- 実装が必要` です。


  - 問題に対する注釈として `// FIXME:` を使用してください。

    ```javascript
    function Calculator() {

      // FIXME: グローバル変数を使用するべきではない。
      total = 0;

      return this;
    }
    ```

  - 問題の解決策に対する注釈として `// TODO:` を使用してください。

    ```javascript
    function Calculator() {

      // TODO: total はオプションパラメータとして設定されるべき。
      this.total = 0;
      return this;
    }
  ```

    **[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='whitespace'>空白</a> [原文](https://github.com/airbnb/javascript#whitespace)

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

  - 制御構文（if文やwhile文など）の丸括弧（()）の前にはスペースを1つ入れてください。関数宣言や関数呼び出し時の引数リストの前にはスペースは入れないでください。

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

  - 演算子の間はスペースを入れてください。

    ```javascript
    // bad
    var x=y+5;

    // good
    var x = y + 5;
    ```

  - ファイルの最後は改行文字を1つ入れてください。

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
  var leds = stage.selectAll('.led').data(data).enter().append('svg:svg').class('led', true)
      .attr('width',  (radius + margin) * 2).append('svg:g')
      .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
      .call(tron.led);

  // good
  var leds = stage.selectAll('.led')
      .data(data)
    .enter().append('svg:svg')
      .class('led', true)
      .attr('width',  (radius + margin) * 2)
    .append('svg:g')
      .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
      .call(tron.led);
  ```

    **[[⬆ ページのTopへ戻る]](#TOC)**

## <a name='commas'>カンマ</a> [原文](https://github.com/airbnb/javascript#commas)

  - 先頭のカンマは **やめてください。**

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

　- 末尾の余計なカンマも **やめてください。** これはIE6/7とquirksmodeのIE9で問題を引き起こす可能性があります。
  さらに、ES3のいくつかの実装において、余計なカンマがある場合、配列に長さを追加します。
  これは、ES5の中で明らかにされました。([参考](http://es5.github.io/#D)):

  > 第5版では、末尾の余計なカンマが存在するArrayInitialiser（配列初期化演算子）であっても、配列に長さを追加しないという事実を明確にしています。
これは第3版から意味的な変更ではありませんが、いくつかの実装は以前よりこれを誤解していたかもしれません。

  ```javascript
    // bad
    var hero = {
      firstName: 'Kevin',
      lastName: 'Flynn',
    };

    var heroes = [
      'Batman',
      'Superman',
    ];

    // good
    var hero = {
      firstName: 'Kevin',
      lastName: 'Flynn'
    };

    var heroes = [
      'Batman',
      'Superman'
    ];
  ```

  **[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='semicolons'>セミコロン</a> [原文](https://github.com/airbnb/javascript#semicolons)

  - **もちろん使いましょう。**

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

    // good(即時関数を伴う2つのファイルを連結した場合に、引数となる部分を保護します。)
    ;(function() {
      var name = 'Skywalker';
      return name;
    })();
    ```
    [詳細](http://stackoverflow.com/a/7365214/1712802)

    **[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='type-coercion'>型変換と強制</a> [原文](https://github.com/airbnb/javascript#type-coercion)

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

  - 数値には`parseInt` を使用してください。常に型変換のための基数を引数に渡してください。

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
    ````

  - 何らかの理由により `parseInt` がボトルネックとなっており、[パフォーマンス的な理由](http://jsperf.com/coercion-vs-casting/3)でビットシフトを使用す必要がある場合、
  やろうとしている事について、why（なぜ）とwhat（何を）の説明をコメントとして残してください。

    ```javascript
    // good
    /**
     * parseIntがボトルネックとなっていたため、
     * ビットシフトで文字列を数値へ強制的に変換することで
     * パフォーマンスを改善させます。
     */
    var val = inputValue >> 0;
    ```

  - **注意:** ビットシフトを使用する場合の注意事項。数値は[64ビット倍精度](http://es5.github.io/#x4.3.19)として表現されていますが、ビットシフト演算した場合は常に32ビット単精度で返されます([エビデンス](http://es5.github.io/#x11.7))。
  32ビット以上の数値をビットシフトする場合、予期せぬ振る舞いを起こす可能性があります([議論](https://github.com/airbnb/javascript/issues/109))。符号付き32ビット整数の最大値は2,147,483,647です。

    ```javascript
    2147483647 >> 0 //=> 2147483647
    2147483648 >> 0 //=> -2147483648
    2147483649 >> 0 //=> -2147483647
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

    **[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='naming-conventions'>命名規則</a> [原文](https://github.com/airbnb/javascript#naming-conventions)

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
    function c() {}
    var u = new user({
      name: 'Bob Parr'
    });

    // good
    var thisIsMyObject = {};
    function thisIsMyFunction() {}
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

    - **注意:** IE8とそれ以下のものには、名前付き関数に関するいくつかの癖を持っています。さらに詳細な情報を求める場合は[http://kangax.github.io/nfe/](http://kangax.github.io/nfe/)を参照してください。


    **[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='accessors'>アクセサ（Accessors）</a> [原文](https://github.com/airbnb/javascript#accessors)

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

    **[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='constructors'>コンストラクタ</a> [原文](https://github.com/airbnb/javascript#constructors)

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

    **[[⬆ ページのTopへ戻る]](#TOC)**

## <a name='events'>イベント</a>

  - （DOMイベントやBackbone eventsのような独自の）イベントへペイロードの値を渡す場合は、生の値の代わりにハッシュ引数を渡してください。
こうすることで、後の開発者がイベントに関連する全てのハンドラを見つけて更新することなく、イベント・ぺイロードに値を追加することが出来ます。例えば、これの代わりに:

    ```js
    // bad
    $(this).trigger('listingUpdated', listing.id);

    ...

    $(this).on('listingUpdated', function(e, listingId) {
      // do something with listingId
    });
    ```

    こちらの方が好まれます。:

    ```js
    // good
    $(this).trigger('listingUpdated', { listingId : listing.id });

    ...

    $(this).on('listingUpdated', function(e, data) {
    // do something with data.listingId
    });
    ```

  **[[⬆ ページのTopへ戻る]](#TOC)**

## <a name='modules'>モジュール</a> [原文](https://github.com/airbnb/javascript#modules)

  - モジュールは `!` で始めてください。これは、文末のセミコロンを付け忘れたモジュールを連結した場合、実行時にエラーが発生しないためです。[説明](https://github.com/airbnb/javascript/issues/44#issuecomment-13063933)
  - ファイル名はキャメルケースを使用し、同じ名称のフォルダに格納してください。また、単独で公開する場合は、名前を一致させてください。
  - `noConflict()` という名称で、(名前衝突して上書きされる前の)モジュールを返すメソッドを追加してください。
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

    **[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='jquery'>jQuery</a> [原文](https://github.com/airbnb/javascript#jquery)

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

  - DOMの検索には、 `$('.sidebar ul')` や `$('.sidebar > ul')` のカスケードを使用してください。 参考（英語）→[jsPerf](http://jsperf.com/jquery-find-vs-context-sel/16)

  - jQueryオブジェクトの検索には、スコープ付きの `find` を使用してください。

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

    **[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='es5'>ECMAScript 5 互換性</a> [原文](https://github.com/airbnb/javascript#es5)

  - [Kangax](https://twitter.com/kangax/)の ES5 [互換表](http://kangax.github.com/es5-compat-table/)を参照してください。

  **[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='testing'>テスト</a> [原文](https://github.com/airbnb/javascript#testing)

  - **もちろん**

    ```javascript
    function() {
      return true;
    }
    ```

    **[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='performance'>パフォーマンスについての参考資料</a> [原文](https://github.com/airbnb/javascript#performance)

  - [String vs Array Concat](http://jsperf.com/string-vs-array-concat/2)
  - [Try/Catch Cost In a Loop](http://jsperf.com/try-catch-in-loop-cost)
  - [Bang Function](http://jsperf.com/bang-function)
  - [jQuery Find vs Context, Selector](http://jsperf.com/jquery-find-vs-context-sel/13)
  - [innerHTML vs textContent for script text](http://jsperf.com/innerhtml-vs-textcontent-for-script-text)
  - [Long String Concatenation](http://jsperf.com/ya-string-concat)
  - Loading...

  **[[⬆ ページのTopへ戻る]](#TOC)**


## <a name='resources'>情報源</a> [原文](https://github.com/airbnb/javascript#resources)


**まず、これを読んでください。**

  - [注釈付き ECMAScript 5.1](http://es5.github.com/)

**他のスタイルガイド**

  - [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)
  - [jQuery Core Style Guidelines](http://docs.jquery.com/JQuery_Core_Style_Guidelines)
  - [Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwldrn/idiomatic.js/)

**スタイルについての他の意見**

  - [Naming this in nested functions](https://gist.github.com/4135065) - Christian Johansen
  - [Conditional Callbacks](https://github.com/airbnb/javascript/issues/52)
  - [Popular JavaScript Coding Conventions on Github](http://sideeffect.kr/popularconvention/#javascript)

**参考文献**

  - [Understanding JavaScript Closures](http://javascriptweblog.wordpress.com/2010/10/25/understanding-javascript-closures/) - Angus Croll
  - [Basic JavaScript for the impatient programmer](http://www.2ality.com/2013/06/basic-javascript.html) - Dr. Axel Rauschmayer
  - [You Might Not Need jQuery](http://youmightnotneedjquery.com/) - Zack Bloom & Adam Schwartz
  - [ES6 Features](https://github.com/lukehoban/es6features) - Luke Hoban

**参考図書**

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
  - [JSBooks](http://jsbooks.revolunet.com/)
  - [Third Party JavaScript](http://manning.com/vinegar/) - Ben Vinegar and Anton Kovalyov

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

  **[[⬆ ページのTopへ戻る]](#TOC)**

## <a name='in-the-wild'>共鳴者</a> [原文](https://github.com/airbnb/javascript#in-the-wild)

_訳注: 原文は「in the wild:感染者」となっている。_

  これはこのスタイルガイドを使用している組織の一覧表です。このリストに追加して欲しい場合は、pull requestかissueを挙げてください。

  - **Aan Zee**: [AanZee/javascript](https://github.com/AanZee/javascript)
  - **Airbnb**: [airbnb/javascript](https://github.com/airbnb/javascript)
  - **American Insitutes for Research**: [AIRAST/javascript](https://github.com/AIRAST/javascript)
  - **Compass Learning**: [compasslearning/javascript-style-guide](https://github.com/compasslearning/javascript-style-guide)
  - **DailyMotion**: [dailymotion/javascript](https://github.com/dailymotion/javascript)
  - **Digitpaint** [digitpaint/javascript](https://github.com/digitpaint/javascript)
  - **ExactTarget**: [ExactTarget/javascript](https://github.com/ExactTarget/javascript)
  - **Gawker Media**: [gawkermedia/javascript](https://github.com/gawkermedia/javascript)
  - **GeneralElectric**: [GeneralElectric/javascript](https://github.com/GeneralElectric/javascript)
  - **GoodData**: [gooddata/gdc-js-style](https://github.com/gooddata/gdc-js-style)
  - **Grooveshark**: [grooveshark/javascript](https://github.com/grooveshark/javascript)
  - **How About We**: [howaboutwe/javascript](https://github.com/howaboutwe/javascript)
  - **Intent Media**: [intentmedia/javascript](https://github.com/intentmedia/javascript)
  - **Mighty Spring**: [mightyspring/javascript](https://github.com/mightyspring/javascript)
  - **MinnPost**: [MinnPost/javascript](https://github.com/MinnPost/javascript)
  - **ModCloth**: [modcloth/javascript](https://github.com/modcloth/javascript)
  - **Money Advice Service**: [moneyadviceservice/javascript](https://github.com/moneyadviceservice/javascript)
  - **Muber**: [muber/javascript](https://github.com/muber/javascript)
  - **National Geographic**: [natgeo/javascript](https://github.com/natgeo/javascript)
  - **National Park Service**: [nationalparkservice/javascript](https://github.com/nationalparkservice/javascript)
  - **Orion Health**: [orionhealth/javascript](https://github.com/orionhealth/javascript)
  - **Peerby**: [Peerby/javascript](https://github.com/Peerby/javascript)
  - **Razorfish**: [razorfish/javascript-style-guide](https://github.com/razorfish/javascript-style-guide)
  - **reddit**: [reddit/styleguide/javascript](https://github.com/reddit/styleguide/tree/master/javascript)
  - **REI**: [reidev/js-style-guide](https://github.com/reidev/js-style-guide)
  - **Ripple**: [ripple/javascript-style-guide](https://github.com/ripple/javascript-style-guide)
  - **SeekingAlpha**: [seekingalpha/javascript-style-guide](https://github.com/seekingalpha/javascript-style-guide)
  - **Shutterfly**: [shutterfly/javascript](https://github.com/shutterfly/javascript)
  - **TheLadders**: [TheLadders/javascript](https://github.com/TheLadders/javascript)  
  - **Userify**: [userify/javascript](https://github.com/userify/javascript)
  - **Zillow**: [zillow/javascript](https://github.com/zillow/javascript)
  - **ZocDoc**: [ZocDoc/javascript](https://github.com/ZocDoc/javascript)

## <a name='translation'>翻訳</a> [原文](https://github.com/airbnb/javascript#translation)

  このスタイルガイドは他の言語でも利用できます。

  - :de: **ドイツ語**: [timofurrer/javascript-style-guide](https://github.com/timofurrer/javascript-style-guide)
  - :jp: **日本語**: [mitsuruog/javascript-style-guide](https://github.com/mitsuruog/javascript-style-guide)
  - :br: **ポルトガル語**: [armoucar/javascript-style-guide](https://github.com/armoucar/javascript-style-guide)
  - :cn: **中国語**: [adamlu/javascript-style-guide](https://github.com/adamlu/javascript-style-guide)
  - :es: **スペイン語**: [paolocarrasco/javascript-style-guide](https://github.com/paolocarrasco/javascript-style-guide)
  - :kr: **韓国語**: [tipjs/javascript-style-guide](https://github.com/tipjs/javascript-style-guide)
  - :fr: **フランス語**: [nmussy/javascript-style-guide](https://github.com/nmussy/javascript-style-guide)
  - :ru: **ロシア語**: [uprock/javascript](https://github.com/uprock/javascript)
  - :bg: **ブルガリア語**: [borislavvv/javascript](https://github.com/borislavvv/javascript)

## <a name='guide-guide'>JavaScriptスタイルガイドへの手引き</a> [原文](https://github.com/airbnb/javascript#guide-guide)

  - [こちらを参照](https://github.com/mitsuruog/javascript-style-guide/wiki/JavaScript%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E3%82%AC%E3%82%A4%E3%83%89%E3%81%B8%E3%81%AE%E6%89%8B%E5%BC%95%E3%81%8D)

## <a name='contributors'>貢献者</a> [原文](https://github.com/airbnb/javascript#contributors)

  - [貢献者一覧](https://github.com/airbnb/javascript/graphs/contributors)

## <a name='license'>ライセンス</a> [原文](https://github.com/airbnb/javascript#license)

MITライセンス

著作権(c)　2014 Airbnb  
翻訳　2014 mitsuruog

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

**[[⬆ ページのTopへ戻る]](#TOC)**

# };
