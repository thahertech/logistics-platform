import { UserPlus, Search, Truck, Briefcase, Headphones, Package } from "lucide-react";

const serviceData = [
  {
    icon: UserPlus,
    title: 'Luo käyttäjätili',
    description: 'Rekisteröidy ilmaiseksi ja hyödy palvelusta heti.',
    path: '/auth/login',
  },
  {
    icon: Package,
    title: 'Luo ilmoitus',
    description: 'Syötä tiedot ja alusta kilpailuttaa puolestasi.',
    path: '/auth/login',
  },
  {
    icon: Search,
    title: 'Löydä kuljetus',
    description: 'Kätevästi kartalta tai suodattamalla valikosta.',
    path: '/auth/login',
  },
  {
    icon: Briefcase,
    title: 'Ratkaisut yrityksille',
    description: 'Helppokäyttöinen hallintapaneeli yrityksille.',
    path: '/yrityksille',
  },
  {
    icon: Headphones,
    title: '24/7 Asiakastuki',
    description: 'Olemme täällä auttamassa sinua ympäri vuorokauden.',
    path: '/yhteys',
  },
];

export default serviceData;
