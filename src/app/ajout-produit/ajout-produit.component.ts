import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { CategoriesService } from '../services/categories.service';
import { Produit } from '../model/produit';
import { Categorie } from '../model/categorie';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {
  produits: Produit[] = [];
  categories: Categorie[] = [];
  nouveauProduit: Produit = new Produit();

  constructor(private produitsService: ProduitsService, private categoriesService: CategoriesService) {}

  message: string = '';

  ngOnInit(): void {
    this.getProduits();
    this.getCategories();
  }
  getCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des catégories.", err);
      }
    });
  }
  getProduits(): void {
    this.produitsService.getProduits().subscribe({
      next: (produits) => {
        this.produits = produits;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des produits.", err);
      }
    });
  }

  ajouterProduit() {
    this.produitsService.addProduit(this.nouveauProduit).subscribe({
      next: (response) => {
        this.produits.push(response);
        this.message = 'Le produit a été ajouté avec succès.';
        this.effacerSaisie(); // Appel de la méthode pour effacer la saisie
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout du produit.", err);
        this.message = "Erreur lors de l'ajout du produit.";
      },
    });
  }

  validerFormulaire() {
    // Ajoutez le code pour générer automatiquement l'ID ici
    this.ajouterProduit();
  }

  effacerSaisie() {
    // Cette méthode sera appelée pour effacer la saisie après l'ajout d'un produit
    this.nouveauProduit = new Produit(); // Réinitialisation de l'objet nouveauProduit
  }
}
