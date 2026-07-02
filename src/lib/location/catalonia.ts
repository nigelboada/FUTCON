export const cataloniaLocations = {
  Barcelona: [
    'Barcelona',
    'Badalona',
    'L’Hospitalet de Llobregat',
    'Sabadell',
    'Terrassa',
    'Mataró',
    'Santa Coloma de Gramenet',
    'Cornellà de Llobregat',
    'Sant Cugat del Vallès',
    'Manresa',
    'Rubí',
    'Vilanova i la Geltrú',
    'Vilafranca del Penedès',
    'Igualada',
    'Vic',
    'Granollers',
    'Mollet del Vallès',
    'Castelldefels',
    'Gavà',
    'Martorell',
  ],
  Girona: [
    'Girona',
    'Figueres',
    'Blanes',
    'Lloret de Mar',
    'Olot',
    'Salt',
    'Banyoles',
    'Palamós',
    'Ripoll',
    'Roses',
    'Sant Feliu de Guíxols',
    'La Bisbal d’Empordà',
  ],
  Lleida: [
    'Lleida',
    'Balaguer',
    'Tàrrega',
    'Mollerussa',
    'Cervera',
    'La Seu d’Urgell',
    'Solsona',
    'Les Borges Blanques',
    'Alcarràs',
    'Almacelles',
  ],
  Tarragona: [
    'Tarragona',
    'Reus',
    'Valls',
    'Cambrils',
    'Salou',
    'Tortosa',
    'Amposta',
    'El Vendrell',
    'Calafell',
    'Vila-seca',
    'Montblanc',
  ],
} as const

export type Province = keyof typeof cataloniaLocations

export const provinces = Object.keys(cataloniaLocations) as Province[]

export function getCitiesByProvince(province: string | null | undefined) {
  if (!province || !(province in cataloniaLocations)) {
    return []
  }

  return cataloniaLocations[province as Province]
}