import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/shared/database.service';
import { Todo } from 'src/app/shared/models/todo.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit,OnDestroy {

  private tasks:Todo[];
  private sub:Subscription;
  @Input() optionChild = "today";
  constructor(private db:DatabaseService) { }

  ngOnInit() {
    this.sub=this.db.getTodos().subscribe(res=>{this.tasks=res});
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
