import toolkitTs from '@electron-toolkit/eslint-config-ts'
import toolkitPrettier from '@electron-toolkit/eslint-config-prettier'

export default [
  { ignores: ['**/node_modules/**', '**/dist/**', '**/out/**', '**/bin/**'] },
  ...toolkitTs.configs.recommended,
  toolkitPrettier
]
