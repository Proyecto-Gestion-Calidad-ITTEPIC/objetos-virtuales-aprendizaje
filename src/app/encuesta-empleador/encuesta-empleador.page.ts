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
      sexo:'Hombre', //1
      zona:'', //2
      areaLaboral:'', //3
      satisfaccionCompetencias:[], //4, elaborar más para cada radioopcion
      competencia1:0,
      competencia2:0,
      competencia3:0,
      competencia4:0,
      competencia5:0,
      competencia6:0,
      competencia7:0,
      competencia8:0,
      competencia9:0,
      debilidadesComentarios:'', //pregunta 5
      gradoPertinenciaModelo:0,
      gradoSatisfaccion:0,
      comentarioFortalezas:''
    });

  }

}
