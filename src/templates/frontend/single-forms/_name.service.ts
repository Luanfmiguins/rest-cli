import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { _NameInterface } from "./_name.interface";

@Injectable()
export class _NameService {

	constructor(
    private http: HttpClient
  ) { }

  router = `_name`;

  createItem(responsible: _NameInterface): Observable<_NameInterface> {
    return this.http.post<_NameInterface>(`${environment.apiUrl}/${this.router}`, responsible);
  }

}
