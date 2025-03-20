import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Packet } from '../models/packet.model';
import { PacketService } from '../services/packet.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-packet',
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './packet.component.html',
  styleUrl: './packet.component.css'
})
export class PacketComponent implements OnInit{
  packetsList: Packet[] = []; // Lista completa de pacquetes
  displayedPackets: Packet[] = []; // Paquetes visibles en la página actual    totalItems = 0; // Número total de elementos
  totalItems = 0; // Número total de elementos
  itemsPerPage = 3; // Elementos por página
  currentPage = 0; // Página actual
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.obtainPackets();
  }
  packetService = inject(PacketService);

  async obtainPackets() {

    //Usa getUsers() del servicio UserService para hacer la peticion get a la API de todos los usuarios
    this.packetService.getPackets().subscribe({
      next: (packets: Packet[]) => {
        //se añaden los usuarios recibidos por la peticion getUsers() a la lista de usuarios
        this.packetsList = packets;
        this.totalItems = packets.length; // Actualiza el total de usuarios
        this.updateDisplayedPackets(); // Filtra los usuarios a mostrar
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

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.updateDisplayedPackets();
  }

  updateDisplayedPackets() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedPackets = this.packetsList.slice(start, end);
  }

  trackByPacketId(index: number, packet: any): number {
    return packet.id;
  }
}
