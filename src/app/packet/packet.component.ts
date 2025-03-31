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

  obtainPackets(): void {
    this.packetService.getPackets(this.currentPage + 1, this.itemsPerPage).subscribe({
      next: (response) => {
        this.packetsList = response.data.map(packet => ({
          ...packet
        }));
        this.displayedPackets = this.packetsList; // Actualiza los paquetes mostrados
        this.totalItems = response.totalPackets;
        console.log(this.packetsList, this.totalItems);
        this.cdr.detectChanges();
        if (this.packetsList.length > 0) {
          console.log(this.packetsList[0].name); // Ahora no dará error
        }
      },
      error: (error) => {
        console.error('Error al obtener paquetes:', error);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.obtainPackets(); // Llama a la función para obtener los paquetes de la nueva página
  }

  trackByPacketId(index: number, packet: any): string {
    return packet?._id || index.toString(); // Asegura que siempre se devuelva un valor válido
  }
}
