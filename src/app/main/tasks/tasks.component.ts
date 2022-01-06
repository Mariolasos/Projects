import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
  @Input() optionChild = "today";
  @Input() userChild:User;
  @Input() operationChild={delete:false,edit:false,archive:false};
  @Output() editTaskEvent = new EventEmitter<Todo>();
  constructor(private db:DatabaseService,private http:HttpClient) { }

  ngOnInit() {
    /*this.sub.push(this.http.post("https://noteapp-94851-default-rtdb.europe-west1.firebasedatabase.app/todos.json",{archive:true,
    date:"Sat Jan 05 2022 20:08:57 GMT+0100",idUser:"-MsBKsqI73uieLSvNCe6",text: "Transmission 3x-ca, Engine V6xa, Nitro n2o, Sus...",title: "Car Stuff",color:"dark",done:false}).subscribe());*/
    this.sub.push(this.db.getTodos().subscribe(res=>{
      this.tasks=res.filter(task=>task.idUser==this.userChild.id);
      //ARCHIVE  CHECK
      if(this.optionChild=="archive"){
        this.tasks.forEach(task=>{
          let dateStart = new Date();
          let taskDate = new Date(task.date);
          dateStart.setHours(0,0,0);
          if(taskDate<dateStart){
            task.archive=true;
            this.db.editTodo(task,task.id).subscribe();
          }
        });
      }
      this.isLoading=false;
      console.log(this.tasks)}));
  }

  onDelete(taskDel:Todo){
    this.db.deleteTodo(taskDel.id).subscribe(res=>{
      document.location.reload();
    });
  }
  
  onEdit(taskEdit:Todo){
    this.editTaskEvent.emit(taskEdit);
  }

  onArchive(taskArch:Todo){
    taskArch.archive=true;
    this.sub.push(this.db.editTodo(taskArch,taskArch.id).subscribe(res=>{
      document.location.reload();
    }));
  }

  onDone(task:Todo){
    if(this.optionChild!=="archive"){
      task.done=true;
      task.archive=true;
      this.db.editTodo(task,task.id).subscribe(res=>{
        document.location.reload();
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.forEach(subscrition=>subscrition.unsubscribe());
  }
}
