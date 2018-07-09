import { Component, OnInit, Input, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from '../shared/home.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [HomeService]
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;
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
    this.regForm = this.fb.group({
      'email': [null, Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.email
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ])],
      'ConfPassword': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ])]

    });
  }

  register(user) {
    console.log('type of form ', this.formType);

    this.homeService.registerUser(user).subscribe((response) => {
      this.toastr.success('Registered successfully..!', 'Success');
      this.regForm.reset();
      this.toastr.success(this.message, 'Success');
      this.route.navigate(['/home']);
    }, error => {
      this.regForm.reset();
      this.toastr.error(error.message, 'failed');
      console.log('error while registering..!', error);
    });


  }
}