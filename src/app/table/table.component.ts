import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  username: string;
  id: number;
  profit: number;
  commission: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1007, username: 'Simona', profit: 55, commission: 'Simona'},
  {id: 1008, username: 'Ariana', profit: 45, commission: 'Adelina'},
  {id: 1009, username: 'Adam', profit: 35, commission: 'Adam'},
  {id: 1010, username: 'John', profit: 25, commission: 'John'},
  {id: 1011, username: 'Garry', profit: 15, commission: 'Garry'},
];
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor() { }
  displayedColumns: string[] = ['id', 'username', 'profit', 'commission', 'view'];
  dataSource = ELEMENT_DATA;
  ngOnInit(): void {
  }

}
