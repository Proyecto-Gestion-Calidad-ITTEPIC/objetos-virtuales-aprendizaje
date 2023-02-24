import { MateriaServiceService } from './../services/materia-service.service';
import { Component, OnInit } from '@angular/core';
import { Materia } from '../models/materia';
import { FireAuthService } from '../services/fire-auth.service';

@Component({
  selector: 'app-objetos-virtuales',
  templateUrl: './objetos-virtuales.page.html',
  styleUrls: ['./objetos-virtuales.page.scss'],
})
export class ObjetosVirtualesPage implements OnInit {
  public materias:Materia[]
  public results:Materia[]
  public loggedUser
  constructor(private MateriaService:MateriaServiceService, private auth: FireAuthService) { 
    //Obtener materias de la db
    this.MateriaService.getMaterias().subscribe((res)=>{
      this.materias=res
      console.log(this.materias)
      console.log('user')
      //console.log(this.results)
    }) 
    this.auth.getCurrentUser().subscribe(res => {
      /*if (res !== null){
        console.log(res)
      }else console.log('No user')
      */
      this.loggedUser=res;
      console.log('user')
      console.log(this.loggedUser)
    })

  }

  ngOnInit() {
    
  }
  //Filtrar por nombre de materia, usado en la barra de buscar
  public filtrar(event){
    console.log(event.target.value);
    const query = event.target.value.toLowerCase();
    if(query===""){
      this.results=undefined
      return
    }

    this.results = this.materias.filter(m=>m.nombre.toLowerCase().includes(query));
    console.log(this.results)
  }

}
