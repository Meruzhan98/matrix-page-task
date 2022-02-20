import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public isLiked:boolean = false;

  ngOnInit(): void {
  }

  likePage(){
    this.isLiked = !this.isLiked;
    console.log(this.isLiked);
  }


}
