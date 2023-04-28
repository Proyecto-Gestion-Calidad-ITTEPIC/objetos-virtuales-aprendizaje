import { Encuesta } from './../models/encuesta';
import { EncuestaService } from './../services/encuesta.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementRef, Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-encuesta-empleador',
  templateUrl: './encuesta-empleador.page.html',
  styleUrls: ['./encuesta-empleador.page.scss'],
})
export class EncuestaEmpleadorPage implements OnInit {
  public formEmpleadores : FormGroup;

  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.formEmpleadores = this.fb.group({
      email:'',
      sexo:'H', //1
      zona:'', //2
      areaLaboral:'', //3
      areaOtra:'',
      satisfaccionCompetencias:[], //4, elaborar más para cada radioopcion
      competencia1:'',
      competencia2:'',
      competencia3:'',
      competencia4:'',
      competencia5:'',
      competencia6:'',
      competencia7:'',
      competencia8:'',
      competencia9:'',
      competencia10:'',
      debilidadesComentarios:'', //pregunta 5
      gradoPertinenciaModelo:'',
      gradoSatisfaccion:'',
      comentarioFortalezas:''
    });

  }

  checkEncuesta(){
    console.log(this.formEmpleadores.get('competencia1').value);
    if (this.formEmpleadores.get('areaLaboral').value==='otro') {
      console.log(this.formEmpleadores.get('areaOtra').value)
    }
    
  }

}
