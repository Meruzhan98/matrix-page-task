import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {


  showMe:boolean = false;


  ngOnInit(): void {
  }

  toogleTag(){
    this.showMe = !this.showMe;
  }





}
