import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit {

  userData: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * allows user to edit their data, such as Username, password, email, and birthday
   */
  // editUser(): void {
  //   this.fetchApiData.editUser(this.userData).subscribe((result) => {
  //     this.dialogRef.close();
  //     console.log(result);
  //     this.snackBar.open('Successfully updated profile!', 'OK', {
  //       duration: 2000,
  //     });
  //     // Log out user if they update Username or Password to avoid errors
  //     if (this.userData.Username || this.userData.Password) {
  //       localStorage.clear();
  //       this.router.navigate(['welcome']);
  //       this.snackBar.open(
  //         'Please login again with your new credentials',
  //         'OK',
  //         {
  //           duration: 2000,
  //         }
  //       );
  //     }
  //   });
  // }
}