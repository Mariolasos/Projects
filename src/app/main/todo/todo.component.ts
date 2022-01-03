import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/shared/database.service';
import { User } from 'src/app/shared/models/user.model';
import { NavigationService } from 'src/app/shared/navigation.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  private user:User;
  private option:string="today";
  constructor(private nav:NavigationService,private db:DatabaseService) { }

  ngOnInit() {
    this.nav.authRedirectCheck();
    if(this.db.getUserLocalStorage()!==null){
      this.user=this.db.getUserLocalStorage();
    }else{
      this.user=this.db.getUserSessionStorage();
    }
  }
}
