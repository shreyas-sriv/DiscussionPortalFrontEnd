import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[AppService]
})
export class RegisterComponent implements OnInit {

  constructor(private _appService:AppService, private router:Router) { }

  register={username: "",
            password: ""};
  userId={};
  status={};

  ngOnInit() {
    if(window.localStorage.getItem('userId')) { 
      this.logout();
    }
  }

  logout() {
    this.status = this._appService.logout().subscribe(res=>res.status);
    window.localStorage.removeItem('userId');
    this.router.navigateByUrl('/login');
  }

  loginPage() {
    this.router.navigateByUrl("/login");
  }

  submitNewUser() {
    this._appService.addNewUser(this.register)
    .subscribe(resAppData => {
      if(resAppData.status=="success") {
        this.router.navigateByUrl("/login");
    }}); 
  }
}
