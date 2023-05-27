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
  public submittedForm: EncuestaEgresado
  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.formEgresados = this.fb.group({
      conocimientoPlanEducativo:Validators.compose([Validators.required]),
      sexo:Validators.compose([Validators.required]),
      desempenandoCarrera:Validators.compose([Validators.required]),
      zonaEgreso:Validators.compose([Validators.required]),
      zonaOperaciones:Validators.compose([Validators.required]),
      txtAreaOtro:Validators.compose([]),
      valoradoSentimiento:Validators.compose([Validators.required]),
      txtAreaTrabajoActual:['',Validators.compose([Validators.required])],

      competenciagenerica:Validators.compose([Validators.required]),
      competenciagenerica2:Validators.compose([Validators.required]),
      competenciagenerica3:Validators.compose([Validators.required]),
      competenciagenerica4:Validators.compose([Validators.required]),
      competenciagenerica5:Validators.compose([Validators.required]),

      competenciadesarrollada1:Validators.compose([Validators.required]),
      competenciadesarrollada2:Validators.compose([Validators.required]),
      competenciadesarrollada3:Validators.compose([Validators.required]),
      competenciadesarrollada4:Validators.compose([Validators.required]),

      competenciadesarrolladaPlanEstudio1:Validators.compose([Validators.required]),
      competenciadesarrolladaPlanEstudio2:Validators.compose([Validators.required]),
      competenciadesarrolladaPlanEstudio3:Validators.compose([Validators.required]),
      competenciadesarrolladaPlanEstudio4:Validators.compose([Validators.required]),
      competenciadesarrolladaPlanEstudio5:Validators.compose([Validators.required]),
      competenciadesarrolladaPlanEstudio6:Validators.compose([Validators.required]),
      competenciadesarrolladaPlanEstudio7:Validators.compose([Validators.required]),
      competenciadesarrolladaPlanEstudio8:Validators.compose([Validators.required]),

      competenciadesarrolladaPsicopedagogica1:Validators.compose([Validators.required]),
      competenciadesarrolladaPsicopedagogica2:Validators.compose([Validators.required]),
      competenciadesarrolladaPsicopedagogica3:Validators.compose([Validators.required]),
      competenciadesarrolladaPsicopedagogica4:Validators.compose([Validators.required]),
      competenciadesarrolladaPsicopedagogica5:Validators.compose([Validators.required]),
      competenciadesarrolladaPsicopedagogica6:Validators.compose([Validators.required]),
      competenciadesarrolladaPsicopedagogica7:Validators.compose([Validators.required]),

      competenciadesarrolladaIdentidad1:Validators.compose([Validators.required]),
      competenciadesarrolladaIdentidad2:Validators.compose([Validators.required]),
      competenciadesarrolladaIdentidad3:Validators.compose([Validators.required]),
      competenciadesarrolladaIdentidad4:Validators.compose([Validators.required]),

      competenciadesarrolladaIdentidadEmpresa1:Validators.compose([Validators.required]),
      competenciadesarrolladaIdentidadEmpresa2:Validators.compose([Validators.required]),
      competenciadesarrolladaIdentidadEmpresa3:Validators.compose([Validators.required]),
      competenciadesarrolladaIdentidadEmpresa4:Validators.compose([Validators.required]),

      competenciaEtica1:Validators.compose([Validators.required]),
      competenciaEtica2:Validators.compose([Validators.required]),
      competenciaEtica3:Validators.compose([Validators.required]),

      InstitutoEgresado:['',Validators.compose([Validators.required])],
      carenciasCarrera:['',Validators.compose([Validators.required])],
      carrera:Validators.compose([Validators.required]),
      gradoPertinenciaModelo:Validators.compose([Validators.required]),
      gradoSatisfaccion:Validators.compose([Validators.required]),

      competenciasParticularesISC1:Validators.compose([Validators.required]),
      competenciasParticularesISC2:Validators.compose([Validators.required]),
      competenciasParticularesISC3:Validators.compose([Validators.required]),
      competenciasParticularesISC4:Validators.compose([Validators.required]),
      competenciasParticularesISC5:Validators.compose([Validators.required]),
      debilidadesISC:['',Validators.compose([Validators.required])],

      

    })
  }
  public checarEnc(){
    /*console.log(this.formEgresados.get('conocimientoPlanEducativo').value)
    console.log(this.formEgresados.get('debilidadesISC').value)*/
    console.log(this.formEgresados.valid)
    if (this.formEgresados.valid){
      //this.submittedForm = {  }
    }
    if (this.formEgresados.get('zonaOperaciones').value=='otro'){

    }
  }
}
