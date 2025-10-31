import { Component, inject } from '@angular/core';
import { ProductCard } from '@products/product-card/product-card';
import { ProductService } from '@products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productService = inject(ProductService);

  productsResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => {
      return this.productService.getProducts({});
    }
  })
}

