import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/shared/database.service';
import { User } from 'src/app/shared/models/user.model';
import { NavigationService } from 'src/app/shared/navigation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {

  registerForm:FormGroup;
  sub:Subscription;
  constructor(private fb:FormBuilder,private db:DatabaseService,private nav:NavigationService,private router:Router) { }

  ngOnInit() {
    this.nav.mainRedirectCheck();
    this.registerForm=this.fb.group({
      "firstName" : new FormControl("",[Validators.required,Validators.pattern("^([a-zA-Zšđčćž]+)$")]),
      "lastName" : new FormControl("",[Validators.required,Validators.pattern("^([a-zA-Zšđčćž]+)$")]),
      "username" : new FormControl("",[Validators.required,Validators.minLength(3),Validators.pattern("^(?=.*[A-Z])([a-zA-Z0-9]+)$")]),
      "password" : new FormControl("",[Validators.required,Validators.minLength(6),Validators.pattern("^(?=.*[A-Z])(?=.*[0-9])([a-zA-Z0-9]+)$")]),
      "confirmPassword" : new FormControl("",[Validators.required]),
      "email" : new FormControl("",[Validators.required,Validators.email])
    });
  }

  onRegister(){
    let user:User=this.registerForm.value;
    delete user.confirmPassword;
    this.registerForm.value.confirmPassword=this.registerForm.value.password;
    this.sub=this.db.addUser(user).subscribe(res=>{
      this.router.navigate(["/authentication/login"]);
    });
  }

  ngOnDestroy(): void {
      //this.sub.unsubscribe();
  }
}
