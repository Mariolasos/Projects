import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { TodoComponent } from './todo/todo.component';
import { SharedModule } from '../shared/shared.module';
import { TasksComponent } from './tasks/tasks.component';
import { DateFilterPipe } from './pipes/date-filter.pipe';
import { CreateComponent } from './create/create.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [TodoComponent, TasksComponent, DateFilterPipe, CreateComponent, NavComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
  ]
})
export class MainModule { }
