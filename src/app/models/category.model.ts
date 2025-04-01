export interface Category {
    _id: string;
    name: string;
    description: string;
    isActive: boolean;
    priority: number;
    selected?: boolean; // Propiedad opcional para selección
  }