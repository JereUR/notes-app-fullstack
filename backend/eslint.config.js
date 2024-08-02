module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx'], // Especifica los archivos TypeScript
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json', // Asegúrate de que esta ruta sea correcta
        tsconfigRootDir: __dirname
      }
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin')
    },
    rules: {
      // Añade tus reglas ESLint aquí
    }
  }
]
