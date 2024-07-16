import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../model/user.model';
import { error } from 'console';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  regFrom!:FormGroup;

  constructor(
    private authService:AuthService,
    private router:Router,
    private fromBulider:FormBuilder
  ){
    this.regFrom=this.fromBulider.group({
      name:['',Validators.required],
      email:['',Validators.required,Validators.email],
      password:['',Validators.required]
    })
  }

  onSubmit():void{

    if(this.regFrom.valid){
      const user:UserModel=this.regFrom.value;
      this.authService.regitration(user).subscribe({
        next:(res)=>{
          console.log('user registration Successfully:',res);
          this.authService.storeToken(res.token);
          this.router.navigate(['/']);

        },
        error:(error)=>{
          console.error('Error registering user:',error);
        }

      });
    }
    else{
      alert("Complete mandatory Filed");
    }

  }


}
