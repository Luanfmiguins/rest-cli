import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaginateInterface } from "src/app/base/paginate.interface";
import { environment } from "src/environments/environment";
import { _NameInterface } from "./_name.interface";

@Injectable()
export class _NameService {
	constructor(
    private http: HttpClient
  ) { }

  router = `_name`;

  getItems(
    page: number = 1,
    perPage?: number,
    sortBy?: string,
    sort?: string,
    search?: string,
    query?: Record<string, unknown>
  ): Observable<PaginateInterface<_NameInterface>> {
    let url = `${environment.apiUrl}/${this.router}?page=${page}`

    if(perPage) url += "&perPage=" + perPage;
    if(sortBy) url += "&sortBy=" + sortBy;
    if(sort) url += "&sort=" + sort;
    if(search) url += "&search=" + search;
    if(query) {
      for(const key in query) {
        url += `&${key}=${query[key]}`
      }
    }

    return this.http.get<PaginateInterface<_NameInterface>>(url);
  }

  createItem(responsible: _NameInterface): Observable<_NameInterface> {
    return this.http.post<_NameInterface>(`${environment.apiUrl}/${this.router}`, responsible);
  }

  updateItem(id: String, responsible: _NameInterface): Observable<_NameInterface>{
    return this.http.put<_NameInterface>(`${environment.apiUrl}/${this.router}/${id}`, responsible)
  }

  deleteItem(id: String): Observable<_NameInterface>{
    return this.http.delete<_NameInterface>(`${environment.apiUrl}/${this.router}/${id}`)
  }

  exportExcel(
    search?: string,
    query?: Record<string, unknown>
  ): Observable<Blob>{
    return this.http.post(`${environment.apiUrl}/${this.router}/excel`, {
      search,
      query
    }, { responseType: "blob" })
  }
}
