import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Encuesta } from '../models/encuesta';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private encuestas: Encuesta[]=[]
  constructor(private firestore:AngularFirestore) { 
    this.encuestas=[]
  }
  //Obtain polls
  public getEncuestas(): Observable<Encuesta[]>{
    return this.firestore.collection('encuestas').snapshotChanges()
    .pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Encuesta;
        const id = a.payload.doc.id;
        return {id,...data}
      })
    }));
  }

  //Post a poll result on the db
  public postEncuesta(encuesta:Encuesta){
    this.firestore.collection('encuestas').add(encuesta)
  }

}
