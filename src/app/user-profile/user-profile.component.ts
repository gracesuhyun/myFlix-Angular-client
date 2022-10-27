import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
     this.user = resp;
     console.log(this.user);
    });
  }

  // openEditProfileDialog(): void {
  //   this.dialog.open(EditUserProfileComponent, {
  //     width: '300px',
  //   });
  // }

  deleteProfile(): void {
    if (
      confirm(
        'Are you sure you want to delete your account?'
      )
    ) {
      this.fetchApiData.deleteUser(this.user).subscribe(() => {
        console.log('Profile successfully deleted');
        localStorage.clear();
        this.router.navigate(['welcome']);

        this.snackBar.open('Profile Deleted', 'OK', {
          duration: 2000,
        });
      });
      } else {
        window.location.reload();
      }
    }

    openMovies(): void {
      this.router.navigate(['movies']);
    }
  
    openProfile(): void {
      this.router.navigate(['profile']);
    }
  
    logout(): void {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['welcome']);
    }

}
