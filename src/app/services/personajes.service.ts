import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { all_personajes, Result } from '../interfaces/Rick_morty.interface';

const URL_BASE = environment.URL_API_RICK_MORTY;

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

}
