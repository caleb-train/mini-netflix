import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Resp } from 'src/app/interfaces/response';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { match, validationMsg } from 'src/app/utils/validators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  auth: string = 'signup'
  signUpForm:FormGroup
  emailMsg; passwordMsg; confirmPasswordMsg;

  constructor(
    private _authService:AuthService,
    private _router:Router,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.createSignUp()
  }

  createSignUp(){
    this.signUpForm = this._formBuilder.group({
      fullName: '',
      email: ['', [Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), Validators.required]],
      passwords: this._formBuilder.group({
        password: ['', [Validators.minLength(5), Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }, {validator: match('password', 'confirmPassword')})
    })
    this.setMessage(this.signUpForm, 'email');
    this.setMessage(this.signUpForm.get('passwords'), 'password');
    this.setMessage(this.signUpForm.get('passwords'), 'confirmPassword');
    this.setMessage(this.signUpForm, 'passwords');
  }

  setMessage(form, field){
    const ctrl:AbstractControl = form.get(field);
    ctrl.markAsTouched;
    this[`${field}Msg`] = validationMsg(field).required
    ctrl.valueChanges.subscribe(_ =>{
      this[`${field === 'passwords' ? 'confirmPassword' : field}Msg`] = ctrl.errors
      ? Object.keys(ctrl.errors).map(key=>validationMsg(field)[key]).join(', ') : ''
    })
  }

  switchAuth(auth){
    this.auth = auth
  }

  submitSignUp(){
    console.log(this.signUpForm);
    this.signUpForm['submitted'] = true;
    if(this.signUpForm.invalid) return
    this._authService.signUp(this.signUpForm.value).subscribe((resp:Resp) => {
      if(resp.data) this._router.navigate(['/home'])
      else if(resp.error) this.toastr.error(resp.error)
    })
  }

  submitLogIn(form:NgForm){
    console.log(form)
    if(form.invalid) return;
    this._authService.logIn(form.value).subscribe((resp:Resp) => {
      if(resp.data) this._router.navigate(['/home'])
      else if(resp.error) this.toastr.error(resp.error)
    })
  }
}
