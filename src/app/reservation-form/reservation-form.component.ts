import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {


  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    })



    /**
     *  mostrar los datos en el html del componente si obtenemos el param id en el url 
     *  usando activatedRoute 
     */
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.reservationService.findById(id).subscribe(reservation =>{
        if (reservation) {
          this.reservationForm.patchValue(reservation);
        }
      });
    }

  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        // update
        this.reservationService.update(id, reservation).subscribe(() => {
          console.log("update success");
        });
      } else {
        // save
        this.reservationService.save(reservation).subscribe(() => {
          console.log("post success")
        });
      }
      this.router.navigate(['/list'])
    }
  }
}
