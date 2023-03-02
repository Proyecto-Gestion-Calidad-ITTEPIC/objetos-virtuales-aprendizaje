import { timeout, map } from 'rxjs';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as SimpleS from 'simple-statistics';
import { FireAuthService } from './../services/fire-auth.service';
import { Encuesta } from './../models/encuesta';
import { EncuestaService } from './../services/encuesta.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public IChart;
  public encuestas;
  public enc;
  public encData;
  public atributoLabels = ['A1','A2','A3','A4','A5','A6','A7','A8','A9']
  public objetivoLabels = ['B1','B2','B3','B4','B5','B6','B7','B8','B9']

  @ViewChild('chart') iChart: ElementRef;

  constructor(private es: EncuestaService, 
    ) { 
      Chart.register(...registerables)
      this.es.getEncuestas().subscribe(res => {
        this.encuestas = structuredClone(res)  
              for (let i of this.encuestas){
          if (i.fecha){
            i.fecha = new Date (i.fecha.seconds*1000 + i.fecha.nanoseconds/ 1000000)
          }
        }
        this.encuestas.sort(function(x,y){
          return y.fecha - x.fecha
        })
        for ( let i of this.encuestas){
          if (i.fecha){
            i.fecha = i.fecha.toLocaleString('es-MX',{ timeZone: 'MST' })
          }
        }

        timeout(2000)
        console.log(this.encuestas)  
        this.enc = structuredClone(this.encuestas[this.encuestas.length-1])

        this.enc.tipo.charAt(0)==='A' ? this.createChart(this.enc.calificaciones,this.atributoLabels) :  this.createChart(this.enc.calificaciones,this.objetivoLabels) ;
        this.updateData(this.enc)
      })

    }

  ngOnInit() {
  }





  public createChart(data: Array<number>, labels: Array<String>){
    //Render charts if data found
          if ( this.enc !== null ){
           // console.log('En barra')
            const plugin = {
              id: 'customCanvasBackgroundColor',
              beforeDraw: (chart, args, options) => {
                const {ctx} = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = '#FFF';
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
              }
            };
        this.IChart = new Chart(this.iChart.nativeElement,{
          type: 'bar',
          data: {
            labels: labels ,
            datasets: [{
              label: 'Calificaciones',
              data: data, //obtained from db
              backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(154, 162, 35, 0.2)',
              'rgba(53, 02, 25, 0.2)',
              'rgba(201, 203, 207, 0.2)' ],// array should have same number of elements as number of dataset
              borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
              borderWidth: 1
            }]
          }, 
          options: {
            //indexAxis: 'y',
            scales: {r: {min :-6}},
            maintainAspectRatio: false
          },
          plugins: [plugin]
        })
        //console.log(this.IChart.config._config)
      }

  }

  
  public updateChart(id: string){
    let data = this.encuestas.filter((enc) => enc.id === id)
    //console.log(this.enc)
    //console.log(this.enc)
    let total = this.IChart.data.datasets[0].data.length
    //console.log()
    for ( let i = 0; i < total ; i++) {
      this.IChart.data.datasets[0].data.pop()
    }
    for (let c of data[0].calificaciones) this.IChart.data.datasets[0].data.push(c)
    data[0].tipo.charAt(0)==='A' ? this.IChart.data.labels = this.atributoLabels : this.IChart.data.labels = this.objetivoLabels
    this.IChart.update()
    this.updateData(data[0])
  }

  public updateData(src: Encuesta){
    console.log(src.com)
    let prefix = 'Objetivo '
    let lista = undefined
    if (src.com){
      if (src.tipo.charAt(0)==='A'){
        prefix = 'Atributo '
      }
      lista =structuredClone(src.com)
      lista = lista.map((comentario, index) => comentario = prefix + (index + 1) + " : " +comentario )
      console.log(lista)
    }

    this.encData = {
      tipo: src.tipo,
      email: src.email===''?'anónimo':src.email,
      com: lista? lista : undefined
    }
    if ( src.id === 'z6wnu3zu2LExQ4WZ4mg4'){
      this.encData.email = 'dart'
    }
  }

}
