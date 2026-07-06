import type { Locale } from '@/lib/i18n/config'

type StaticPage = {
  title: string
  description: string
  paragraphs: string[]
  sectionTitles?: string[]
  additionalInfo?: {
    title: string
    paragraphs: string[]
  }
}

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
    helpMore: {
      title: '🙂 Necessites més ajuda?',
      description:
        'Si no has trobat la resposta que buscaves, pots contactar amb nosaltres i t’ajudarem tan aviat com sigui possible.',
      contactUs: 'Contacta amb nosaltres',
      contactDetails: 'Dades de contacte',
    },
    legalFallbackSection: 'Apartat',
    legalInformativeSection: 'Apartat informatiu',
    pages: {
      privacy: {
        title: 'Política de privacitat',
        description:
          'Aquesta pàgina descriu el tractament de dades personals dins del prototip FUTCON.',
        sectionTitles: [
          'Dades que es poden tractar',
          'Finalitat del tractament',
          'Origen i visibilitat de la informació',
          'Accés i mesures de protecció',
          'Apartat informatiu',
        ],
        paragraphs: [
          'FUTCON pot utilitzar dades de perfil, contacte i autenticació per permetre el funcionament de la plataforma, identificar els usuaris registrats i facilitar les interaccions entre perfils del futbol amateur.',
          'Les dades de missatgeria, valoracions, sol·licituds de verificació i preferències d’ús es tracten en el context funcional del prototip i amb la finalitat de validar l’experiència de producte.',
          'La informació pot haver estat introduïda directament per l’usuari, com el nom visible, la biografia, la ubicació, el rol esportiu, el club, la disponibilitat o altres camps necessaris per completar el perfil públic.',
          'L’accés a determinades funcionalitats queda limitat a usuaris autenticats. Aquesta restricció ajuda a protegir la informació dels perfils i a mantenir un entorn de prova més controlat.',
          'Aquest document té caràcter informatiu i acadèmic. En una versió comercial caldria una revisió legal completa, una base jurídica formal per al tractament i mecanismes específics d’exercici de drets.',
        ],
        additionalInfo: {
          title: 'Drets i actualitzacions',
          paragraphs: [
            'En una evolució comercial del projecte, FUTCON hauria d’informar de manera detallada sobre el responsable del tractament, els terminis de conservació i els canals per exercir drets d’accés, rectificació, supressió, oposició i portabilitat.',
            'La política de privacitat es podria actualitzar per adaptar-se a canvis normatius, tècnics o funcionals de la plataforma.',
          ],
        },
      },
      cookies: {
        title: 'Política de cookies',
        description:
          'Informació sobre l’ús de cookies, tecnologies similars i preferències de navegació dins de FUTCON.',
        sectionTitles: [
          'Què són les cookies',
          'Cookies tècniques',
          'Cookies de preferències',
          'Mesura i analítica',
          'Apartat informatiu',
        ],
        paragraphs: [
          'A FUTCON es poden utilitzar cookies pròpies i, si escau, de tercers per garantir el funcionament tècnic de la plataforma, recordar preferències de l’usuari, millorar el rendiment i obtenir informació agregada sobre l’ús del servei.',
          'Les cookies tècniques són necessàries perquè la plataforma pugui oferir funcionalitats bàsiques com la persistència de sessió, la configuració d’idioma, la selecció de tema visual o la navegació segura entre pantalles protegides.',
          'Les cookies de preferències permeten recordar decisions de l’usuari, com ara l’idioma o el tema clar/fosc, per oferir una experiència més coherent i personalitzada en visites posteriors.',
          'En cas d’incorporar eines de mesura, anàlisi o màrqueting en futures versions, FUTCON informarà de manera específica sobre les categories de cookies corresponents i habilitarà mecanismes adequats de consentiment quan sigui necessari.',
          'L’usuari pot gestionar, bloquejar o eliminar les cookies des de la configuració del seu navegador. Tanmateix, la desactivació d’algunes tecnologies pot afectar el correcte funcionament d’algunes parts del servei.',
        ],
        additionalInfo: {
          title: 'Configuració del navegador',
          paragraphs: [
            'La gestió de cookies depèn del navegador utilitzat. En una versió final, aquesta pàgina podria incloure enllaços directes a les instruccions dels navegadors principals.',
            'Si FUTCON incorporés cookies no essencials, caldria oferir un panell de consentiment amb opcions clares per acceptar, rebutjar o configurar cada categoria.',
          ],
        },
      },
      legal: {
        title: 'Avís legal',
        description: 'Informació legal bàsica del projecte FUTCON.',
        sectionTitles: [
          'Identificació del projecte',
          'Naturalesa acadèmica',
          'Continguts i funcionalitats',
          'Ús de marques i referències',
          'Apartat informatiu',
        ],
        paragraphs: [
          'FUTCON és un prototip acadèmic desenvolupat com a Treball Final de Grau amb l’objectiu d’explorar una solució digital per connectar agents del futbol amateur.',
          'La plataforma no representa una empresa constituïda ni ofereix serveis comercials reals en aquesta fase. Qualsevol ús s’ha d’entendre dins del context de prova, demostració i validació del projecte.',
          'Els continguts, funcionalitats i fluxos disponibles poden canviar durant el desenvolupament, ja que formen part d’un procés iteratiu orientat a l’aprenentatge, la recerca i la millora del prototip.',
          'Les marques, clubs, noms o dades que puguin aparèixer en entorns de prova s’han d’utilitzar de manera responsable i sense atribuir a FUTCON cap relació oficial que no hagi estat expressament confirmada.',
          'En cas d’evolucionar cap a un producte real, caldria completar la informació legal amb dades identificatives del responsable, condicions comercials, polítiques de responsabilitat i documentació normativa aplicable.',
        ],
        additionalInfo: {
          title: 'Propietat intel·lectual',
          paragraphs: [
            'El nom, el logotip, els continguts, les interfícies i l’estructura visual del prototip formen part del projecte FUTCON i s’han d’utilitzar respectant la normativa aplicable de propietat intel·lectual.',
            'L’ús de la plataforma implica un compromís de comportament lícit, respectuós i coherent amb la finalitat professional i acadèmica del servei.',
          ],
        },
      },
      terms: {
        title: 'Condicions d’ús',
        description: 'Condicions generals d’ús del prototip FUTCON.',
        sectionTitles: [
          'Ús adequat de la plataforma',
          'Continguts no permesos',
          'Responsabilitat de l’usuari',
          'Limitació o revisió d’accés',
          'Apartat informatiu',
        ],
        paragraphs: [
          'L’ús de FUTCON s’ha de fer amb dades adequades al context de prova i validació del prototip, evitant introduir informació sensible, falsa, ofensiva o innecessària.',
          'No es permet utilitzar la plataforma per publicar contingut ofensiu, fraudulent, discriminatori, il·legal o aliè a l’objectiu del projecte, que és facilitar connexions esportives dins del futbol amateur.',
          'Cada usuari és responsable de la informació que incorpora al seu perfil, de les converses que inicia i de les valoracions que publica dins de la plataforma.',
          'FUTCON pot limitar o revisar l’accés a determinades funcionalitats si detecta un ús inadequat, especialment en casos que afectin la confiança, la seguretat o la qualitat de l’experiència de prova.',
          'Aquestes condicions són provisionals i adaptades a un prototip acadèmic. Una versió comercial hauria d’incloure termes contractuals complets, criteris de moderació i procediments formals de reclamació.',
        ],
        additionalInfo: {
          title: 'Bones pràctiques de participació',
          paragraphs: [
            'Els usuaris han de mantenir una comunicació respectuosa, no suplantar tercers i evitar qualsevol ús que pugui perjudicar altres perfils, clubs o professionals.',
            'Les condicions podrien revisar-se a mesura que el prototip incorpori noves funcionalitats o evolucioni cap a un servei real.',
          ],
        },
      },
      help: {
        title: 'Centre d’ajuda',
        description: 'Guia ràpida d’ús de la plataforma.',
        paragraphs: [
          'Per començar, crea un compte, selecciona el teu rol principal i completa el perfil amb la informació essencial perquè altres usuaris puguin entendre qui ets i què busques.',
          'Des del cercador pots trobar altres perfils, filtrar segons criteris rellevants, consultar-ne la informació pública i iniciar una conversa quan vulguis contactar directament amb un altre usuari.',
          'La pàgina de perfil permet actualitzar dades generals, afegir avatar, indicar ubicació, disponibilitat i completar camps específics segons si ets jugador, entrenador, club o professional de suport.',
          'Les valoracions i la verificació ajuden a reforçar la confiança dins de la plataforma. La verificació pot ser sol·licitada per l’usuari i revisada posteriorment des del panell d’administració.',
          'Si tens dubtes, incidències o vols comunicar una millora, pots utilitzar la pàgina de contacte amb nosaltres perquè el missatge quedi registrat i es pugui revisar amb més facilitat.',
        ],
      },
      faq: {
        title: 'Preguntes freqüents',
        description: 'Respostes ràpides sobre el funcionament de FUTCON.',
        paragraphs: [
          'Puc veure perfils sense iniciar sessió? No. El cercador i els perfils detallats són funcionalitats privades pensades per protegir millor la informació publicada pels usuaris registrats.',
          'Com funciona la verificació? L’usuari la sol·licita des del seu perfil i un administrador la revisa. L’estat pot aparèixer com a no verificat, pendent, verificat o rebutjat.',
          'La plataforma és una app nativa? No. FUTCON és una web responsive preparada com a PWA, de manera que pot adaptar-se a diferents dispositius i oferir una experiència semblant a una aplicació.',
          'Puc canviar el meu rol després del registre? Sí. Des de l’edició del perfil pots modificar el rol i completar els camps específics que corresponguin al nou tipus de perfil.',
          'Què passa si el meu perfil està incomplet? La plataforma pot mostrar indicadors de completesa per ajudar-te a millorar-lo i fer-lo més útil per a altres usuaris del marketplace.',
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
    helpMore: {
      title: '🙂 ¿Necesitas más ayuda?',
      description:
        'Si no has encontrado la respuesta que buscabas, puedes contactar con nosotros y te ayudaremos lo antes posible.',
      contactUs: 'Contacta con nosotros',
      contactDetails: 'Datos de contacto',
    },
    legalFallbackSection: 'Apartado',
    legalInformativeSection: 'Apartado informativo',
    pages: {
      privacy: {
        title: 'Política de privacidad',
        description:
          'Esta página describe el tratamiento de datos personales dentro del prototipo FUTCON.',
        sectionTitles: [
          'Datos que se pueden tratar',
          'Finalidad del tratamiento',
          'Origen y visibilidad de la información',
          'Acceso y medidas de protección',
          'Apartado informativo',
        ],
        paragraphs: [
          'FUTCON puede utilizar datos de perfil, contacto y autenticación para permitir el funcionamiento de la plataforma, identificar a los usuarios registrados y facilitar las interacciones entre perfiles del fútbol amateur.',
          'Los datos de mensajería, valoraciones, solicitudes de verificación y preferencias de uso se tratan en el contexto funcional del prototipo y con la finalidad de validar la experiencia de producto.',
          'La información puede haber sido introducida directamente por el usuario, como el nombre visible, la biografía, la ubicación, el rol deportivo, el club, la disponibilidad u otros campos necesarios para completar el perfil público.',
          'El acceso a determinadas funcionalidades queda limitado a usuarios autenticados. Esta restricción ayuda a proteger la información de los perfiles y a mantener un entorno de prueba más controlado.',
          'Este documento tiene carácter informativo y académico. En una versión comercial sería necesaria una revisión legal completa, una base jurídica formal para el tratamiento y mecanismos específicos de ejercicio de derechos.',
        ],
        additionalInfo: {
          title: 'Derechos y actualizaciones',
          paragraphs: [
            'En una evolución comercial del proyecto, FUTCON debería informar de forma detallada sobre el responsable del tratamiento, los plazos de conservación y los canales para ejercer derechos de acceso, rectificación, supresión, oposición y portabilidad.',
            'La política de privacidad podría actualizarse para adaptarse a cambios normativos, técnicos o funcionales de la plataforma.',
          ],
        },
      },
      cookies: {
        title: 'Política de cookies',
        description:
          'Información sobre el uso de cookies, tecnologías similares y preferencias de navegación dentro de FUTCON.',
        sectionTitles: [
          'Qué son las cookies',
          'Cookies técnicas',
          'Cookies de preferencias',
          'Medición y analítica',
          'Apartado informativo',
        ],
        paragraphs: [
          'En FUTCON se pueden utilizar cookies propias y, en su caso, de terceros para garantizar el funcionamiento técnico de la plataforma, recordar preferencias del usuario, mejorar el rendimiento y obtener información agregada sobre el uso del servicio.',
          'Las cookies técnicas son necesarias para que la plataforma pueda ofrecer funcionalidades básicas como la persistencia de sesión, la configuración de idioma, la selección de tema claro/oscuro o la navegación segura entre pantallas protegidas.',
          'Las cookies de preferencias permiten recordar decisiones del usuario, como el idioma o el tema claro/oscuro, para ofrecer una experiencia más coherente y personalizada en visitas posteriores.',
          'En caso de incorporar herramientas de medición, análisis o marketing en futuras versiones, FUTCON informará de manera específica sobre las categorías de cookies correspondientes y habilitará mecanismos adecuados de consentimiento cuando sea necesario.',
          'El usuario puede gestionar, bloquear o eliminar las cookies desde la configuración de su navegador. No obstante, la desactivación de algunas tecnologías puede afectar al correcto funcionamiento de algunas partes del servicio.',
        ],
        additionalInfo: {
          title: 'Configuración del navegador',
          paragraphs: [
            'La gestión de cookies depende del navegador utilizado. En una versión final, esta página podría incluir enlaces directos a las instrucciones de los principales navegadores.',
            'Si FUTCON incorporara cookies no esenciales, sería necesario ofrecer un panel de consentimiento con opciones claras para aceptar, rechazar o configurar cada categoría.',
          ],
        },
      },
      legal: {
        title: 'Aviso legal',
        description: 'Información legal básica del proyecto FUTCON.',
        sectionTitles: [
          'Identificación del proyecto',
          'Naturaleza académica',
          'Contenidos y funcionalidades',
          'Uso de marcas y referencias',
          'Apartado informativo',
        ],
        paragraphs: [
          'FUTCON es un prototipo académico desarrollado como Trabajo Final de Grado con el objetivo de explorar una solución digital para conectar agentes del fútbol amateur.',
          'La plataforma no representa una empresa constituida ni ofrece servicios comerciales reales en esta fase. Cualquier uso debe entenderse dentro del contexto de prueba, demostración y validación del proyecto.',
          'Los contenidos, funcionalidades y flujos disponibles pueden cambiar durante el desarrollo, ya que forman parte de un proceso iterativo orientado al aprendizaje, la investigación y la mejora del prototipo.',
          'Las marcas, clubes, nombres o datos que puedan aparecer en entornos de prueba deben utilizarse de forma responsable y sin atribuir a FUTCON ninguna relación oficial que no haya sido confirmada expresamente.',
          'Si el proyecto evolucionara hacia un producto real, sería necesario completar la información legal con datos identificativos del responsable, condiciones comerciales, políticas de responsabilidad y documentación normativa aplicable.',
        ],
        additionalInfo: {
          title: 'Propiedad intelectual',
          paragraphs: [
            'El nombre, el logotipo, los contenidos, las interfaces y la estructura visual del prototipo forman parte del proyecto FUTCON y deben utilizarse respetando la normativa aplicable de propiedad intelectual.',
            'El uso de la plataforma implica un compromiso de comportamiento lícito, respetuoso y coherente con la finalidad profesional y académica del servicio.',
          ],
        },
      },
      terms: {
        title: 'Condiciones de uso',
        description: 'Condiciones generales de uso del prototipo FUTCON.',
        sectionTitles: [
          'Uso adecuado de la plataforma',
          'Contenidos no permitidos',
          'Responsabilidad del usuario',
          'Limitación o revisión de acceso',
          'Apartado informativo',
        ],
        paragraphs: [
          'El uso de FUTCON debe hacerse con datos adecuados al contexto de prueba y validación del prototipo, evitando introducir información sensible, falsa, ofensiva o innecesaria.',
          'No se permite utilizar la plataforma para publicar contenido ofensivo, fraudulento, discriminatorio, ilegal o ajeno al objetivo del proyecto, que es facilitar conexiones deportivas dentro del fútbol amateur.',
          'Cada usuario es responsable de la información que incorpora a su perfil, de las conversaciones que inicia y de las valoraciones que publica dentro de la plataforma.',
          'FUTCON puede limitar o revisar el acceso a determinadas funcionalidades si detecta un uso inadecuado, especialmente en casos que afecten a la confianza, la seguridad o la calidad de la experiencia de prueba.',
          'Estas condiciones son provisionales y adaptadas a un prototipo académico. Una versión comercial debería incluir términos contractuales completos, criterios de moderación y procedimientos formales de reclamación.',
        ],
        additionalInfo: {
          title: 'Buenas prácticas de participación',
          paragraphs: [
            'Los usuarios deben mantener una comunicación respetuosa, no suplantar a terceros y evitar cualquier uso que pueda perjudicar a otros perfiles, clubes o profesionales.',
            'Las condiciones podrían revisarse a medida que el prototipo incorpore nuevas funcionalidades o evolucione hacia un servicio real.',
          ],
        },
      },
      help: {
        title: 'Centro de ayuda',
        description: 'Guía rápida de uso de la plataforma.',
        paragraphs: [
          'Para empezar, crea una cuenta, selecciona tu rol principal y completa el perfil con la información esencial para que otros usuarios puedan entender quién eres y qué buscas.',
          'Desde el buscador puedes encontrar otros perfiles, filtrar según criterios relevantes, consultar su información pública e iniciar una conversación cuando quieras contactar directamente con otro usuario.',
          'La página de perfil permite actualizar datos generales, añadir avatar, indicar ubicación, disponibilidad y completar campos específicos según seas jugador, entrenador, club o profesional de apoyo.',
          'Las valoraciones y la verificación ayudan a reforzar la confianza dentro de la plataforma. La verificación puede ser solicitada por el usuario y revisada posteriormente desde el panel de administración.',
          'Si tienes dudas, incidencias o quieres comunicar una mejora, puedes utilizar la página de contacta con nosotros para que el mensaje quede registrado y pueda revisarse con más facilidad.',
        ],
      },
      faq: {
        title: 'Preguntas frecuentes',
        description: 'Respuestas rápidas sobre el funcionamiento de FUTCON.',
        paragraphs: [
          '¿Puedo ver perfiles sin iniciar sesión? No. El buscador y los perfiles detallados son funcionalidades privadas pensadas para proteger mejor la información publicada por los usuarios registrados.',
          '¿Cómo funciona la verificación? El usuario la solicita desde su perfil y un administrador la revisa. El estado puede aparecer como no verificado, pendiente, verificado o rechazado.',
          '¿La plataforma es una app nativa? No. FUTCON es una web responsive preparada como PWA, por lo que puede adaptarse a diferentes dispositivos y ofrecer una experiencia similar a una aplicación.',
          '¿Puedo cambiar mi rol después del registro? Sí. Desde la edición del perfil puedes modificar el rol y completar los campos específicos que correspondan al nuevo tipo de perfil.',
          '¿Qué ocurre si mi perfil está incompleto? La plataforma puede mostrar indicadores de completitud para ayudarte a mejorarlo y hacerlo más útil para otros usuarios del marketplace.',
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
    helpMore: {
      title: '🙂 Need more help?',
      description:
        'If you did not find the answer you were looking for, you can contact us and we will help you as soon as possible.',
      contactUs: 'Contact us',
      contactDetails: 'Contact details',
    },
    legalFallbackSection: 'Section',
    legalInformativeSection: 'Informational section',
    pages: {
      privacy: {
        title: 'Privacy policy',
        description:
          'This page describes how personal data is handled inside the FUTCON prototype.',
        sectionTitles: [
          'Data that may be processed',
          'Purpose of processing',
          'Origin and visibility of information',
          'Access and protection measures',
          'Informational section',
        ],
        paragraphs: [
          'FUTCON may use profile, contact and authentication data to operate the platform, identify registered users and support interactions between amateur football profiles.',
          'Messaging, reviews, verification requests and usage preferences are handled in the functional context of the prototype and for the purpose of validating the product experience.',
          'The information may have been entered directly by the user, such as display name, biography, location, sports role, club, availability or other fields required to complete the public profile.',
          'Access to certain features is limited to authenticated users. This restriction helps protect profile information and keeps the testing environment more controlled.',
          'This document is informational and academic. A commercial version would require a full legal review, a formal legal basis for processing and specific mechanisms for exercising user rights.',
        ],
        additionalInfo: {
          title: 'Rights and updates',
          paragraphs: [
            'If the project evolved commercially, FUTCON should provide detailed information about the controller, retention periods and channels for exercising rights of access, rectification, erasure, objection and portability.',
            'The privacy policy may be updated to reflect regulatory, technical or functional changes to the platform.',
          ],
        },
      },
      cookies: {
        title: 'Cookies policy',
        description:
          'Information about the use of cookies, similar technologies and browsing preferences inside FUTCON.',
        sectionTitles: [
          'What cookies are',
          'Technical cookies',
          'Preference cookies',
          'Measurement and analytics',
          'Informational section',
        ],
        paragraphs: [
          'FUTCON may use first-party and, where applicable, third-party cookies to ensure the technical operation of the platform, remember user preferences, improve performance and obtain aggregated information about service usage.',
          'Technical cookies are necessary for the platform to provide basic functionalities such as session persistence, language configuration, light/dark theme selection or secure navigation between protected screens.',
          'Preference cookies allow user decisions, such as language or light/dark theme, to be remembered and provide a more consistent and personalized experience on later visits.',
          'If measurement, analysis or marketing tools are incorporated in future versions, FUTCON will provide specific information about the corresponding cookie categories and enable appropriate consent mechanisms when necessary.',
          'Users can manage, block or delete cookies from their browser settings. However, disabling some technologies may affect the proper functioning of certain parts of the service.',
        ],
        additionalInfo: {
          title: 'Browser settings',
          paragraphs: [
            'Cookie management depends on the browser used. In a final version, this page could include direct links to instructions for the main browsers.',
            'If FUTCON added non-essential cookies, it would need to provide a consent panel with clear options to accept, reject or configure each category.',
          ],
        },
      },
      legal: {
        title: 'Legal notice',
        description: 'Basic legal information about FUTCON.',
        sectionTitles: [
          'Project identification',
          'Academic nature',
          'Content and features',
          'Use of brands and references',
          'Informational section',
        ],
        paragraphs: [
          'FUTCON is an academic prototype developed as a Final Degree Project to explore a digital solution for connecting amateur football stakeholders.',
          'The platform does not represent an incorporated company or offer real commercial services at this stage. Any use should be understood within the context of testing, demonstration and project validation.',
          'The available content, features and flows may change during development because they are part of an iterative process focused on learning, research and improving the prototype.',
          'Any brands, clubs, names or data that may appear in test environments should be used responsibly and must not imply any official relationship with FUTCON unless expressly confirmed.',
          'If the project evolves into a real product, the legal information would need to include controller identification, commercial terms, liability policies and the applicable regulatory documentation.',
        ],
        additionalInfo: {
          title: 'Intellectual property',
          paragraphs: [
            'The name, logo, content, interfaces and visual structure of the prototype are part of the FUTCON project and must be used in accordance with the applicable intellectual property rules.',
            'Using the platform implies a commitment to lawful, respectful behavior aligned with the professional and academic purpose of the service.',
          ],
        },
      },
      terms: {
        title: 'Terms of use',
        description: 'General terms of use for the FUTCON prototype.',
        sectionTitles: [
          'Appropriate use of the platform',
          'Prohibited content',
          'User responsibility',
          'Access limitation or review',
          'Informational section',
        ],
        paragraphs: [
          'FUTCON should be used with data appropriate for testing and prototype validation, avoiding sensitive, false, offensive or unnecessary information.',
          'The platform must not be used to publish offensive, fraudulent, discriminatory, illegal or unrelated content, as its purpose is to support sports connections within amateur football.',
          'Each user is responsible for the information added to their profile, the conversations they start and the reviews they publish inside the platform.',
          'FUTCON may limit or review access to certain features if inappropriate use is detected, especially in cases that affect trust, safety or the quality of the test experience.',
          'These terms are provisional and adapted to an academic prototype. A commercial version should include complete contractual terms, moderation criteria and formal complaint procedures.',
        ],
        additionalInfo: {
          title: 'Good participation practices',
          paragraphs: [
            'Users should communicate respectfully, avoid impersonating third parties and avoid any use that could harm other profiles, clubs or professionals.',
            'The terms may be reviewed as the prototype adds new features or evolves toward a real service.',
          ],
        },
      },
      help: {
        title: 'Help center',
        description: 'Quick guide to using the platform.',
        paragraphs: [
          'To get started, create an account, select your main role and complete your profile with the essential information that helps other users understand who you are and what you are looking for.',
          'From search, you can find other profiles, filter by relevant criteria, view their public information and start a conversation when you want to contact another user directly.',
          'The profile page lets you update general details, add an avatar, set location and availability, and complete role-specific fields depending on whether you are a player, coach, club or support professional.',
          'Reviews and verification help build trust inside the platform. Verification can be requested by the user and later reviewed from the administration panel.',
          'If you have questions, issues or suggestions, you can use the contact us page so the message is recorded and can be reviewed more easily.',
        ],
      },
      faq: {
        title: 'FAQ',
        description: 'Quick answers about FUTCON.',
        paragraphs: [
          'Can I view profiles without signing in? No. Search and detailed profiles are private features designed to better protect the information published by registered users.',
          'How does verification work? The user requests it from their profile and an administrator reviews it. The status may appear as unverified, pending, verified or rejected.',
          'Is the platform a native app? No. FUTCON is a responsive web app prepared as a PWA, so it can adapt to different devices and offer an app-like experience.',
          'Can I change my role after registration? Yes. From profile editing you can modify your role and complete the specific fields that match the new profile type.',
          'What happens if my profile is incomplete? The platform may show completeness indicators to help you improve it and make it more useful for other marketplace users.',
        ],
      },
    },
  },
} satisfies Record<
  Locale,
  {
    description: string
    columns: {
      title: string
      links: {
        href: string
        label: string
      }[]
    }[]
    meta: string
    copyright: string
    helpMore: {
      title: string
      description: string
      contactUs: string
      contactDetails: string
    }
    legalFallbackSection: string
    legalInformativeSection: string
    pages: Record<'privacy' | 'cookies' | 'legal' | 'terms' | 'help' | 'faq', StaticPage>
  }
>

export function getFooterContent(locale: Locale) {
  return footerContent[locale] ?? footerContent.ca
}
