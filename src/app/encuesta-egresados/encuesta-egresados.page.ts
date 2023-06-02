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

  constructor(private fb : FormBuilder, private es:EncuestaService) { }

  ngOnInit() {
    this.formEgresados = this.fb.group({
      conocimientoPlanEducativo:Validators.compose([Validators.required]), //1
      sexo:Validators.compose([Validators.required]), // 2
      grupoEdad:Validators.compose([Validators.required]), // 3
      desempenandoCarrera:Validators.compose([Validators.required]), //4
      zonaEgreso:Validators.compose([Validators.required]),//5
      zonaOperaciones:Validators.compose([Validators.required]),//6
      txtAreaOtro:Validators.compose([]),//6
      txtAreaTrabajoActual:['',Validators.compose([Validators.required])],//7
      valoradoSentimiento:Validators.compose([Validators.required]),//8

      //9
      competenciagenerica:Validators.compose([Validators.required]),
      competenciagenerica2:Validators.compose([Validators.required]),
      competenciagenerica3:Validators.compose([Validators.required]),
      competenciagenerica4:Validators.compose([Validators.required]),
      competenciagenerica5:Validators.compose([Validators.required]),
      //10
      competenciadesarrollada1:Validators.compose([Validators.required]),
      competenciadesarrollada2:Validators.compose([Validators.required]),
      competenciadesarrollada3:Validators.compose([Validators.required]),
      competenciadesarrollada4:Validators.compose([Validators.required]),
      //11
      competenciadesarrolladaPlanEstudio1:Validators.compose([Validators.required]),
      competenciadesarrolladaPlanEstudio2:Validators.compose([Validators.required]),
      competenciadesarrolladaPlanEstudio3:Validators.compose([Validators.required]),
      competenciadesarrolladaPlanEstudio4:Validators.compose([Validators.required]),
      competenciadesarrolladaPlanEstudio5:Validators.compose([Validators.required]),
      competenciadesarrolladaPlanEstudio6:Validators.compose([Validators.required]),
      competenciadesarrolladaPlanEstudio7:Validators.compose([Validators.required]),
      competenciadesarrolladaPlanEstudio8:Validators.compose([Validators.required]),
      //12
      competenciadesarrolladaPsicopedagogica1:Validators.compose([Validators.required]),
      competenciadesarrolladaPsicopedagogica2:Validators.compose([Validators.required]),
      competenciadesarrolladaPsicopedagogica3:Validators.compose([Validators.required]),
      competenciadesarrolladaPsicopedagogica4:Validators.compose([Validators.required]),
      competenciadesarrolladaPsicopedagogica5:Validators.compose([Validators.required]),
      competenciadesarrolladaPsicopedagogica6:Validators.compose([Validators.required]),
      competenciadesarrolladaPsicopedagogica7:Validators.compose([Validators.required]),
      //13
      competenciadesarrolladaIdentidad1:Validators.compose([Validators.required]),
      competenciadesarrolladaIdentidad2:Validators.compose([Validators.required]),
      competenciadesarrolladaIdentidad3:Validators.compose([Validators.required]),
      competenciadesarrolladaIdentidad4:Validators.compose([Validators.required]),
      //14
      competenciaEtica1:Validators.compose([Validators.required]),
      competenciaEtica2:Validators.compose([Validators.required]),
      competenciaEtica3:Validators.compose([Validators.required]),
      //15
      competenciadesarrolladaIdentidadEmpresa1:Validators.compose([Validators.required]),
      competenciadesarrolladaIdentidadEmpresa2:Validators.compose([Validators.required]),
      competenciadesarrolladaIdentidadEmpresa3:Validators.compose([Validators.required]),
      competenciadesarrolladaIdentidadEmpresa4:Validators.compose([Validators.required]),

      InstitutoEgresado:['',Validators.compose([Validators.required])],//16
      carenciasCarrera:['',Validators.compose([Validators.required])],//17
      carrera:Validators.compose([Validators.required]),//18
      gradoPertinenciaModelo:Validators.compose([Validators.required]),//19
      gradoSatisfaccion:Validators.compose([Validators.required]),//20
      //ISC1
      competenciasParticularesISC1:Validators.compose([Validators.required]),
      competenciasParticularesISC2:Validators.compose([Validators.required]),
      competenciasParticularesISC3:Validators.compose([Validators.required]),
      competenciasParticularesISC4:Validators.compose([Validators.required]),
      competenciasParticularesISC5:Validators.compose([Validators.required]),
      debilidadesISC:['',Validators.compose([Validators.required])],//ISC2

      

    })
  }
  public checarEnc(){
    /*console.log(this.formEgresados.get('conocimientoPlanEducativo').value)
    console.log(this.formEgresados.get('debilidadesISC').value)*/
    console.log(this.formEgresados.valid)
    if (this.formEgresados.valid){

      this.submittedForm = { 
        conocimientoModeloEducativo:this.formEgresados.get('conocimientoPlanEducativo').value, //1
        sexo:this.formEgresados.get('sexo').value, //2
        edad:this.formEgresados.get('grupoEdad').value,//3
        desempenandoCarrera:this.formEgresados.get('desempenandoCarrera').value,//4
        zonaGeografica:this.formEgresados.get('zonaEgreso').value,//5
        areaLaboral:this.formEgresados.get('zonaOperaciones').value,//6
        funcionesDelTrabajo:this.formEgresados.get('txtAreaTrabajoActual').value,//7
        valoracionTrabajo:this.formEgresados.get('valoradoSentimiento').value,//8
        nivelSatisfaccionArray:[
          this.formEgresados.get('competenciagenerica').value,
          this.formEgresados.get('competenciagenerica2').value,
          this.formEgresados.get('competenciagenerica3').value,
          this.formEgresados.get('competenciagenerica4').value,
          this.formEgresados.get('competenciagenerica5').value,
        ], //9
        desempenoLaboralArray:[
          this.formEgresados.get('competenciadesarrollada1').value,
          this.formEgresados.get('competenciadesarrollada2').value,
          this.formEgresados.get('competenciadesarrollada3').value,
          this.formEgresados.get('competenciadesarrollada4').value,
        ], //10
        competenciasDesarrolladas:[
          this.formEgresados.get('competenciadesarrolladaPlanEstudio1').value,
          this.formEgresados.get('competenciadesarrolladaPlanEstudio2').value,
          this.formEgresados.get('competenciadesarrolladaPlanEstudio3').value,
          this.formEgresados.get('competenciadesarrolladaPlanEstudio4').value,
          this.formEgresados.get('competenciadesarrolladaPlanEstudio5').value,
          this.formEgresados.get('competenciadesarrolladaPlanEstudio6').value,
          this.formEgresados.get('competenciadesarrolladaPlanEstudio7').value,
          this.formEgresados.get('competenciadesarrolladaPlanEstudio8').value,
        ],//11
        competenciasPsicopedagogicas:[
          this.formEgresados.get('competenciadesarrolladaPsicopedagogica1').value,
          this.formEgresados.get('competenciadesarrolladaPsicopedagogica2').value,
          this.formEgresados.get('competenciadesarrolladaPsicopedagogica3').value,
          this.formEgresados.get('competenciadesarrolladaPsicopedagogica4').value,
          this.formEgresados.get('competenciadesarrolladaPsicopedagogica5').value,
          this.formEgresados.get('competenciadesarrolladaPsicopedagogica6').value,
          this.formEgresados.get('competenciadesarrolladaPsicopedagogica7').value,
        ],//12
        desarrolloIdentidadCompetencias:[
          this.formEgresados.get('competenciadesarrolladaIdentidad1').value,
          this.formEgresados.get('competenciadesarrolladaIdentidad2').value,
          this.formEgresados.get('competenciadesarrolladaIdentidad3').value,
          this.formEgresados.get('competenciadesarrolladaIdentidad4').value,
        ],//13
        profesionistaEticoCompetencias:[
          this.formEgresados.get('competenciaEtica1').value,
          this.formEgresados.get('competenciaEtica2').value,
          this.formEgresados.get('competenciaEtica3').value,
        ],//14
        identidadSocialCompetencias:[
          this.formEgresados.get('competenciadesarrolladaIdentidadEmpresa1').value,
          this.formEgresados.get('competenciadesarrolladaIdentidadEmpresa2').value,
          this.formEgresados.get('competenciadesarrolladaIdentidadEmpresa3').value,
          this.formEgresados.get('competenciadesarrolladaIdentidadEmpresa4').value,
        ],//15
        institutoEgresado:this.formEgresados.get('InstitutoEgresado').value,//16
        aptitudesCarecientes:this.formEgresados.get('carenciasCarrera').value,//17
        carrera:this.formEgresados.get('carrera').value,//18
        gradoPertinencia:this.formEgresados.get('gradoPertinenciaModelo').value,//19
        gradoSatisfaccion:this.formEgresados.get('gradoSatisfaccion').value,//20

        //ISC
        gradoSatisfaccionISC:[
          this.formEgresados.get('competenciasParticularesISC1').value,
          this.formEgresados.get('competenciasParticularesISC2').value,
          this.formEgresados.get('competenciasParticularesISC3').value,
          this.formEgresados.get('competenciasParticularesISC4').value,
          this.formEgresados.get('competenciasParticularesISC5').value,
        ],//37
        habilidadesParaFortalecerISC:this.formEgresados.get('debilidadesISC').value
       }
       if(this.formEgresados.get('zonaOperaciones').value==='otro'){
        this.submittedForm.areaLaboral=this.formEgresados.get('txtAreaOtro').value
       }
       console.log(this.submittedForm)
       this.es.postEncuestaEgresados(this.submittedForm)
    }
    if (this.formEgresados.get('zonaOperaciones').value=='otro'){

    }
  }
}
