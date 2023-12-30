import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'hinv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email: string = ''
  password: string = ''

  constructor(private route: Router, private loginservice: LoginService) { }

  ngOnInit(): void {
  }

  login(){
    if(this.loginservice.login(this.email, this.password)){
      this.route.navigateByUrl('/rooms');
    }
  }

  // login(){
  //   if(this.email==="admin@gmail.com" && this.password==="Admin"){
  //     //alert("Login Successfull")
  //     //this.route.navigate(['/rooms', 'add'])
  //     this.route.navigateByUrl('/rooms/add');
  //   }
  // }

}
