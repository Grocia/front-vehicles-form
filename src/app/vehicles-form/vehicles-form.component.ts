import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { VehicleResponse } from '../models/process-vehicle-response';
import { VehicleRequest } from '../models/vehicle-request';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'vehicles-form',
  templateUrl: './vehicles-form.component.html',
  styleUrls: ['./vehicles-form.component.css']
})
export class VehiclesFormComponent implements OnInit {

  vehicleResponse  = new VehicleResponse();
  vehicleRequest = new VehicleRequest();


  //vehicleID: any;
  data: any;
  vehicleForm: any;
  vehiclesList: Array<VehicleRequest> = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
     this.vehicleForm = new FormGroup({
      vehicleID: new FormControl(),
      vehicleType: new FormControl(),
      vehicleName: new FormControl(),
      vehiclePrice: new FormControl()
     });
     this.onClickShowAll();
  }


  onClickSubmit(data: { vehicleID: any; vehicleType: any; vehicleName: any; vehiclePrice: any; }) {
    //this.vehicleID = data.vehicleID;
    console.log(data.vehicleID)
    console.log(data.vehicleType)
    console.log(data.vehicleName)
    console.log(data.vehiclePrice)
    this.vehicleRequest.VehicleId = data.vehicleID;
    this.vehicleRequest.Type = data.vehicleType;
    this.vehicleRequest.ManufacturerNameShort = data.vehicleName;
    this.vehicleRequest.Price = data.vehiclePrice;

    this.http.post('https://localhost:44377/api/vehicle/processvehicle', this.vehicleRequest).subscribe(status=> console.log(JSON.stringify(status)));
    this.onClickShowAll();
  }

  onClickShowAll() {
    this.http.get('https://localhost:44377/api/vehicle/getall').subscribe(data=> {
      console.log(JSON.stringify(data))
      for (const vehicleData of (data as any)) {
        let vehicle = new VehicleRequest();
        vehicle.VehicleId = vehicleData.vehicleId;
        vehicle.Type = vehicleData.type;
        vehicle.ManufacturerNameShort = vehicleData.manufacturerNameShort;
        vehicle.Price = vehicleData.price;

        this.vehiclesList.push(vehicle);
      }
      console.log("------------------------------")
      console.log(this.vehiclesList)
    });
    this.vehiclesList  = [];
  }

}


