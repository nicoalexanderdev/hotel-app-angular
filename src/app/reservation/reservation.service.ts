import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient){

  }


  //CRUD

  findAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl + "/reservations")
  }

  findById(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiUrl + "/reservations/" + id)
  }

  save(reservation: Reservation): Observable<void> {
    return this.http.post<void>(this.apiUrl + "/reservations/", reservation);
  }

  update(id: string, updateReservation: Reservation): Observable<void> {
    return this.http.put<void>(this.apiUrl + "/reservations/" + id, updateReservation);
  }

  deleteById(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/reservations/" + id);
  }


}
