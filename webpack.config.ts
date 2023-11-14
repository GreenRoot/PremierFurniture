import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";

type Mode = 'production' | 'development'

interface EnvVariables {
    mode: Mode
}

export default (env: EnvVariables) => {
    console.log('\x1b[32;1m%s\x1b[0m', ` --- --- webpack run in [${env.mode}] mode`);

    const config: webpack.Configuration = {
        mode: env.mode ?? "development",
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'build'),
            clean: true,
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html')
            }),
            new webpack.ProgressPlugin()
        ]
    }

    return config
}