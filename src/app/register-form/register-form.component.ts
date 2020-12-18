import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from './validator';
import { ServiceService } from '../service/service.service';
import { User } from '../model';
// import {userList} from '../data'

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder,private router: Router,private service: ServiceService) { }

  ngOnInit() {

      this.registerForm = this.formBuilder.group({
          // title: ['', Validators.required],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          mobileNo:['',[ Validators.required,
            Validators.pattern("^[0-9]*$"),
            Validators.minLength(10), Validators.maxLength(10)]],
          gender:['',Validators.required],
          address:['',Validators.required],
          password: ['', [Validators.required]],
          confirmPassword: ['', Validators.required],
          
      }, {
        validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  
  onSubmit(data) {
      this.submitted = true;
      console.log(this.registerForm.value,'fkjf')
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
          this.registerForm.reset();

      }else{
        this.router.navigate(['/login']);
        alert(JSON.stringify(this.registerForm.value));
        const obj = {
            "firstName": data.firstName,
            "lastName": data.lastName,
            "email": data.email,
            "mobileNo": data.mobileNo,
            "address": data.address,            
            "gender": data.gender,
            "password": data.password,
            "confirmPassword":data.confirmPassword
        }
        this.service.createuser(obj).subscribe(data =>{
          console.log('sucess'); 
        });
      }
}

   

}
