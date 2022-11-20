import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent} from "./search/search.component";
import { AboutPageComponent } from "./about-page/about-page.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";

const routes: Routes = [
  { path:'', component: SearchComponent},
  { path: 'search', component: SearchComponent},
  { path: 'about-page', component: AboutPageComponent},
  { path: 'contact-us', component: ContactUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
