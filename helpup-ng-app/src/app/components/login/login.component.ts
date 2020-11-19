import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {ApiService} from '../../services/ApiService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  regForm: FormGroup;
  errorMessage: string;

  constructor(private http: HttpClient, private cookies: CookieService, private router: Router, private apiService: ApiService) {
    this.regForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const username = this.regForm.get('username').value;
    const password = this.regForm.get('password').value;
    this.apiService.authUser(username, password).subscribe((token: { jwt: any }) => {
        this.cookies.set('jwt', token.jwt);
        this.router.navigateByUrl('');
        this.apiService.whoAmI().subscribe((message) => {
          this.cookies.set('username', message.string);
        });
      },
      (error) => {
        // Forbidden
        if (error.status === 403) {
          this.errorMessage = 'Incorrect username or password.';
        }
      }
    );
  }
}
