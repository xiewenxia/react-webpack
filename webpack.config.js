const path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production'
    return {
        entry: [
            "babel-polyfill",
            path.join(__dirname, './src/index.js')
        ],
        devServer: {
            port: 3000, //端口号
        },
        module: {
            rules: [{
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.html$/,
                    use: [{
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }]
                },
                {
                    test: /\.less$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'less-loader',
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),//因为在每次打包后，dist目录都有无用文件残留，最好每次打包前都清空dist目录
            new HtmlWebPackPlugin({
                //为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
                // 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
                template: "./public/index.html",
                filename: "./index.html"
            }),
            new MiniCssExtractPlugin({//抽离css
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ]
    }
};