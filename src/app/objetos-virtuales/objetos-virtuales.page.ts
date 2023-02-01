import { MateriaServiceService } from './../services/materia-service.service';
import { Component, OnInit } from '@angular/core';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-objetos-virtuales',
  templateUrl: './objetos-virtuales.page.html',
  styleUrls: ['./objetos-virtuales.page.scss'],
})
export class ObjetosVirtualesPage implements OnInit {
  public materias:Materia[]
  public results:Materia[]
  constructor(private MateriaService:MateriaServiceService) { 
    this.MateriaService.getMaterias().subscribe((res)=>{
      this.materias=res
      console.log(this.materias)
      console.log(this.results)
    })  }

  ngOnInit() {
    
  }
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
