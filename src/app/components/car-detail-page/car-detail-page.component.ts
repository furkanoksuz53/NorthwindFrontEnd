
import { Car } from './../../models/car';
import { ActivatedRoute } from '@angular/router';
import { CarService } from './../../services/car.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail-page',
  templateUrl: './car-detail-page.component.html',
  styleUrls: ['./car-detail-page.component.css']
})
export class CarDetailPageComponent implements OnInit {

  cars:Car[]=[];
  imageUrl = "https://localhost:44353/images/"
  carImages:CarImage[]=[];
  dataLoaded=false;
  url:string;
  isDelivered: boolean = true;
  date: Date = new Date();
  currentCar:Car;

  rentalForm: FormGroup = new FormGroup({
    deliverDate: new FormControl(null, Validators.required),
  });

  deliverControl = this.rentalForm.controls['deliverDate'];


  constructor(private carService:CarService,
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute,
    private rentalService:RentalService
    ) { }


  ngOnInit(): void {
    console.log(this.date);
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"])
        this.getCarsById(params["carId"])
        this.getCarImages(params["carId"])
    })
  }
  setCurrentCar(car:Car){
    this.currentCar = car;
  }

  deliveredCheck(): boolean {
    this.rentalService.getRentals().subscribe((rentals) => {
      this.isDelivered = rentals.data.some(
        (rental) => rental.carId === this.currentCar.id
      );
    });

    return this.isDelivered;
  }

  getRouterLink() {
    if (this.deliverControl.invalid) return '';
    let carId;
    this.activatedRoute.params.subscribe((params) => {
      carId = +params['carId'];
    });

    return carId ? `/cars/${carId}/payment` : '';
  }

  getDate(): Date {
    const miliseconds: number = Date.now();

    return new Date(miliseconds);
  }


  getCarsById(carId:number){
    this.carService.getCarById(carId).subscribe(response=>{
      this.cars = response.data;
    })
  }

  getCarImages(carId:number){
    this.carImageService.getCarImageByCarId(carId).subscribe((response)=>{
      this.carImages=response.data
    });
  }

  

}