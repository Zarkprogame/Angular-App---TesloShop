import { Component } from '@angular/core';
import { FrontNavbarComponent } from "../../components/front-navbar/front-navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-store-front-layout',
  imports: [FrontNavbarComponent, RouterOutlet],
  templateUrl: './store-front-layout.component.html',
})
export class StoreFrontLayoutComponent { }
