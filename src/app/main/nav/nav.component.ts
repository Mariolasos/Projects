import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private db:DatabaseService,private router:Router) { }

  ngOnInit() {
  }

  onLogout(){
    this.db.clearStorages();
    this.router.navigate(['/authentication/login']);
  }

  toHome(){
    console.log("A")
    this.router.navigate(['/']);
  }
}
