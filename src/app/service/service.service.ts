import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl = 'http://54.202.218.249:9501/api/users';

  constructor(private http: HttpClient) { }

  getuser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createuser(User: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}`, User);
  }

  // updateuser(id: number, value: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/${id}`, value);
  // }

  deleteuser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getusersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
