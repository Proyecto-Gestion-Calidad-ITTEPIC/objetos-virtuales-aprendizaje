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
  public meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  public mesAtrChar = []
  public mesObjChar = []

  @ViewChild('atrChart') atrChart: ElementRef;
  @ViewChild('objChart') objChart: ElementRef;

  constructor(private es: EncuestaService) { 
    Chart.register(...registerables)
    this.es.getEncuestas().subscribe( res => {
      this.encuestasDB = structuredClone(res)
      this.encuestasDB = this.encuestasDB
      for (let e of this.encuestasDB ){
        //console.log(e)
        if (e.fecha){
          let f = e.fecha
          //console.log(f.seconds)
          e.fecha = new Date(f.seconds*1000)
          console.log(e.fecha.getMonth())
          console.log(e.fecha.getFullYear())
        }
      }
      this.encuestasDB.sort(function(x,y){
          return x.fecha - y.fecha
        })
      for (let e of this.encuestasDB){
        if (e.tipo.charAt(0) === 'A'){
          console.log('Atributo')
          this.resA0.push(SimpleS.mean(e.calificaciones))
          this.mesAtrChar.push(e.fecha.getDate()+',' +this.meses[e.fecha.getMonth()]+', '+e.fecha.getFullYear())
        }else{
          this.resB0.push(SimpleS.mean(e.calificaciones))
          this.mesObjChar.push(this.meses[e.fecha.getMonth()]+', '+e.fecha.getFullYear())

        }
      }
      console.log(this.resA0)
      console.log(this.resB0)
      this.createChartAtr(this.resA0,this.mesAtrChar)
      this.createChartObj(this.resB0,this.meses)
    })

  }

  ngOnInit() {
  }

  public createChartAtr(data: Array<number>, labels: Array <string>){
    //Render chart if data
    if ( this.encuestasDB !== null ){
      console.log('En barra')
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
  this.AtrChart = new Chart(this.atrChart.nativeElement,{
    type: 'line',
    data: {
      labels: labels ,
      datasets: [{
        label: 'Calificaciones Atributos',
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
        borderWidth: 3,
        borderColor:'rgba(54, 162, 235, 0.2)',
        pointBorderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 0.2)'
      }]
    }, 
    options: {
      //indexAxis: 'y',
      scales: {r: {min :-6}},
      maintainAspectRatio: false
    },
    plugins: [plugin]
  })
  console.log(this.AtrChart.config._config)
}

  }

  public createChartObj(data: Array<number>, labels: Array<String>){
    //Render charts if data found
          if ( this.encuestasDB !== null ){
            console.log('En barra')
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
        this.ObjChart = new Chart(this.objChart.nativeElement,{
          type: 'line',
          data: {
            labels: labels ,
            datasets: [{
              label: 'Calificaciones Objetivos',
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
              borderWidth: 3,
              borderColor:'rgba(54, 162, 235, 0.2)',
              pointBorderColor: 'rgba(255, 99, 132, 1)',
              pointBackgroundColor: 'rgba(255, 99, 132, 0.2)'
                  }]
          }, 
          options: {
            //indexAxis: 'y',
            scales: {r: {min :-6}},
            maintainAspectRatio: false,
            
          },
          plugins: [plugin]
        })
      }

  }

}
