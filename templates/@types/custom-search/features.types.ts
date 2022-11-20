export interface FeatureType {
    icon: string,
    description: string,
    routerOptions: {
        link: string[] | string,
        title: string
    }
}