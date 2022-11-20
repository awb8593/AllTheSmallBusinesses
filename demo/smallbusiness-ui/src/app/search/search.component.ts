import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Router } from "@angular/router";
import { BusinessService } from "../business.service";
import { Business } from "../Business";
import {Observable} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  private apiURL = 'https://dev.virtualearth.net/REST/v1/LocalSearch/?query=' //coffee&userLocation=47.602038,-122.333964&key=%7BBingMapsKey%7D'
  private userLocation = '&userLocation'
  private key = '&key=AnR4Khwxo4KxF35XmhzvhQZghYq8NqhqvB1Akf8kWkOj4c3kzINYy2GbQP1YkSpD'
  // this.http.get(this.apiURL+type+"&userLocation="+latitude+","+longitude+"&key=AnR4Khwxo4KxF35XmhzvhQZghYq8NqhqvB1Akf8kWkOj4c3kzINYy2GbQP1YkSpD")

  //businessInfo: Business ={name: "", resources: []}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient, router : Router, private businessService : BusinessService) { }

  ngOnInit(): void {}

  //
  getLocalBusinesses(latitude: number, longitude: number, type: string): void { // Obsercable<Business>[]
    //return fetch(this.apiURL + type + this.userLocation + latitude + ',' + longitude + this.key)
    //  .then(response => response.json()).then(.json => console.log(json))
    console.log(this.http.get<Array<Business>>(this.apiURL + type + this.userLocation + latitude + ',' + longitude + this.key))

  }
}
