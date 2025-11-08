import { Component, effect, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductDetails } from './product-details/product-details';

@Component({
  selector: 'product-admin-page',
  imports: [ProductDetails],
  templateUrl: './product-admin-page.html',
})
export class ProductAdminPage {

  productService = inject(ProductService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  productId = toSignal(
    this.activatedRoute.params.pipe(
      map(Params => Params['id'])
    )
  );

  productResource = rxResource({
    params: () => ({ id: this.productId() }),
    stream: ({ params }) => {
      return this.productService.getProductById(params.id);
    },
  });

  redirectEffect = effect(() => {
    if (this.productResource.error()) {
      this.router.navigate(['/admin/products']);
    }
  })
}
