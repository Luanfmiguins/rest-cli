import { TableData } from "./table-data.types"

export interface CustomData {
    headers: string[],
    data: Array<Array<TableData>>
}