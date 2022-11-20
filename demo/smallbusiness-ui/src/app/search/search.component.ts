import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Router } from "@angular/router";
import { BusinessService } from "../business.service";
import { Business } from "../Business";
import {Observable, ReplaySubject, Subscription} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  localCompanies: Array<Business> = new Array<Business>()
  occurrences: Map<string, number> = new Map() // holds the amount of times each business occurs

  title = 'smallbusiness-ui';
  private apiURL = 'https://dev.virtualearth.net/REST/v1/LocalSearch/?query=' //coffee&userLocation=47.602038,-122.333964&key=%7BBingMapsKey%7D'
  private userLocation = '&userLocation='
  private key = '&key=AnR4Khwxo4KxF35XmhzvhQZghYq8NqhqvB1Akf8kWkOj4c3kzINYy2GbQP1YkSpD'

  subscription: Subscription = new Subscription()

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
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
  async getLocalBusinesses(latitude: number, longitude: number, type: string): Promise<void> { // Observable<Business>[]
    //return fetch(this.apiURL + type + this.userLocation + latitude + ',' + longitude + this.key)
    //  .then(response => response.json()).then(.json => console.log(json))
    this.http.get<string>(this.apiURL + type + "&maxResults=25" + this.userLocation + latitude + ',' + longitude + this.key).subscribe(info => {
      var test = JSON.parse(JSON.stringify(info));
      //console.log(test.resourceSets[0].resources)
      for (let i = 0; i < test.resourceSets[0].resources.length; i++) {
        var business = {
          name: test.resourceSets[0].resources[i].name,
          address: test.resourceSets[0].resources[i].Address.formattedAddress,
          phone: test.resourceSets[0].resources[i].PhoneNumber,
          website: test.resourceSets[0].resources[i].Website,
          streetAddress: test.resourceSets[0].resources[i].Address.addressLine,
          zip: test.resourceSets[0].resources[i].Address.postalCode
        };

        console.log("outside the for loop")
        for (let j = 0; j < this.occurrences.size; j++) {
          console.log("checking occurrence of: " + business.name)
            var old = 0
            if (this.occurrences.get(business.name)) {
              // @ts-ignore
              old = this.occurrences.get(business.name)
            }
            this.occurrences.set(business.name, old + 1)
        }
        // remove everyone with multiple occurrences
        for (let j = 0; j < this.occurrences.size; j++) {
          // @ts-ignore
          if (this.occurrences.get(business.name) > 1) {
            this.localCompanies.splice(j, 1)
          }
        }

        console.log("go time")
        this.localCompanies.push(business);

      }
    })
  }

  checkLocalBusinesses(): void {


    console.log("checking")
    for (let i = 0; i < this.localCompanies.length; i++) {
      console.log("Checking i:" + i)
      // GET request from Orb; add to list if standalone_company = true || null
      var business = this.localCompanies[i]
      var website = business.website;
      var name = business.name;
      var phone = business.phone;
      var address = business.address;
      var zip = business.zip;
      var streetAddress = business.streetAddress;
      console.log(business)




      /*
      var sub = this.http.get<string>(
        "https://api.orb-intelligence.com/3/match/?api_key=c66c5dad-395c-4ec6-afdf-7b78eb94166a" +
        "&name=" + name + "&address1=" + streetAddress + "&zip=" + zip + "&limit=1")
        .subscribe(orbResponse => {
          console.log("HELLO????");
          const orbInfo = JSON.parse(JSON.stringify(orbResponse));
          console.log(orbInfo.name + " is small business?: " + orbInfo.results[0].is_standalone_company);

          if (orbInfo.results[0].is_standalone_company == false) {
            this.localCompanies.splice(i);
          }
        })
      console.log("unsubscribing")
      sub.unsubscribe()*/
    }
  }
}
