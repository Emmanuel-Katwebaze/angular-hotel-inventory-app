import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'hinv-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.css'],
})
export class RoomsBookingComponent implements OnInit {
  id: number = 0;

  id$ = this.router.paramMap.pipe(map((params) => params.get('roomid')));

  constructor(private router: ActivatedRoute) {}

  // ngOnInit(): void {
  //   this.router.params.subscribe(params => {
  //     //console.log(params);
  //     this.id = params['roomid'];
  //   })
  // }
  ngOnInit(): void {
    //this.id = this.router.snapshot.params['roomid'];
    // this.router.paramMap.subscribe((params) => {
    //   params.get('roomidid');
    // });
  }
}
