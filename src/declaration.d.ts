
declare module "*.png" {
    const src: string;
    export default src;
}
declare module "*.scss";

declare const process: {
    env: {
        MY_VARIABLE: string;
    };
};