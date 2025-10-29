import { Component } from '@angular/core';
import { ProductCard } from '@products/product-card/product-card';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent { }
