import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';

import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
})
export class ProduitsComponent implements OnInit {
  constructor(private produitsService: ProduitsService) {}

  ngOnInit(): void {
    this.consulterProduits();
  }

produits: Produit[] = [];
produitCourant: Produit = new Produit();
message: string = '';
recherche: string = ''; // Variable pour le champ de recherche
consulterProduits() {
  console.log('Récupérer la liste des produits');
  this.produitsService.getProduits().subscribe({
    next: (data) => {
      console.log('Succès GET');
      // Pas de filtre ici, nous filtrons lorsque l'utilisateur saisit du texte dans le champ de recherche
      this.produits = data;
    },
    error: (err) => {
      console.log('Erreur GET');
    },
  });
}


appliquerFiltre() {
  // Filtrer les produits en fonction de la valeur de recherche
  this.produitsService.getProduits().subscribe({
    next: (data) => {
      console.log('Succès GET');
      this.produits = data.filter((produit) =>
        (produit.code?.toLowerCase().includes(this.recherche.toLowerCase()) || '') ||
        (produit.designation?.toLowerCase().includes(this.recherche.toLowerCase()) || '')
      );
    },
    error: (err) => {
      console.log('Erreur GET');
    },
  });
}

  afficherFormulaireEdition: boolean = false; // Variable pour contrôler l'affichage du formulaire de modification

  validerFormulaire(form: NgForm) {
    if (form.valid) {
      console.log('Le formulaire est valide.');

      this.mettreAJourProduit(this.produitCourant);
    } else {
      console.log(
        "Le formulaire n'est pas valide. Veuillez remplir tous les champs obligatoires."
      );
      this.message = 'Veuillez remplir tous les champs obligatoires.';
    }
  }

  mettreAJourProduit(nouveauProduit: Produit) {
    if (nouveauProduit.id !== undefined) {
      this.produitsService.updateProduit(nouveauProduit.id.toString(), nouveauProduit).subscribe({
        next: (updatedProduct) => {
          const index = this.produits.findIndex((p) => p.id === nouveauProduit.id);
          if (index !== -1) {
            this.produits[index] = updatedProduct;
            this.message = 'Le produit a été mis à jour avec succès.';
            this.afficherFormulaireEdition = false; // Cacher le formulaire après validation
          }
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du produit.', err);
          this.message = 'Erreur lors de la mise à jour du produit.';
        },
      });
    } else {
      console.error("L'ID du produit à mettre à jour est undefined.");
      this.message = "L'ID du produit à mettre à jour est undefined.";
    }
  }

  supprimerProduit(produit: Produit) {
    const confirmation = confirm('Voulez-vous vraiment supprimer ce produit ?');
    if (confirmation) {
      if (produit.id !== undefined) {
        this.produitsService.deleteProduit(produit.id.toString()).subscribe({
          next: () => {
            const index = this.produits.indexOf(produit);
            if (index !== -1) {
              this.produits.splice(index, 1);
              this.message = 'Le produit a été supprimé avec succès.';
            }
          },
          error: (err) => {
            console.error('Erreur lors de la suppression du produit.', err);
            this.message = 'Erreur lors de la suppression du produit.';
          },
        });
      } else {
        console.error("L'ID du produit à supprimer est undefined.");
        this.message = "L'ID du produit à supprimer est undefined.";
      }
    }
  }

  editerProduit(produit: Produit) {
    this.produitCourant = { ...produit };
  
    this.afficherFormulaireEdition = true; // Afficher le formulaire lors de l'édition d'un produit
  }

  cacherFormulaire() {
    this.produitCourant = new Produit(); // Réinitialiser le produit courant
    this.afficherFormulaireEdition = false; // Cacher le formulaire
  }

}
