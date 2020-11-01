module.exports = {
    stories: [
      "../src/stories/**/*.stories.mdx",
      "../src/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)"
    ],
    addons: [
      "@storybook/addon-controls",
      "@storybook/addon-links",
      "@storybook/addon-essentials",
      "@storybook/preset-create-react-app",
    ],
};
