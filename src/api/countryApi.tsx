export interface Country {
  name: { common: string; official: string };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  flags: { png: string; svg: string; alt?: string };
  area: number;
  languages?: Record<string, string>;
  cca2: string;
}

const BASE_URL = "https://restcountries.com/v3.1";
const FIELDS = "name,population,region,subregion,capital,flags,area,languages,cca2";

export const fetchAllCountries = async (): Promise<Country[]> => {
  const res = await fetch(`${BASE_URL}/all?fields=${FIELDS}`);
  if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
  return res.json();
};

export const getPopulationByRegion = (countries: Country[]) => {
  const map: Record<string, number> = {};
  countries.forEach((c) => {
    map[c.region] = (map[c.region] || 0) + c.population;
  });
  return Object.entries(map)
    .filter(([region]) => region)
    .map(([region, population]) => ({ region, population }))
    .sort((a, b) => b.population - a.population);
};

export const getTopCountries = (countries: Country[], n = 5): Country[] => {
  return [...countries].sort((a, b) => b.population - a.population).slice(0, n);
};