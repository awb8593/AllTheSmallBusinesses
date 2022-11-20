import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router'
import {concatWith, Observable} from "rxjs";
import {Business} from "./Business";
import * as Console from "console";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smallbusiness-ui'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void { }


}
