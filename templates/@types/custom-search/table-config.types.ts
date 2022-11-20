import { CustomData } from "./custom-data.types"; 
import { DefaultData } from "./default-data.types"; 
import { Feature } from "./feature.types"; 
import { TableData } from "./table-data.types";

export interface TableConfigType {
    type: string
    default_data: DefaultData | undefined,
    custom_data: CustomData | undefined,
    features: Feature,
    modal_view: boolean
}