import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';
import { Resp } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signUp(user:User): Observable<Resp>{
    localStorage.setItem('user', JSON.stringify(user))
    const resp:Resp = {data: user}
    return of(resp)
  }

  logIn(user:User){
    let resp:Resp
    try{
      const storedUser:User = JSON.parse(localStorage.getItem('user'))
      if (user.email === storedUser.email
        && user.password === storedUser.password)
      resp = { data: storedUser }
      else resp = { error: 'email or password is invalid' }
    } catch (e) {
      resp = { error: 'User does not exist' }
    }
    return of(resp)
  }
}
