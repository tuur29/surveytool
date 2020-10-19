
# Survey Tool configuration

This file will describe the possible content of the `window.surveyConfig` object, or the object you pass to the `window.setSurveyConfig()` function.

There are 5 parts to a configuration object:
| Field name | Data type | Description |
|---|---|---|
| `id` | string | Unique key to differentiate between multiple surveys / configs |
| `theme` | [theme](./src/utils/theme.ts) | **Optional**, object containing all or some colours, font family / sizes, breakpoints and spacing |
| `labels` | [labels](./src/utils/labels.ts) | **Optional**, a key value map containing all or some labels in tool |
| `questions` | [question array](./src/types/QuestionTypes.ts) | Required, complex structure containing all question parameters |
| `results` | [results object](./src/types/ConfigTypes.ts#L15) | **Optional**, object containing settings related to the way the results of the form are handled / displayed |

The example configuration used in the demo can be found here: [mock.ts](./src/utils/mock.ts)

---

- [Survey Tool configuration](#survey-tool-configuration)
    - [Config ID](#config-id)
    - [Theming](#theming)
        - [Colours](#colours)
            - [Control Colours](#control-colours)
            - [Message Colours](#message-colours)
        - [Sizes](#sizes)
            - [Control sizes](#control-sizes)
    - [Labels](#labels)
        - [Datetime formatting](#datetime-formatting)
    - [Questions](#questions)
    - [Result](#result)
        - [AnswerDataUrl & saving the user's results](#answerdataurl--saving-the-users-results)
        - [Result page content](#result-page-content)
            - [Block: Label](#block-label)
            - [Block: Button](#block-button)
            - [Block: Graph](#block-graph)
                - [Graph Data](#graph-data)
            - [Block: IFrame](#block-iframe)

---

## Config ID

Every configuration should have a unique id. The ID is used for the following:

- A user's answers are saved locally when they are filling in the form. Their progress is saved, so a reload doesn't clear their input. This data is saved based on the ID.
- When configured, saving the users data to a server will also include the config ID so the backend knows which form is being saved.

> Because of this, reusing an ID between different configurations might result in client side crashes!  
> (only happens when the questions are changed)

## Theming

You can change any or all one of the possible colors used in the tool by supplying a **(partial)** theme in the configuration. Additionally you can choose to start from a predefined dark theme as a base by supplying `darkMode: true`:

The theme is based on [Styled System](https://styled-system.com/). It consists of the following properties:

| Field name | Data type | Description |
|---|---|---|
| `colors` | object | A list of every colour used in the app |
| `fonts` | object | Allows you to set different title & text fonts in the tool |
| `sizes` | object | Contains pixel values for borders, fontSizes... |
| `space` | int[] | A list of pixel values to ensure consistent spacing |
| `breakpoints` | object | Key value map containing pixel values for `xs, sm, md, lg, xl` breakpoints |
| (`zIndex`) | object | Key value map containing all used `z-index` values (probably should not be changed) |
| (`elevation`) | object | Key value map containing the level of shadow beneath some components (probably should not be changed) |

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

You can find all possible theme values in the [theme file](./src/utils/theme.ts).

### Colours

The colours object contains multiple types of colours, most elements have a background and foreground (`on`) colour.
The main 4 colour sets are:

| Background Colour | Foreground Colour | Description |
|---|---|---|
| `primary` | `onPrimary` | Main accent colour |
| `back` | `onBack` | Base background / foreground colour |
| `surface` | `onSurface` | Colours for raised elements (cards) |
| `error` | `onError` | Used for displaying errors |

In addition there are also colours that are not paired up:

- `spinner`: accent colour of the loading indicator
- `shadow`: colour of text and box (surface elevation) shadows
- `icon` / `iconHover`: info icons
- `separator`: colour of lines and dividers between elements

#### Control Colours

The biggest part of the colours object consists of theming the `controls` (as in form controls / inputs).  
These are: buttons, text fields, dropdowns, sliders...

| Type | Colours | Description |
|---|---|---|
| Background & Border | `controlBack`, `controlHighlight`, `controlBorder` | Default colours without user input |
| Text | `controlPlaceholder` | (most text colours are defined by the default foreground colour) |
| Hover states | `controlBackHover`, `controlBorderHover` |  |
| Active states | `controlHighlightActive`, `controlBorderActive` | Colour of selected items, checkmark and button hover |
| Buttons | `controlButton`, `controlOnButton`, `controlButtonDisabled`, `controlOnButtonDisabled` | |
| Slider | `controlTick`, `controlSliderBack` | |

#### Message Colours

| Type| Background | Foreground | Border |
|---|---|---|---|
| Error | `messageError` | `onMessageError` | `messageErrorBorder` |
| Info | `messageInfo` | `onMessageInfo` | `messageInfoBorder` |
| Neutral | `messageNeutral` | `onMessageNeutral` | `messageNeutralBorder` |

### Sizes

This object contains both font sizes and other arbitrary values that do not follow the `theme.space` grid.

- `radius`: Rouding of cards and most controls (buttons / input fields)
- `title`: Font-size of titles (`questionsTitle` & `resultTitle` labels)
- `subtitle`: Font-size of subtitles (questions)
- `footer`: Font-size of footer

#### Control sizes

- `controlBorder`: Thickness of border around most controls
- `controlCheckOffset`: Space between checkmark and the bounding box
- `controlRadioOffset`: Space between radio bullet and the bounding box
- `buttonTextSize`: Font-size of buttons
- `controlError`: Font-size of message shown below invalid input input

Slider:

- `controlSliderRailHeight`
- `controlSliderTrackHeight`
- `controlSliderHandleSize`

## Labels

You can supply a **(partial)** list of labels to translate the app. Labels that aren't defined will fallback to their default English value.  
**A full list of labels can be found here: [labels](./src/utils/labels.ts)**.

Some labels can contain contextual information. This information can be swapped in for a `{placeholder}` tag in the label.  
For example the label `questionsFooter` can contain the last edited date and time.

```js
window.setSurveyConfig({ ...window.surveyConfig,
    // will be be displayed as: "Last update on 01 January 1970"
    labels: { questionsFooter: "Last update on {date}", } }
});
```

### Datetime formatting

The format of dates and times is locale based. By default the end users browser settings will decided the format.  
If you want you can override this behaviour by changing the label `dateLocaleId`. See [this list](https://github.com/umpirsky/locale-list/blob/master/data/en_US/locales.csv) for all possibilities (but replace `_` with `-`).

## Questions

<!-- TODO: document questions configuration -->
> This will be documented at a later stage, when the configuration values are more stable

## Result

| Field name | Data type | Description |
|---|---|---|
| `postDataUrl` | [AnswerDataUrl](#AnswerDataUrl) | When filled in the tool will save the user's result to this URL. |
| `redirectUrl` | [AnswerDataUrl](#AnswerDataUrl) | Instead of displaying the results page, the tool will redirect the user to this URL. |
| `enableControls` | boolean | Enables the user's ability to edit their answers after submitting them. Defaults to `false`. |
| `scoreDomain` | [min, max] | An array containing the smallest and largest possible score. This is sometimes used when customizing the results page content. |

```js
window.setSurveyConfig({ ...window.surveyConfig,
    result: {
        postDataUrl: "POST;https://example.org/api/answer",
        redirectUrl: "https://example.org/results?score={score}",
        enableControls: true,
        scoreDomain: [0, 130]
    }
});
```

### AnswerDataUrl & saving the user's results

The `AnswerDataUrl` value type is a string with a specific format. It can be a simple URL like `https://example.org` if desired, but can also contain:

- The request method: `POST;https://example.org` (will default to `GET`)
- A placeholder for the user's score `https://example.org?data={score}`

The tool will send the user's input to the URL specified in the following JSON structure:

```ts
{
    configId: string,
    score: number, // total calculated score
    answers: [
        {
            questionId: string,
            type: "single" | "multiple" | "text" | "range",
            value: string | number | boolean, // type is based on the question type
            values: [] // only set when the question is a MultipleChoice question
        },
        ...
    ]
}
```

Example: [mockDataPost.json](./public/mockDataPost.json)

### Result page content

In addition to above settings you can also customize the content of the results page by the defining `config.result.content` array.
This array can contain 4 different types of blocks.

#### Block: Label

| Field name | Data type | Description |
|---|---|---|
| `type` | "label" | Required for displaying a label block |
| `label` | string | Text to be displayed. Can contain a `{score}` placeholder, with optional denominator `{score20}` |
| `style` | "title", "description", "scoreCounter" | "title" and "description" only change font size, while "scoreCounter" will display the score in a dial. |
| `animate` | boolean | When enabled the score placeholders will count up in an animation. Optional, defaults to `false`. |

Examples:

```js
{
    type: "label",
    label: "You scored {score} points. This equates to a score of {score100}% or {score20}/20.",
    style: "description"
}
```

```js
{
    type: "label",
    label: "{score100}%",
    style: "scoreCounter",
    animate: true
}
```

#### Block: Button

| Field name | Data type | Description |
|---|---|---|
| `type` | "button" | Required for displaying a button block |
| `label` | string | Text to be displayed inside the button |
| `function` | "restart", "postData", "link" | A "restart" button will reset the user's input. "postData" will save the user's input to your server like the `postDataUrl` setting. "link" will redirect the user. |
| `url` | [AnswerDataUrl](#AnswerDataUrl) | Only necessary when function is "postData" or "link" |
| `openInTab` | boolean | Optional, only used when the function is "link" |

Examples:

```js
{
    type: "button",
    label: "Restart",
    function: "restart"
}
```

```js
{
    type: "button",
    label: "Open results in new tab",
    function: "link",
    url: "https://example.org/?score={score}",
    openInTab: true,
}
```

#### Block: Graph

| Field name | Data type | Description |
|---|---|---|
| `type` | "graph" | Required for displaying a graph block |
| `format` | "bar", "line" | Switches between a linegraph or barchart |
| `dataUrl` | [AnswerDataUrl](#AnswerDataUrl) | Required. The tool will fetch this URL for [data](#Graph-Data) to be displayed. |
| `titleLabel` | string | Optional. Will display a title above the graph. |
| `hideLegend` | boolean | Optional, defaults to false. If enabled, the legend will not be displayed. |

Examples:

```js
{
    type: "graph",
    format: "bar",
    dataUrl: "https://tuur29.github.io/surveytool/mockLineGraph.json?score={score}",
    titleLabel: "Bar graph",
    hideLegend: true
},
```

##### Graph Data

Your server should return the graph data in the following JSON structure (consistent between line and bar graphs):

```ts
{
    xLabel: string,
    yLabel: string,
    series: [
        {
            id: string, // used as key in the values array
            name: string, // will be displayed in the graph legend
            color: string // css colour string (#fff, rgb(255,255,255)...)
        },
        {
            // It is possible to define a special "highlight" series to highlight a x-value (line) or category (bar)
            id: "highlight", // used as key in the values array
            name: string,
            color: string // default colour for highlighted values
        },
        ...
    ],
    values: [
        {
            x: number | string, // Required, linegraph -> number, bargraph -> string
            [series.id]: number, // each object of this array should contain at least one series.id key with data
            highlight: boolean | string, // optional, pass true to use the highlight series default colour, or pass a css colour string here to override it.
        },
        ...
    ]
}
```

For examples see:

- [Line graph](./public/mockLineGraph.json)
- [Line graph with only one line](./public/mockSingleBarGraph.json)
- [Bar graph](./public/mockBarGraph.json)

#### Block: IFrame

You can use an IFrame if all else fails and you want to inject your own content (might be worth using `redirectUrl` instead).

| Field name | Data type | Description |
|---|---|---|
| `type` | "iframe" | Required for displaying a IFrame block |
| `url` | [AnswerDataUrl](#AnswerDataUrl) | Required. The tool will fetch this URL for [data](#Graph-Data) to be displayed. Only `GET` protocol is currently supported. |
| `height` | number | Set a custom height for the IFrame. Defaults to 400px |
| `disableScroll` | boolean | Will disable scrolling inside the IFrame when enabled. Optional, defaults to false. |

Example:

```js
{
    type: "iframe",
    url: "https://example.org/?score={score}",
    height: 300,
    disableScroll: true
}
```
