import presetRemToPx from '@unocss/preset-rem-to-px'
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig, presetMini } from 'unocss'

export default defineConfig({
  presets: [
    presetMini(),
    presetRemToPx({
      baseFontSize: 4,
    }),
  ],
  rules: [
    [
      // shadow-1px-e0e0e0
      /^shadow-(\w+)-(\w+)$/,
      ([, d, color]) => {
        return {
          'box-shadow': `0 ${d} 0 0 ${`#${color}`}`,
        }
      },
    ],
  ],
  transformers: [transformerDirectives()],
})
