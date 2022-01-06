import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/shared/database.service';
import { NavigationService } from 'src/app/shared/navigation.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private db:DatabaseService,private router:Router, private nav:NavigationService) { }

  ngOnInit() {
    this.nav.authRedirectCheck();
  }

  onLogout(){
    this.db.clearStorages();
    this.router.navigate(['/authentication/login']);
  }

  toHome(){
    this.router.navigate(['/']);
  }
  
  toCreate(){
    this.router.navigate(['/create']);
  }

  toArchive(){
    this.router.navigate(['/archive']);
  }

  toAccount(){
    this.router.navigate(['/account']);
  }
}
