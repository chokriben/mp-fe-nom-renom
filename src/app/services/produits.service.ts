import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../model/produit';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  private BASE_URL = 'http://localhost:3333/produits/';


  constructor(private http: HttpClient) {}
  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.BASE_URL);
  }
  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.BASE_URL);
  }

  addProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.BASE_URL, produit);
  }

  updateProduit(id: string, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.BASE_URL}/${id}`, produit);
  }

  deleteProduit(id: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }

}
