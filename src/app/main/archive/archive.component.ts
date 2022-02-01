import { Component, DoBootstrap, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/database.service';
import { Todo } from 'src/app/shared/models/todo.model';
import { User } from 'src/app/shared/models/user.model';
import { NavigationService } from 'src/app/shared/navigation.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  user:User;
  todos:Todo[];
  option:string="archive";
  operation = {delete:true,edit:false,archive:false};
  statistic = {done:0,notDone:0,perc:0}
  constructor(private db:DatabaseService,private nav:NavigationService) { }

  ngOnInit() {
    this.nav.authRedirectCheck();
    this.db.getUserLocalStorage()!==null ? this.user=this.db.getUserLocalStorage() : this.user=this.db.getUserSessionStorage();
    this.db.getTodos().subscribe(res=>{
      res.filter(task=>task.idUser==this.user.id)
      .forEach(task=>{
        if(task.archive==true&&task.done==true){
          this.statistic.done++;
        }else if(task.archive==true&&task.done==false){
          this.statistic.notDone++;
        }
      });
      this.statistic.perc=Math.round(this.statistic.done*100/(this.statistic.done+this.statistic.notDone));
    });
  }

}
