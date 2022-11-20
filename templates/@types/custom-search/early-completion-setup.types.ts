export interface EarlyCompletionSetup {

    type: string,
    key: string,
    config: {
        indicator: "main" | string,
        value: number
    },
    extras: string[]
}