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
  messageSuc: string = '';
  messageErr: string = '';
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
        Validators.email,
        Validators.pattern('[^ @]*@[^ @]*')
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ])]
    });
  }

  loginOrReg(user) {
    this.homeService.login(user).subscribe((response) => {
      this.auth = true;
      this.data = response;
      this.route.navigate(['/product']);

      localStorage.setItem('user', response.user);

      localStorage.setItem('auth', 'true');
      localStorage.setItem('token', response.token);

      this.logForm.reset();
    }, error => {
      this.logForm.reset();
      this.messageSuc = '';
      this.messageErr = error.error.message;
    });


  }
}


