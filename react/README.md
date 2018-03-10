# Airbnb React/JSX Style Guide

*A mostly reasonable approach to React and JSX*

This style guide is mostly based on the standards that are currently prevalent in JavaScript, although some conventions (i.e async/await or static class fields) may still be included or prohibited on a case-by-case basis. Currently, anything prior to stage 3 is not included nor recommended in this guide.

このスタイルガイドは、最近のJavaScriptの流行に沿った標準に準じています。
しかしながら、いくつかの慣例(async/awaitやstatic class fieldsのようなもの)は、場合によって含まれていたり禁止されていたりします。
現在のところこのガイドでは、ステージ3以前のものは全て含まれていないか非推奨となっています。

## Table of Contents

  1. [Basic Rules(基本ルール)](#basic-rules基本ルール)
  1. [Class vs `React.createClass` vs stateless](#class-vs-reactcreateclass-vs-stateless)
  1. [Mixins](#mixins)  
  1. [Naming(命名)](#naming命名)
  1. [Declaration(宣言)](#declaration宣言)
  1. [Alignment(位置揃え)](#alignment位置揃え)
  1. [Quotes(引用符)](#quotes引用符)
  1. [Spacing(スペース)](#spacingスペース)
  1. [Props(属性)](#props属性)
  1. [Refs(参照)](#refs参照)
  1. [Parentheses(括弧)](#parentheses括弧)
  1. [Tags(タグ)](#tagsタグ)
  1. [Methods(関数)](#methods関数)
  1. [Ordering(順序)](#ordering順序)
  1. [`isMounted`](#ismounted)

## Basic Rules(基本ルール)

- Only include one React component per file.
  - However, multiple [Stateless, or Pure, Components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) are allowed per file. eslint: [`react/no-multi-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md#ignorestateless).
- Always use JSX syntax.
- Do not use `React.createElement` unless you're initializing the app from a file that is not JSX.

- Reactコンポーネントは1ファイル1つとすること。
  - しかし、 複数の[ステートレスや単純なコンポーネント](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions)は1つのファイルにまとめることを認める。eslint: [`react/no-multi-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md#ignorestateless).
- 常にJSX構文を使用すること。
- JSXを使用していないファイルからのアプリケーション初期化でない限り、`React.createElement`を利用しないこと。

## Class vs `React.createClass` vs stateless

- If you have internal state and/or refs, prefer `class extends React.Component` over `React.createClass`. eslint: [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md) [`react/prefer-stateless-function`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)

- もし内部状態や`refs`を保持する際は、 `React.createClass`より`class extends React.Component`の利用を推奨します。eslint: [`react/prefer-es6-class`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md) [`react/prefer-stateless-function`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)

```jsx
// bad
const Listing = React.createClass({
  // ...
  render() {
    return <div>{this.state.hello}</div>;
  }
});

// good
class Listing extends React.Component {
  // ...
  render() {
    return <div>{this.state.hello}</div>;
  }
}
```

And if you don't have state or refs, prefer normal functions (not arrow functions) over classes:

そして、状態や`refs`を保持しない場合、クラスより通常の関数(アロー関数ではない)の利用を推奨します。

```jsx
// bad
class Listing extends React.Component {
  render() {
    return <div>{this.props.hello}</div>;
  }
}

// bad (relying on function name inference is discouraged)
const Listing = ({ hello }) => (
  <div>{hello}</div>
);

// good
function Listing({ hello }) {
  return <div>{hello}</div>;
}
```

## Mixins

- [Do not use mixins](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html).

> Why? Mixins introduce implicit dependencies, cause name clashes, and cause snowballing complexity. Most use cases for mixins can be accomplished in better ways via components, higher-order components, or utility modules.

- [mixinを利用しない。](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html).

> なぜ？Mixinは暗黙的な依存関係をもたらし、名前の衝突を起こして、雪玉が坂道を転がるような複雑さの原因になります。Mixinの利用例のほとんどは、コンポーネント、higher-order components(高次コンポーネント)、ユーティリティモジュールなどのより良い方法で代用が可能です。

## Naming(命名)

- **Extensions**: Use `.jsx` extension for React components.
- **Filename**: Use PascalCase for filenames. E.g., `ReservationCard.jsx`.
- **Reference Naming**: Use PascalCase for React components and camelCase for their instances. eslint: [`react/jsx-pascal-case`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

- **拡張子**: Reactコンポーネントの拡張子には`.jsx`を利用すること。
- **ファイル名**: ファイル名にはパスカル記法を利用すること. 例) `ReservationCard.jsx`.
- **参照名**: Reactコンポーネントにはパスカル記法を利用し、それらのインスタンスにはキャメル記法を利用すること。eslint: [`react/jsx-pascal-case`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

```jsx
// bad
import reservationCard from './ReservationCard';

// good
import ReservationCard from './ReservationCard';

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
```

- **Component Naming**: Use the filename as the component name. For example, `ReservationCard.jsx` should have a reference name of `ReservationCard`. However, for root components of a directory, use `index.jsx` as the filename and use the directory name as the component name:

- **コンポーネント名**: ファイル名をコンポーネント名として利用すること。例えば、 `ReservationCard.jsx` の参照名は `ReservationCard` とするべき。しかし、コンポーネントがあるルート・ディレクトリの `index.jsx` は、ディレクトリ名をコンポーネント名として利用してください。

```jsx
// bad
import Footer from './Footer/Footer';

// bad
import Footer from './Footer/index';

// good
import Footer from './Footer';
```

- **Higher-order Component Naming**: Use a composite of the higher-order component's name and the passed-in component's name as the `displayName` on the generated component. For example, the higher-order component `withFoo()`, when passed a component `Bar` should produce a component with a `displayName` of `withFoo(Bar)`.

> Why? A component's `displayName` may be used by developer tools or in error messages, and having a value that clearly expresses this relationship helps people understand what is happening.

- **高次コンポーネント名**: 生成されたコンポーネントには、`displayName` に渡されたコンポーネント名と高次コンポーネント名を複合した名称を利用すること。例えば、高次コンポーネント `withFoo()` に対し、`Bar`コンポーネントを渡す場合は、 生成されるコンポーネントの `displayName` は `withFoo(Bar)` となるべきです。

> なぜ？コンポーネントの `displayName` は開発者ツールやエラーメッセージの中で利用され、その関連を明確に表現する値を持つことは、何が起こっているかを理解するための助けになるでしょう。

```jsx
// bad
export default function withFoo(WrappedComponent) {
  return function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  }
}

// good
export default function withFoo(WrappedComponent) {
  function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  }

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithFoo.displayName = `withFoo(${wrappedComponentName})`;
  return WithFoo;
}
```

- **Props Naming**: Avoid using DOM component prop names for different purposes.

> Why? People expect props like `style` and `className` to mean one specific thing. Varying this API for a subset of your app makes the code less readable and less maintainable, and may cause bugs.

- **Props名**: DOMのprops名を異なる目的に利用することを避ける。

> なぜ？人々は`style`や`className`などのprops名を特定の1つのことを意味すると推測します。これらのAPIを変更することで、コードの可読性やメンテナンス性が下がり、不具合の原因になることもあります。

 ```jsx
 // bad
 <MyComponent style="fancy" />

 // bad
 <MyComponent className="fancy" />

 // good
 <MyComponent variant="fancy" />
 ```

## Declaration(宣言)

- Do not use `displayName` for naming components. Instead, name the component by reference.

- `displayName` をコンポーネントの名付けのために利用してはいけません。代わりにコンポーネントは参照ごとに名付けます。_(訳注)ここ場合での参照とはクラス名のことだと思われます。_

```jsx
// bad
export default React.createClass({
  displayName: 'ReservationCard',
  // stuff goes here
});

// good
export default class ReservationCard extends React.Component {
}
```

## Alignment(位置揃え)

- Follow these alignment styles for JSX syntax. eslint: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md) [`react/jsx-closing-tag-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md)

- JSX構文の位置揃えはこれらのスタイルに従うこと。eslint: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md) [`react/jsx-closing-tag-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md)

```jsx  
// bad
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />

// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// if props fit in one line then keep it on the same line
<Foo bar="bar" />

// children get indented normally
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
  <Quux />
</Foo>  
```

## Quotes(引用符)

- Always use double quotes (`"`) for JSX attributes, but single quotes (`'`) for all other JS. eslint: [`jsx-quotes`](https://eslint.org/docs/rules/jsx-quotes)

> Why? Regular HTML attributes also typically use double quotes instead of single, so JSX attributes mirror this convention.

- JSX内の要素は常に二重引用符 (`"`) を利用し、そのほかのJSには引用符 (`'\`) を利用すること。eslint: [`jsx-quotes`](https://eslint.org/docs/rules/jsx-quotes)

> なぜ？標準のHTML要素も一般的に引用符の代わりに二重引用符を利用しているため、JSX要素もこの慣習に従っています。

```jsx
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style={{ left: "20px" }} />

// good
<Foo style={{ left: '20px' }} />
```

## Spacing(スペース)

- Always include a single space in your self-closing tag. eslint: [`no-multi-spaces`](https://eslint.org/docs/rules/no-multi-spaces), [`react/jsx-tag-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md)

- 常に閉じタグには1つスペースを含めること。eslint: [`no-multi-spaces`](https://eslint.org/docs/rules/no-multi-spaces), [`react/jsx-tag-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md)

```jsx
// bad
<Foo/>

// very bad
<Foo                 />

// bad
<Foo
 />

// good
<Foo />
```

- Do not pad JSX curly braces with spaces. eslint: [`react/jsx-curly-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)

- JSXの中括弧は中にスペースを詰めないこと。eslint: [`react/jsx-curly-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)

```jsx
// bad
<Foo bar={ baz } />

// good
<Foo bar={baz} />
```

## Props(属性)

- Always use camelCase for prop names.

- 属性名は常にキャメル記法を利用すること。

```jsx
// bad
<Foo
  UserName="hello"
  phone_number={12345678}
/>

// good
<Foo
  userName="hello"
  phoneNumber={12345678}
/>
```

- Omit the value of the prop when it is explicitly `true`. eslint: [`react/jsx-boolean-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)

- ただし、属性値が明示的に `true` である場合は除く。eslint: [`react/jsx-boolean-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)

```jsx
// bad
<Foo
  hidden={true}
/>

// good
<Foo
  hidden
/>

// good
<Foo hidden />
```

- Always include an `alt` prop on `<img>` tags. If the image is presentational, `alt` can be an empty string or the `<img>` must have `role="presentation"`. eslint: [`jsx-a11y/alt-text`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md)

- `<img>` タグは常に `alt` 属性を含めること。 画像が単にプレゼンテーション用である場合は、 `alt` は空の文字列か `<img>` タグに `role="presentation"` を持つこと。eslint: [`jsx-a11y/alt-text`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md)

```jsx
// bad
<img src="hello.jpg" />

// good
<img src="hello.jpg" alt="Me waving hello" />

// good
<img src="hello.jpg" alt="" />

// good
<img src="hello.jpg" role="presentation" />
```

- Do not use words like "image", "photo", or "picture" in `<img>` `alt` props. eslint: [`jsx-a11y/img-redundant-alt`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md)

> Why? Screenreaders already announce `img` elements as images, so there is no need to include this information in the alt text.

- `<img>` の `alt` 属性の中では、"image", "photo", "picture"のような単語は利用しないこと。eslint: [`jsx-a11y/img-redundant-alt`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md)

> なぜ？スクリーンリーダーは既に `img` 要素を画像であることを通知しているため、このような情報をaltのテキスト情報に含めることは不要です。

```jsx
// bad
<img src="hello.jpg" alt="Picture of me waving hello" />

// good
<img src="hello.jpg" alt="Me waving hello" />
```

- Use only valid, non-abstract [ARIA roles](https://www.w3.org/TR/wai-aria/roles#role_definitions). eslint: [`jsx-a11y/aria-role`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md)

- [ARIA roles](https://www.w3.org/TR/wai-aria/roles#role_definitions)の中で有効かつ、抽象的でないものを利用すること。eslint: [`jsx-a11y/aria-role`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md)

```jsx
// bad - not an ARIA role
<div role="datepicker" />

// bad - abstract ARIA role
<div role="range" />

// good
<div role="button" />
```

- Do not use `accessKey` on elements. eslint: [`jsx-a11y/no-access-key`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md)

> Why? Inconsistencies between keyboard shortcuts and keyboard commands used by people using screenreaders and keyboards complicate accessibility.

- 要素で `accessKey` を利用しないこと。eslint: [`jsx-a11y/no-access-key`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md)

> なぜ？スクリーンリーダーやキーボードを利用する人々の中で、キーボードショートカットとキーボードコマンドの不整合を起すことは、アクセシビリティを複雑なものにしてしまいます。

```jsx
// bad
<div accessKey="h" />

// good
<div />
```

- Avoid using an array index as `key` prop, prefer a unique ID. ([why?](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318))

- `key` 属性のようなものには配列の添字の利用を避け、一意なIDを利用すること。([なぜ？](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318))

```jsx
// bad
{todos.map((todo, index) =>
  <Todo
    {...todo}
    key={index}
  />
)}

// good
{todos.map(todo => (
  <Todo
    {...todo}
    key={todo.id}
  />
))}
```

- Always define explicit defaultProps for all non-required props.

> Why? propTypes are a form of documentation, and providing defaultProps means the reader of your code doesn’t have to assume as much. In addition, it can mean that your code can omit certain type checks.

- 常に必須ではない全てのpropsに対して明示的にデフォルト値を定義すること。

> なぜ？propTypesはドキュメントの一種であり、デフォルト値を提供することでコードの読者たる人々は多くのことを想定しなくて済みます。それに加えて、特定の型チェックを省略することができます。

```jsx
// bad
function SFC({ foo, bar, children }) {
  return <div>{foo}{bar}{children}</div>;
}
SFC.propTypes = {
  foo: PropTypes.number.isRequired,
  bar: PropTypes.string,
  children: PropTypes.node,
};

// good
function SFC({ foo, bar, children }) {
  return <div>{foo}{bar}{children}</div>;
}
SFC.propTypes = {
  foo: PropTypes.number.isRequired,
  bar: PropTypes.string,
  children: PropTypes.node,
};
SFC.defaultProps = {
  bar: '',
  children: null,
};
```

- Use spread props sparingly.

> Why? Otherwise you're more likely to pass unnecessary props down to components. And for React v15.6.1 and older, you could [pass invalid HTML attributes to the DOM](https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html).

- propsのspread構文は控えめに使うこと。

> なぜ？さもないと、あなたはかなりの確率で不要なpropsをコンポーネントに渡すことになります。React v15.6.1 とそれより古い場合、[不正なHTMLアトリビュートをDOMに渡すことができます。](https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html)


Exceptions:

- HOCs that proxy down props and hoist propTypes

例外:

- propTypesを巻き上げてpropsを代理で渡すようなHOC

```jsx
function HOC(WrappedComponent) {
  return class Proxy extends React.Component {
    Proxy.propTypes = {
      text: PropTypes.string,
      isLoading: PropTypes.bool
    };

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}
```

- Spreading objects with known, explicit props. This can be particularly useful when testing React components with Mocha's beforeEach construct.

- 既知の明確なオブジェクトをspreadする場合。これは、MochaのbeforeEachでReactコンポーネントをテストする時など一部で有効です。

```jsx
export default function Foo {
  const props = {
    text: '',
    isPublished: false
  }

  return (<div {...props} />);
}
```

Notes for use:

Filter out unnecessary props when possible. Also, use [prop-types-exact](https://www.npmjs.com/package/prop-types-exact) to help prevent bugs.

利用上の注意:

可能であれば不要なpropsを取り除くこと。 そして、[prop-types-exact](https://www.npmjs.com/package/prop-types-exact)を使って不具合を防止すること。

```jsx
//good
render() {
  const { irrelevantProp, ...relevantProps  } = this.props;
  return <WrappedComponent {...relevantProps} />
}

//bad
render() {
  const { irrelevantProp, ...relevantProps  } = this.props;
  return <WrappedComponent {...this.props} />
}
```

## Refs(参照)

- Always use ref callbacks. eslint: [`react/no-string-refs`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)

- 常にrefのコールバックを利用すること。eslint: [`react/no-string-refs`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)

```jsx
// bad
<Foo
  ref="myRef"
/>

// good
<Foo
  ref={ref => { this.myRef = ref; }}
/>
```

## Parentheses(括弧)

- Wrap JSX tags in parentheses when they span more than one line. eslint: [`react/jsx-wrap-multilines`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md)

- 長さが1行を超えるJSXタグは括弧で囲うこと。eslint: [`react/jsx-wrap-multilines`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md)

```jsx
// bad
render() {
  return <MyComponent className="long body" foo="bar">
           <MyChild />
         </MyComponent>;
}

// good
render() {
  return (
    <MyComponent className="long body" foo="bar">
      <MyChild />
    </MyComponent>
  );
}

// good, when single line
render() {
  const body = <div>hello</div>;
  return <MyComponent>{body}</MyComponent>;
}
```

## Tags(タグ)

- Always self-close tags that have no children. eslint: [`react/self-closing-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)

- 子要素を持たない場合、常に自身でタグを閉じること。eslint: [`react/self-closing-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)

```jsx
// bad
<Foo className="stuff"></Foo>

// good
<Foo className="stuff" />
```

- If your component has multi-line properties, close its tag on a new line. eslint: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)

- 複数の属性を持つコンポーネントの場合は、改行した後にタグを閉じること。eslint: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)

```jsx
// bad
<Foo
  bar="bar"
  baz="baz" />

// good
<Foo
  bar="bar"
  baz="baz"
/>
```

## Methods(関数)

- Use arrow functions to close over local variables.

- ローカル変数を閉じ込めるためにアロー関数を利用すること。

```jsx
function ItemList(props) {
  return (
    <ul>
      {props.items.map((item, index) => (
        <Item
          key={item.key}
          onClick={() => doSomethingWith(item.name, index)}
        />
      ))}
    </ul>
  );
}
```

- Bind event handlers for the render method in the constructor. eslint: [`react/jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

> Why? A bind call in the render path creates a brand new function on every single render.

- render関数のためのイベントハンドラはコンストラクタ内でbindすること。eslint: [`react/jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

> なぜ？render上で呼び出されたbindは、1つの描画ごとに新しい関数を作成してしまいます。

```jsx
// bad
class extends React.Component {
  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv.bind(this)} />
  }
}

// good
class extends React.Component {
  constructor(props) {
    super(props);

    this.onClickDiv = this.onClickDiv.bind(this);
  }

  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv} />
  }
}
```

- Do not use underscore prefix for internal methods of a React component.

> Why? Underscore prefixes are sometimes used as a convention in other languages to denote privacy. But, unlike those languages, there is no native support for privacy in JavaScript, everything is public. Regardless of your intentions, adding underscore prefixes to your properties does not actually make them private, and any property (underscore-prefixed or not) should be treated as being public. See issues [#1024](https://github.com/airbnb/javascript/issues/1024), and [#490](https://github.com/airbnb/javascript/issues/490) for a more in-depth discussion.

- Reactコンポーネントの内部関数ではアンダースコアを接頭語として利用しないこと。

> なせ？接頭語にアンダースコアを使うことは、他の言語ではプライベートを表すものとして利用されます。しかし、他の言語と違い、JavaScriptではプライベートのネイティブのサポートはなく、全ては公開されています。あなたの意図に関わらず、プロパティに接頭語にアンダースコアをつけたとしても実際にはプライベートにはなりません。そしてプロパティ(接頭語にアンダースコアあり、なし)は公開として扱われなければなりません。詳細はこちらのIssue[#1024](https://github.com/airbnb/javascript/issues/1024)と、こちら [#490](https://github.com/airbnb/javascript/issues/490)を参照してください。

```jsx
// bad
React.createClass({
  _onClickSubmit() {
    // do stuff
  },

  // other stuff
});

// good
class extends React.Component {
  onClickSubmit() {
    // do stuff
  }

  // other stuff
}
```

- Be sure to return a value in your `render` methods. eslint: [`react/require-render-return`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)

- `render` 関数では値を返すこと。eslint: [`react/require-render-return`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)

```jsx
// bad
render() {
  (<div />);
}

// good
render() {
  return (<div />);
}
```

## Ordering(順序)

- Ordering for `class extends React.Component`:

1. optional `static` methods
1. `constructor`
1. `getChildContext`
1. `componentWillMount`
1. `componentDidMount`
1. `componentWillReceiveProps`
1. `shouldComponentUpdate`
1. `componentWillUpdate`
1. `componentDidUpdate`
1. `componentWillUnmount`
1. *clickHandlers or eventHandlers* like `onClickSubmit()` or `onChangeDescription()`
1. *getter methods for `render`* like `getSelectReason()` or `getFooterContent()`
1. *optional render methods* like `renderNavigation()` or `renderProfilePicture()`
1. `render`

- `class extends React.Component`の順序:

1. 任意の `static` 関数
1. `constructor`
1. `getChildContext`
1. `componentWillMount`
1. `componentDidMount`
1. `componentWillReceiveProps`
1. `shouldComponentUpdate`
1. `componentWillUpdate`
1. `componentDidUpdate`
1. `componentWillUnmount`
1. `onClickSubmit()` や `onChangeDescription()` のような*クリックハンドラやイベントハンドラ*
1. `getSelectReason()` や `getFooterContent()` のような*`render`のためのGetter関数*
1. `renderNavigation()` や `renderProfilePicture()` のような*付随的なrender関数*
1. `render`

- How to define `propTypes`, `defaultProps`, `contextTypes`, etc...

- `propTypes`, `defaultProps`, `contextTypes` などをどのように定義するか。

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
};

const defaultProps = {
  text: 'Hello World',
};

class Link extends React.Component {
  static methodsAreOk() {
    return true;
  }

  render() {
    return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>
  }
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
```

- Ordering for `React.createClass`: eslint: [`react/sort-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md)

1. `displayName`
1. `propTypes`
1. `contextTypes`
1. `childContextTypes`
1. `mixins`
1. `statics`
1. `defaultProps`
1. `getDefaultProps`
1. `getInitialState`
1. `getChildContext`
1. `componentWillMount`
1. `componentDidMount`
1. `componentWillReceiveProps`
1. `shouldComponentUpdate`
1. `componentWillUpdate`
1. `componentDidUpdate`
1. `componentWillUnmount`
1. *clickHandlers or eventHandlers* like `onClickSubmit()` or `onChangeDescription()`
1. *getter methods for `render`* like `getSelectReason()` or `getFooterContent()`
1. *optional render methods* like `renderNavigation()` or `renderProfilePicture()`
1. `render`

- `React.createClass` 順序: eslint: [`react/sort-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md)

1. `displayName`
1. `propTypes`
1. `contextTypes`
1. `childContextTypes`
1. `mixins`
1. `statics`
1. `defaultProps`
1. `getDefaultProps`
1. `getInitialState`
1. `getChildContext`
1. `componentWillMount`
1. `componentDidMount`
1. `componentWillReceiveProps`
1. `shouldComponentUpdate`
1. `componentWillUpdate`
1. `componentDidUpdate`
1. `componentWillUnmount`
1. `onClickSubmit()` や `onChangeDescription()` のような*クリックハンドラやイベントハンドラ**
1. `getSelectReason()` や `getFooterContent()` のような*`render`のためのGetter関数*
1. `renderNavigation()` や `renderProfilePicture()` のような*付随的なrender関数*
1. `render`

## `isMounted`

- Do not use `isMounted`. eslint: [`react/no-is-mounted`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md)

> Why? [`isMounted` is an anti-pattern][anti-pattern], is not available when using ES6 classes, and is on its way to being officially deprecated.

- `isMounted` を利用しないこと。eslint: [`react/no-is-mounted`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md)

> なぜ？[`isMounted` はアンチパターン][anti-pattern]。これはES6クラス構文を利用したときに利用できず、公式に非推奨となっています。
  [anti-pattern]: https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html

## Translation(翻訳)

This JSX/React style guide is also available in other languages:

このJSX/Reactスタイルガイドは他の言語でも利用可能です。:

- ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Chinese (Simplified)**: [JasonBoy/javascript](https://github.com/JasonBoy/javascript/tree/master/react)
[pietraszekl/javascript](https://github.com/pietraszekl/javascript/tree/master/react)
- ![tw](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Taiwan.png) **Chinese (Traditional)**: [jigsawye/javascript](https://github.com/jigsawye/javascript/tree/master/react)
- ![es](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Spain.png) **Español**: [agrcrobles/javascript](https://github.com/agrcrobles/javascript/tree/master/react)
- ![jp](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Japan.png) **Japanese**: [mitsuruog/javascript-style-guide](https://github.com/mitsuruog/javascript-style-guide/tree/master/react)
- ![kr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/South-Korea.png) **Korean**: [apple77y/javascript](https://github.com/apple77y/javascript/tree/master/react)
- ![pl](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Poland.png) **Polish**: [pietraszekl/javascript](https://github.com/pietraszekl/javascript/tree/master/react)
- ![Br](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Brazil.png) **Portuguese**: [ronal2do/javascript](https://github.com/ronal2do/airbnb-react-styleguide)
- ![ru](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Russia.png) **Russian**: [leonidlebedev/javascript-airbnb](https://github.com/leonidlebedev/javascript-airbnb/tree/master/react)
- ![th](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Thailand.png) **Thai**: [lvarayut/javascript-style-guide](https://github.com/lvarayut/javascript-style-guide/tree/master/react)
- ![tr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Turkey.png) **Turkish**: [alioguzhan/react-style-guide](https://github.com/alioguzhan/react-style-guide)
- ![ua](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Ukraine.png) **Ukrainian**: [ivanzusko/javascript](https://github.com/ivanzusko/javascript/tree/master/react)

**[⬆ back to top](#table-of-contents)**
