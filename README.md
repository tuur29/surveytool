
# SurveyTool

Load the production script file inside your own website and create an empty div with `surveyTool` as ID.
Also define a path to the `config.json` file in a global `surveyToolConfig` variable like so:

```html
<script>
    window.surveryConfig = {};
    // or async:
    fetch(url).then((response) =>
        response.json().then((config) =>
            window.setSurveyConfig(config)
        )
    );
</script>
<script src="/public/build.js"></script>
<div id="surveyTool"></div>
```

## Setup

- Install packages (`yarn install` or `npm install`)
- Start project (`yarn start` / `npm run start`)
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Production build 

`yarn build` builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Eject app

```shell
yarn eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
