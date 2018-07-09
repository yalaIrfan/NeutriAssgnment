import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { HomeService } from '../shared/home.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css'],
  providers: [HomeService]
})
export class LoginRegComponent implements OnInit {
  //FormControl, FormControlName,
  logForm: FormGroup;
  @Input() formType: boolean = false;
  @Input() formTitle: string;
  message: string = '';
  messageReg: string = '';

  auth: boolean = false;
  data: any;
  constructor(private fb: FormBuilder, private homeService: HomeService, private toastr: ToastrService,
    public route: Router) {
  }

  ngOnInit() {
    this.logForm = this.fb.group({
      'email': [null, Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.email
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ])]
    });
  }

  loginOrReg(user) {
    console.log('type of form ', this.formType);
    if (!this.formType) {
      console.log('1 user is ', user);
      // false mean Register code
      this.homeService.registerUser(user).subscribe((response) => {
        console.log('3 .Registered.! message', JSON.stringify(response));
        this.toastr.success('Registered successfully..!', 'Success');
        this.logForm.reset();
        this.toastr.success(this.message, 'Success');
        this.route.navigate(['/home']);
      }, error => {
        this.logForm.reset();
        this.toastr.error(error.error.message, 'failed');
        console.log('4 .error while registering..!', error);
      });
    }
    else {
      // true mean Login code
      this.homeService.login(user).subscribe((response) => {
        console.log('Response message', (response));
        //this.message = 'Logged in successfully..!';
        this.auth = true;
        this.data = response;
        this.route.navigate(['/product']);
        this.toastr.success(this.message, 'Success');

        localStorage.setItem('auth', 'true');
        localStorage.setItem('token', response.token);

        this.logForm.reset();
      }, error => {
        this.toastr.error(error.error.message, 'failed');
        this.logForm.reset();
        console.log('error while logging..!', error.error.message);
      });
    }
  }
}


