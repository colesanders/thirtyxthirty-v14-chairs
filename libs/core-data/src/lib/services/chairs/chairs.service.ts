import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chair } from '@thirty/api-interfaces';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://thirtyxthirty-lessons.herokuapp.com/chairs';


@Injectable({
  providedIn: 'root'
})
export class ChairsService {

  constructor(private http: HttpClient) { }

  all(): Observable<[Chair]>{
    return this.http.get<[Chair]>(BASE_URL);
  }

  byId(id): Observable<Chair>{
    return this.http.get<Chair>(this.getUrl(id));
  }

  create(chair: Chair): Observable<Chair>{
    return this.http.post<Chair>(BASE_URL, chair);
  }

  update(chair: Chair): Observable<Chair>{
    return this.http.put<Chair>(this.getUrl(chair.id), chair);
  }

  delete(id): Observable<Chair>{
    return this.http.delete<Chair>(this.getUrl(id));
  }

  getUrl(id?: string) { 
    return `${BASE_URL}/${id}`
  }
}
