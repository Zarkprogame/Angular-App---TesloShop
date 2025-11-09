import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsTable } from "@products/components/products-table/products-table";
import { ProductService } from '@products/services/products.service';
import { PaginationService } from 'src/app/shared/components/pagination/pagination.service';
import { Pagination } from "src/app/shared/components/pagination/pagination";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'products-admin-page',
  imports: [ProductsTable, Pagination, RouterLink],
  templateUrl: './products-admin-page.html',
})
export class ProductsAdminPage {
  productService = inject(ProductService);
  paginationService = inject(PaginationService);

  productsPerPage = signal(10);

  productsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.productsPerPage(),
    }),
    stream: ({ params }) => {
      return this.productService.getProducts({
        offset: params.page * this.productsPerPage(),
        limit: params.limit,
      });
    }
  })
}
