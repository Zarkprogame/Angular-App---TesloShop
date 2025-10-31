import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/products.service';
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {

  productService = inject(ProductService);

  activedRoute = inject(ActivatedRoute);
  productIdSlug = this.activedRoute.snapshot.params['idSlug'];
  // productIdSlug = this.activedRoute.snapshot.queryParamMap.get('idSlug') ?? '';

  productResource = rxResource({
    params: () => ({ idSlug: this.productIdSlug }),
    stream: ({ params }) => {
      return (this.productService.getProductByIdSlug(params.idSlug));
    }
  })
}
