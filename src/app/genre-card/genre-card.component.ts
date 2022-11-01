import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.scss']
})

export class GenreCardComponent implements OnInit {

  /**
   * inject genre data into dialog component
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { 
      Genre: { 
        name: String, 
        description: String 
      } 
    }) { }

  ngOnInit(): void {
  }

}