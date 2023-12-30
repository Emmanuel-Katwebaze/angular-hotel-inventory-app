import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {
  hotelName = 'Hilton Hotel';

  numberOfRooms = 10;

  hideRooms = true;

  selectedRoom!: RoomList;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  title = 'Room List';

  error: string = ''

  totalBytes = 0;

  subscription! : Subscription;

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomService.getRooms$.pipe(
    catchError(err => {
      console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  priceFilter = new FormControl(0);

  roomsCount$ = this.roomService.getRooms$.pipe(
    map((rooms) => rooms.length)
  )

  roomList: RoomList[] = [];

  stream = new Observable(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  // roomService = new RoomService();

  constructor(@SkipSelf() private roomService: RoomsService, private configService: ConfigService) {}

  ngOnInit(): void {

    this.roomService.getPhotos().subscribe((event) => {
      console.log(event); 

      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Request success!');
          break;
        case HttpEventType.DownloadProgress:
          this.totalBytes += event.loaded;
          break;
        case HttpEventType.Response:
          console.log(event.body);
          break;
      }
    })
    
    console.log(this.headerComponent);
    console.log(this.roomService.getRooms());

    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err)
    })

    this.stream.subscribe((data) => console.log(data));
  
    // this.subscription = this.roomService.getRooms$.subscribe(rooms => {
    //   this.roomList = rooms;
    // });

    //this.roomList = this.roomService.getRooms();

    // this.roomList = [
    //   {
    //     roomNumber: 1,
    //     roomType: 'Deluxe Room',
    //     amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
    //     price: 500,
    //     photos: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    //     checkInTime: new Date('11-Nov-2021'),
    //     checkOutTime: new Date('12-Nov-2021'),
    //     rating: 5.0,
    //   },
    //   {
    //     roomNumber: 2,
    //     roomType: 'Deluxe Room',
    //     amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
    //     price: 1000,
    //     photos: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    //     checkInTime: new Date('11-Nov-2021'),
    //     checkOutTime: new Date('12-Nov-2021'),
    //     rating: 3.4,
    //   },
    //   {
    //     roomNumber: 3,
    //     roomType: 'Private Suite',
    //     amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
    //     price: 15000,
    //     photos: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    //     checkInTime: new Date('11-Nov-2021'),
    //     checkOutTime: new Date('12-Nov-2021'),
    //     rating: 2.6,
    //   },
    // ];
  }

  ngDoCheck(): void {
      console.log('on change is called');
  }

  ngAfterViewInit(): void {
    this.headerComponent.title = "Rooms View";
    console.log(this.headerComponent);

    this.headerChildrenComponent.last.title = "Last Title";
   // this.headerChildrenComponent.get(0)!.title = "First Title";
  }

  ngAfterViewChecked(): void {
      
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      //roomNumber: '4',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      checkInTime: new Date('11-Nov-2021'),
      checkOutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    };

    //this.roomList = [...this.roomList, room];
    this.roomService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    })
  }

  editRoom(){
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      checkInTime: new Date('11-Nov-2021'),
      checkOutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    };

    this.roomService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom(){
    this.roomService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}

// getData -> addData -> getData

// getData -> continuous stream of data -> addData