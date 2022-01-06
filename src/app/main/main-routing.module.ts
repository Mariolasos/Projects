import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ArchiveComponent } from './archive/archive.component';
import { CreateComponent } from './create/create.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  {path:"",component:TodoComponent},
  {path:"create",component:CreateComponent},
  {path:"archive",component:ArchiveComponent},
  {path:"account",component:AccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
