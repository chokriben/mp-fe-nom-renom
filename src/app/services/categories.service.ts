import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private BASE_URL = 'http://localhost:3333/categories/';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.BASE_URL);
  }

  addCategory(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.BASE_URL, categorie);
  }

  updateCategory(categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.BASE_URL}/${categorie.id}`, categorie);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
