import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Materia } from '../models/materia';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MateriaServiceService {
  private materias: Materia[]=[]

  constructor(private firestore:AngularFirestore) { 
    this.materias=[

    ]
  }//constructor
  
  public getMaterias(): Observable<Materia[]>{
    return this.firestore.collection('materias').snapshotChanges()
    .pipe(map(actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as Materia;
        const id = a.payload.doc.id;
        return {id,...data}
      })
    }));
  }
  /*Unused*/
  public getMateriaById(id: string){
    return this.firestore.collection('materias').doc(id).valueChanges();
  }
  /*Unused*/
  public getMateriaByNombre(n: string){
    return this.firestore.collection('materias',ref => ref.where('nombre','==',n)).valueChanges()
  }

}//class


