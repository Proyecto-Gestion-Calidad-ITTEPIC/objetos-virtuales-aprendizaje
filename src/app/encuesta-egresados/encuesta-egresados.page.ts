import { Component, OnInit } from '@angular/core';
import { Encuesta } from '../models/encuesta';
import { EncuestaService } from './../services/encuesta.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EncuestaEgresado } from '../models/encuesta-egresado';
@Component({
  selector: 'app-encuesta-egresados',
  templateUrl: './encuesta-egresados.page.html',
  styleUrls: ['./encuesta-egresados.page.scss'],
})
export class EncuestaEgresadosPage implements OnInit {
  public formEgresados: FormGroup
  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.formEgresados = this.fb.group({

      competenciagenerica:Validators.compose([
        Validators.required
      ]),
      competenciagenerica2:Validators.compose([
        Validators.required
      ]),
      competenciagenerica3:Validators.compose([
        Validators.required
      ]),
      competenciagenerica4:Validators.compose([
        Validators.required
      ]),
      competenciagenerica5:Validators.compose([
        Validators.required
      ]),
      competenciadesarrollada1:Validators.compose([
        Validators.required
      ]),
      competenciadesarrollada2:Validators.compose([
        Validators.required
      ]),
      competenciadesarrollada3:Validators.compose([
        Validators.required
      ]),
      competenciadesarrollada4:Validators.compose([
        Validators.required
      ]),
      competenciadesarrolladaPlanEstudio1:Validators.compose([
        Validators.required
      ]),
      competenciadesarrolladaPlanEstudio2:Validators.compose([
        Validators.required
      ]),
      competenciadesarrolladaPlanEstudio3:Validators.compose([
        Validators.required
      ]),
      competenciadesarrolladaPlanEstudio4:Validators.compose([
        Validators.required
      ]),
      competenciadesarrolladaPlanEstudio5:Validators.compose([
        Validators.required
      ]),
      competenciadesarrolladaPlanEstudio6:Validators.compose([
        Validators.required
      ]),
      competenciadesarrolladaPlanEstudio7:Validators.compose([
        Validators.required
      ]),
      competenciadesarrolladaPlanEstudio8:Validators.compose([
        Validators.required
      ]),

    })
  }

}
