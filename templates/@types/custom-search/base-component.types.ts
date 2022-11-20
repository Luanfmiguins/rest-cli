import { Alert } from "./alert.types";
import { ConditionalPointsComponent } from "./conditional-points-components.types";
import { Conditional } from "./conditional.types";
import { Help } from "./help.types";
import {Image} from "./image.types";
import { RequiredComponentError } from "./required-component-error.types";

export interface BaseComponent {
    checked_toggle_components?: boolean,
    component_id?: string,
    active?: boolean,
    required?: boolean,
    position?: number,
    type?: string,
    conditional?: Conditional,
    toggle_component?: Conditional,
    toggle_components?: Conditional[],
    conditional_points?: Conditional[],
    question_points?: ConditionalPointsComponent,
    title?: string,
    description?: string,
    mask?: string,
    block_index?: number,
    last_id_generated?: number,
    value?: string,
    min_length?: number,
    max_length?: number,
    min_required?: number,
    average?: string,
    counts?: number,
    hint?: string,
    points?: number,
    image_points?: number,
    checked?: boolean,
    win_condition?: boolean,
    help?: Help,
    images?: Image[],
    size?: number,
    drop_points?: number[],
    components?: BaseComponent[],
    error?: RequiredComponentError | undefined,
    branch_block_index?: number,
    finish?: boolean,
    alerts?: Alert[],
    alert_description?: string,
    okay_points?: number,
    not_okay_points?: number,
}