import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app'
@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  constructor( private AngularFireAuth: AngularFireAuth ) {  }
  createUser(val) {
    return new Promise<any>((resolve,reject) => {
      this.AngularFireAuth.createUserWithEmailAndPassword(val.email,val.password)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }//createUser

  signinUser(val){
    //This checks the existing users in the firestore database and matches the data
    return new Promise<any>((resolve,reject) => {
      this.AngularFireAuth.signInWithEmailAndPassword(val.email,val.password)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  signoutUser(){
    return new Promise<void>((resolve,reject) => {
      console.log(this.AngularFireAuth.currentUser)
      if (this.AngularFireAuth.currentUser) {
        this.AngularFireAuth.signOut()
          .then( () => {
            console.log('User signed out')
            resolve()
          }).catch( () => {
            reject()
          })
      }
    })
  }

  signinGoogle(){
    const provider = new firebase.default.auth.GoogleAuthProvider(); //Google popup
    console.log(provider)
    //Show popup with login
    return this.oAuthLogin(provider)
      .then(val => {
        console.log('success',val)
      })
      .catch(err => {
        console.log('Something went wrong: '+err)
      })
  }
  private oAuthLogin(provider){
    return this.AngularFireAuth.signInWithPopup(provider); //Create popup for provider login
  }
  getCurrentUser(){
    return this.AngularFireAuth.user; //null if signedout
  }
}
