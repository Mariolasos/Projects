import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router:Router) { }

  authRedirectCheck(){
    if(localStorage.getItem("user")===null && sessionStorage.getItem("user")===null){
      this.router.navigate(["/authentication/login"]);
    }
  }

  mainRedirectCheck(){
    if(localStorage.getItem("user")!==null && sessionStorage.getItem("user")!==null){
      this.router.navigate([""]);
    }
  }
}
