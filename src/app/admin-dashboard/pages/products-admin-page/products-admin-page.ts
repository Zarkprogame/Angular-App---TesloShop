import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsTable } from "@products/components/products-table/products-table";
import { ProductService } from '@products/services/products.service';
import { PaginationService } from 'src/app/shared/components/pagination/pagination.service';
import { Pagination } from "src/app/shared/components/pagination/pagination";

@Component({
  selector: 'products-admin-page',
  imports: [ProductsTable, Pagination],
  templateUrl: './products-admin-page.html',
})
export class ProductsAdminPage {
  productService = inject(ProductService);
  paginationService = inject(PaginationService);

  productsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1}),
    stream: ({ params }) => {
      return this.productService.getProducts({
        offset: params.page * 9,
      });
    }
  })
}
