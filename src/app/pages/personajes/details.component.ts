import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonajesService } from 'src/app/services/personajes.service';
import { all_personajes, Result } from 'src/app/interfaces/Rick_morty.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() detalles!: Result;
  @Input() episodios!: String[];
  ids_episodios: String[]=[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicio_personaje: PersonajesService
  ) { }

  ngOnInit(): void {
    this.mostrarDetails();
  }

  mostrarDetails(){

    // Se obtiene el Id pasado por la URL
    this.route.paramMap.subscribe(params=>{

      if(params.has('id')){

        // Variable i para contar iteraciones en el ciclo for
        let i = 0;

        // Se llama el servicio de la API el cual obtiene los datos de un personaje
        this.servicio_personaje.getDetails(params.get('id')).subscribe(response=>{
          //Se guarda el response en detalles de tipo Result
          this.detalles = response;

          //Se guardan las URLs de los episodios relacionados al personaje
          this.episodios = response.episode;

          // Se recorre el array episodios con ciclo for
          for(let epi of this.episodios){
            // Se guarda por cada posición en un array String (ids_episodios) el último caracter
            // obtenido de la URL almacenada en el array episodios
            // Puesto que el último caracter corresponde al Id del episodio
            // De ésta manera se obtienen todos los Ids de los episodios en el que aparece un personaje
            this.ids_episodios[i] = this.episodios[i].slice(this.episodios[i].length-1);
            i++;
          }

          console.log(this.ids_episodios);
        });
      }

    })
  }

}
