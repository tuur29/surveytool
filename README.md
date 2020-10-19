
# Survey Tool

Create injectable, configurable and extendable forms.  
Demo on: https://tuur29.github.io/surveytool/

## Integration in your own site

Load the [production script file](https://github.com/tuur29/surveytool/releases) inside your own website and create an empty div with `surveyTool` as ID.
Next, either define a `surveyConfig` object on the `window` object, or call `window.setSurveyConfig()` with the same config object at a later date to initialize the tool:

```html
<div id="surveyTool"></div>
<script>
    const config = { ... };

    // initialize directly:
    window.surveyConfig = config;
    // or async (for example on button click):
    document.querySelector("#button").addEventListener("click", () => {
        window.setSurveyConfig(config);
    });
</script>
<script src="[...]/surveytool-1.0.0.min.js"></script>
```

### Configuration

View [CONFIG.md](./CONFIG.md) for a complete guide on how to configure this tool.  
The example configuration used in the demo can be found here: [mock.ts](./src/utils/mock.ts)

## Development

1. Install packages (`yarn install` or `npm install`)
2. Start project (`yarn start` / `npm run start`)
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Production build

- `yarn build` builds the app for production to the `build` folder.
- Bundle the output with `./bundle_build.sh`, this will give you a single `build/dist/surveytool.min.js` you can upload and use.

Demo:

- To update the demo page run `./deploy_demo.sh`.

### Learn More

This tool was created with:

- [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).
- [Redux](https://redux.js.org/introduction/getting-started)
- [Styled components](https://styled-components.com/docs)
- [Typescript](https://www.typescriptlang.org/docs/home.html)
