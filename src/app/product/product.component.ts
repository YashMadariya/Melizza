import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // ← ADD THIS for ngModel
import { Subscription } from 'rxjs';

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  features?: string[];
}

interface Category {
  id: string;
  name: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],  // ← ADD FormsModule
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  activeCategory = 'all';
  searchTerm = '';
  modalOpen = false;
  selectedProduct: Product | null = null;
  private routeSub!: Subscription;

  categories: Category[] = [
    { id: 'all', name: 'All Products' },
    { id: 'nutraceutical', name: 'Developed Nutraceutical' },
    { id: 'effervescent', name: 'Effervescent' },
    { id: 'protein', name: 'Protein Powder' },
    { id: 'sachet', name: 'Sachet' },
    { id: 'tablets', name: 'Tablets' }
  ];

  // ===== PRODUCT DATA =====
  products: Product[] = [
    {
      id: 1,
      name: 'ACEMEL - P',
      category: 'nutraceutical',
      image: 'assets/img/DEVLOPED PHARMA PRODUCT IMAGE SELECTED/ACEMEL - P MOKEUP.jpg',
      description: 'Acetamide 100 mg + Paracetamol 325 mg + Ibuprofen 100 mg',
      features: ['Pain relief', 'Anti-inflammatory', 'Fever reduction']
    },
    {
      id: 2,
      name: 'L-Carnitine & Coenzyme Q10 Tablets',
      category: 'tablets',
      image: 'assets/img/products/T1-1.jpg',
      description: 'L-Carnitine L-Tartrate & Coenzyme Q10 Tablets – Dietary supplement for energy and vitality.',
      features: ['Supports heart health', 'Boosts energy levels', 'Antioxidant properties']
    },
    {
      id: 3,
      name: 'Vitamin C Effervescent Tablets',
      category: 'effervescent',
      image: 'assets/img/products/effervescent.jpg',
      description: 'High‑strength Vitamin C effervescent tablets for immunity support.',
      features: ['Boosts immune system', 'Fast absorption', 'Refreshing taste']
    },
    {
      id: 4,
      name: 'Whey Protein Isolate',
      category: 'protein',
      image: 'assets/img/products/protein.jpg',
      description: 'Pure whey protein isolate for muscle recovery and growth.',
      features: ['High protein content', 'Low fat & carbs', 'Easy to digest']
    },
    {
      id: 5,
      name: 'Electrolyte Powder Sachet',
      category: 'sachet',
      image: 'assets/img/products/sachet.jpg',
      description: 'Oral rehydration salt sachet for fast hydration and electrolyte balance.',
      features: ['Fast hydration', 'Balanced electrolytes', 'Convenient sachet']
    },
    // Add more products here...
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const categoryId = params.get('categoryId');
      if (categoryId && this.categories.some(c => c.id === categoryId)) {
        this.activeCategory = categoryId;
      } else {
        this.activeCategory = 'nutraceutical';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  // ===== FILTERED PRODUCTS (Category + Search) =====
  get filteredProducts(): Product[] {
    let result = this.products;

    // 1. Filter by category
    if (this.activeCategory !== 'all') {
      result = result.filter(p => p.category === this.activeCategory);
    }

    // 2. Filter by search term (case-insensitive)
    if (this.searchTerm.trim().length > 0) {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        (p.features && p.features.some(f => f.toLowerCase().includes(term)))
      );
    }

    return result;
  }

  // ===== SEARCH METHODS =====
  onSearch(): void {
    // The filtering happens automatically via the getter
    // This method is called on each input event
  }

  clearSearch(): void {
    this.searchTerm = '';
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
    // Optional: clear search when switching categories
    // this.searchTerm = '';
    const url = categoryId === 'all' ? '/products' : `/products/category/${categoryId}`;
    this.router.navigateByUrl(url);
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