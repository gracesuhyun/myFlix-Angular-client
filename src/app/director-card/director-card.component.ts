import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})
export class DirectorCardComponent implements OnInit {

  /**
   * inject director data into dialog component
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { 
      Director: { 
        name: String, 
        description: String 
      } 
    }) { }

  ngOnInit(): void {
  }

}