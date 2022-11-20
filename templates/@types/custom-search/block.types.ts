import { Filter } from "./filter.types";
import { SearchSetup } from "./search-setup.types";
import { CollectItem } from "./collect-item.types";
import { TypeConfig } from "./type-config.types";
export interface Block {
    id: string,
    title: string,
    description: string,
    type: string,
    type_config: any | TypeConfig,
    type_description: string,
    indicator_index: number,
    indicator_id: string,
    form_index: number,
    form_id: string,
    filters: Filter[]
    search_setup: SearchSetup,
    selected_collect_type: string,
    collect_items: CollectItem[],
    finish: boolean
}