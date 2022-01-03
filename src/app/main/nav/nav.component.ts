import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/shared/database.service';
import { User } from 'src/app/shared/models/user.model';
import { NavigationService } from 'src/app/shared/navigation.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private user:User;
  constructor(private nav:NavigationService,private db:DatabaseService,private router:Router) { }

  ngOnInit() {
  }

  onLogout(){
    this.db.clearStorages();
    this.router.navigate(['/authentication/login']);
  }
}
