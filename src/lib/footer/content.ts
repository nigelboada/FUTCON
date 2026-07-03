import type { Locale } from '@/lib/i18n/config'

export const footerContent = {
  ca: {
    description:
      'Marketplace digital per connectar clubs, jugadors, entrenadors i professionals del futbol amateur.',
    columns: [
      {
        title: 'FUTCON',
        links: [
          { href: '/about', label: 'Nosaltres' },
          { href: '/services', label: 'Serveis' },
          { href: '/contact', label: 'Contacte' },
        ],
      },
      {
        title: 'Ajuda',
        links: [
          { href: '/help', label: 'Centre d’ajuda' },
          { href: '/faq', label: 'Preguntes freqüents' },
          { href: '/contact-us', label: 'Contacta amb nosaltres' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { href: '/privacy', label: 'Privacitat' },
          { href: '/cookies', label: 'Cookies' },
          { href: '/legal', label: 'Avís legal' },
          { href: '/terms', label: 'Condicions d’ús' },
        ],
      },
    ],
    meta: 'Projecte desenvolupat en el marc d’un Treball Final de Grau.',
    copyright: '© 2026 FUTCON. Prototip acadèmic.',
    pages: {
      privacy: {
        title: 'Política de privacitat',
        description:
          'Aquesta pàgina descriu el tractament de dades personals dins del prototip FUTCON.',
        paragraphs: [
          'FUTCON utilitza dades de perfil, contacte i autenticació amb l’objectiu de permetre el funcionament de la plataforma.',
          'Les dades de missatgeria, valoracions i verificació es tracten exclusivament en el context funcional del prototip.',
          'Aquest document té caràcter informatiu i acadèmic. En una versió comercial caldria una revisió legal completa.',
        ],
      },
      cookies: {
        title: 'Política de cookies',
        description:
          'FUTCON utilitza cookies tècniques per recordar preferències d’idioma i tema visual.',
        paragraphs: [
          'Les cookies utilitzades permeten conservar la preferència d’idioma i el tema clar o fosc seleccionat per l’usuari.',
          'No s’ha implementat cap sistema de seguiment publicitari dins del prototip.',
        ],
      },
      legal: {
        title: 'Avís legal',
        description:
          'Informació legal bàsica del projecte FUTCON.',
        paragraphs: [
          'FUTCON és un prototip acadèmic desenvolupat com a Treball Final de Grau.',
          'La plataforma no representa una empresa constituïda ni ofereix serveis comercials reals en aquesta fase.',
        ],
      },
      terms: {
        title: 'Condicions d’ús',
        description:
          'Condicions generals d’ús del prototip FUTCON.',
        paragraphs: [
          'L’ús de FUTCON s’ha de fer amb dades adequades al context de prova i validació del prototip.',
          'No es permet utilitzar la plataforma per publicar contingut ofensiu, fraudulent o aliè a l’objectiu del projecte.',
        ],
      },
      help: {
        title: 'Centre d’ajuda',
        description:
          'Guia ràpida d’ús de la plataforma.',
        paragraphs: [
          'Per començar, crea un compte, selecciona el teu rol i completa el perfil.',
          'Des del cercador pots trobar altres perfils, consultar-ne la informació pública i iniciar una conversa.',
          'Les valoracions i la verificació ajuden a reforçar la confiança dins de la plataforma.',
        ],
      },
      faq: {
        title: 'Preguntes freqüents',
        description:
          'Respostes ràpides sobre el funcionament de FUTCON.',
        paragraphs: [
          'Puc veure perfils sense iniciar sessió? No. El cercador i els perfils detallats són funcionalitats privades.',
          'Com funciona la verificació? L’usuari la sol·licita i un administrador la revisa.',
          'La plataforma és una app nativa? No. FUTCON és una web responsive preparada com a PWA.',
        ],
      },
    },
  },

  es: {
    description:
      'Marketplace digital para conectar clubes, jugadores, entrenadores y profesionales del fútbol amateur.',
    columns: [
      {
        title: 'FUTCON',
        links: [
          { href: '/about', label: 'Nosotros' },
          { href: '/services', label: 'Servicios' },
          { href: '/contact', label: 'Contacto' },
        ],
      },
      {
        title: 'Ayuda',
        links: [
          { href: '/help', label: 'Centro de ayuda' },
          { href: '/faq', label: 'Preguntas frecuentes' },
          { href: '/contact-us', label: 'Contacta con nosotros' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { href: '/privacy', label: 'Privacidad' },
          { href: '/cookies', label: 'Cookies' },
          { href: '/legal', label: 'Aviso legal' },
          { href: '/terms', label: 'Condiciones de uso' },
        ],
      },
    ],
    meta: 'Proyecto desarrollado en el marco de un Trabajo Final de Grado.',
    copyright: '© 2026 FUTCON. Prototipo académico.',
    pages: {
      privacy: {
        title: 'Política de privacidad',
        description:
          'Esta página describe el tratamiento de datos personales dentro del prototipo FUTCON.',
        paragraphs: [
          'FUTCON utiliza datos de perfil, contacto y autenticación para permitir el funcionamiento de la plataforma.',
          'Los datos de mensajería, valoraciones y verificación se tratan exclusivamente en el contexto funcional del prototipo.',
          'Este documento tiene carácter informativo y académico. En una versión comercial sería necesaria una revisión legal completa.',
        ],
      },
      cookies: {
        title: 'Política de cookies',
        description:
          'FUTCON utiliza cookies técnicas para recordar preferencias de idioma y tema visual.',
        paragraphs: [
          'Las cookies utilizadas permiten conservar la preferencia de idioma y el tema claro u oscuro seleccionado por el usuario.',
          'No se ha implementado ningún sistema de seguimiento publicitario dentro del prototipo.',
        ],
      },
      legal: {
        title: 'Aviso legal',
        description: 'Información legal básica del proyecto FUTCON.',
        paragraphs: [
          'FUTCON es un prototipo académico desarrollado como Trabajo Final de Grado.',
          'La plataforma no representa una empresa constituida ni ofrece servicios comerciales reales en esta fase.',
        ],
      },
      terms: {
        title: 'Condiciones de uso',
        description: 'Condiciones generales de uso del prototipo FUTCON.',
        paragraphs: [
          'El uso de FUTCON debe hacerse con datos adecuados al contexto de prueba y validación del prototipo.',
          'No se permite utilizar la plataforma para publicar contenido ofensivo, fraudulento o ajeno al objetivo del proyecto.',
        ],
      },
      help: {
        title: 'Centro de ayuda',
        description: 'Guía rápida de uso de la plataforma.',
        paragraphs: [
          'Para empezar, crea una cuenta, selecciona tu rol y completa el perfil.',
          'Desde el buscador puedes encontrar otros perfiles, consultar su información pública e iniciar una conversación.',
          'Las valoraciones y la verificación ayudan a reforzar la confianza dentro de la plataforma.',
        ],
      },
      faq: {
        title: 'Preguntas frecuentes',
        description: 'Respuestas rápidas sobre el funcionamiento de FUTCON.',
        paragraphs: [
          '¿Puedo ver perfiles sin iniciar sesión? No. El buscador y los perfiles detallados son funcionalidades privadas.',
          '¿Cómo funciona la verificación? El usuario la solicita y un administrador la revisa.',
          '¿La plataforma es una app nativa? No. FUTCON es una web responsive preparada como PWA.',
        ],
      },
    },
  },

  en: {
    description:
      'Digital marketplace to connect clubs, players, coaches and amateur football professionals.',
    columns: [
      {
        title: 'FUTCON',
        links: [
          { href: '/about', label: 'About' },
          { href: '/services', label: 'Services' },
          { href: '/contact', label: 'Contact' },
        ],
      },
      {
        title: 'Help',
        links: [
          { href: '/help', label: 'Help center' },
          { href: '/faq', label: 'FAQ' },
          { href: '/contact-us', label: 'Contact us' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { href: '/privacy', label: 'Privacy' },
          { href: '/cookies', label: 'Cookies' },
          { href: '/legal', label: 'Legal notice' },
          { href: '/terms', label: 'Terms of use' },
        ],
      },
    ],
    meta: 'Project developed as part of a Final Degree Project.',
    copyright: '© 2026 FUTCON. Academic prototype.',
    pages: {
      privacy: {
        title: 'Privacy policy',
        description:
          'This page describes how personal data is handled inside the FUTCON prototype.',
        paragraphs: [
          'FUTCON uses profile, contact and authentication data to enable the platform to operate.',
          'Messaging, reviews and verification data are handled only within the functional context of the prototype.',
          'This document is informational and academic. A commercial version would require full legal review.',
        ],
      },
      cookies: {
        title: 'Cookie policy',
        description:
          'FUTCON uses technical cookies to remember language and visual theme preferences.',
        paragraphs: [
          'The cookies used preserve the selected language and light or dark theme preference.',
          'No advertising tracking system has been implemented in the prototype.',
        ],
      },
      legal: {
        title: 'Legal notice',
        description: 'Basic legal information about FUTCON.',
        paragraphs: [
          'FUTCON is an academic prototype developed as a Final Degree Project.',
          'The platform does not represent an incorporated company or offer real commercial services at this stage.',
        ],
      },
      terms: {
        title: 'Terms of use',
        description: 'General terms of use for the FUTCON prototype.',
        paragraphs: [
          'FUTCON should be used with data appropriate for testing and prototype validation.',
          'The platform must not be used to publish offensive, fraudulent or unrelated content.',
        ],
      },
      help: {
        title: 'Help center',
        description: 'Quick guide to using the platform.',
        paragraphs: [
          'To get started, create an account, select your role and complete your profile.',
          'From search, you can find other profiles, view their public information and start a conversation.',
          'Reviews and verification help build trust inside the platform.',
        ],
      },
      faq: {
        title: 'FAQ',
        description: 'Quick answers about FUTCON.',
        paragraphs: [
          'Can I view profiles without signing in? No. Search and detailed profiles are private features.',
          'How does verification work? The user requests it and an administrator reviews it.',
          'Is the platform a native app? No. FUTCON is a responsive web app prepared as a PWA.',
        ],
      },
    },
  },
} as const

export function getFooterContent(locale: Locale) {
  return footerContent[locale] ?? footerContent.ca
}