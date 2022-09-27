import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { ColorService } from 'src/app/services/color.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[]=[];
  dataLoaded = false;
  imageUrl = "https://localhost:44353/images/"
  currentCar:Car;


  constructor(private carService:CarService,
    private carImageService:CarImageService, 
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      }
      else if(params["colorId"] ){
        this.getCarsByColor(params["colorId"])
      }
      else{
        this.getCarDetails();
      }            
    });

  }
    setCurrentCar(car:Car){
    this.currentCar = car;
  }

  getCarDetails(){
      this.carService.getCarDetails().subscribe(response => {
        this.cars = response.data;
        this.dataLoaded = true;
        
      })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }
  getCarsById(id:number) {
    this.carService.getCarById(id).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }
  getCarImage(car:Car){
    if (car.imagePath == null) {
      let path = this.imageUrl + "c45d470f-918a-4bc4-b593-94e747731d02.png"
      return path;

    }
    else{
      let path = this.imageUrl + car.imagePath;
      return path;
    }
  }
  getCarImageByCarId(carId:number){
    this.carService.getImagesByCarId(carId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

}
