const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true
    },
    module: {
    rules: [
        {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
    {test: /\.js$/, exclude: /nide_modules/, use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }}]
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'tic-tac-toe',
        filename:'index.html',
        template: path.resolve(__dirname, 'src/temp.html')

    })]

}