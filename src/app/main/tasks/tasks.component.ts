import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/shared/database.service';
import { Todo } from 'src/app/shared/models/todo.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit,OnDestroy {

  private tasks:Todo[];
  private isLoading:boolean=true;
  private sub:Subscription[]=[];
  private editTask:Todo;
  @Input() optionChild = "today";
  @Input() userChild:User;
  constructor(private db:DatabaseService,private http:HttpClient) { }

  ngOnInit() {
    /*this.sub.push(this.http.post("https://noteapp-94851-default-rtdb.europe-west1.firebasedatabase.app/todos.json",{archive:false,
    date:"Sat Jan 05 2022 20:08:57 GMT+0100",idUser:"-MsBOkemXXo5qcvooOzx",text: "Transmission 3x-ca, Engine V6xa, Nitro n2o, Sus...",title: "Car Stuff",color:"dark"}).subscribe());*/
    this.sub.push(this.db.getTodos().subscribe(res=>{
      this.tasks=res.filter(task=>task.idUser==this.userChild.id && task.archive==false);
      this.isLoading=false;
      console.log(this.tasks)}));
  }

  onDelete(taskDel:Todo){
    this.sub.push(this.db.deleteTodo(taskDel.id).subscribe(res=>{
      document.location.reload();
    }));
  }
  
  onEdit(taskEdit:Todo){
    console.log(taskEdit);
  }

  onArchive(taskArch:Todo){
    taskArch.archive=true;
    this.sub.push(this.db.editTodo(taskArch,taskArch.id).subscribe(res=>{
      document.location.reload();
    }));
  }

  ngOnDestroy(): void {
    this.sub.forEach(subscrition=>subscrition.unsubscribe());
  }
}
