import { formatDate } from '@angular/common';
import { Component, OnInit,} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/shared/database.service';
import { Todo } from 'src/app/shared/models/todo.model';
import { User } from 'src/app/shared/models/user.model';
import { NavigationService } from 'src/app/shared/navigation.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user:User;
  isEditable:boolean=false;
  todo:Todo={title:"Hello!",text:"This is a showcase of your task.",date:new Date(),idUser:"",archive:false,color:null};
  accountForm:FormGroup;
  option:string = "account";
  operation = {delete:true,edit:true,archive:true};
  constructor(private db:DatabaseService, private nav:NavigationService, private fb:FormBuilder) { }

  ngOnInit() {
    this.nav.authRedirectCheck();
    this.db.getUserLocalStorage()!==null ? this.user=this.db.getUserLocalStorage() : this.user=this.db.getUserSessionStorage();

    this.accountForm=this.fb.group({
      "title" : new FormControl(this.todo.title,Validators.required),
      "text" : new FormControl(this.todo.text,Validators.required),
      "date" : new FormControl(formatDate(this.todo.date,"yyyy-MM-dd","en"),Validators.required),
      "color" : new FormControl()
    });
  }

  edit(todoEdit:Todo){
    this.isEditable=true;
    this.todo=Object.assign({},todoEdit);
  }

  onEdit(){
    if(this.accountForm.value.color==null){
      this.todo.color="dark";
    }else{
      this.todo.color=this.accountForm.value.color;
    }
    this.todo.title=this.accountForm.value.title;
    this.todo.text=this.accountForm.value.text;
    this.todo.date=this.accountForm.value.date;
    this.db.editTodo(this.todo,this.todo.id).subscribe(res=>{
      document.location.reload();
    })
  }

}
