import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iurl } from './interface/img';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  apiKey = 'b4cbea77-4af3-4dd9-9812-1895e045b889';
  responce: any;
  constructor(private http: HttpClient) {}

  getImg(breed: string, am: number): Observable<Iurl[]> {
    return this.http.get<Iurl[]>('https://api.thecatapi.com/v1/images/search?breed_id=' + breed + '&limit=' + am + '&api_key='+ this.apiKey);
  }
}
