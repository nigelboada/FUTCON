import type { Locale } from './config'

export const messages = {
  ca: {
    nav: {
      dashboard: 'Dashboard',
      search: 'Cercar perfils',
      conversations: 'Missatges',
      editProfile: 'Editar perfil',
      admin: 'Admin',
      signOut: 'Tancar sessió',
      login: 'Iniciar sessió',
      register: 'Crear compte',
      subtitle: 'Futbol amateur connectat',
    },
    theme: {
      light: 'Tema clar',
      dark: 'Tema fosc',
      toggle: 'Canviar tema',
    },
    language: {
      label: 'Idioma',
    },
    home: {
      eyebrow: 'Marketplace per al futbol amateur',
      title: 'Connecta clubs, jugadors i professionals del futbol amateur.',
      description:
        'FUTCON és una plataforma orientada a facilitar la descoberta de perfils, el primer contacte i la generació de confiança dins de l’ecosistema del futbol amateur.',
      dashboardCta: 'Anar al dashboard',
      registerCta: 'Crear compte',
      loginCta: 'Iniciar sessió',
      exploreCta: 'Explorar perfils',
      targetTitle: 'Per a qui és FUTCON?',
      userTypes: [
        'Jugadors que busquen oportunitats',
        'Entrenadors i cos tècnic',
        'Clubs i responsables esportius',
        'Fisioterapeutes, nutricionistes i preparadors físics',
      ],
      features: [
        {
          title: 'Perfils diferenciats',
          description:
            'Jugadors, entrenadors, clubs i professionals de l’staff disposen d’una fitxa adaptada al seu rol.',
        },
        {
          title: 'Cerca amb filtres',
          description:
            'Permet localitzar perfils per rol, ubicació i disponibilitat dins de l’ecosistema del futbol amateur.',
        },
        {
          title: 'Comunicació interna',
          description:
            'Els usuaris poden iniciar converses i contactar directament amb altres perfils de la plataforma.',
        },
        {
          title: 'Confiança i valoracions',
          description:
            'Les valoracions i la disponibilitat visible ajuden a reforçar la credibilitat dels perfils.',
        },
      ],
    },
  },

  es: {
    nav: {
      dashboard: 'Panel',
      search: 'Buscar perfiles',
      conversations: 'Mensajes',
      editProfile: 'Editar perfil',
      admin: 'Admin',
      signOut: 'Cerrar sesión',
      login: 'Iniciar sesión',
      register: 'Crear cuenta',
      subtitle: 'Fútbol amateur conectado',
    },
    theme: {
      light: 'Tema claro',
      dark: 'Tema oscuro',
      toggle: 'Cambiar tema',
    },
    language: {
      label: 'Idioma',
    },
    home: {
      eyebrow: 'Marketplace para el fútbol amateur',
      title: 'Conecta clubes, jugadores y profesionales del fútbol amateur.',
      description:
        'FUTCON es una plataforma orientada a facilitar el descubrimiento de perfiles, el primer contacto y la generación de confianza dentro del ecosistema del fútbol amateur.',
      dashboardCta: 'Ir al panel',
      registerCta: 'Crear cuenta',
      loginCta: 'Iniciar sesión',
      exploreCta: 'Explorar perfiles',
      targetTitle: '¿Para quién es FUTCON?',
      userTypes: [
        'Jugadores que buscan oportunidades',
        'Entrenadores y cuerpo técnico',
        'Clubes y responsables deportivos',
        'Fisioterapeutas, nutricionistas y preparadores físicos',
      ],
      features: [
        {
          title: 'Perfiles diferenciados',
          description:
            'Jugadores, entrenadores, clubes y profesionales del staff disponen de una ficha adaptada a su rol.',
        },
        {
          title: 'Búsqueda con filtros',
          description:
            'Permite localizar perfiles por rol, ubicación y disponibilidad dentro del ecosistema del fútbol amateur.',
        },
        {
          title: 'Comunicación interna',
          description:
            'Los usuarios pueden iniciar conversaciones y contactar directamente con otros perfiles de la plataforma.',
        },
        {
          title: 'Confianza y valoraciones',
          description:
            'Las valoraciones y la disponibilidad visible ayudan a reforzar la credibilidad de los perfiles.',
        },
      ],
    },
  },

  en: {
    nav: {
      dashboard: 'Dashboard',
      search: 'Search profiles',
      conversations: 'Messages',
      editProfile: 'Edit profile',
      admin: 'Admin',
      signOut: 'Sign out',
      login: 'Sign in',
      register: 'Create account',
      subtitle: 'Amateur football connected',
    },
    theme: {
      light: 'Light theme',
      dark: 'Dark theme',
      toggle: 'Toggle theme',
    },
    language: {
      label: 'Language',
    },
    home: {
      eyebrow: 'Marketplace for amateur football',
      title: 'Connect clubs, players and professionals in amateur football.',
      description:
        'FUTCON is a platform designed to help users discover profiles, make first contact and build trust within the amateur football ecosystem.',
      dashboardCta: 'Go to dashboard',
      registerCta: 'Create account',
      loginCta: 'Sign in',
      exploreCta: 'Explore profiles',
      targetTitle: 'Who is FUTCON for?',
      userTypes: [
        'Players looking for opportunities',
        'Coaches and technical staff',
        'Clubs and sports managers',
        'Physiotherapists, nutritionists and fitness coaches',
      ],
      features: [
        {
          title: 'Role-based profiles',
          description:
            'Players, coaches, clubs and staff professionals have a profile adapted to their role.',
        },
        {
          title: 'Filtered search',
          description:
            'Users can find profiles by role, location and availability within the amateur football ecosystem.',
        },
        {
          title: 'Internal communication',
          description:
            'Users can start conversations and contact other profiles directly through the platform.',
        },
        {
          title: 'Trust and reviews',
          description:
            'Reviews and visible availability help increase profile credibility.',
        },
      ],
    },
  },
} as const

export function getMessages(locale: Locale) {
  return messages[locale] ?? messages.ca
}