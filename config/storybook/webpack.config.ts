import path from 'path'
import webpack, { RuleSetRule, DefinePlugin } from 'webpack'
import { buildCssLoader } from '../building/loaders/buildCssLoader'
import { BuildPaths } from '../building/types/config'

export default ({ config }: {config: webpack.Configuration}) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    locales: '',
    buildLocales: '',
    favicons: '',
    buildFavicons: ''
  }

  config!.resolve!.modules!.push(paths.src)
  config!.resolve!.extensions!.push('.ts', '.tsx')
  config!.resolve!.alias = {
    ...config!.resolve!.alias,
    '@': paths.src
  }

  // @ts-ignore
  config!.module!.rules = config!.module!.rules!.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i }
    }

    return rule
  })
  config!.module!.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack']
  })
  config!.module!.rules.push(buildCssLoader(true))

  config!.plugins!.push(new DefinePlugin({
    __IS_DEV__: true,
    __API__: JSON.stringify('https://someapi.com'),
    __PROJECT__: JSON.stringify('storybook')
  }))

  return config
}
