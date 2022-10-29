import { Component, OnInit, Inject } from '@angular/core';
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
  movies: any = [];
  favMovies: any = [];


  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    this.getUserData();
    this.getMovies();
    this.getFavorites();
  }

  getUserData(): void {
    this.fetchApiData.getUser().subscribe((result: any) => {
      localStorage.getItem('user');
      this.user = result;
      console.log(result);

     return this.user;
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

    getMovies(): void {
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
          this.movies = resp;
          console.log(resp);
          return this.movies;
      });
    }

    getFavorites(): void {
      this.fetchApiData.getUser().subscribe((resp: any) => {
          this.favMovies = resp.FavoriteMovies;
          return this.favMovies;
      });
    }

    deleteFavoriteMovie(movieId: String): void {
      console.log(movieId);
      this.fetchApiData.deleteFavoriteMovie(movieId).subscribe((resp: any) => {
        this.ngOnInit();
      })
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
