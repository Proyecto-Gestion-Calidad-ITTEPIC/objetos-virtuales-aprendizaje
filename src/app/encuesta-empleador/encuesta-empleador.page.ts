import { Encuesta } from './../models/encuesta';
import { EncuestaService } from './../services/encuesta.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementRef, Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { EncuestaEmpleador } from '../models/encuesta-empleador';

@Component({
  selector: 'app-encuesta-empleador',
  templateUrl: './encuesta-empleador.page.html',
  styleUrls: ['./encuesta-empleador.page.scss'],
})
export class EncuestaEmpleadorPage implements OnInit {
  public formEmpleadores : FormGroup;
  public encu : EncuestaEmpleador
  constructor(private fb : FormBuilder, private ac : AlertController, private es: EncuestaService) { }

  ngOnInit() {
    this.formEmpleadores = this.fb.group({
      email:['',Validators.compose([
        Validators.required,
        Validators.pattern(new RegExp(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/))

      ])],
      sexo:['',Validators.compose([
        Validators.required,
      ])], //1
      zona:['',Validators.compose([
        Validators.required,
      ])], //2
      areaLaboral:['',Validators.compose([
        Validators.required,
      ])], //3
      areaOtra:['',Validators.compose([
      ])],
      satisfaccionCompetencias:[], //4, elaborar más para cada radioopcion
      competencia1:['',Validators.compose([
        Validators.required,
      ])],
      competencia2:['',Validators.compose([
        Validators.required,
      ])],
      competencia3:['',Validators.compose([
        Validators.required,
      ])],
      competencia4:['',Validators.compose([
        Validators.required,
      ])],
      competencia5:['',Validators.compose([
        Validators.required,
      ])],
      competencia6:['',Validators.compose([
        Validators.required,
      ])],
      competencia7:['',Validators.compose([
        Validators.required,
      ])],
      competencia8:['',Validators.compose([
        Validators.required,
      ])],
      competencia9:['',Validators.compose([
        Validators.required,
      ])],
      competencia10:['',Validators.compose([
        Validators.required,
      ])],
      debilidadesComentarios:['',Validators.compose([
        Validators.required,
      ])], //pregunta 5
      gradoPertinenciaModelo:['',Validators.compose([
        Validators.required,
      ])],
      gradoSatisfaccion:['',Validators.compose([
        Validators.required,
      ])],
      comentarioFortalezas:['',Validators.compose([
        Validators.required,
      ])],
    });

  }


  async presentAlertModal(){
    const alert = await this.ac.create({
      header: 'ALERTA: ENTREGA DE FORMULARIO DE EMPLEADOR',
      subHeader: 'AVISO',
      message: 'Por favor revise las respuestas ingresadas, se deben de contestar todas',
      cssClass: 'encuestaModal',
      buttons: [{
        text:'Confirmar',
        role:'confirm',
        handler: () => {
          
        }
      },{
        text:'Cancelar',
        role:'cancel',
        handler: () => {
          
        }
      }
      ]

    })
    await alert.present();
  }

  checkEncuesta(){
    /*console.log(this.formEmpleadores.get('email').value);
    console.log(this.formEmpleadores.get('sexo').value);
    console.log(this.formEmpleadores.get('zona').value);
    console.log(this.formEmpleadores.get('areaLaboral').value);
    console.log(this.formEmpleadores.get('competencia1').value);
    console.log(this.formEmpleadores.get('competencia2').value);
    console.log(this.formEmpleadores.get('competencia3').value);
    console.log(this.formEmpleadores.get('competencia4').value);
    console.log(this.formEmpleadores.get('competencia5').value);
    console.log(this.formEmpleadores.get('competencia6').value);
    console.log(this.formEmpleadores.get('competencia7').value);
    console.log(this.formEmpleadores.get('competencia8').value);
    console.log(this.formEmpleadores.get('competencia9').value);
    console.log(this.formEmpleadores.get('competencia10').value);
    console.log(this.formEmpleadores.get('debilidadesComentarios').value);
    console.log(this.formEmpleadores.get('gradoPertinenciaModelo').value);
    console.log(this.formEmpleadores.get('gradoSatisfaccion').value);
    console.log(this.formEmpleadores.get('comentarioFortalezas').value);
    if (this.formEmpleadores.get('areaLaboral').value==='otro') {
      console.log(this.formEmpleadores.get('areaOtra').value)
    }
    */
    console.log(this.formEmpleadores.valid)
    if (!this.formEmpleadores.valid){
      this.presentAlertModal()
    }else{
      let area = ''
      if (this.formEmpleadores.get('areaLaboral').value==='otro') {
        //console.log(this.formEmpleadores.get('areaOtra').value)
        area = this.formEmpleadores.get('areaOtra').value
      }else{
        area = this.formEmpleadores.get('areaLaboral').value
      }
  
      this.encu ={
        email : this.formEmpleadores.get('email').value,
        sexo : this.formEmpleadores.get('sexo').value,
        zona : this.formEmpleadores.get('zona').value,
        areaLaboral : area,
        satisfaccionCompetencias :[
          this.formEmpleadores.get('competencia1').value,
          this.formEmpleadores.get('competencia2').value,
          this.formEmpleadores.get('competencia3').value,
          this.formEmpleadores.get('competencia4').value,
          this.formEmpleadores.get('competencia5').value,
          this.formEmpleadores.get('competencia6').value,
          this.formEmpleadores.get('competencia7').value,
          this.formEmpleadores.get('competencia8').value,
          this.formEmpleadores.get('competencia9').value,
          this.formEmpleadores.get('competencia10').value
        ],
        debilidadesComentarios: this.formEmpleadores.get('debilidadesComentarios').value,
        gradoPertenenciaModelo: this.formEmpleadores.get('gradoPertinenciaModelo').value,
        gradoSatisfaccion:this.formEmpleadores.get('gradoSatisfaccion').value,
        comentarioFortalezas:this.formEmpleadores.get('comentarioFortalezas').value,


      }
      this.es.postEncuestaEmpleador(this.encu)
      console.log('subida exito')
    }
  }


}
