import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as SimpleS from 'simple-statistics';
import { FireAuthService } from './../services/fire-auth.service';
import { Encuesta } from './../models/encuesta';
import { EncuestaService } from './../services/encuesta.service';
import { clone } from 'chart.js/dist/helpers/helpers.core';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public resA0:number[][] = []
  public resB0:number[][] = []
  public encuestasDB;
  public ChartData;
  public ChartColorArray;
  public AtrChart;
  public atributoLabels = ['A1','A2','A3','A4','A5','A6','A7','A8','A9']
  public objetivoLabels = ['B1','B2','B3','B4','B5','B6','B7','B8','B9']
  public loggedUser;

  //Link the canvas to a viewchild variable for easy reference 
  @ViewChild('atrChart') atrChart: ElementRef;

  public atributosISC=[
    'Implementa aplicaciones computacionales para solucionar problemas de diversos contextos, integrando diferentes tecnologías, plataformas o dispositivos.',
    'Diseña, desarrolla y aplica modelos computacionales para solucionar problemas, mediante la selección y uso de herramientas matemáticas.',
    'Diseña e implementa interfaces para la automatización de sistemas de hardware y desarrollo del software asociado.',
    'Coordina y participa en equipos multidisciplinarios para la aplicación de soluciones innovadoras en diferentes contextos.',
    'Diseña, implementa y administra bases de datos optimizando los recursos disponibles, conforme a las normas vigentes de manejo y seguridad de la información.',
    'Desarrolla y administra software para apoyar la productividad y competitividad de las organizaciones cumpliendo con estándares de calidad.',
    'Evalúa tecnologías de hardware para soportar aplicaciones de manera efectiva.',
    'Detecta áreas de oportunidad empleando una visión empresarial para crear proyectos aplicando las Tecnologías de la Información y Comunicación.',
    'Diseña, configura y administra redes de computadoras para crear soluciones de conectividad en la organización, aplicando las normas y estándares vigentes.'
  ]
  public objetivosISC=[
    'El egresado dirige proyectos de TI dentro de la organización.',
    'El egresado propone soluciones a las organizaciones con visión estratégica.',
    'El egresado tiene la capacidad para diseñar, desarrollar, implementar y/o administrar soluciones computacionales.',
    'El egresado propone soluciones innovadoras para optimizar los procesos que se llevan a cabo en la organización.',
    'El egresado identifica áreas de oportunidad que permitan emprender a las organizaciones proyectos sustentables relacionados con las tecnologías de la información y comunicaciones.',
    'El egresado promueve su capacitación constante para la aplicación del conocimiento adquirido en el ámbito laboral.'
  ]

  constructor(private es: EncuestaService, private auth: FireAuthService) { 
    Chart.register(...registerables)
        this.auth.getCurrentUser().subscribe(res => {
      this.loggedUser = res
      console.log(this.loggedUser)
      
    })
    //Crear filas de arreglos de valores de cada propiedad
    for (let a in this.atributosISC){
      this.resA0.push([])
    }
    //Obtener encuestas
    this.es.getEncuestas().subscribe(res => {
      this.encuestasDB = res 
      //Obtener valores para cada attr/objetivo
      for (let e in res){
        console.log(res[e])
        if( res[e].tipo.charAt(0) ==='A'){
        for(let c in res[e].calificaciones){
          this.resA0[c].push(res[e].calificaciones[c])
          //console.log(res[e].calificaciones[c])
        }}else{
          for(let c in res[e].calificaciones){
            this.resB0[c].push(res[e].calificaciones[c])
            //console.log(res[e].calificaciones[c])
          }
        }
      }
      console.log(this.resA0)
      console.log(this.resB0)
      

      this.createVBarChart(this.encuestasDB[0].calificaciones,this.atributoLabels)
    })

  }

  ngOnInit() {
  }

   //Metodos estadísticos con graficas
   public meanChart(){
      

        //this.createVBarChart(data,this.atributoLabels)
        //console.log(this.AtrChart.data.datasets[0].data)
        //console.log(this.AtrChart.data.datasets[0].data.length)
        let total = this.AtrChart.data.datasets[0].data.length
        //Borrar datos existentes
        for (let i = 0; i < total ; i++ ){
          this.AtrChart.data.datasets[0].data.pop()
        }
        //console.log(this.AtrChart.data.datasets[0].data)
        //Añadir nuevos datos
        for(let i in this.resA0[0]){
          console.log(this.resA0[0][i])
          this.AtrChart.data.datasets[0].data.push(this.resA0[0][i])
        }
        console.log(this.AtrChart.data.datasets[0].data)
        //Mostrar datos
        this.AtrChart.update()
    }
 


  public createVBarChart(data: Array<number>, labels: Array<String>){
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
        this.AtrChart = new Chart(this.atrChart.nativeElement,{
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
      }

  }


}
