import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = []

  constructor() {
    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  }

  //CRUD

  findAll(): Reservation[] {
    return this.reservations;
  }

  findById(id: string): Reservation | undefined {
    return this.reservations.find(res => res.id === id);
  }

  save(reservation: Reservation): void {
    reservation.id = Date.now().toString();

    console.log(reservation)
    this.reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  update(id: string, updateReservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations[index] = updateReservation;
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  deleteById(id: string): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index, 1);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }


}
