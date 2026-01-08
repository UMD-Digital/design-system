declare module 'postcss-nesting' {
  import { PluginCreator } from 'postcss';
  const postcssNesting: PluginCreator<Record<string, unknown>>;
  export default postcssNesting;
}
