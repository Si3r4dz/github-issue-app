module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        ['transform-inline-environment-variables', {
            include: [
                'API_KEY',
                'API_URL',
            ],
        }],
    ],
}
