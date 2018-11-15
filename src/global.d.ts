declare module '*.less' {
    const styles: { [classNames: string]: string}
    export = styles
}
declare module '*.css' {
    const styles: { [className: string]: string }
    export = styles
}

declare module '*.png' {
    const image: any
    export = image
}

declare var __DEV__: boolean

declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}