import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private messageSource = new BehaviorSubject<string>('user');
  currentMessage = this.messageSource.asObservable();

  sendMessage(message: string) {
    console.log('🔄 Enviando mensaje desde el servicio:', message);
    this.messageSource.next(message);
  }
}
