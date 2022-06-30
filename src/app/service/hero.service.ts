import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  url = "https://62951bd863b5d108c199feb4.mockapi.io/api/characters/";

  constructor(private http: HttpClient) { }

  obtenerListaHeroe(): Observable<any>{
      return this.http.get(this.url);
  }

  guardarHeroe(hero: Hero): Observable<any>{
    return this.http.post(this.url, hero);
  }

  eliminarHeroe(id: number){
    return this.http.delete(this.url + id);
  }

  actualizarHeroe(id: number, hero: Hero): Observable<any>{
    return this.http.put(this.url + id, hero);
  }
}
