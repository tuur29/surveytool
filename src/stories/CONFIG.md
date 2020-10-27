
# Configuration

This file will describe the possible content of the `window.surveyConfig` object, or the object you pass to the `window.setSurveyConfig()` function.

There are 5 parts to a configuration object:

| Field name | Data type | Description |
|---|---|---|
| `id` | string | Unique key to differentiate between multiple surveys / configs |
| `theme` | [theme](./src/utils/theme.ts) | **Optional**, object containing all or some colors, font family / sizes, breakpoints and spacing |
| `labels` | [labels](./src/utils/labels.ts) | **Optional**, a key value map containing all or some labels in tool |
| `questions` | [question array](./src/types/QuestionTypes.ts) | Required, complex structure containing all question parameters |
| `results` | [results object](./src/types/ConfigTypes.ts#L15) | **Optional**, object containing settings related to the way the results of the form are handled / displayed |

The example configuration used in the demo can be found here: [mock.ts](./src/utils/mock.ts)

---

- [Configuration](#configuration)
    - [Config id](#config-id)
    - [Theming](#theming)
        - [Colors](#colors)
            - [Control Colors](#control-colors)
            - [Message Colors](#message-colors)
        - [Sizes](#sizes)
            - [Control sizes](#control-sizes)
    - [Labels](#labels)
        - [Datetime formatting](#datetime-formatting)
    - [Questions](#questions)
        - [Single Choice Question](#single-choice-question)
        - [Multiple Choice Question](#multiple-choice-question)
        - [Text Question](#text-question)
        - [Range Question](#range-question)
    - [Result](#result)
        - [AnswerDataUrl & saving the user's results](#answerdataurl--saving-the-users-results)
        - [Result page content](#result-page-content)
            - [Label block](#label-block)
            - [Button block](#button-block)
            - [Graph block](#graph-block)
                - [Graph Data](#graph-data)
            - [IFrame block](#iframe-block)

---

## Config id

Every configuration should have a unique id. The id is used for the following:

- A user's answers are saved locally when they are filling in the form. Their progress is saved, so a reload doesn't clear their input. This data is saved based on the id.
- When configured, saving the users data to a server will also include the config id so the backend knows which form is being saved.

> Because of this, reusing an id between different configurations might result in client side crashes!  
> However this only happens when the question array is changed.

## Theming

You can change any or all of the possible colors used in the tool by supplying a (partial) theme in the configuration. Additionally you can choose to start from a predefined dark theme as a base by supplying `darkMode: true`:

The theme is based on [Styled System](https://styled-system.com/). It consists of the following properties:

| Field name | Data type | Description |
|---|---|---|
| `colors` | object | A list of every color used in the app |
| `fonts` | object | Allows you to set different title & text fonts in the tool |
| `sizes` | object | Contains pixel values for borders, fontSizes... |
| `space` | int[] | A list of pixel values to ensure consistent spacing |
| `breakpoints` | object | Key value map containing pixel values for `xs, sm, md, lg, xl` breakpoints |
| (`zIndex`) | object | Key value map containing all used `z-index` values (probably should not be changed) |
| (`elevation`) | object | Key value map containing the level of shadow beneath some components (probably should not be changed) |

Example:

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

### Colors

The colors object contains multiple types of colors, most elements have a background and foreground (`on`) color.
The main 4 color sets are:

| Background Color | Foreground Color | Description |
|---|---|---|
| `primary` | `onPrimary` | Main accent color |
| `back` | `onBack` | Base background / foreground color |
| `surface` | `onSurface` | Colors for raised elements (cards) |
| `error` | `onError` | Used for displaying errors |

In addition there are also colors that are not paired up:

- `spinner`: accent color of the loading indicator
- `shadow`: color of text and box (surface elevation) shadows
- `icon` / `iconHover`: info icons
- `separator`: color of lines and dividers between elements

#### Control Colors

The biggest part of the colors object consists of theming the `controls` (as in form controls / inputs).  
These are: buttons, text fields, dropdowns, sliders...

| Type | Colors | Note |
|---|---|---|
| Background & Border | `controlBack`, `controlHighlight`, `controlBorder` | Default colors without user input |
| Text | `controlPlaceholder` | Most text colors are defined by the default foreground color. |
| Hover states | `controlBackHover`, `controlBorderHover` |  |
| Active states | `controlHighlightActive`, `controlBorderActive` | Color of selected items, checkmark and button hover |
| Buttons | `controlButton`, `controlOnButton`, `controlButtonDisabled`, `controlOnButtonDisabled` | |
| Slider | `controlTick`, `controlSliderBack` | |

#### Message Colors

| Type| Background | Foreground | Border |
|---|---|---|---|
| Error | `messageError` | `onMessageError` | `messageErrorBorder` |
| Info | `messageInfo` | `onMessageInfo` | `messageInfoBorder` |
| Neutral | `messageNeutral` | `onMessageNeutral` | `messageNeutralBorder` |

### Sizes

This object contains both font sizes and other arbitrary values that do not follow the `theme.space` grid.

- `radius`: Rounding of cards and most controls (buttons / input fields)
- `title`: Font-size of titles (`questionsTitle` & `resultTitle` labels)
- `subtitle`: Font-size of subtitles (questions)
- `footer`: Font-size of footer

#### Control sizes

- `controlBorder`: Thickness of border around most controls
- `controlCheckOffset`: Space between checkmark and the bounding box
- `controlRadioOffset`: Space between radio bullet and the bounding box
- `buttonTextSize`: Font-size of buttons
- `controlError`: Font-size of message shown below invalid input

Slider:

- `controlSliderRailHeight`
- `controlSliderTrackHeight`
- `controlSliderHandleSize`

## Labels

You can supply a (partial) list of labels to translate the app. Labels that aren't defined will fallback to their default English value.  
**A full list of labels can be found here: [labels](./src/utils/labels.ts)**.

Some labels can contain contextual information. This information can be swapped in for a `{placeholder}` tag in the label.  
For example the label `footerText` can contain the last edited date and time.

```js
window.setSurveyConfig({ ...window.surveyConfig,
    // will be be displayed as: "Last update on 01 January 1970"
    labels: { footerText: "Last update on {date}", } }
});
```

### Datetime formatting

The format of dates and times is locale based. By default the end users browser settings will decided the format.  
It is possible to override this behavior by changing the label `dateLocaleId`. See [this list](https://github.com/umpirsky/locale-list/blob/master/data/en_US/locales.csv) for all possibilities (but replace `_` with `-`).

## Questions

Each object in the `config.questions` array is represented with a card. There are 4 different types of question and each type corresponds to a different input / output type. All questions have these properties in common:

| Field name | Data type | Description |
|---|---|---|
| `id` | string | Required, should be unique in a configuration. This links the question to it's answer. |
| `title` | string | The question being asked to the user. This string can contain multiple `{hint}` placeholders. |
| `hints` | string array | Each usage of the `{hint}` placeholder needs to have a string in this array. Optional if no hints are used. |
| `required` | boolean | Required questions need to be filled in by the user before they can submit their answers. Defaults to `false`. |
| `calcFunction` | `question, answer => number` | Optional function that can be used to override the default score calculations. |

### Single Choice Question

- Represented by a **checkbox**
- Answer value: `boolean`
- Default score value: 0 for unchecked, 1 for checked

In addition to the common settings parameters, the single choice question can be configured with:

| Field name | Data type | Description |
|---|---|---|
| `type` | "single" | Required for displaying a single choice question |
| `checkedByDefault` | boolean | Optional, defaults to `false`. Causes the checkbox to already be checked when the user first loads the form. |

Example:

```js
{
    id: "abc123",
    type: "single",
    title: "Are you interested{hint} in eating an ice cream?{hint}",
    hints: ["It's a word", "Say yes!"],
    checkedByDefault: true,
    required: true
}
```

### Multiple Choice Question

- Represented by a **list of checkboxes / radio buttons / dropdown**
- Answer value: a list of ids (only a single item in the case of `inputType=radio` or `inputType=select`)
- Default score value:
  - In case of `inputType=check`: value is the amount of items checked
  - Default case: the index of the option that is selected

In addition to the common settings parameters, the multiple choice question can be configured with:

| Field name | Data type | Description |
|---|---|---|
| `type` | "multiple" | Required for displaying a multiple choice question |
| `inputType` | "radio", "check", "select" | Will display the options with radio buttons (single answer), checkboxes or in a dropdown (multiple answers) |
| `options` | object array | A required list of possible values. These are objects containing an id, title and optional [hints array](#questions)) |
| `defaultIds` | string array | Optional. When filled with id's matching an option, those options will already be selected when the user first loads the form. |

Examples:

```js
{
    id: "abc123",
    type: "multiple",
    title: "What flavour do you want?",
    inputType: "radio",
    options: [
        { id: "0", title: "Vanilla" },
        { id: "1", title: "Banana" },
        {
            id: "2",
            title: "Ben & Jerry's{hint} Imagine Whirled Peace{hint}",
            hints: ["(TM)", "Yes this is a real flavour."],
        },
        { id: "3", title: "Chocolat" }
    ],
    calcFunction: (question, answer) => {
        return answer.values.includes("2") ? 10 : 0;
    },
}
```

```js
{
    id: "abc123",
    type: "multiple",
    title: "Which toppings do you want?",
    inputType: "check",
    options: [
        { id: "0", title: "Sprinkels" },
        { id: "1", title: "Crumbs" },
        { id: "2", title: "Chocolat sauce" },
    ],
    defaultIds: ["1", "2"],
}
```

### Text Question

- Represented by a text input field
- Answer value: the text provided by the user
- Default score value:
  - In case of `inputType=number`: the number value
  - Default case: 0

In addition to the common settings parameters, the text question can be configured with:

| Field name | Data type | Description |
|---|---|---|
| `type` | "text" | Required for displaying a text question |
| `inputType` | "text", "email", "number" | Will validate and limit the user's input. |
| `placeholder` | string | Optional. Will be shown inside the input field when the user hasn't entered a value. |
| `customValidation` | object | Optional, can contain a custom `error` message (string) and/or a custom `regex` expression (string) for validation. |

Example:

```js
{
    id: "abc123",
    type: "text",
    inputType: "text",
    placeholder: "name with max 10 letters...",
    title: "How do you want to name your creation?",
    customValidation: {
        regex: "^.{0,10}$",
        error: "Names longer than 10 characters are not allowed"
    }
}
```

### Range Question

- Represented by either a slider or list of radio buttons
- Answer value: number
- Default score value: the selected number value

In addition to the common settings parameters, the range question can be configured with:

| Field name | Data type | Description |
|---|---|---|
| `type` | "range" | Required for displaying a range question |
| `inputType` | "slider", "radio" | Functionally these work the same, only the visual input method differs. "slider" has more options (ticks) |
| `min` | int | Minimum value |
| `max` | int | Maximum value |
| `default` | int | Optional. The default value when the user first opens the form. |
| `step` | int | Optional. The size of each step between slider positions / radio buttons. For example: setting this to 2 will only allow (un)even numbers. |
| `direction` | "increase", "decrease" | Optional, defaults to "increase". Setting this to decrease will default to and put the maximum first. |

When the inputType is "slider" the following options are also available:

| Field name | Data type | Description |
|---|---|---|
| `tickCount` | int | Optional. Will spread out this amount of ticks on the slider. |
| `tickValues` | int array | Optional. When set, the ticks will be displayed at these exact values. Will override the `tickCount` setting. |
| `tickLabels` | string or null array | Optional. When set, will override the tick labels (normally just the value). Use `null` to keep a tick label empty. |

Examples:

```js
{
    id: "abc123",
    type: "radio",
    title: "How did you experience this form?",
    inputType: "radio",
    min: 2,
    max: 8,
    default: 4,
    step: 2,
    direction: "decrease"
}
```

```js
{
    id: "abc123",
    type: "slider",
    title: "How did you experience this form?",
    inputType: "slider",
    min: 1,
    max: 10,
    direction: "increase"
    tickLabels: [2, 4, 5, 7, 9],
    tickLabels: ["Bad", null, "Neutral", null, "Good"]
}
```

## Result

| Field name | Data type | Description |
|---|---|---|
| `postDataUrl` | [AnswerDataUrl](#answerdataurl--saving-the-users-results) | When filled in the tool will save the user's result to this URL. |
| `redirectUrl` | [AnswerDataUrl](#answerdataurl--saving-the-users-results) | Instead of displaying the results page, the tool will redirect the user to this URL. |
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

In addition to above settings you can also customize the content of the results page by defining the `config.result.content` array.
This array can contain 4 different types of blocks.

#### Label block

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

#### Button block

| Field name | Data type | Description |
|---|---|---|
| `type` | "button" | Required for displaying a button block |
| `label` | string | Text to be displayed inside the button |
| `function` | "restart", "postData", "link" | A "restart" button will reset the user's input. "postData" will save the user's input to your server like the `postDataUrl` setting. "link" will redirect the user. |
| `url` | [AnswerDataUrl](#answerdataurl--saving-the-users-results) | Only necessary when function is "postData" or "link" |
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

#### Graph block

| Field name | Data type | Description |
|---|---|---|
| `type` | "graph" | Required for displaying a graph block |
| `format` | "bar", "line" | Switches between a bar chart or line graph |
| `dataUrl` | [AnswerDataUrl](#answerdataurl--saving-the-users-results) | Required. The tool will fetch this URL for [data](#graph-data) to be displayed. |
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
            color: string // css color string (#fff, rgb(255,255,255)...)
        },
        {
            // It is possible to define a special "highlight" series to highlight a x-value (line) or category (bar)
            id: "highlight", // used as key in the values array
            name: string,
            color: string // default color for highlighted values
        },
        ...
    ],
    values: [
        {
            x: number | string, // Required, linegraph -> number, bargraph -> string
            [series.id]: number, // each object of this array should contain at least one series.id key with data
            highlight: boolean | string, // optional, pass true to use the highlight series default color, or pass a css color string here to override it.
        },
        ...
    ]
}
```

For examples see:

- [Line graph](./public/mockLineGraph.json)
- [Bar graph](./public/mockBarGraph.json)
- [Bar graph with only one line](./public/mockSingleBarGraph.json)

#### IFrame block

You can use an IFrame if all else fails and you want to inject your own content (might be worth using `redirectUrl` instead).

| Field name | Data type | Description |
|---|---|---|
| `type` | "iframe" | Required for displaying a IFrame block |
| `url` | [AnswerDataUrl](#answerdataurl--saving-the-users-results) | Required. The tool will fetch this URL for [data to be displayed](#graph-data). Only the `GET` protocol is currently supported. |
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
