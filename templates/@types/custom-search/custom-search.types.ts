import { BaseComponent } from "./base-component.types";
import { Block } from "./block.types";
import { Creator } from "./creator.types";
import { EarlyCompletionSetup } from "./early-completion-setup.types";
import { SearchFilter } from "./search-filter.types";
import { SearchType } from "./search-type.types";
import { SearchSetup } from "./search-setup.types";
import { Form } from "./form.types";
import { Report } from "./report.types";
export interface CustomSearch extends Report {
    id?: string,
    name?: string,
    description?: string,
    creator?: Creator,
    search_setup?: SearchSetup,
    early_completion_setup?: EarlyCompletionSetup,
    blocks?: Block[],
    forms?: Form[],
    filters?: SearchFilter[],
    main_indicator?: any,
    indicators?: any,
    pdv_id?: string,
    visit_id?: string,
    check_in?: Map<String, Object>,
    extras?: Map<String, Object>,
    check_out?: Map<String, Object>,
    ref?: string,
    user_id?: string,
    _id?: string,
    search_type?: SearchType,
    closing?: BaseComponent[],
    status?: number,
    created_at?:number,
    updated_at?: number,
}