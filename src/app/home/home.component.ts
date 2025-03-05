import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public getJsonValue: any;
  public postJsonValue: any;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
      this.getMethod();
      this.postMethod();

  }
  public getMethod() {
    this.http.get('https://jsonplaceholder.typicode.com/posts/1')
      .subscribe((data) => {
        console.log(data);
        this.getJsonValue = data;
      });
  }
  public postMethod() {
    this.http.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1
    })
      .subscribe((data) => {
        console.log(data);
        this.postJsonValue = data;
      });
  }

}