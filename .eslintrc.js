module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-native',
    ],
    rules: {
        'global-require': 0,
        'react/prop-types': 'off',
        'no-use-before-define': 'off',
        'react-native/no-unused-styles': 2,
        'react/jsx-no-useless-fragment': [1, { allowExpressions: true }],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        semi: 0,
        'no-nested-ternary': 'off',
        'max-len': 'off',
        'no-param-reassign': 0,
        'no-tabs': 0,
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'consistent-return': 'off',
        'linebreak-style': ['error', 'windows'],
        'no-unused-vars': 'warn',
    },
};
