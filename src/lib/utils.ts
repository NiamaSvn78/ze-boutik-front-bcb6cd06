import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AirtableProduct } from '../types/airtable'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBestSellers(products: AirtableProduct[]): AirtableProduct[] {
  // Grouper par catégorie et prendre le premier produit de chaque catégorie
  const bestSellers: { [cat: string]: AirtableProduct } = {};
  for (const prod of products) {
    if (prod.categorie && !bestSellers[prod.categorie]) {
      bestSellers[prod.categorie] = prod;
    }
  }
  return Object.values(bestSellers);
}
