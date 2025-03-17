import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';
  message: string = 'user';
  constructor(@Inject(Router) private router: Router, private communicationService: CommunicationService) {}
  ngOnInit(): void {
    this.communicationService.currentMessage.subscribe(message => {
      this.message = message;
    });
  }
  search(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchTerm } });
    }
  }
}
