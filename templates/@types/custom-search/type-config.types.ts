import { Filter } from "./filter.types";

export interface TypeConfig {
    id: string,
    title: string,
    database_ref: string,
    reference_item_type: "product" | "product_heritage" | "occasion" | "item" |"item_heritage" | undefined,
    heritage_ref: string | undefined,
    filters: Filter[]
}