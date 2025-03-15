import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Packet } from '../models/packet.model';

@Injectable({
  providedIn: 'root'
})
export class PacketService {
  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:4000/api/packets";

  getPackets(): Observable<Packet[]> {
    return this.http.get<{ data: Packet[] }>(this.apiUrl).pipe(
      map(response => response.data) // Extrae el array 'data'
    );
  }

}
