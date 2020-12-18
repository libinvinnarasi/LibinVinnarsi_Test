import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../service/service.service';
import { User } from '../model';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
details:any;
list:any;
  constructor(private service: ServiceService) {
    this.reloadData()
   }

  ngOnInit() {
    this.reloadData();
   
  }

  reloadData() {
    this.service.getusersList().subscribe(data => {
      this.list = data;
      console.log(data)
    });
  }
  viewUser(id){
    this.service.getuser(id).subscribe(data => {
      this.details = data;
      console.log('view',this.details)
     
    })
  }
  deleteUser(id){
    this.service.deleteuser(id).subscribe(data => {
      console.log('deleted');
      this.reloadData();
    })
  }
}
