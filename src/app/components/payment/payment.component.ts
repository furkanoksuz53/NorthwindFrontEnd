import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { PaymentService } from 'src/app/services/payment.service';
import { CreditCardService } from 'src/app/services/creditcard.service';
import { Car } from 'src/app/models/car';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  currentCar:Car;
  car:Car;
  amount:number;
  paymentForm: FormGroup = new FormGroup({
    firstName: new FormControl('Furkan', Validators.required),
    lastName: new FormControl('Öksüz', Validators.required),
    cardNumber: new FormControl('5353535353535353', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(15),
      Validators.pattern('^4[0-9]{12}(?:[0-9]{3})?$'),
    ]),
    expiringYear: new FormControl('12', Validators.required),
    expiringMonth: new FormControl('21', Validators.required),
    CVC: new FormControl('053', Validators.required),
  });
  constructor(
    private carService: CarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private toastrService: ToastrService,
    private creditCardService: CreditCardService
  ) { }

  ngOnInit(): void {  
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"])
        this.getCarsById(params["carId"])
    })  
  }
  getCarsById(carId:number){
    this.carService.getCarById(carId).subscribe(response=>{
      this.currentCar = response.data[0];
    })
  }

  completePayment() {
    let creditCard = this.paymentForm.value as CreditCard;

    this.creditCardService.verifyCreditCard(creditCard).subscribe({
      next: (response) => {
        let paymentDate = new Date();
        let customerId = 1003;  
        

        let payment = { paymentDate, customerId, this: this.currentCar.dailyPrice } as unknown as Payment;

        this.paymentService.addPayment(payment).subscribe({
          next: (response) => {
            this.toastrService.success(response.message, 'SUCCESS');
          },

          error: (error) => this.toastrService.error(error.message, 'ERROR'),
        });
      },

      error: (error) => this.toastrService.error(error.message, 'ERROR'),

      complete: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
