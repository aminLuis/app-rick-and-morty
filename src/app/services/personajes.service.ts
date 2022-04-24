import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { all_personajes, Episodios, Result } from '../interfaces/Rick_morty.interface';

const URL_BASE = environment.URL_API_RICK_MORTY;
const URL_EPISODIOS = environment.URL_API_EPISODIOS;

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  constructor(private http:HttpClient) { }

  getPersonajes():Observable<all_personajes>{
    return this.http.get<all_personajes>(URL_BASE);
  }

  getDetails(id:any):Observable<Result>{
    return this.http.get<Result>(URL_BASE+"/"+id);
  }

  getEpisodios(ids:any[]):Observable<Episodios[]>{
    return this.http.get<Episodios[]>(URL_EPISODIOS+"/"+ids);
  }

}
