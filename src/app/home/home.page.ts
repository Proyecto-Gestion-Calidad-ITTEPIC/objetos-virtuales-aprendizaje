import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,Validators,   } from '@angular/forms';
import { FireAuthService } from '../services/fire-auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public loginForm: FormGroup;
  public valMessage: Object;
  constructor(private router : Router, private fb: FormBuilder, private auth: FireAuthService) {}

  ngOnInit(): void {
   
    this.loginForm = this.fb.group({
      email:['',Validators.compose([
        Validators.required,
        Validators.pattern(new RegExp(/^[a-zA-Z0-9]+@ittepic.edu.mx$/))
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

  public irAObjetos(){
    this.router.navigate(['/objetos-virtuales'],{});
  }
  public irAEncuesta(){
    this.router.navigate(['pantalla-encuesta'],{});
  }
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
    this.auth.getCurrentUser().subscribe(res => {
      if (res !== null){
        console.log(res)
      }else console.log('No user')
    })
    
  }
  public salir(){
    this.auth.signoutUser();
  }
  public googleLogin(){
    this.auth.signinGoogle();
  }
}
