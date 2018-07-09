import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { ProductService } from '../shared/product.service';
import { FileValidator } from '../shared/file.validater';
import { Product } from '../shared/product';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload'
import { HttpClient, HttpHeaders } from '@angular/common/http';


const url = '/api/products';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})


export class ProductComponent implements OnInit {
  products: Product[] = [];
  prodForm: FormGroup;
  file: File;
  messageSuc: string = '';
  messageErr: string = '';
  noRec = '';
  attchMent: any = [];
  selectedFile: any;
  authonticated: string;
  constructor(private fb: FormBuilder, private toastr: ToastrService, private prodService: ProductService,
    public route: Router, private http: HttpClient) {

  }
  uploader: FileUploader = new FileUploader({ url: url });
  user: string = '';
  ngOnInit() {

    this.authonticated = localStorage.getItem('auth');
    this.user = localStorage.getItem('user');

    this.getAllProducts();
    this.prodForm = this.fb.group({
      'name': [null, Validators.compose([
        Validators.required,
        Validators.maxLength(50),

      ])],
      'price': [null, Validators.compose([
        Validators.required,

      ])],
      'productImage': new FormControl("", [FileValidator.validate])

    });
    if (this.products.length == 0) {
      this.noRec = 'No records found.!'
    } else {
      this.noRec = ''
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('auth');

    this.route.navigate(['/home']);

  }
  onFileChange($event) {
    this.file = $event.target.files[0]; // 
    this.prodForm.controls['productImage'].setValue(this.file ? this.file.name : '');
  }

  getAllProducts() {
    this.prodService.getAllProducts().subscribe((res) => {
      if (res) {
        this.products = res as any[];
        this.noRec = '';

        if (this.products.length == 0) {
          this.noRec = 'No records found.!'
        } else {
          this.noRec = ''
        }
      }
      this.messageSuc = '';
      this.messageErr = '';

    },
      err => {
        console.log('error while retriving products');
      }
    );
  }


  addProduct(form) {
    //this.uploader.queue[0].upload();
    this.noRec = ''
    const fd = new FormData();
    fd.append('productImage', this.file, this.file.name);
    fd.append('name', form.name);
    fd.append('price', form.price);

    let token = localStorage.getItem('token');

    let headers = new HttpHeaders({ 'token': `bearer ${token}` });


    // this.http.post('/api/products', fd, { headers }).subscribe((res) => {
    this.http.post('/api/products', fd).subscribe((res) => {
      this.messageSuc = 'Product created..!';
      this.route.navigate(['/product']);
      this.prodForm.reset();
      this.messageErr = '';
      this.getAllProducts();
    },
      err => {
        this.messageSuc = '';
        this.route.navigate(['/product']);
        this.getAllProducts();

        this.messageErr = err.error.message;
        console.log('error while retriving products', err);
      }
    );

  }







}



// export interface Product {
//   name: string;
//   id: string;
//   price: number;
//   productImage: string;



// }