import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {
    this.getUserData();
    this.getMovies();
    this.getFavorites();
  }

  /**
   * fetch user details from database using getUser in fetch-api-data
   */
  getUserData(): void {
    this.fetchApiData.getUser().subscribe((result: any) => {
      localStorage.getItem('user');
      this.user = result;
      console.log(result);

     return this.user;
    });
  }

  /**
   * open profile editing component with dialog
   */
  openEditProfileDialog(): void {
    this.dialog.open(EditUserProfileComponent, {
      width: '300px',
    });
  }

  /**
   * delete user from database using deleteUser in fetch-api-data
   */
  deleteProfile(): void {
    if (
      confirm(
        'Are you sure you want to delete your account?'
      )
    ) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account!','OK', {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
      });
    }
  }

  /**
   * fetch movies data for users favorites list
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(resp);
        return this.movies;
    });
  }

  /**
   * fetches user details and sets it to this component's local 'favMovies'
   */
  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
        this.favMovies = resp.FavoriteMovies;
        return this.favMovies;
    });
  }

    /**
   * deletes chosen movie from user's favorites list
   * @param movieId - movie's ID from database
   */
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
