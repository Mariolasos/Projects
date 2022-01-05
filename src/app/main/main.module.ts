import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { TodoComponent } from './todo/todo.component';
import { SharedModule } from '../shared/shared.module';
import { TasksComponent } from './tasks/tasks.component';
import { DateFilterPipe } from './pipes/date-filter.pipe';
import { CreateComponent } from './create/create.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchiveComponent } from './archive/archive.component';
import { ArchiveFilterPipe } from './pipes/archive-filter.pipe';

@NgModule({
  declarations: [TodoComponent, TasksComponent, DateFilterPipe, CreateComponent, NavComponent, ArchiveComponent, ArchiveFilterPipe],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
