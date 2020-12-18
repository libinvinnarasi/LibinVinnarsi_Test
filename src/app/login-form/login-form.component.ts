import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  LoginForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder,private router: Router) { }

    ngOnInit() {
        this.LoginForm = this.formBuilder.group({           
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.LoginForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.LoginForm.invalid) {
          return;
      }else{
        this.router.navigate(['/user-detail']);
        alert(JSON.stringify(this.LoginForm.value));


      }
 }
 

}
