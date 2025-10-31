import { Component, inject } from '@angular/core';
import { ProductService } from '@products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop'
import { ProductCard } from '@products/components/product-card/product-card';
import { Pagination } from "src/app/shared/components/pagination/pagination";
import { PaginationService } from 'src/app/shared/components/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  productService = inject(ProductService);
  paginationService = inject(PaginationService);


  productsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => {
      return this.productService.getProducts({
        offset: params.page * 9,
      });
    }
  })
}
