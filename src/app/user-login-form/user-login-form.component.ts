import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {

  @Input() userDetails = { Username: '', Password: '' };

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

ngOnInit(): void {
}

loginUser(): void {
    this.fetchApiData.userLogin(this.userDetails).subscribe((result) => {
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('token', result.token);
     this.dialogRef.close();
     console.log(result.user);
     
     this.router.navigate(['movies']);

     this.snackBar.open('login successful!', 'OK', {
      duration: 2000
     });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  }