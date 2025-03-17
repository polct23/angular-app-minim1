import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { CommunicationService } from '../services/communication.service';
import { PacketService } from '../services/packet.service';

@Component({
  selector: 'app-search',
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  filteredUsers: any[] = [];
  message: string = '';
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private communicationService: CommunicationService,
    private packetService: PacketService) {}

  ngOnInit(): void {
    this.communicationService.currentMessage.subscribe(message => {
      console.log('CommunicationService.sendMessage', this.message);
      this.message = message;
      this.filter();
    });
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['query'] || '';
      this.filter();
    });
  }
  filter(): void {

    if(this.message === 'packet'){
      this.filterPackets();
    }
    else{
      this.filterUsers();
    }
  }
  filterPackets(): void {
    this.packetService.getPackets().subscribe(packets => {
      this.filteredUsers = packets.filter(packet =>
        packet.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }
  filterUsers(): void {
    if (this.searchTerm.includes('@')) {
      // If searchTerm contains '@', filter by email
      this.userService.getUsers().subscribe(users => {
        this.filteredUsers = users.filter(user =>
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    } else if (!isNaN(Number(this.searchTerm))) {
      // If searchTerm is a number, filter by phone
      this.userService.getUsers().subscribe(users => {
        this.filteredUsers = users.filter(user =>
          user.phone.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    }else {
      // Otherwise, filter by name
      this.userService.getUsers().subscribe(users => {
        this.filteredUsers = users.filter(user =>
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    }
  }
}
