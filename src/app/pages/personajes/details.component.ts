import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('scroll') scroll!: ElementRef;

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
            // obtenido de la URL almacenada en el array episodios,
            // puesto que el último caracter corresponde al Id del episodio,
            // de ésta manera se obtienen todos los Ids de los episodios en el que aparece un personaje
            
            // Se guardan los dos últimos caracteres de la ULR
            num = this.episodios[i].slice(this.episodios[i].length-2);

            // Se valida que al tomar dos caracteres ambos sean numeros y no una barra inclinada,
            // para después guardar el caracter o los caracteres en el array ids_episodios
            if(num[0]=="/"){
              this.ids_episodios[i] = this.episodios[i].slice(this.episodios[i].length-1);
            }else{
              this.ids_episodios[i] = this.episodios[i].slice(this.episodios[i].length-2);
            }
            
            
            i++;
          }
          // Se valida que el array ids_episodios no esté vacío para posteriormente
          // ejecutar el método mostrarEpisodios
          if(this.ids_episodios){
            this.mostrarEpisodios();
          }
          
        });
      }

    })
  }

  // Método para cargar los epiosodios en un array en los que aparece un personaje
  mostrarEpisodios(){
    // Se llama el servicio que trae los episodios
    this.servicio_personaje.getEpisodios(this.ids_episodios).subscribe(response=>{
      this.all_episodios = response;

        // Se obtiene el número de elementos que tiene el array all_episodios,
        // sí tiene un sólo elemento entonces se obtendra el número de atributos
        // que tiene ese único objeto, en éste caso son 7. Posteriormente se guarda
        // el valor en tam
        this.tam = Object.keys(this.all_episodios).length;

        // Si se guardó 7 entonces se encontró un solo elemento en el array all_episodios.
        // Posteriormente se guardan los valores de cada atributo del único objeto del array
        // para después ser mostrados como detalles de un episodio en la vista.
        if(this.tam==7){         
          this.name = Object.values(this.all_episodios)[1]+"";
          this.air_date = Object.values(this.all_episodios)[2]+"";
          this.episode = Object.values(this.all_episodios)[3]+"";
        }
      
    });
  }

  // Método para cargar los detalles de todos los episodios en el que aparece un personaje
  // en el array episodio,
  // para posteriormente ser mostrados como detalles de un episodio
  cargar_episodio(episode:Episodios){
    if(episode){
      this.episodio = episode;
    }
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
