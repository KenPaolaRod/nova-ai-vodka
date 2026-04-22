export type Bar = {
  city: string;
  name: string;
  address: string;
};

export const BARS: ReadonlyArray<Bar> = [
  { city: "New York, NY", name: "Attaboy", address: "134 Eldridge St — Lower East Side" },
  { city: "Brooklyn, NY", name: "Long Island Bar", address: "110 Atlantic Ave — Cobble Hill" },
  { city: "Mexico City", name: "Licorería Limantour", address: "Álvaro Obregón 106 — Roma Nte." },
  { city: "Tokyo", name: "Bar Benfiddich", address: "9F, 1-13-7 Nishi-Shinjuku" },
  { city: "London", name: "Tayēr + Elementary", address: "152 Old St — Shoreditch" },
  { city: "Warsaw", name: "Kita Koguta", address: "Plac Grzybowski 4 — Śródmieście" },
  { city: "Berlin", name: "Buck & Breck", address: "Brunnenstraße 177 — Mitte" },
  { city: "Paris", name: "Le Syndicat", address: "51 Rue du Faubourg Saint-Denis" },
  { city: "Los Angeles", name: "Thunderbolt", address: "1263 W Temple St — Echo Park" },
];
