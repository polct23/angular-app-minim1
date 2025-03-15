import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Packet } from '../models/packet.model';
import { PacketService } from '../services/packet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-packet',
  imports: [CommonModule],
  templateUrl: './packet.component.html',
  styleUrl: './packet.component.css'
})
export class PacketComponent implements OnInit{
  ngOnInit(): void {
    this.obtainPackets();
  }
    packetsList: Packet[];
    constructor( private cdr: ChangeDetectorRef) {
      this.packetsList = [];
    }
  packetService = inject(PacketService);

  async obtainPackets() {

    //Usa getUsers() del servicio UserService para hacer la peticion get a la API de todos los usuarios
    this.packetService.getPackets().subscribe({
      next: (packets: Packet[]) => {
        //se añaden los usuarios recibidos por la peticion getUsers() a la lista de usuarios
        this.packetsList = packets;
        console.log(this.packetsList, this.packetsList.length);
        this.cdr.detectChanges();
        if (this.packetsList.length > 0) {
          console.log(this.packetsList[0].name); // Ahora no dará error
        }

      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }
  trackByPacketId(index: number, packet: any): number {
    return packet.id;
  }
}
