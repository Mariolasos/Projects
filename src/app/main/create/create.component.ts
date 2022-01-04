import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/shared/database.service';
import { Todo } from 'src/app/shared/models/todo.model';
import { User } from 'src/app/shared/models/user.model';
import { NavigationService } from 'src/app/shared/navigation.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit,OnDestroy {

  private user:User;
  private sub:Subscription;
  private todo:Todo={title:"Hello!",text:"This is a showcase of your task.",date:new Date(),idUser:"",archive:false,color:null};
  createForm:FormGroup;
  constructor(private nav:NavigationService,private db:DatabaseService,private fb:FormBuilder) { }

  ngOnInit() {
    this.nav.authRedirectCheck();
    if(this.db.getUserLocalStorage()!==null){
      this.user=this.db.getUserLocalStorage();
    }else{
      this.user=this.db.getUserSessionStorage();
    }

    this.createForm=this.fb.group({
      "title" : new FormControl(this.todo.title,Validators.required),
      "text" : new FormControl(this.todo.text,Validators.required),
      "date" : new FormControl(formatDate(this.todo.date,"yyyy-MM-dd","en"),Validators.required),
      "color" : new FormControl()
    });
  }
  
  onCreate(){
    this.todo=this.createForm.value;
    this.todo.idUser=this.user.id;
    if(this.todo.color==null){
      this.todo.color="dark";
    }
    this.todo.archive=false;
    this.sub=this.db.createTodo(this.todo).subscribe(res=>{
      document.location.reload();
    });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
