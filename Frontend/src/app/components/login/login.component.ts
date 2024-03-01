import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { loginDetails } from '../../interfaces/login.interface';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  title = 'Login';
  errorMsg!: string;
  successMsg!: string;
  visible = false;
  visible2 = false;
  isAdmin!: Boolean;
  isLoggedIn!: Boolean;
  loginForm!: FormGroup;

    constructor(private fb:FormBuilder, private router: Router, private authservice: AuthService){ 
      this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [ Validators.required ]]
    })
    }

    login(details: loginDetails) {
      console.log(details);
  
      this.authservice.loginUser(details).subscribe(res => {
        console.log(res);
  
        if (res.error) {
          this.visible = true;
          this.errorMsg = res.error;
  
          setTimeout(() => {
            this.visible = false;
          }, 3000);
        } else if (res.message) {
          this.visible2 = true;
          this.successMsg = res.message;
  
          this.authservice.getUserDetails(res.token).subscribe(userDetails => {
            console.log(userDetails);
  
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
  
            if (userDetails.isAdmin) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/']);
            }
          });
  
          localStorage.setItem('token', res.token);
  
          setTimeout(() => {
            this.visible2 = false;
          }, 3000);
        }
      });
    }
}
