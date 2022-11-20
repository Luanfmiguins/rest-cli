import { Alert } from "./alert.types";

export interface Conditional {
    toggle_type: string,
    component_id: string,
    parent_id: string,
    type: string,
    toggle_type_action: string,
    indicator: string,
    value: number,
    a: number,
    b: number,
    points: number,
    alert: Alert
}