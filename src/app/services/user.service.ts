import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  jwt: string;

  constructor() {
    
  }

  setJwt(jwt) {
    this.jwt = jwt;
    localStorage.setItem("jwt", jwt);
  }

  getJwt(): string {
    this.checkLocalStorage();    

    if (!this.loggedIn) {
      return "";
    }

    return this.jwt;
  }

  loggedIn(): boolean {
    this.checkLocalStorage();
    return this.jwt && this.jwt.length > 0;
  }

  checkLocalStorage() {
    let token = localStorage.getItem('jwt');
    if (token) {
      this.jwt = token;
    }
  }
}
