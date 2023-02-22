import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,Validators,   } from '@angular/forms';
import { FireAuthService } from '../services/fire-auth.service';
import { AlertController } from '@ionic/angular';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public loginForm: FormGroup;
  public valMessage: Object;
  public loggedUser;
  constructor(private router : Router, private fb: FormBuilder, private auth: FireAuthService, private ac: AlertController ) {
    //Obtener usuario
    this.auth.getCurrentUser().subscribe(res => {
      /*if (res !== null){
        console.log(res)
      }else console.log('No user')
      */
      this.loggedUser=res;
    })
    
  }

  ngOnInit(): void {
   //Login form, via email and pw
    this.loginForm = this.fb.group({
      email:['',Validators.compose([
        Validators.required,
        Validators.pattern(new RegExp(/^[a-zA-Z0-9]+@ittepic.edu.mx$/)) //Regex para correos de ittepic
      ])],
      password:['',Validators.compose([
        Validators.required
      ])]
    });
    this.valMessage={
      email:[
        {type:'required', message:'Ingrese un correo'},
        {type:'pattern', message:'Ingrese un correo válido'}
      ],
      password:[{type:'required', message:'Ingrese una contraseña'}]
    }
  }
  //Navigarion methods
  public irAObjetos(){
    this.router.navigate(['/objetos-virtuales'],{});
  }
  public irAEncuesta(){
    this.router.navigate(['pantalla-encuesta'],{});
  }
  //Email and pw login method
  public basicLogin(){
    if(this.loginForm.valid){
      let userData = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      }
      console.log(userData)
      this.auth.signinUser(userData)
        
    }
  }

  public obtenerUsuario(){
    console.log(this.loggedUser)
    console.log(this.loggedUser._delegate.email)
    
  }
  public salir(){
    this.auth.signoutUser();
  }
  //Google signin
  public async googleLogin(){
    this.auth.signinGoogle().then(() => {
      timeout(2000)

      console.log(this.loggedUser)
      if ( this.loggedUser !== null ){
        this.irAObjetos()
      }
    })
  }

  public async loginModal(){
    const alert = await this.ac.create({
      header: 'Ingresar a su cuenta',
      subHeader: 'Ingrese con una cuenta válida de Ittepic',
      cssClass: 'homeAlert',
      buttons: [
        {
          text: 'Ingresar con Google',
          role: 'confirm',
          handler: () => {this.googleLogin()}
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        }
      ]

    });
    await alert.present()
  }
}
