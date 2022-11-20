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
  localCompanies: Array<Business> = new Array<Business>()

  title = 'smallbusiness-ui';
  private apiURL = 'https://dev.virtualearth.net/REST/v1/LocalSearch/?query=' //coffee&userLocation=47.602038,-122.333964&key=%7BBingMapsKey%7D'
  private userLocation = '&userLocation='
  private key = '&key=AnR4Khwxo4KxF35XmhzvhQZghYq8NqhqvB1Akf8kWkOj4c3kzINYy2GbQP1YkSpD'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.localCompanies = new Array<Business>()
  }

  /**
   * save a list of local business near where the user specified
   * @param latitude user's latitude
   * @param longitude user's longitude
   * @param type the type of business they want to find (ex: coffee)
   */
  getLocalBusinesses(latitude: string, longitude: string, type: string): void { // Observable<Business>[]
    //return fetch(this.apiURL + type + this.userLocation + latitude + ',' + longitude + this.key)
    //  .then(response => response.json()).then(.json => console.log(json))
    this.localCompanies = new Array<Business>()
    console.log(this.apiURL + type + this.userLocation);
    console.log(latitude + ',' + longitude + this.key)
    var results = Array<string>
      this.http.get<string>(this.apiURL + type + this.userLocation + latitude + ',' + longitude + this.key).subscribe(info => {
        var test = JSON.parse(JSON.stringify(info))
        console.log(test.resourceSets[0].resources)
        for(let i = 0; i < test.resourceSets[0].resources.length; i++) {
          var business = {name: test.resourceSets[0].resources[i].name, address: test.resourceSets[0].resources[i].Address.formattedAddress, phone: test.resourceSets[0].resources[i].PhoneNumber, website: test.resourceSets[0].resources[i].Website}
          this.localCompanies.push(business)
        }
        console.log(this.localCompanies)
      })

  }
}
