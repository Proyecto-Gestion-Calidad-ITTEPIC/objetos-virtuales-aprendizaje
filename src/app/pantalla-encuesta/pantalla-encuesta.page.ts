import { FireAuthService } from './../services/fire-auth.service';
import { Encuesta } from './../models/encuesta';
import { EncuestaService } from './../services/encuesta.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementRef, Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import * as SimpleS from 'simple-statistics';
@Component({
  selector: 'app-pantalla-encuesta',
  templateUrl: './pantalla-encuesta.page.html',
  styleUrls: ['./pantalla-encuesta.page.scss'],
})
export class PantallaEncuestaPage implements OnInit {
  public resA0:number[][] = []
  public resB0:number[][] = []
  public formAtributos : FormGroup;
  public formObjetivos : FormGroup;
  public encuestaP: Encuesta
  public loggedUser;
  public encuestasDB;
  public ChartData;
  public ChartColorArray;
  public BarChart;
  public atributoLabels = ['A1','A2','A3','A4','A5','A6','A7','A8','A9']
  public objetivoLabels = ['B1','B2','B3','B4','B5','B6','B7','B8','B9']
  //Link the canvas to a viewchild variable for easy reference 
  @ViewChild('barChart') barChart: ElementRef;
  
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

  constructor(private fb:FormBuilder, private alertController: AlertController, private es: EncuestaService, private auth: FireAuthService) {
    //Register controllers in order to render the charts correctly
    //console.log(atributo_0)
    Chart.register(...registerables)
    //Obtain logged user
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
        console.log(res[e].calificaciones)
        for(let c in res[e].calificaciones){
          this.resA0[c].push(res[e].calificaciones[c])
          //console.log(res[e].calificaciones[c])
        }
      }
      console.log(this.resA0)

      this.createVBarChart(this.encuestasDB[1].calificaciones,this.atributoLabels)
    })
   }

   //Metodos estadísticos con graficas
   public meanChart(data: Array<number>){
      if ( data !== null ) {
        //for (let e in )
        console.log(SimpleS.mean(data))
      }
   }
   

  ngOnInit() {
    //Form group creation
    this.formAtributos = this.fb.group({
      atributo_0:[0],
      atributo_1:[0],
      atributo_2:[0],
      atributo_3:[0],
      atributo_4:[0],
      atributo_5:[0],
      atributo_6:[0],
      atributo_7:[0],
      atributo_8:[0]
    });

    this.formObjetivos = this.fb.group({
      objetivo_0:[0],
      objetivo_1:[0],
      objetivo_2:[0],
      objetivo_3:[0],
      objetivo_4:[0],
      objetivo_5:[0]
    });
  }

  public sliderChange(val:number){

  }

  public createChart(chartType: string){
    
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
        this.BarChart = new Chart(this.barChart.nativeElement,{
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

  //Form validation
  public formAtrCheck(){
    //console.log(this.formAtributos.valid)
    //console.log(this.formAtributos.get('atributo_0').value)
    if (this.formAtributos.valid) {
      this.presentAlertModal('¿Desea enviar el formulario de satisfacción de Atributos de egreso? \n Revise sus respuestas','Atributos')
    }
  }

  public formObjCheck(){
    //console.log(this.formAtributos.valid)
    //console.log(this.formAtributos.get('atributo_0').value)
    if (this.formObjetivos.valid) {
      this.presentAlertModal('¿Desea enviar el formulario de satisfacción de Atributos de egreso? \n Revise sus respuestas','Objetivos')
    }
  }
  //Modal confirmation dialog
  async presentAlertModal(m: string, t: string) {
    const alert = await this.alertController.create({
      header: 'ALERTA',
      subHeader: 'Aviso: ',
      message: m,
      cssClass: 'encuestaModal',
      buttons: [{
        text:'CONFIRMAR',
        role:'confirm',
        handler: () => {
          console.log('confirmado')
          this.subirEncuesta(t)
        }
      }
      ,{
        text:'CANCELAR',
        role:'cancel',
        handler: () => {
          console.log('cancelado')
        }
      }
    ],
    });

    await alert.present();
  }

  public subirEncuesta(tipo: string){
    let email = ''
    let resultados = []
    let prefix = ''
    //Determine form and for loop through each attribute and push to result array
    if ( tipo.includes('Atr') ) {
       prefix = 'atributo_'
       for ( let i = 0; i < this.atributosISC.length; i++) {
        //Generate form fields dynamically and add to results
        console.log(prefix+i)
        console.log(this.formAtributos.get(prefix+i).value)
        resultados.push(this.formAtributos.get(prefix+i).value)
       }
    }else{ 
       prefix = 'objetivo_'
       for ( let i = 0; i < this.objetivosISC.length; i++) {
        //Generate form fields dynamically and add to results
        //console.log(prefix+i)
        //console.log(this.formAtributos.get(prefix+i).value)
        resultados.push(this.formObjetivos.get(prefix+i).value)
       }

    }
    if (this.loggedUser !== null) {
      email = this.loggedUser._delegate.email
    }else {
      email = 'anónimo'
    }
    //Determine email
    this.loggedUser !== null ? email = this.loggedUser._delegate.email : 'anónimo'
    console.log(resultados)
    this.encuestaP = {
      tipo: tipo,
      calificaciones: resultados,
      email: email
    }
    console.log(this.encuestaP)
    this.es.postEncuesta(this.encuestaP)

  }

}
