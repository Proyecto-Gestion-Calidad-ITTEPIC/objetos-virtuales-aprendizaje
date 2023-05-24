import { Router } from '@angular/router';
import { FireAuthService } from './../services/fire-auth.service';
import { Encuesta } from './../models/encuesta';
import { EncuestaService } from './../services/encuesta.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementRef, Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import * as SimpleS from 'simple-statistics';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-pantalla-encuesta',
  templateUrl: './pantalla-encuesta.page.html',
  styleUrls: ['./pantalla-encuesta.page.scss'],
})
export class PantallaEncuestaPage implements OnInit {
  public formAtributos : FormGroup;
  public formObjetivos : FormGroup;
  public encuestaP: Encuesta
  public loggedUser;
  public hoy: Date;
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

  constructor(private fb:FormBuilder, private alertController: AlertController, private es: EncuestaService, private auth: FireAuthService, private router:Router) {
    //Register controllers in order to render the charts correctly
    //console.log(atributo_0)
    //Obtain logged user
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
      atributo_8:[0],
      a0Comentario:'',
      a1Comentario:'',
      a2Comentario:'',
      a3Comentario:'',
      a4Comentario:'',
      a5Comentario:'',
      a6Comentario:'',
      a7Comentario:'',
      a8Comentario:'',
      email:['',Validators.compose([
        Validators.pattern(new RegExp(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/))
      ])]

    });

    this.formObjetivos = this.fb.group({
      objetivo_0:[0],
      objetivo_1:[0],
      objetivo_2:[0],
      objetivo_3:[0],
      objetivo_4:[0],
      objetivo_5:[0],
      o0Comentario:'',
      o1Comentario:'',
      o2Comentario:'',
      o3Comentario:'',
      o4Comentario:'',
      o5Comentario:'',
      email:['',Validators.compose([
        Validators.pattern(new RegExp(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/))
      ])]
    });
  }

  public sliderChange(val:number){

  }

  public createChart(chartType: string){
    
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
      header: 'ALERTA: ENTREGA DE FORMULARIO',
      subHeader: 'Aviso: ',
      message: m + '\nIngrese su email (opcional)',
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
    let comentarios = []
    let email = ''
    let resultados = []
    let prefix = '' 
    let postfixc = 'Comentario'

    //Determine form and for loop through each attribute and push to result array

    if ( tipo.includes('Atr') ) {
       prefix = 'atributo_'
       let prefixc = 'a'
       for ( let i = 0; i < this.atributosISC.length; i++) {
        //Generate form fields dynamically and add to results
        //console.log(prefix+i)
       // console.log(this.formAtributos.get(prefix+i).value)
        console.log(this.formAtributos.get(prefixc+i+postfixc).value)
        console.log(this.formAtributos.get(prefixc+i+postfixc).value == '')
        resultados.push(this.formAtributos.get(prefix+i).value)
        if (this.formAtributos.get(prefixc+i+postfixc).value == ''){
          comentarios.push('No hubo comentarios para este atributo')
          console.log(comentarios)
        }else{
          comentarios.push(this.formAtributos.get(prefixc+i+postfixc).value.trim())
        }
       }
       email = this.formAtributos.get('email').value
       
    }else{ 
       prefix = 'objetivo_'
       let prefixc = 'o'
       for ( let i = 0; i < this.objetivosISC.length; i++) {
        //Generate form fields dynamically and add to results
        //console.log(prefix+i)
        //console.log(this.formAtributos.get(prefix+i).value)
        resultados.push(this.formObjetivos.get(prefix+i).value)
        if ( this.formObjetivos.get(prefixc+i+postfixc).value == ''){
          comentarios.push('No hubo comentarios para este objetivo')
        }else{
          comentarios.push(this.formObjetivos.get(prefixc+i+postfixc).value)
        }
       }
       email = this.formObjetivos.get('email').value

    }
    /** 
     * 
    if (this.loggedUser !== null) {
      email = this.loggedUser._delegate.email
    }else {
      email = 'anónimo'
    }
    */
    //Determine email
    let dat = new Date()
    //this.loggedUser !== null ? email = this.loggedUser._delegate.email : 'anónimo'
    console.log(resultados)
    this.encuestaP = {
      tipo: tipo,
      calificaciones: resultados,
      email: email,
      fecha: dat,
      com: comentarios
    }
    console.log(this.encuestaP)
    this.es.postEncuesta(this.encuestaP)

  }

  public irAResultados(){
    this.router.navigate(['/tabs'],{});

  }
  public irAEncuestaEmpleador(){
    this.router.navigate(['/encuesta-empleador'],{});

  }

}
