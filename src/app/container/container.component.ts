import { AfterContentInit, Component, ContentChild, Host, OnInit } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsComponent } from '../rooms/rooms.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit, AfterContentInit {
  
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;



  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void{
    console.log(this.employee);
    this.employee.empName = 'Rick';
  }

}
