import { ChangeDetectorRef, Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // ← ADD THIS for ngModel
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product';
import { Category } from '../interfaces/category';
import { forkJoin } from 'rxjs';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],  // ← ADD FormsModule
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {
  activeCategory = 'all';
  searchTerm = '';
  modalOpen = false;
  selectedProduct: Product | null = null;
  private routeSub!: Subscription;
  displayedProducts: Product[] = [];
  pageSize = 12;

  categories: Category[] = [
  ];

  // ===== PRODUCT DATA =====
  products: Product[] = [
    
    // Add more products here...
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    forkJoin({
      products: this.productService.getProducts(),
      categories: this.categoryService.getCategories()
    }).subscribe(({ products, categories }) => {
      this.products = products;
      this.categories = categories;
      this.routeSub = this.route.paramMap.subscribe(params => {
        const categoryId = params.get('categoryId');

        if (categoryId && this.categories.some(c => c.id === categoryId)) {
          this.activeCategory = categoryId;
        } else {
          this.activeCategory = 'all';
        }

        this.updateProducts();
        this.cdr.markForCheck();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  // ===== FILTERED PRODUCTS (Category + Search) =====

  filteredProducts: Product[] = [];

  private updateProducts() {

    let result = this.products;

    if (this.activeCategory !== 'all') {
        result = result.filter(x => x.category === this.activeCategory);
    }

    if (this.searchTerm.trim()) {
        const term = this.searchTerm.toLowerCase();

        result = result.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );
    }

    // Store filtered products
    this.filteredProducts = result;

    // Reset visible count whenever filters change
    this.pageSize = 12;
    
    // Show only first page
    this.displayedProducts = this.filteredProducts.slice(0, this.pageSize);
    //console.log('Displayed:', this.displayedProducts.length);
}

  loadMore(): void {
    this.pageSize += 12;
    this.displayedProducts =
    this.filteredProducts.slice(0, this.pageSize);
  }

  // ===== SEARCH METHODS =====
  onSearch(): void {
    // The filtering happens automatically via the getter
    this.updateProducts();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.updateProducts();
    // Focus the input after clearing
    const input = document.querySelector('.search-input') as HTMLInputElement;
    if (input) {
      input.focus();
    }
  }

  // ===== OTHER METHODS =====
  getProductCount(categoryId: string): number {
    let count = 0;
    if (categoryId === 'all') {
      count = this.products.length;
    } else {
      count = this.products.filter(p => p.category === categoryId).length;
    }
    return count;
  }

  getCategoryName(categoryId: string): string {
    const cat = this.categories.find(c => c.id === categoryId);
    return cat ? cat.name : categoryId;
  }

  setCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    // Update immediately
    this.updateProducts();
    // Optional: clear search when switching categories
    // this.searchTerm = '';
    const url = categoryId === 'all' ? '/products' : `/products/category/${categoryId}`;
    this.router.navigateByUrl(url);
  }

  trackByProduct(index: number, product: Product): number {
    return product.id;
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
    this.modalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.modalOpen = false;
    this.selectedProduct = null;
    document.body.style.overflow = '';
  }
}
