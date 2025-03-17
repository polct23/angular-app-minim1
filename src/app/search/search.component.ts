import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  filteredUsers: User[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['query'] || '';
      this.filterUsers();
    });
  }

  filterUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });

  }
}
