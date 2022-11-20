import { id } from "../../../base/base.repository";

export interface Report {
    visitId?: string,
    customSearchId?: string,
    relationshipId?: string,
    userId?: id | string,
    clientId?: id | string,
    publishId?: string,
    formId?: string,
    parentId?: string
}