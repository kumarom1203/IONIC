import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  // HTTP Header
  apiHeaders() {
    return new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
      .set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  }

  // GET 
  get(url: string) {
    const headers = this.apiHeaders();
    return this.http.get(url, { headers });
  }

}
