import { CustomData} from "./custom-data.types"

export interface TableData {
    key:string | undefined,
    type: string,
    sort:boolean | undefined,
    value: any,
    images: string[] | undefined,
    table_config?: CustomData,
    _id:boolean
}