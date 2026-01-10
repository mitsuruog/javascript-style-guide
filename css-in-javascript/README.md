# Airbnb CSS-in-JavaScript Style Guide

_A mostly reasonable approach to CSS-in-JavaScript_
_CSS-in-JavaScript に対する、程よく健全なアプローチ_

## Table of Contents

1. [Naming](#naming)
1. [Ordering](#ordering)
1. [Nesting](#nesting)
1. [Inline](#inline)
1. [Themes](#themes)

## Naming

- Use camelCase for object keys (i.e. "selectors").
- オブジェクトのキー（例: 「セレクタ」）には camelCase を使用してください。

  > Why? We access these keys as properties on the `styles` object in the component, so it is most convenient to use camelCase.

  > 理由: コンポーネント内ではこれらのキーを `styles` オブジェクトのプロパティとして参照するため、camelCase が最も扱いやすいからです。

  ```js
  // bad
  {
    'bermuda-triangle': {
      display: 'none',
    },
  }

  // good
  {
    bermudaTriangle: {
      display: 'none',
    },
  }
  ```

- Use an underscore for modifiers to other styles.
- 他のスタイルを修飾する場合は、アンダースコアを使用してください。

  > Why? Similar to [BEM](https://getbem.com/introduction/), this naming convention makes it clear that the styles are intended to modify the element preceded by the underscore. Underscores do not need to be quoted, so they are preferred over other characters, such as dashes.

  > 理由: [BEM](https://getbem.com/introduction/) と同様に、この命名規則により、アンダースコアの前にある要素を修飾するためのスタイルであることが明確になります。アンダースコアはクォートする必要がないため、ダッシュなどの他の文字よりも適しています。

  ```js
  // bad
  {
    bruceBanner: {
      color: 'pink',
      transition: 'color 10s',
    },

    bruceBannerTheHulk: {
      color: 'green',
    },
  }

  // good
  {
    bruceBanner: {
      color: 'pink',
      transition: 'color 10s',
    },

    bruceBanner_theHulk: {
      color: 'green',
    },
  }
  ```

- Use `selectorName_fallback` for sets of fallback styles.
- フォールバック用のスタイルセットには `selectorName_fallback` を使用してください。

  > Why? Similar to modifiers, keeping the naming consistent helps reveal the relationship of these styles to the styles that override them in more adequate browsers.

  > 理由: 修飾子の場合と同様に、命名を一貫させることで、より適切なブラウザで上書きされるスタイルとの関係性が分かりやすくなるためです。

  ```js
  // bad
  {
    muscles: {
      display: 'flex',
    },

    muscles_sadBears: {
      width: '100%',
    },
  }

  // good
  {
    muscles: {
      display: 'flex',
    },

    muscles_fallback: {
      width: '100%',
    },
  }
  ```

- Use a separate selector for sets of fallback styles.
- フォールバック用のスタイルセットには、別のセレクタを使用してください。

  > Why? Keeping fallback styles contained in a separate object clarifies their purpose, which improves readability.

  > 理由: フォールバックスタイルを別のオブジェクトにまとめておくことで、その目的が明確になり、可読性が向上するためです。

  ```js
  // bad
  {
    muscles: {
      display: 'flex',
    },

    left: {
      flexGrow: 1,
      display: 'inline-block',
    },

    right: {
      display: 'inline-block',
    },
  }

  // good
  {
    muscles: {
      display: 'flex',
    },

    left: {
      flexGrow: 1,
    },

    left_fallback: {
      display: 'inline-block',
    },

    right_fallback: {
      display: 'inline-block',
    },
  }
  ```

- Use device-agnostic names (e.g. "small", "medium", and "large") to name media query breakpoints.
- メディアクエリのブレークポイントには、「small」「medium」「large」などのデバイスに依存しない名前を使用してください。

  > Why? Commonly used names like "phone", "tablet", and "desktop" do not match the characteristics of the devices in the real world. Using these names sets the wrong expectations.

  > 理由: 「phone」「tablet」「desktop」など一般的に使われる名前は、実際のデバイスの特性と一致しません。これらの名前を使うと誤った期待を与えてしまいます。

  ```js
  // bad
  const breakpoints = {
    mobile: "@media (max-width: 639px)",
    tablet: "@media (max-width: 1047px)",
    desktop: "@media (min-width: 1048px)",
  };

  // good
  const breakpoints = {
    small: "@media (max-width: 639px)",
    medium: "@media (max-width: 1047px)",
    large: "@media (min-width: 1048px)",
  };
  ```

## Ordering

- Define styles after the component.
- スタイルはコンポーネントの後に定義してください。

  > Why? We use a higher-order component to theme our styles, which is naturally used after the component definition. Passing the styles object directly to this function reduces indirection.

  > 理由: スタイルにテーマを適用するために高階コンポーネントを使用しており、これはコンポーネント定義の後で使われるのが自然だからです。スタイルオブジェクトをこの関数に直接渡すことで、間接的な処理を減らすことができます。

  ```jsx
  // bad
  const styles = {
    container: {
      display: 'inline-block',
    },
  };

  function MyComponent({ styles }) {
    return (
      <div {...css(styles.container)}>
        Never doubt that a small group of thoughtful, committed citizens can
        change the world. Indeed, it’s the only thing that ever has.
      </div>
    );
  }

  export default withStyles(() => styles)(MyComponent);

  // good
  function MyComponent({ styles }) {
    return (
      <div {...css(styles.container)}>
        Never doubt that a small group of thoughtful, committed citizens can
        change the world. Indeed, it’s the only thing that ever has.
      </div>
    );
  }

  export default withStyles(() => ({
    container: {
      display: 'inline-block',
    },
  }))(MyComponent);
  ```

## Nesting

- Leave a blank line between adjacent blocks at the same indentation level.
- 同じインデントレベルの隣接するブロックの間には空行を入れてください。

  > Why? The whitespace improves readability and reduces the likelihood of merge conflicts.

  > 理由: 空白があることで可読性が向上し、マージコンフリクトの発生も減らせるためです。

  ```js
  // bad
  {
    bigBang: {
      display: 'inline-block',
      '::before': {
        content: "''",
      },
    },
    universe: {
      border: 'none',
    },
  }

  // good
  {
    bigBang: {
      display: 'inline-block',

      '::before': {
        content: "''",
      },
    },

    universe: {
      border: 'none',
    },
  }
  ```

## Inline

- Use inline styles for styles that have a high cardinality (e.g. uses the value of a prop) and not for styles that have a low cardinality.
- 高いカーディナリティ（例: prop の値を使用するなど）を持つスタイルにはインラインスタイルを使用し、低いカーディナリティのスタイルには使用しないでください。

  > Why? Generating themed stylesheets can be expensive, so they are best for discrete sets of styles.

  > 理由: テーマ付きスタイルシートを生成する処理は高コストになり得るため、限定的なスタイルセットに使用するのが最適です。

  ```jsx
  // bad
  export default function MyComponent({ spacing }) {
    return (
      <div style={{ display: 'table', margin: spacing }} />
    );
  }

  // good
  function MyComponent({ styles, spacing }) {
    return (
      <div {...css(styles.periodic, { margin: spacing })} />
    );
  }
  export default withStyles(() => ({
    periodic: {
      display: 'table',
    },
  }))(MyComponent);
  ```

## Themes

- Use an abstraction layer such as [react-with-styles](https://github.com/airbnb/react-with-styles) that enables theming. _react-with-styles gives us things like `withStyles()`, `ThemedStyleSheet`, and `css()` which are used in some of the examples in this document._
- テーマ機能を可能にする [react-with-styles](https://github.com/airbnb/react-with-styles) のような抽象化レイヤーを使用してください。_react-with-styles は、`withStyles()`、`ThemedStyleSheet`、`css()` など、このドキュメントの例でも使用されている機能を提供します。_

> Why? It is useful to have a set of shared variables for styling your components. Using an abstraction layer makes this more convenient. Additionally, this can help prevent your components from being tightly coupled to any particular underlying implementation, which gives you more freedom.

> 理由: コンポーネントのスタイリングに共有変数を利用できるのは便利です。抽象化レイヤーを使うことでこれがより簡単になります。さらに、特定の実装にコンポーネントが強く結びつくのを避けることができ、柔軟性が高まります。

- Define colors only in themes.
- 色の定義はテーマ内だけで行ってください。

  ```js
  // bad
  export default withStyles(() => ({
    chuckNorris: {
      color: '#bada55',
    },
  }))(MyComponent);

  // good
  export default withStyles(({ color }) => ({
    chuckNorris: {
      color: color.badass,
    },
  }))(MyComponent);
  ```

- Define fonts only in themes.
- フォントの定義はテーマ内だけで行ってください。

  ```js
  // bad
  export default withStyles(() => ({
    towerOfPisa: {
      fontStyle: 'italic',
    },
  }))(MyComponent);

  // good
  export default withStyles(({ font }) => ({
    towerOfPisa: {
      fontStyle: font.italic,
    },
  }))(MyComponent);
  ```

- Define fonts as sets of related styles.
- フォントは関連するスタイルの集合として定義してください。

  ```js
  // bad
  export default withStyles(() => ({
    towerOfPisa: {
      fontFamily: 'Italiana, "Times New Roman", serif',
      fontSize: '2em',
      fontStyle: 'italic',
      lineHeight: 1.5,
    },
  }))(MyComponent);

  // good
  export default withStyles(({ font }) => ({
    towerOfPisa: {
      ...font.italian,
    },
  }))(MyComponent);
  ```

- Define base grid units in theme (either as a value or a function that takes a multiplier).
- 基本となるグリッド単位はテーマ内で定義してください（値として、または乗数を受け取る関数として）。

  ```js
  // bad
  export default withStyles(() => ({
    rip: {
      bottom: '-6912px', // 6 feet
    },
  }))(MyComponent);

  // good
  export default withStyles(({ units }) => ({
    rip: {
      bottom: units(864), // 6 feet, assuming our unit is 8px
    },
  }))(MyComponent);

  // good
  export default withStyles(({ unit }) => ({
    rip: {
      bottom: 864 * unit, // 6 feet, assuming our unit is 8px
    },
  }))(MyComponent);
  ```

- Define media queries only in themes.
- メディアクエリはテーマ内でのみ定義してください。

  ```js
  // bad
  export default withStyles(() => ({
    container: {
      width: '100%',

      '@media (max-width: 1047px)': {
        width: '50%',
      },
    },
  }))(MyComponent);

  // good
  export default withStyles(({ breakpoint }) => ({
    container: {
      width: '100%',

      [breakpoint.medium]: {
        width: '50%',
      },
    },
  }))(MyComponent);
  ```

- Define tricky fallback properties in themes.
- ややこしいフォールバックプロパティはテーマ内で定義してください。

  > Why? Many CSS-in-JavaScript implementations merge style objects together which makes specifying fallbacks for the same property (e.g. `display`) a little tricky. To keep the approach unified, put these fallbacks in the theme.

  > 理由: 多くの CSS-in-JavaScript 実装ではスタイルオブジェクトをマージするため、同じプロパティ（例: `display`）に対してフォールバックを指定するのが少し難しくなります。アプローチを統一するために、これらのフォールバックはテーマ内に入れてください。

  ```js
  // bad
  export default withStyles(() => ({
    .muscles {
      display: 'flex',
    },

    .muscles_fallback {
      'display ': 'table',
    },
  }))(MyComponent);

  // good
  export default withStyles(({ fallbacks }) => ({
    .muscles {
      display: 'flex',
    },

    .muscles_fallback {
      [fallbacks.display]: 'table',
    },
  }))(MyComponent);

  // good
  export default withStyles(({ fallback }) => ({
    .muscles {
      display: 'flex',
    },

    .muscles_fallback {
      [fallback('display')]: 'table',
    },
  }))(MyComponent);
  ```

- Create as few custom themes as possible. Many applications may only have one theme.
- カスタムテーマはできるだけ少なく作成してください。多くのアプリケーションではテーマは 1 つだけで十分です。

- Namespace custom theme settings under a nested object with a unique and descriptive key.
- カスタムテーマ設定は、ユニークで分かりやすいキーを持つ入れ子のオブジェクト配下に配置してください。

  ```js
  // bad
  ThemedStyleSheet.registerTheme("mySection", {
    mySectionPrimaryColor: "green",
  });

  // good
  ThemedStyleSheet.registerTheme("mySection", {
    mySection: {
      primaryColor: "green",
    },
  });
  ```

---

CSS puns adapted from [Saijo George](https://saijogeorge.com/css-puns/).
