import { WebServiceArgsType } from "_baseDirectory/base.types";
import { BASE_ROUTES } from "_baseDirectory/routes/routes";
import { _NameInterface } from "./_name.interface";
import { FastRequestService } from "../../base/services/fast-request.service";
export const _nameCallMethod: (props?: WebServiceArgsType) => Promise<_NameInterface[]> = async (props) => {
    return new FastRequestService()
        .simpleRequestWithAuth({
            route: BASE_ROUTES.app.me,//Troque .app.me pela sua rota ( formato : { url : string, type: "post" | "get" } )
            query: props?.query
        })
}//rename async () => { return } to your http api