import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { HomeService } from '../shared/home.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ToastrService } from 'ngx-toastr';
import { PasswordValidation } from '../shared/pass.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [HomeService]
})
export class RegisterComponent implements OnInit {
  //FormControl, FormControlName,
  logForm: FormGroup;
  messageSuc: string = '';
  messageErr: string = '';

  auth: boolean = true;
  data: any;
  dis: boolean = false;
  constructor(private fb: FormBuilder, private homeService: HomeService, private toastr: ToastrService,
    public route: Router) {
    this.logForm = this.fb.group({
      'email': [null, Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.email,
        Validators.pattern('[^ @]*@[^ @]*')
      ])],
      'name': [null, Validators.compose([
        Validators.required,
        Validators.maxLength(50),
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ])], 'confPassword': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ])]

    }, {
        validator: PasswordValidation.MatchPassword
      });
  }
  passwordGroup: FormGroup;
  ngOnInit() {


    this.passwordGroup = new FormGroup({
      password: new FormControl(),
      confPassword: new FormControl()
    });

  }

  loginOrReg(user) {

    delete user.confPassword;
    this.homeService.registerUser(user).subscribe((response) => {
      this.messageSuc = 'Registered successfully..!';
      this.messageErr = ''
      this.logForm.reset();
      this.route.navigate(['/home']);
    }, error => {
      this.logForm.reset();
      this.messageErr = error.error.message;
      this.messageSuc = '';
      console.log('4 .error while registering..!', error);
    });

  }

}
