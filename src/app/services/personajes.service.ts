import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { all_personajes, Episodios, Result } from '../interfaces/Rick_morty.interface';
import Swal from 'sweetalert2';

// URLs de la API definidas en los enviroment, tanto en Dev como en Prod
const URL_BASE = environment.URL_API_RICK_MORTY;
const URL_EPISODIOS = environment.URL_API_EPISODIOS;

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  constructor(private http:HttpClient) { }

  // Petición a la API para traer los personajes, usando la URL definida en los enviroment
  getPersonajes():Observable<all_personajes>{
    return this.http.get<all_personajes>(URL_BASE)
    .pipe(
      catchError(e=>{
        console.log(e);
        this.mensaje_error('Hubo un error en el servidor');
        return throwError(e);
      })
    );
  }

  // Petición a la API para traer los detalles de cada personaje, usando la URL definida en los enviroment
  getDetails(id:any):Observable<Result>{
    return this.http.get<Result>(URL_BASE+"/"+id)
    .pipe(
      catchError(e=>{
        console.log(e);
        this.mensaje_error('Hubo un error en el servidor');
        return throwError(e);
      })
    );
  }

  // Petición a la API para traer los episodios de cada personaje, usando la URL definida en los enviroment
  // y pasando un array por la URL de la API con todos los Ids de los episodios donde aparece cada personaje
  getEpisodios(ids:any[]):Observable<Episodios[]>{
    return this.http.get<Episodios[]>(URL_EPISODIOS+"/"+ids)
    .pipe(
      catchError(e=>{
        console.log(e);
        this.mensaje_error('Hubo un error en el servidor');
        return throwError(e);
      })
    );
  }

  // Mensaje SweetAlert2 
  mensaje_error(text:string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: text,
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }

}
