import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu({
  ignores: ['node_modules', '**/node_modules/**', 'dist', '**/dist/**', 'out', '**/out/**', '.gitignore', '**/.gitignore/**'],
  unocss: true,
  vue: true,
  rules: {
    'no-console': 'off',
    'node/prefer-global/process': 'off',
  },
}, ...compat.config({
  extends: [
    './.eslintrc-auto-import.json',
  ],
}))
// .extend('./.eslintrc-auto-import.json')
