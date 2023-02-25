import { EncuestaService } from './../services/encuesta.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as SimpleS from 'simple-statistics';


@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public 
  public encuestasDB;
  public AtrChart;
  public ObjChart;
  public resA0:number[] = []
  public resB0:number[] = []

  @ViewChild('atrChart') atrChart: ElementRef;
  @ViewChild('objChart') objChart: ElementRef;

  constructor(private es: EncuestaService) { 
    Chart.register(...registerables)
    this.es.getEncuestas().subscribe( res => {
      this.encuestasDB = structuredClone(res)
      this.encuestasDB = this.encuestasDB
      for (let e of this.encuestasDB ){
        console.log(e)
        if (e.fecha){
          let f = e.fecha
          console.log(f.seconds)
          e.fecha = new Date(f.seconds*1000)
          console.log(e.fecha.getMonth())
        }
        
        if (e.tipo.charAt(0) === 'A'){
          console.log('Atributo')
          this.resA0.push(SimpleS.mean(e.calificaciones))
        }else{
          this.resB0.push(SimpleS.mean(e.calificaciones))
        }
      }
      console.log(this.resA0)
      console.log(this.resB0)
    })

  }

  ngOnInit() {
  }

}
