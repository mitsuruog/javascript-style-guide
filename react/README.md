# Airbnb React/JSX Style Guide

_A mostly reasonable approach to React and JSX_

_React と JSX に対する、程よく健全なアプローチ_

This style guide is mostly based on the standards that are currently prevalent in JavaScript, although some conventions (i.e async/await or static class fields) may still be included or prohibited on a case-by-case basis. Currently, anything prior to stage 3 is not included nor recommended in this guide.

このスタイルガイドは、現在 JavaScript で一般的に使われている標準に主に基づいていますが、async/await や静的クラスフィールドのように、状況に応じて含めたり禁止したりする規約もあります。現在のところ、Stage 3 に達していないものは、このガイドには含まれておらず、推奨もされません。

## Table of Contents

1. [Basic Rules](#basic-rules)
1. [Class vs `React.createClass` vs stateless](#class-vs-reactcreateclass-vs-stateless)
1. [Mixins](#mixins)
1. [Naming](#naming)
1. [Declaration](#declaration)
1. [Alignment](#alignment)
1. [Quotes](#quotes)
1. [Spacing](#spacing)
1. [Props](#props)
1. [Refs](#refs)
1. [Parentheses](#parentheses)
1. [Tags](#tags)
1. [Methods](#methods)
1. [Ordering](#ordering)
1. [`isMounted`](#ismounted)

## Basic Rules

- Only include one React component per file.
  - However, multiple [Stateless, or Pure, Components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) are allowed per file. eslint: [`react/no-multi-comp`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md#ignorestateless).
- Always use JSX syntax.
- Do not use `React.createElement` unless you’re initializing the app from a file that is not JSX.
- [`react/forbid-prop-types`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md) will allow `arrays` and `objects` only if it is explicitly noted what `array` and `object` contains, using `arrayOf`, `objectOf`, or `shape`.

- 1 つのファイルには 1 つの React コンポーネントのみを含めてください。
  - ただし、複数の [Stateless（または Pure）コンポーネント](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions) は 1 ファイル内に含めても構いません。eslint: [`react/no-multi-comp`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md#ignorestateless)
- JSX 構文を必ず使用してください。
- JSX ではないファイルからアプリを初期化する場合を除き、`React.createElement` を使用しないでください。
- [`react/forbid-prop-types`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md) は、`arrayOf`、`objectOf`、`shape` を使用して `array` や `object` が何を含むのか明示されている場合にのみ、`arrays` と `objects` を許可します。

## Class vs `React.createClass` vs stateless

- If you have internal state and/or refs, prefer `class extends React.Component` over `React.createClass`. eslint: [`react/prefer-es6-class`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md) [`react/prefer-stateless-function`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)
- 内部 state や refs を使用する場合は、`React.createClass` よりも `class extends React.Component` を優先してください。eslint: [`react/prefer-es6-class`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md) [`react/prefer-stateless-function`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md)

  ```jsx
  // bad
  const Listing = React.createClass({
    // ...
    render() {
      return <div>{this.state.hello}</div>;
    },
  });

  // good
  class Listing extends React.Component {
    // ...
    render() {
      return <div>{this.state.hello}</div>;
    }
  }
  ```

  And if you don’t have state or refs, prefer normal functions (not arrow functions) over classes:

  また、state や refs を持たない場合は、クラスではなく通常の関数（アロー関数ではないもの）を優先してください。

  ```jsx
  // bad
  class Listing extends React.Component {
    render() {
      return <div>{this.props.hello}</div>;
    }
  }

  // bad (relying on function name inference is discouraged)
  const Listing = ({ hello }) => <div>{hello}</div>;

  // good
  function Listing({ hello }) {
    return <div>{hello}</div>;
  }
  ```

## Mixins

- [Do not use mixins](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html).
- [Mixins を使用しないでください](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html)。

> Why? Mixins introduce implicit dependencies, cause name clashes, and cause snowballing complexity. Most use cases for mixins can be accomplished in better ways via components, higher-order components, or utility modules.

> 理由: Mixins は暗黙的な依存関係を生み、名前の衝突を引き起こし、複雑さが雪だるま式に増大します。多くの場合、Mixins の用途はコンポーネント、HOC（高階コンポーネント）、ユーティリティモジュールなどを使うことで、より良い方法で実現できます。

## Naming

- **Extensions**: Use `.jsx` extension for React components. eslint: [`react/jsx-filename-extension`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md)
- **Filename**: Use PascalCase for filenames. E.g., `ReservationCard.jsx`.
- **Reference Naming**: Use PascalCase for React components and camelCase for their instances. eslint: [`react/jsx-pascal-case`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

- **拡張子**: React コンポーネントには `.jsx` 拡張子を使用してください。eslint: [`react/jsx-filename-extension`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md)
- **ファイル名**: ファイル名には PascalCase を使用してください。例: `ReservationCard.jsx`
- **参照名**: React コンポーネントには PascalCase を、コンポーネントのインスタンスには camelCase を使用してください。eslint: [`react/jsx-pascal-case`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

  ```jsx
  // bad
  import reservationCard from "./ReservationCard";

  // good
  import ReservationCard from "./ReservationCard";

  // bad
  const ReservationItem = <ReservationCard />;

  // good
  const reservationItem = <ReservationCard />;
  ```

- **Component Naming**: Use the filename as the component name. For example, `ReservationCard.jsx` should have a reference name of `ReservationCard`. However, for root components of a directory, use `index.jsx` as the filename and use the directory name as the component name:
- **コンポーネント名**: ファイル名をコンポーネント名として使用してください。たとえば、`ReservationCard.jsx` は `ReservationCard` という参照名にするべきです。ただし、ディレクトリ直下のルートコンポーネントの場合は、ファイル名に `index.jsx` を使用し、コンポーネント名にはディレクトリ名を使用してください。

  ```jsx
  // bad
  import Footer from "./Footer/Footer";

  // bad
  import Footer from "./Footer/index";

  // good
  import Footer from "./Footer";
  ```

- **Higher-order Component Naming**: Use a composite of the higher-order component’s name and the passed-in component’s name as the `displayName` on the generated component. For example, the higher-order component `withFoo()`, when passed a component `Bar` should produce a component with a `displayName` of `withFoo(Bar)`.
- **高階コンポーネント（Higher-order Component）の命名**: 生成されるコンポーネントの `displayName` には、高階コンポーネント名と渡されたコンポーネント名を組み合わせた名前を使用してください。たとえば、高階コンポーネント `withFoo()` にコンポーネント `Bar` を渡した場合、生成されるコンポーネントの `displayName` は `withFoo(Bar)` とするべきです。

  > Why? A component’s `displayName` may be used by developer tools or in error messages, and having a value that clearly expresses this relationship helps people understand what is happening.

  > 理由: コンポーネントの `displayName` は開発者ツールやエラーメッセージで使用されることがあり、この関係が明確に表現されていると挙動の理解が容易になるためです。

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
- **Props の命名**: DOM コンポーネントの props 名を別の用途で使用することは避けてください。

  > Why? People expect props like `style` and `className` to mean one specific thing. Varying this API for a subset of your app makes the code less readable and less maintainable, and may cause bugs.

  > 理由: `style` や `className` のような props は特定の意味を持つと誰もが期待しています。アプリの一部でこの API を変えてしまうと、コードの可読性や保守性が低下し、バグの原因にもなります。

  ```jsx
  // bad
  <MyComponent style="fancy" />

  // bad
  <MyComponent className="fancy" />

  // good
  <MyComponent variant="fancy" />
  ```

## Declaration

- Do not use `displayName` for naming components. Instead, name the component by reference.
- コンポーネントの命名に `displayName` を使用しないでください。代わりに、参照によってコンポーネントに名前を付けてください。

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

## Alignment

- Follow these alignment styles for JSX syntax. eslint: [`react/jsx-closing-bracket-location`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md) [`react/jsx-closing-tag-location`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md)
- JSX の構文では、以下の配置スタイルに従ってください。eslint: [`react/jsx-closing-bracket-location`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md) [`react/jsx-closing-tag-location`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md)

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

  // bad
  {showButton &&
    <Button />
  }

  // bad
  {
    showButton &&
      <Button />
  }

  // good
  {showButton && (
    <Button />
  )}

  // good
  {showButton && <Button />}

  // good
  {someReallyLongConditional
    && anotherLongConditional
    && (
      <Foo
        superLongParam="bar"
        anotherSuperLongParam="baz"
      />
    )
  }

  // good
  {someConditional ? (
    <Foo />
  ) : (
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    />
  )}
  ```

## Quotes

- Always use double quotes (`"`) for JSX attributes, but single quotes (`'`) for all other JS. eslint: [`jsx-quotes`](https://eslint.org/docs/rules/jsx-quotes)
- JSX の属性には常にダブルクォート（`"`）を使用し、その他の JavaScript ではシングルクォート（`'`）を使用してください。eslint: [`jsx-quotes`](https://eslint.org/docs/rules/jsx-quotes)

  > Why? Regular HTML attributes also typically use double quotes instead of single, so JSX attributes mirror this convention.

  > 理由: 通常の HTML 属性でもダブルクォートが一般的に使われるため、JSX 属性もこの慣習に合わせるためです。

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

## Spacing

- Always include a single space in your self-closing tag. eslint: [`no-multi-spaces`](https://eslint.org/docs/rules/no-multi-spaces), [`react/jsx-tag-spacing`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md)
- セルフクロージングタグには必ず 1 つのスペースを入れてください。eslint: [`no-multi-spaces`](https://eslint.org/docs/rules/no-multi-spaces), [`react/jsx-tag-spacing`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md)

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

- Do not pad JSX curly braces with spaces. eslint: [`react/jsx-curly-spacing`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)
- JSX の中括弧の内側にスペースを入れないでください。eslint: [`react/jsx-curly-spacing`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)

  ```jsx
  // bad
  <Foo bar={ baz } />

  // good
  <Foo bar={baz} />
  ```

## Props

- Always use camelCase for prop names, or PascalCase if the prop value is a React component.
- Prop 名には常に camelCase を使用し、Prop の値が React コンポーネントである場合は PascalCase を使用してください。

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
    Component={SomeComponent}
  />
  ```

- Omit the value of the prop when it is explicitly `true`. eslint: [`react/jsx-boolean-value`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)
- Prop の値が明示的に `true` の場合は、省略してください。eslint: [`react/jsx-boolean-value`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)

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

- Always include an `alt` prop on `<img>` tags. If the image is presentational, `alt` can be an empty string or the `<img>` must have `role="presentation"`. eslint: [`jsx-a11y/alt-text`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md)
- `<img>` タグには必ず `alt` prop を付けてください。画像が装飾目的の場合は、`alt` を空文字列にするか、`role="presentation"` を指定してください。eslint: [`jsx-a11y/alt-text`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md)

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

- Do not use words like "image", "photo", or "picture" in `<img>` `alt` props. eslint: [`jsx-a11y/img-redundant-alt`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md)
- `<img>` の `alt` プロパティに "image"、"photo"、"picture" などの単語を使用しないでください。eslint: [`jsx-a11y/img-redundant-alt`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md)

  > Why? Screenreaders already announce `img` elements as images, so there is no need to include this information in the alt text.

  > 理由: スクリーンリーダーは `<img>` 要素を画像として自動的に読み上げるため、alt テキストにその情報を含める必要がないためです。

  ```jsx
  // bad
  <img src="hello.jpg" alt="Picture of me waving hello" />

  // good
  <img src="hello.jpg" alt="Me waving hello" />
  ```

- Use only valid, non-abstract [ARIA roles](https://www.w3.org/TR/wai-aria/#usage_intro). eslint: [`jsx-a11y/aria-role`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md)
- 有効で非抽象の [ARIA ロール](https://www.w3.org/TR/wai-aria/#usage_intro) のみを使用してください。eslint: [`jsx-a11y/aria-role`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md)

  ```jsx
  // bad - not an ARIA role
  <div role="datepicker" />

  // bad - abstract ARIA role
  <div role="range" />

  // good
  <div role="button" />
  ```

- Do not use `accessKey` on elements. eslint: [`jsx-a11y/no-access-key`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md)
- 要素に `accessKey` を使用しないでください。eslint: [`jsx-a11y/no-access-key`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md)

> Why? Inconsistencies between keyboard shortcuts and keyboard commands used by people using screenreaders and keyboards complicate accessibility.

> 理由: キーボードショートカットと、スクリーンリーダー利用者が使用するキーボード操作との間で不整合が生じ、アクセシビリティが複雑になるためです。

```jsx
// bad
<div accessKey="h" />

// good
<div />
```

- Avoid using an array index as `key` prop, prefer a stable ID. eslint: [`react/no-array-index-key`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md)
- `key` prop には配列のインデックスを使用せず、安定した ID を使用してください。eslint: [`react/no-array-index-key`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md)

> Why? Not using a stable ID [is an anti-pattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) because it can negatively impact performance and cause issues with component state.

> 理由: 安定した ID を使用しないことは[アンチパターン](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)であり、パフォーマンスに悪影響を与えたり、コンポーネントの state に問題を引き起こす可能性があるためです。

We don’t recommend using indexes for keys if the order of items may change.

アイテムの順序が変わる可能性がある場合、キーとしてインデックスを使用することは推奨しません。

```jsx
// bad
{
  todos.map((todo, index) => <Todo {...todo} key={index} />);
}

// good
{
  todos.map((todo) => <Todo {...todo} key={todo.id} />);
}
```

- Always define explicit defaultProps for all non-required props.
- 必須ではないすべての props には、必ず明示的に `defaultProps` を定義してください。

> Why? propTypes are a form of documentation, and providing defaultProps means the reader of your code doesn’t have to assume as much. In addition, it can mean that your code can omit certain type checks.

> 理由: `propTypes` はドキュメントの一種であり、`defaultProps` を指定することでコードを読む人が余計な推測をせずに済みます。さらに、一部の型チェックを省略できる場合もあります。

```jsx
// bad
function SFC({ foo, bar, children }) {
  return (
    <div>
      {foo}
      {bar}
      {children}
    </div>
  );
}
SFC.propTypes = {
  foo: PropTypes.number.isRequired,
  bar: PropTypes.string,
  children: PropTypes.node,
};

// good
function SFC({ foo, bar, children }) {
  return (
    <div>
      {foo}
      {bar}
      {children}
    </div>
  );
}
SFC.propTypes = {
  foo: PropTypes.number.isRequired,
  bar: PropTypes.string,
  children: PropTypes.node,
};
SFC.defaultProps = {
  bar: "",
  children: null,
};
```

- Use spread props sparingly.
- スプレッド構文による props の渡し方は控えめに使用してください。

  > Why? Otherwise you’re more likely to pass unnecessary props down to components. And for React v15.6.1 and older, you could [pass invalid HTML attributes to the DOM](https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html).

  > 理由: 不必要な props をコンポーネントに渡してしまう可能性が高くなるためです。また、React v15.6.1 以前では、[無効な HTML 属性が DOM に渡ってしまう可能性](https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html)があります。

Exceptions:
例外:

- HOCs that proxy down props and hoist propTypes
- props をそのまま委譲し、propTypes を引き上げる（hoist）高階コンポーネント（HOC）

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

- Spreading objects with known, explicit props. This can be particularly useful when testing React components with Mocha’s beforeEach construct.
- 既知で明示的な props を持つオブジェクトをスプレッドすること。これは、Mocha の beforeEach 構文で React コンポーネントをテストする際に特に有用です。

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
可能であれば不要な props をフィルタリングしてください。また、バグ防止のために [prop-types-exact](https://www.npmjs.com/package/prop-types-exact) を使用してください。

```jsx
// bad
render() {
  const { irrelevantProp, ...relevantProps } = this.props;
  return <WrappedComponent {...this.props} />
}

// good
render() {
  const { irrelevantProp, ...relevantProps } = this.props;
  return <WrappedComponent {...relevantProps} />
}
```

## Refs

- Always use ref callbacks. eslint: [`react/no-string-refs`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)
- 常に ref コールバックを使用してください。eslint: [`react/no-string-refs`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)

  ```jsx
  // bad
  <Foo
    ref="myRef"
  />

  // good
  <Foo
    ref={(ref) => { this.myRef = ref; }}
  />
  ```

## Parentheses

- Wrap JSX tags in parentheses when they span more than one line. eslint: [`react/jsx-wrap-multilines`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md)
- JSX が複数行にわたる場合は、かならず括弧で囲んでください。eslint: [`react/jsx-wrap-multilines`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md)

  ```jsx
  // bad
  render() {
    return <MyComponent variant="long body" foo="bar">
             <MyChild />
           </MyComponent>;
  }

  // good
  render() {
    return (
      <MyComponent variant="long body" foo="bar">
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

## Tags

- Always self-close tags that have no children. eslint: [`react/self-closing-comp`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)
- 子要素を持たないタグは必ずセルフクロージングにしてください。eslint: [`react/self-closing-comp`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)

  ```jsx
  // bad
  <Foo variant="stuff"></Foo>

  // good
  <Foo variant="stuff" />
  ```

- If your component has multiline properties, close its tag on a new line. eslint: [`react/jsx-closing-bracket-location`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)
- コンポーネントが複数行のプロパティを持つ場合、タグの閉じ括弧は新しい行に配置してください。eslint: [`react/jsx-closing-bracket-location`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)

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

## Methods

- Use arrow functions to close over local variables. It is handy when you need to pass additional data to an event handler. Although, make sure they [do not massively hurt performance](https://www.bignerdranch.com/blog/choosing-the-best-approach-for-react-event-handlers/), in particular when passed to custom components that might be PureComponents, because they will trigger a possibly needless rerender every time.
- ローカル変数を閉じ込めるためにアロー関数を使用してください。追加のデータをイベントハンドラに渡す必要がある場合に便利です。ただし、特に PureComponent になり得るカスタムコンポーネントに渡す場合は、[パフォーマンスに大きな悪影響を与えない](https://www.bignerdranch.com/blog/choosing-the-best-approach-for-react-event-handlers/) よう注意してください。毎回新しい関数が作られるため、不要な再レンダーを引き起こす可能性があります。

  ```jsx
  function ItemList(props) {
    return (
      <ul>
        {props.items.map((item, index) => (
          <Item
            key={item.key}
            onClick={(event) => {
              doSomethingWith(event, item.name, index);
            }}
          />
        ))}
      </ul>
    );
  }
  ```

- Bind event handlers for the render method in the constructor. eslint: [`react/jsx-no-bind`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
- render メソッド内で使用するイベントハンドラは、コンストラクタ内で bind してください。eslint: [`react/jsx-no-bind`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

  > Why? A bind call in the render path creates a brand new function on every single render. Do not use arrow functions in class fields, because it makes them [challenging to test and debug, and can negatively impact performance](https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1), and because conceptually, class fields are for data, not logic.

  > 理由: render 内で bind を呼ぶと、レンダーのたびに新しい関数が生成されてしまいます。クラスフィールド内でアロー関数を使用しないでください。これは、[テストやデバッグを困難にし、パフォーマンスに悪影響を与える可能性](https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1) があるためです。また概念的にも、クラスフィールドはロジックではなくデータのためのものです。

  ```jsx
  // bad
  class extends React.Component {
    onClickDiv() {
      // do stuff
    }

    render() {
      return <div onClick={this.onClickDiv.bind(this)} />;
    }
  }

  // very bad
  class extends React.Component {
    onClickDiv = () => {
      // do stuff
    }

    render() {
      return <div onClick={this.onClickDiv} />
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
      return <div onClick={this.onClickDiv} />;
    }
  }
  ```

- Do not use underscore prefix for internal methods of a React component.
- React コンポーネントの内部メソッドにアンダースコアを接頭辞として付けないでください。

  > Why? Underscore prefixes are sometimes used as a convention in other languages to denote privacy. But, unlike those languages, there is no native support for privacy in JavaScript, everything is public. Regardless of your intentions, adding underscore prefixes to your properties does not actually make them private, and any property (underscore-prefixed or not) should be treated as being public. See issues [#1024](https://github.com/airbnb/javascript/issues/1024), and [#490](https://github.com/airbnb/javascript/issues/490) for a more in-depth discussion.

  > 理由: アンダースコアは他の言語では「プライベート」を示す慣習として使われることがありますが、JavaScript にはネイティブのプライバシー機能がなく、すべてが公開状態です。意図がどうであれ、プロパティ名にアンダースコアを付けても実際にはプライベートにはならず、アンダースコアの有無に関係なくすべてのプロパティは公開されているものとして扱うべきです。より詳細な議論については [`#1024`](https://github.com/airbnb/javascript/issues/1024) と [`#490`](https://github.com/airbnb/javascript/issues/490) を参照してください。

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

- Be sure to return a value in your `render` methods. eslint: [`react/require-render-return`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)
- `render` メソッドでは必ず値を返してください。eslint: [`react/require-render-return`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)

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

## Ordering

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
1. _event handlers starting with 'handle'_ like `handleSubmit()` or `handleChangeDescription()`
1. _event handlers starting with 'on'_ like `onClickSubmit()` or `onChangeDescription()`
1. _getter methods for `render`_ like `getSelectReason()` or `getFooterContent()`
1. _optional render methods_ like `renderNavigation()` or `renderProfilePicture()`
1. `render`

- `class extends React.Component` 内でのメソッドの並び順:

1. 任意の `static` メソッド
1. `constructor`
1. `getChildContext`
1. `componentWillMount`
1. `componentDidMount`
1. `componentWillReceiveProps`
1. `shouldComponentUpdate`
1. `componentWillUpdate`
1. `componentDidUpdate`
1. `componentWillUnmount`
1. `'handle'` で始まるイベントハンドラ（例: `handleSubmit()`、`handleChangeDescription()`）
1. `'on'` で始まるイベントハンドラ（例: `onClickSubmit()`、`onChangeDescription()`)
1. `render` 用のゲッターメソッド（例: `getSelectReason()`、`getFooterContent()`)
1. 任意のレンダーメソッド（例: `renderNavigation()`、`renderProfilePicture()`)
1. `render`

- How to define `propTypes`, `defaultProps`, `contextTypes`, etc...
- `propTypes`、`defaultProps`、`contextTypes` などの定義方法について

  ```jsx
  import React from "react";
  import PropTypes from "prop-types";

  const propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string,
  };

  const defaultProps = {
    text: "Hello World",
  };

  class Link extends React.Component {
    static methodsAreOk() {
      return true;
    }

    render() {
      return (
        <a href={this.props.url} data-id={this.props.id}>
          {this.props.text}
        </a>
      );
    }
  }

  Link.propTypes = propTypes;
  Link.defaultProps = defaultProps;

  export default Link;
  ```

- Ordering for `React.createClass`: eslint: [`react/sort-comp`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-comp.md)

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
1. _clickHandlers or eventHandlers_ like `onClickSubmit()` or `onChangeDescription()`
1. _getter methods for `render`_ like `getSelectReason()` or `getFooterContent()`
1. _optional render methods_ like `renderNavigation()` or `renderProfilePicture()`
1. `render`

- `React.createClass` を使用する場合のメソッドの並び順: eslint: [`react/sort-comp`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-comp.md)

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
1. _`onClickSubmit()` や `onChangeDescription()` のような clickHandlers / eventHandlers_
1. _`getSelectReason()` や `getFooterContent()` のような render 用ゲッターメソッド_
1. _`renderNavigation()` や `renderProfilePicture()` のような任意の render メソッド_
1. `render`

## `isMounted`

- Do not use `isMounted`. eslint: [`react/no-is-mounted`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md)
- `isMounted` を使用しないでください。eslint: [`react/no-is-mounted`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md)

> Why? [`isMounted` is an anti-pattern][anti-pattern], is not available when using ES6 classes, and is on its way to being officially deprecated.

> 理由: [`isMounted` はアンチパターン][anti-pattern] であり、ES6 クラスでは使用できず、公式に非推奨となる流れにあります。

[anti-pattern]: https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html

## Translation

This JSX/React style guide is also available in other languages:

この JSX/React スタイルガイドは他の言語でも利用できます:

- ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Chinese (Simplified)**: [jhcccc/javascript](https://github.com/jhcccc/javascript/tree/master/react)
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
- ![vn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Vietnam.png) **Vietnam**: [uetcodecamp/jsx-style-guide](https://github.com/UETCodeCamp/jsx-style-guide)

**[⬆ back to top](#table-of-contents)**
