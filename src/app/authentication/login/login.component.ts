import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/shared/database.service';
import { Alert } from 'src/app/shared/models/alert.model';
import { User } from 'src/app/shared/models/user.model';
import { NavigationService } from 'src/app/shared/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  loginForm:FormGroup;
  sub:Subscription;
  alert:Alert={show:false,message:""};
  constructor(private fb:FormBuilder,private db:DatabaseService,private router:Router,private nav:NavigationService) {
  }

  ngOnInit() {
    this.nav.mainRedirectCheck();
    this.loginForm=this.fb.group({
      "username" : new FormControl("",Validators.required),
      "password" : new FormControl("",Validators.required),
      "rememberMe" : new FormControl("",)
    });
  }

  onLogin(){
    this.clearAlert();
    if(this.loginForm.valid){
      let userNotSet:boolean=true;
      this.sub=this.db.getUsers().subscribe(res=>{
        res.forEach(user=>{
          if(user.username==this.loginForm.value.username && user.password==this.loginForm.value.password){
            userNotSet=this.storage(user);
            this.router.navigate([""]);
          }
        });
        if(userNotSet){
          this.alert={show:true,message:"Username or password is incorrect!"};
        }
      });
    }else{
      this.alert={show:true,message:"Please fill all the fields!"};
    }
  }

  clearAlert(){
    this.alert={show:false,message:""};
  }

  storage(user:User):boolean{
    if(this.loginForm.value.rememberMe){
      localStorage.setItem("user",JSON.stringify(user));
    }else{
      sessionStorage.setItem("user",JSON.stringify(user));
    }
    return false;
  }

  ngOnDestroy(): void {
      //this.sub.unsubscribe();
  }
}
