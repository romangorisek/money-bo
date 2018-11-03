import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MoneyApiService } from '../../services/money-api.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(private router: Router, private moneyApi: MoneyApiService, private fb: FormBuilder, private user: UserService) { 
    this.loginForm = fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  login(data) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.moneyApi.login(data).subscribe(result => {
      if (typeof result.access_token !== "undefined") {
        this.user.setJwt(result.access_token);
        this.router.navigateByUrl("/");
      }
    });
  }
}
