import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductCard } from "@products/components/product-card/product-card";
import { PaginationService } from 'src/app/shared/components/pagination/pagination.service';
import { Pagination } from "src/app/shared/components/pagination/pagination";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, Pagination],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {

  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  paginationService = inject(PaginationService);

  gender = toSignal(
    this.activatedRoute.params.pipe(map(({ gender }) => gender))
  );

  productsResource = rxResource({
    params: () => ({ gender: this.gender(), page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => {
      return this.productService.getProducts({gender: params.gender, offset: params.page * 9});
    }
  })
}
