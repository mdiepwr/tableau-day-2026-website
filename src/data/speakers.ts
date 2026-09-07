import aniketRawas from '../assets/aniket-rawas.webp';
import kristenCrocco from '../assets/kristen-crocco.webp';
import lieuTa from '../assets/lieu-ta.webp';
import matthewDiep from '../assets/matthew-diep.jpg';
import melissaJacob from '../assets/melissa-jacob.webp';
import parkerMiller from '../assets/parker-miller.jpg';
import seanLamb from '../assets/sean-lamb.webp';
import { TBD, type Person, type PersonPhoto } from '../types';

/**
 * Portraits we have. Keyed by person so the same face can be reused where
 * someone appears in more than one roster — Lieu Ta is both a keynote and a
 * member of the Avalanche team.
 *
 * Everyone else falls back to an initials avatar until a portrait arrives.
 */
const PHOTOS = {
  seanLamb: { src: seanLamb, width: 288, height: 289 },
  melissaJacob: { src: melissaJacob, width: 800, height: 800 },
  lieuTa: { src: lieuTa, width: 270, height: 271 },
  aniketRawas: { src: aniketRawas, width: 800, height: 800 },
  kristenCrocco: { src: kristenCrocco, width: 800, height: 800 },
  matthewDiep: { src: matthewDiep, width: 200, height: 200 },
  parkerMiller: { src: parkerMiller, width: 200, height: 200 },
} satisfies Record<string, PersonPhoto>;

/**
 * Keynote speakers.
 *
 * PLACEHOLDER LINEUP — carried over from Tableau Day 2025 because the 2026
 * keynotes have not been confirmed. Edit this array to update the section; no
 * component changes are needed.
 */
export const keynotes: Person[] = [
  {
    id: 'sean-lamb',
    name: 'Sean Lamb',
    role: 'Chief Financial Officer',
    photo: PHOTOS.seanLamb,
  },
  {
    id: 'melissa-jacob',
    name: 'Melissa Jacob',
    role: 'VP Ops and Chief of Staff',
    photo: PHOTOS.melissaJacob,
  },
  {
    id: 'lieu-ta',
    name: 'Lieu Ta',
    role: 'Sr Director of Business Insights',
    photo: PHOTOS.lieuTa,
  },
];

/**
 * Wind River Avalanche team. Titles marked TBD still need confirming; the two
 * known titles are carried over from the 2025 site.
 */
export const avalancheTeam: Person[] = [
  {
    id: 'lieu-ta-avalanche',
    name: 'Lieu Ta',
    role: 'Sr Director of Business Insights',
    photo: PHOTOS.lieuTa,
  },
  {
    id: 'aniket-rawas',
    name: 'Aniket Rawas',
    role: 'Senior Data Developer',
    photo: PHOTOS.aniketRawas,
  },
  {
    id: 'kristen-crocco',
    name: 'Kristen Crocco',
    role: 'Analytics Architect',
    photo: PHOTOS.kristenCrocco,
  },
  { id: 'pal-suraj-reddy', name: 'Gutta Suraj Pal Reddy', role: 'Data Developer' },
  { id: 'melanie-tummino', name: 'Melanie Tummino', role: 'Senior Data Engineer' },
  {
    id: 'matthew-diep',
    name: 'Matthew Diep',
    role: 'Data Platform Engineer',
    photo: PHOTOS.matthewDiep,
  },
  {
    id: 'parker-miller',
    name: 'Parker Miller',
    role: 'Business Insights Analyst',
    photo: PHOTOS.parkerMiller,
  },
];

/**
 * Tableau team — five reserved slots, names not yet confirmed for 2026.
 * For reference, the 2025 lineup was Alli Belaski (VP of Sales), Wes McCromack
 * (Tableau Specialist), Andrew Hill (Distinguished, Analytics SE), Ximena
 * Moreno (Salesforce) and Adrian Fivaz (Customer Success Leader).
 */
export const tableauTeam: Person[] = [
  { id: 'tableau-1', name: 'Tableau Team Member', role: TBD },
  { id: 'tableau-2', name: 'Tableau Team Member', role: TBD },
  { id: 'tableau-3', name: 'Tableau Team Member', role: TBD },
  { id: 'tableau-4', name: 'Tableau Team Member', role: TBD },
  { id: 'tableau-5', name: 'Tableau Team Member', role: TBD },
];
