import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:4000/api/categories'; // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener categorías con paginación
  getCategoriesPaginated(page: number, limit: number): Observable<any> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<any>(this.apiUrl, { params });
  }

  // Crear una nueva categoría
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  // Eliminar una categoría por ID
  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}