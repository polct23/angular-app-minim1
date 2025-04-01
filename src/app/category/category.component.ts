import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { CommonModule } from '@angular/common'; // Importar CommonModule para directivas básicas
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  standalone: true, // Indicar que es un componente independiente
  imports: [CommonModule, FormsModule], // Agregar FormsModule aquí
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Cargar categorías con paginación
  loadCategories(): void {
    this.categoryService.getCategoriesPaginated(this.currentPage, this.itemsPerPage).subscribe((response) => {
      this.categories = response.data;
      this.totalPages = response.totalPages;
    });
  }

  // Cambiar de página
  changePage(page: number): void {
    this.currentPage = page;
    this.loadCategories();
  }

  // Crear una nueva categoría
  createCategory(): void {
    const newCategory: Category = {
      _id: '',
      name: 'Nueva Categoría',
      description: 'Descripción de la nueva categoría',
      isActive: true,
      priority: 1,
    };

    this.categoryService.createCategory(newCategory).subscribe(() => {
      this.loadCategories();
    });
  }

  // Eliminar categorías seleccionadas
  deleteSelectedCategories(): void {
    const selectedCategories = this.categories.filter((category) => category.selected);

    selectedCategories.forEach((category) => {
      this.categoryService.deleteCategory(category._id).subscribe(() => {
        this.loadCategories();
      });
    });
  }
}