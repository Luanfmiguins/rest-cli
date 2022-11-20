import { BaseComponent } from "./base-component.types";
import { Image } from "./image.types";

export interface Form {
    id: string,
    block_in: string,
    block_index: number,
    components: BaseComponent[],
    last_id_generated: number,
    image_components: Image[]
}