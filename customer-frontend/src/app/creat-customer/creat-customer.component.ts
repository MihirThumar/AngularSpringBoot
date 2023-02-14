import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../service/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Token } from '../classes/token';

@Component({
  selector: 'app-creat-customer',
  templateUrl: './creat-customer.component.html',
  styleUrls: ['./creat-customer.component.css']
})
export class CreatCustomerComponent implements OnInit {

  id!: number;
  customer: Customer = new Customer();
  token: Token = new Token();

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.customer.gender = 'male';
    this.id = this.route.snapshot.params['id'];
    if (this.id != null) {
      this.customerService.getCustomerById(this.id).subscribe(data => {
        this.customer = data;
      }, error => console.log(error));
    }
    let today: any = new Date();
    let day: any = today.getDate();
    let month: any = today.getMonth() + 1;
    let year: string | number = today.getFullYear();
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
    today = year + '-' + month + '-' + day;
    document.getElementById('dateofbirth')?.setAttribute('max', today);
    this.maxDate = today;
  }

  isSubmitted: boolean = false;
  minDate: any = "1950-01-01";
  maxDate: any;
  dateMssg: any;
  newDate: any;
  gender_mssg: any;
  error_mssg!: String;

  // select the customer is new or old
  onSubmit_func(e: any) {
    if (this.id == null) {
      this.onSubmit();
    } else {
      this.onUpdate();
    }
  }

  // create customer
  onSubmit() {
    const response = grecaptcha.getResponse();
    if (!response) {
      this.recaptcha?.setErrors({'false': true});
    } else {
      this.newDate = this.dateOfBirth?.value;
      let d_input: any = new Date(this.newDate);
      if (this.form.invalid) {
        this.form.setErrors({ 'incoorect': true });
      } else {
          if (this.newDate <= this.maxDate && d_input.getFullYear() >= 1950) {
            this.customerService.postToken(this.token).subscribe(data =>{});
            this.customerService.createCustomre(this.customer).subscribe(data => {
              this.router.navigate(['/customer']);
            },
              error => {
                this.error_mssg = error.error;
              });
        } else if(d_input.getFullYear() <= 1950) {
          this.dateOfBirth?.setErrors({ 'past': true });
        }else {
          this.dateOfBirth?.setErrors({ 'future': true });
        }
      }
    }
  }

  // edit customer
  onUpdate() {
    const response = grecaptcha.getResponse();
    this.token.recaptchaToken = response;
    console.log(response);
    if (response.length === 0) {
      this.recaptcha?.setErrors({'false': true});
    }
      this.newDate = this.dateOfBirth?.value;
      let d_input: any = new Date(this.newDate);
      if (this.form.invalid) {
        this.form.setErrors({ 'incoorect': true });
      } else {
        if (this.newDate <= this.maxDate && d_input.getFullYear() >= 1950) {
            this.customerService.postToken(this.token).subscribe(data =>{});
            this.customerService.updateCustomer(this.id, this.customer).subscribe(data => {
              this.router.navigate(['/customer']);
            },
              error => {
                this.error_mssg = error.error;
              });
        } else if(d_input.getFullYear() <= 1950) {
          this.dateOfBirth?.setErrors({ 'past': true });
        }else {
          this.dateOfBirth?.setErrors({ 'future': true });
        }
      }
  }

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z!@#$%\^&*)(+=._-]*$/)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z!@#$%\^&*)(+=._-]*$/)]),
    dateOfBirth: new FormControl(new Date(), [Validators.required]),
    mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    addressOne: new FormControl(''),
    addressTwo: new FormControl(''),
    age: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{0,3}$/), Validators.min(18), Validators.max(100)]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^\w+@[a-zA-Z0-9_]+?\.[a-zA-Z]{2,3}$/)]),
    recaptcha: new FormControl(null,[Validators.required])
  });

  get control() {
    return this.form.controls;
  }
  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get dateOfBirth() {
    return this.form.get('dateOfBirth');
  }
  get mobileNumber() {
    return this.form.get('mobileNumber');
  }
  get addressOne() {
    return this.form.get('addressOne');
  }
  get addressTwo() {
    return this.form.get('addressTwo');
  }
  get age() {
    return this.form.get('age');
  }
  get gender() {
    return this.form.get('gender');
  }
  get email() {
    return this.form.get('email');
  }
  get recaptcha() {
    return this.form.get('recaptcha');
  }

  // validate firstname to accept only 30 letters
  first_func(e: any) {
    if (e.target.value.length >= 30) {
      e.target.preventDefault();
    }
  }

  // validate lastname to accept only 30 letters
  last_func(e: any) {
    if (e.target.value.length >= 30) {
      e.target.preventDefault();
    }
  }

  // validate number to accepr only number, space, plus and 30 letters
  mobile_func(e: any): any {
    let number = String.fromCharCode(e.which);

    if (!new RegExp(/^[0-9+\s]*$/).test(number)) {
      return false
    } else if (e.target.value.length >= 17) {
      e.target.preventDefault();
    }
  }

  // validate 3 letters
  age_func(e: any): any {
    if (e.target.value.length >= 3) {
      e.target.preventDefault();
    }
  }
}
