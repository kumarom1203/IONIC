import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL:any;
	httpOptions: any;
	authorization: any;
  constructor(public http: HttpClient) {
    //this.baseURL = 'http://151.106.109.176:3001/arvindGeoApp'; 
     this.baseURL = 'http://localhost:3001/arvindGeoApp'; 
  }

	getHeader(){
		var httpOptions = {
			headers: new HttpHeaders({
			   'Authorization': "Bearer "+localStorage.getItem('jwtToken')  
			})
		  }
		return httpOptions;
	}


	post(url:any, body:any){
    	return this.http.post(this.baseURL+'/'+url, body, this.getHeader());
	}


	get(url:any){
    	return this.http.get(this.baseURL+'/'+url);
	}


}
