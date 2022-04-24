import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Result } from 'src/app/interfaces/Rick_morty.interface';
import { PersonajesService } from 'src/app/services/personajes.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss']
})
export class PersonajesComponent implements OnInit {

  @Input() personajes!: Result[];
  @ViewChild('scroll') scroll!: ElementRef;

  constructor(private servicio_personaje:PersonajesService) { }

  ngOnInit(): void {
    this.listarPersonajes();
  }


  // Método para usar servicio 'getPersonajes', obtener un response
  // y éste es guardado en un array ya definido
  listarPersonajes(){
    this.servicio_personaje.getPersonajes().subscribe(response=>{
      this.personajes = response.results;
    })
  }

  // Método básico para hacer scroll top al final de una pagina, es decir,
  // estando al final de la página sube con un efecto suave hasta el inicio de ésta
  scroll_top(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });   
  }

}
