import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { _NamePageInterface } from "./_name.interface";

@Injectable()
export class _NameService {
	constructor(
    private http: HttpClient
  ) { }

  router: string = "my-router";

  getReport(query: Record<string, unknown>,): Observable<_NamePageInterface[]> {
    let url = `${environment.apiUrl}/${this.router}?`
  
    for(const key in query) {
      url += `&${key}=${query[key]}`
    }

    return this.http.get<_NamePageInterface[]>(`${url}`);
  }

  exportExcel(query: Record<string, unknown>,): Observable<Blob> {
    let url = `${environment.apiUrl}/${this.router}/export/excel?`
  
    for(const key in query) {
      url += `&${key}=${query[key]}`
    }

    return this.http.get(`${url}`, { responseType: "blob" });
  }
}
