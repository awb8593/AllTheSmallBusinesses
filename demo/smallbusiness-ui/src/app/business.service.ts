import { Injectable } from '@angular/core';
import { Business } from "./Business";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private apiURL = 'https://dev.virtualearth.net/REST/v1/LocalSearch/?query=' //coffee&userLocation=47.602038,-122.333964&key=%7BBingMapsKey%7D'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getLocalBusinesses(latitude: string, longitude: string, type: string) {
    return this.http.get(this.apiURL+type+"&userLocation="+latitude+","+longitude+"&key=AnR4Khwxo4KxF35XmhzvhQZghYq8NqhqvB1Akf8kWkOj4c3kzINYy2GbQP1YkSpD")
  }

}
