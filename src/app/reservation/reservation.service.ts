import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = []

  //CRUD

  findAll(): Reservation[] {
    return this.reservations;
  }

  findById(id: string): Reservation | undefined {
    return this.reservations.find(res => res.id === id);
  }

  save(reservation: Reservation): void {
    this.reservations.push(reservation);
  }

  update(updateReservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === updateReservation.id);
    this.reservations[index] = updateReservation;
  }

  deleteById(id: string): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index, 1);
  }


}
