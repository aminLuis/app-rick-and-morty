import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonajesService } from 'src/app/services/personajes.service';
import { Episodios, Result } from 'src/app/interfaces/Rick_morty.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() detalles!: Result;
  @Input() episodios!: String[];
  ids_episodios: String[]=[];
  @Input() all_episodios!: Episodios[];
  @Input() episodio!: Episodios;
  tam:number=0;
  @Input() episodio_unico!:Episodios;
  @Input() name!:string;
  @Input() air_date!:string;
  @Input() episode!:string;

  constructor(
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

            let num;

            // Se guarda por cada posición en un array String (ids_episodios) el último caracter
            // obtenido de la URL almacenada en el array episodios
            // Puesto que el último caracter corresponde al Id del episodio
            // De ésta manera se obtienen todos los Ids de los episodios en el que aparece un personaje
            
            num = this.episodios[i].slice(this.episodios[i].length-2);

            // Se valida que al tomar dos carácteres ambos sean numeros y no una barra inclinada
            if(num[0]=="/"){
              this.ids_episodios[i] = this.episodios[i].slice(this.episodios[i].length-1);
            }else{
              this.ids_episodios[i] = this.episodios[i].slice(this.episodios[i].length-2);
            }
            
            
            i++;
          }
          this.mostrarEpisodios();
        });
      }

    })
  }

  mostrarEpisodios(){
    let i = 0;
    this.servicio_personaje.getEpisodios(this.ids_episodios).subscribe(response=>{
      this.all_episodios = response;
    
       
        this.tam = Object.keys(this.all_episodios).length;

        if(this.tam==7){         
          this.name = Object.values(this.all_episodios)[1]+"";
          this.air_date = Object.values(this.all_episodios)[2]+"";
          this.episode = Object.values(this.all_episodios)[3]+"";
        }
      
    });
  }

  cargar_episodio(episode:Episodios){
    if(episode){
      this.episodio = episode;
    }
  }

}
