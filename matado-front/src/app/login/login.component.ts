import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "./login.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  connexionForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.connexionForm = this.fb.group({
      "login"   : this.fb.control(null, Validators.required),
      "password": this.fb.control(null, Validators.required)
    });
    this.connexionForm.valueChanges.subscribe(next => this.errorMessage = null);
  }

  submit() {
    this.loginService.login(this.connexionForm.value)
      .subscribe(errorMessage => this.errorMessage = errorMessage);
  }
}
