
## Integration in your own site

Load the [production script file](https://github.com/tuur29/surveytool/releases) inside your own website and create an empty div with `surveyTool` as ID.
Next, either define a `surveyConfig` object on the `window` object, or call `window.setSurveyConfig()` with the same config object at a later date to initialize the tool:

```html
<div id="surveyTool"></div>
<script>
    // initialize directly:
    window.setSurveyConfig(config);
    // or async:
    document.querySelector("#button").addEventListener("click", () => {
        window.setSurveyConfig(config);
    });
</script>
<script src="/public/build.js"></script>
```

### Configuration

There are 4 parts to a configuration object:
| Field name | Data type | Description |
|---|---|---|
| `id` | string | Unique key to differentiate between multiple surveys / configs |
| `questions` | [question array](https://github.com/tuur29/surveytool/blob/master/src/types/QuestionTypes.ts) | Required, complex structure containing all question parameters |
| `labels` | [labels](https://github.com/tuur29/surveytool/blob/master/src/utils/labels.ts) | **Optional**, a key value map containing all or some labels in tool |
| `theme` | [theme](https://github.com/tuur29/surveytool/blob/master/src/utils/theme.ts) | **Optional**, object containing all or some colours, font family / sizes, breakpoints and spacing |

The example configuration used in the demo can be found here: [mock.ts](https://github.com/tuur29/surveytool/blob/master/src/utils/mock.ts)

#### Theming

You can change any or all one of the possible colors used in the tool by supplying a (partial) theme in the configuration. Additionally you can choose to start from a predefined dark theme as a base by supplying `darkMode: true`:

<!-- TODO: add list of all possible colours and their uses -->
You can find all possible theme values in the [theme file](https://github.com/tuur29/surveytool/blob/master/src/utils/theme.ts).

```js
window.setSurveyConfig({ ...window.surveyConfig,
    theme: {
        darkMode: true,
        values: {
            colors: { controlHighlight: "#ff00ff" },
            sizes: { radius: "0px" },
            fonts: { title: "Serif" },
            breakpoints: { md: "600px" }
        }
    }
});
```

#### Labels

You can supply a (partial) list of labels to translate the app. Labels that aren't defined will fallback to their default English value. **A full list of labels can be found here: [labels](https://github.com/tuur29/surveytool/blob/master/src/utils/labels.ts)**.

Some labels can contain contextual information. This information can be swapped in for a `{placeholder}` tag in the label. For example the label `questionsFooter` can contain the last edited date and time.

```js
window.setSurveyConfig({ ...window.surveyConfig,
    // will be be displayed as: "Last update on 01 January 1970"
    labels: { questionsFooter: "Last update on {date}", } }
});
```


The format of dates and times is locale based. By default the end users browser settings will decided the format. If you want you can override this behaviour by changing the label `dateLocaleId`. See [this list](https://github.com/umpirsky/locale-list/blob/master/data/en_US/locales.csv) for all possibilities (but replace `_` with `-`).

#### Questions

<!-- TODO: document questions configuration -->
> This will be documented at a later stage, when the configuration values are more stable

## Development

1. Install packages (`yarn install` or `npm install`)
2. Start project (`yarn start` / `npm run start`)
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Production build

- `yarn build` builds the app for production to the `build` folder.
- Bundle the output with `yarn bundle`, this will give you a single `dist/surveytool.min.js` you can upload and use.

Demo:

- To update the demo page run `./deploy_demo.sh`.

### Learn More

This tool was created with:

- [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).
- [Redux](https://redux.js.org/introduction/getting-started)
- [Styled components](https://styled-components.com/docs)
- [Typescript](https://www.typescriptlang.org/docs/home.html)
