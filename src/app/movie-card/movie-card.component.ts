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
  
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(resp);
        return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favMovies = resp.FavoriteMovies;
      return this.movies;
    })
  }

  addFavoriteMovie(movieId: String): void {
    console.log(movieId);
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((resp: any) => {
      console.log(resp);
      this.ngOnInit();
    })
  }

  deleteFavoriteMovie(movieId: String): void {
    console.log(movieId);
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe((resp: any) => {
      this.ngOnInit();
    })
  }

  isFavorite(id: Number): Boolean {
    return this.favMovies.includes(id);
}

  openGenreDetails(genre: Object): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Genre: genre
      },
      width: '500px',
    });
  }

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