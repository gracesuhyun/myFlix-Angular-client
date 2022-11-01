import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog  } from '@angular/material/dialog';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  user: any = localStorage.getItem('user');
  movies: any = [];
  favMovies: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }
  
  /**
   * fetch movie data input and sets it as 'movies' variable
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
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favMovies = resp.FavoriteMovies;
      return this.movies;
    })
  }

  /**
   * adds chosen movie to user's favorites list
   * @param movieId - movie's ID from database
   */
  addFavoriteMovie(movieId: String): void {
    console.log(movieId);
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((resp: any) => {
      console.log(resp);
      this.ngOnInit();
    })
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

  /**
   * needed to check if movie ID is in user's favorites list
   * @param id - movie's ID
   * @returns if true then fill in heart, if false then leave heart empty
   */
  isFavorite(id: Number): Boolean {
    return this.favMovies.includes(id);
  }

  /**
   * open genre component as dialog
   * @param genre - genre details from database
   */
  openGenreDetails(genre: Object): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Genre: genre
      },
      width: '500px',
    });
  }

  /**
   * open director component as dialog
   * @param director - director details from database
   */
  openDirectorDetails(director: Object): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Director: director
      },
      width: '500px',
    });
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