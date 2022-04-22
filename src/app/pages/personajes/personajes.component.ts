import { Component, Input, OnInit } from '@angular/core';
import { all_personajes, Result } from 'src/app/interfaces/Rick_morty.interface';
import { PersonajesService } from 'src/app/services/personajes.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss']
})
export class PersonajesComponent implements OnInit {

  @Input() personajes!: Result[];

  constructor(private servicio_personaje:PersonajesService) { }

  ngOnInit(): void {
    this.listarPersonajes();
  }


  listarPersonajes(){
    this.servicio_personaje.getPersonajes().subscribe(response=>{
      this.personajes = response.results;
      console.log(this.personajes);
    })
  }

}
