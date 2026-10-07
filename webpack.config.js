import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";
import dotenv from "dotenv";
import HtmlWebpackPlugin from "html-webpack-plugin";
import analyzer from "webpack-bundle-analyzer";

const { BundleAnalyzerPlugin } = analyzer;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (env, argv) => {
    const mode = argv.mode ?? "development";
    const parsed = dotenv.config({ path: `.env.${mode}` }).parsed ?? {};

    return {
        entry: "./src/index.tsx",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].[contenthash].js",
            clean: true,
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: "ts-loader",
                },
                {
                    test: /\.scss$/,
                    use: ["style-loader", "css-loader", "sass-loader"],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: "asset/resource",
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({ template: "./src/index.html" }),
            new webpack.DefinePlugin({
                "process.env.MY_VARIABLE": JSON.stringify(parsed.MY_VARIABLE),
            }),
            env?.analyze &&
            new BundleAnalyzerPlugin({
                analyzerMode: "static",
                reportFilename: "bundle-report.html",
                openAnalyzer: false,
            }),
        ].filter(Boolean),
        devServer: {
            port: 8080,
            open: true,
        },
    };
};