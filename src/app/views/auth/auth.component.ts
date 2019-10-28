import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  auth: string = 'signup'
  constructor() {

  }

  ngOnInit() {
  }

  switchAuth(auth){
    this.auth = auth
  }

}
