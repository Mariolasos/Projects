import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /*
    this.nav.authRedirectCheck();
    if(this.db.getUserLocalStorage()!==null){
      this.user=this.db.getUserLocalStorage();
    }else{
      this.user=this.db.getUserSessionStorage();
    }
    */
  }

}
