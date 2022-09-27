import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals:Rental[]=[];
  dataLoaded = false;
  currentCar:Car;
  itRentaled = false;

  constructor(private rentalService:RentalService,private toastrService:ToastrService, private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getRentals();
  }
  getRentals(){
    this.rentalService.getRentals()
    .subscribe(response=>{
      this.rentals=response.data
      this.dataLoaded=true;
    })
  }

  // setCurrentCar(car:Car){
  //   this.currentCar=car;
  // }

  // isItRentaled(rental:Rental){
  //   if(rental.carId==this.currentCar.id){
  //     if(rental.returnDate==null){
  //       return this.toastrService.error("Hata","Bu araç zaten kiralanmış!");
  //     }
  //     else
  //     {
  //       return this.toastrService.success("Lütfen Bekleyiniz. İşleminiz gerçekleşiyor..");
  //     }
  //   }
  //   else
  //   {
  //     return this.toastrService.success("Lütfen Bekleyiniz. İşleminiz gerçekleşiyor..");
  //   }

  // }
  // rentalButton(rental:Rental){
  //   this.isItRentaled(rental);
  //   if(this.itRentaled===true){
  //     this.toastrService.error("Hata","Bu araç zaten kiralanmış!")
  //   }
  //   else{
  //     this.toastrService.success("Lütfen Bekleyiniz. İşleminiz gerçekleşiyor..")
  //     return ;
  //   }
  // }
}
