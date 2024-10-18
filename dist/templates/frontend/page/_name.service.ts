import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class _NameService {
	constructor(
    private http: HttpClient
  ) { }

  get() {
    console.log(environment.apiUrl);
    return this.http.get(`${environment.apiUrl}/_namespaces`);
  }
}
