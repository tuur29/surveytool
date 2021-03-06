
# Survey Tool

Create injectable, configurable and extendable forms.  
Demo on: https://tuur29.github.io/surveytool/

## Integration in your own site

<!-- There is an exact copy of this section on the Storybook homepage -->
<!-- START -->
Load the [production script file](https://github.com/tuur29/surveytool/releases) inside your own website and create an empty div.
Next, either initialize the tool in said div with `new SurveyTool(cssSelector, {...})` with the same config object at a later date to initialize the tool:

```html
<script src="[...]/surveytool-1.0.0.min.js"></script>
<div id="surveyTool"></div>
<script>
    const config = {...};
    const tool = new SurveyTool("#surveyTool", config);

    // or async (for example on button click):
    document.querySelector("#button").addEventListener("click", () => {
        tool.resetAnswers();
        tool.updateConfig(config);
    });
</script>
```
<!-- END -->

### Configuration

- Check out the [Storybook](https://tuur29.github.io/surveytool/docs)
- The example configuration used in the demo can be found here: [mockConfig.ts](./src/utils/mockConfig.ts)

## Development

1. Install packages (`yarn install` or `npm install`)
2. Start project (`yarn start` / `npm run start`)
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Tip: to circumvent TS compile errors during development you can add this to a `.env` file in the root folder:

```env
TSC_COMPILE_ON_ERROR=true
```

### Testing

- `yarn run test:typing` will run a typescript check across the code
- `yarn run test:unit` will run unit tests with jest
- `yarn run test:lint` will run a linting check across the code

### Documentation

You can also view a hosted version of the storybook: https://tuur29.github.io/surveytool/docs

- `yarn run docs:start` will start a locally running storybook
- `yarn run docs:build` will build a static version of the storybook

### Production build

- `yarn build` builds the app for production to the `build` folder.
- Bundle the output with `./scripts/bundle_build.sh`, this will give you a single `build/dist/surveytool.min.js` you can upload and use.

Demo:

- To update the demo page run `./scripts/deploy_demo.sh`.

### Learn More

This tool was created with:

- [Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
- [Redux](https://redux.js.org/introduction/getting-started)
- [Styled components](https://styled-components.com/docs)
- [Typescript](https://www.typescriptlang.org/docs/home.html)
