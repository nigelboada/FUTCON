import type { Locale } from './config'

const ca = {
  "localeTag": "ca-ES",
  "common": {
    "unknownUser": "usuari",
    "notSpecified": "No indicada",
    "roleNotSpecified": "Rol no indicat",
    "locationNotSpecified": "Ubicació no indicada",
    "noMessages": "Sense missatges",
    "unresolved": "No resolt",
    "backToDashboard": "Tornar al dashboard",
    "backToSearch": "Tornar al cercador",
    "searchProfiles": "Cercar perfils",
    "viewProfile": "Veure perfil",
    "signIn": "Iniciar sessió",
    "cancel": "Cancel·lar",
    "saveChanges": "Guardar canvis",
    "rating": "valoració",
    "ratings": "valoracions",
    "noRatings": "Sense valoracions",
    "back": "Tornar",
    "save": "Desar",
    "continue": "Continuar",
    "loading": "Carregant...",
    "noLocation": "Ubicació no indicada",
    "noRole": "Rol no indicat"
  },
  "roles": {
    "player": "Jugador",
    "coach": "Entrenador / cos tècnic",
    "club": "Club o responsable",
    "staff": "Professional de l’staff"
  },
  "rolePlural": {
    "all": "Tots els rols",
    "player": "Jugadors",
    "coach": "Entrenadors / cos tècnic",
    "club": "Clubs o responsables",
    "staff": "Professionals de l’staff"
  },
  "availability": {
    "all": "Qualsevol disponibilitat",
    "available": "Disponible",
    "open_to_offers": "Escolto ofertes",
    "unavailable": "No disponible"
  },
  "verification": {
    "unverified": "No verificat",
    "pending": "Verificació pendent",
    "verified": "Perfil verificat",
    "rejected": "Verificació rebutjada",
    "verifiedShort": "Verificat"
  },
  "staffKinds": {
    "physiotherapist": "Fisioterapeuta",
    "nutritionist": "Nutricionista",
    "physical_trainer": "Preparador físic",
    "analyst": "Analista",
    "other": "Altres"
  },
  "status": {
    "pending": "Pendent",
    "verified": "Verificat",
    "rejected": "Rebutjat",
    "unverified": "No verificat"
  },
  "nav": {
    "account": "Compte",
    "dashboard": "Dashboard",
    "search": "Cercar perfils",
    "conversations": "Missatges",
    "editProfile": "Editar perfil",
    "admin": "Admin",
    "signOut": "Tancar sessió",
    "login": "Iniciar sessió",
    "register": "Crear compte",
    "subtitle": "Futbol amateur connectat"
  },
  "theme": {
    "light": "Tema clar",
    "dark": "Tema fosc",
    "toggle": "Canviar tema"
  },
  "language": {
    "label": "Idioma"
  },
  "home": {
    "eyebrow": "Marketplace per al futbol amateur",
    "title": "Connecta clubs, jugadors i professionals del futbol amateur.",
    "description": "FUTCON és una plataforma orientada a facilitar la descoberta de perfils, el primer contacte i la generació de confiança dins de l’ecosistema del futbol amateur.",
    "dashboardCta": "Anar al dashboard",
    "registerCta": "Crear compte",
    "loginCta": "Iniciar sessió",
    "exploreCta": "Explorar perfils",
    "targetTitle": "Per a qui és FUTCON?",
    "userTypes": [
      "Jugadors que busquen oportunitats",
      "Entrenadors i cos tècnic",
      "Clubs i responsables esportius",
      "Fisioterapeutes, nutricionistes i preparadors físics"
    ],
    "features": [
      {
        "title": "Perfils diferenciats",
        "description": "Jugadors, entrenadors, clubs i professionals de l’staff disposen d’una fitxa adaptada al seu rol."
      },
      {
        "title": "Cerca amb filtres",
        "description": "Permet localitzar perfils per rol, ubicació i disponibilitat dins de l’ecosistema del futbol amateur."
      },
      {
        "title": "Comunicació interna",
        "description": "Els usuaris poden iniciar converses i contactar directament amb altres perfils de la plataforma."
      },
      {
        "title": "Confiança i valoracions",
        "description": "Les valoracions i la disponibilitat visible ajuden a reforçar la credibilitat dels perfils."
      }
    ]
  },
  "auth": {
    "login": {
      "eyebrow": "Accés a FUTCON",
      "title": "Torna a connectar amb l’ecosistema del futbol amateur.",
      "description": "Accedeix al teu perfil, consulta missatges, cerca perfils i mantén actualitzada la teva disponibilitat.",
      "cardTitle": "Iniciar sessió",
      "cardDescription": "Introdueix les teves credencials per accedir al compte.",
      "email": "Correu electrònic",
      "password": "Contrasenya",
      "submit": "Entrar",
      "noAccount": "Encara no tens compte?",
      "createOne": "Crea’n un",
      "emailPlaceholder": "nom@exemple.com"
    },
    "register": {
      "eyebrow": "Crea el teu perfil",
      "title": "Uneix-te a FUTCON i fes visible el teu perfil.",
      "description": "Registra’t per crear un perfil adaptat al teu rol, aparèixer al cercador i contactar amb altres usuaris de la plataforma.",
      "cardTitle": "Crear compte",
      "cardDescription": "Aquest compte et permetrà configurar el perfil i seleccionar el teu rol dins de FUTCON.",
      "displayName": "Nom visible",
      "displayNamePlaceholder": "Ex: Marc Garcia",
      "email": "Correu electrònic",
      "emailPlaceholder": "nom@exemple.com",
      "password": "Contrasenya",
      "submit": "Crear compte",
      "hasAccount": "Ja tens compte?",
      "signIn": "Inicia sessió"
    }
  },
  "onboarding": {
    "eyebrow": "Configuració inicial",
    "title": "Selecciona el teu rol dins de FUTCON",
    "description": "Aquesta selecció permet adaptar el teu perfil, els camps d’edició i la informació que es mostrarà al cercador.",
    "roles": [
      {
        "value": "player",
        "title": "Jugador",
        "description": "Crea un perfil esportiu, mostra la teva disponibilitat i facilita que clubs o entrenadors et trobin.",
        "highlights": [
          "Posició",
          "Categoria",
          "Club actual",
          "Disponibilitat"
        ]
      },
      {
        "value": "coach",
        "title": "Entrenador / cos tècnic",
        "description": "Mostra la teva experiència tècnica, categoria, formació i disponibilitat per a nous projectes.",
        "highlights": [
          "Experiència",
          "Llicència",
          "Categoria",
          "Club actual"
        ]
      },
      {
        "value": "club",
        "title": "Club o responsable",
        "description": "Cerca perfils, contacta amb jugadors o professionals i representa una entitat esportiva.",
        "highlights": [
          "Nom del club",
          "Categoria",
          "Ubicació",
          "Contacte"
        ]
      },
      {
        "value": "staff",
        "title": "Professional de l’staff",
        "description": "Ofereix serveis vinculats al rendiment, salut, preparació física o suport tècnic.",
        "highlights": [
          "Serveis",
          "Preu orientatiu",
          "Experiència",
          "Treball remot"
        ]
      }
    ],
    "initialRoleTitle": "Rol inicial del perfil",
    "initialRoleDescription": "Més endavant el model permetria associar més d’un rol a un mateix perfil.",
    "continue": "Continuar"
  },
  "dashboard": {
    "welcome": "Benvingut, {name}",
    "description": "Gestiona el teu perfil, consulta oportunitats i accedeix als teus missatges.",
    "role": "Rol",
    "availability": "Disponibilitat",
    "location": "Ubicació",
    "biography": "Biografia",
    "completeBioTitle": "Completa la teva biografia",
    "completeBioDescription": "Una descripció breu ajuda altres usuaris a entendre millor el teu perfil.",
    "editProfile": "Editar perfil",
    "searchProfiles": "Cercar perfils",
    "viewMessages": "Veure missatges",
    "quickActionsTitle": "Accions ràpides",
    "quickActionsDescription": "Accessos principals per continuar utilitzant FUTCON.",
    "exploreAvailableProfiles": "Explorar perfils disponibles",
    "updateAvailability": "Actualitzar disponibilitat",
    "checkConversations": "Consultar converses",
    "latestConversations": "Últimes converses",
    "latestConversationsDescription": "Converses recents iniciades amb altres perfils.",
    "emptyConversationsTitle": "Encara no tens converses",
    "emptyConversationsDescription": "Ves al cercador, obre un perfil i inicia una conversa.",
    "conversationCreated": "Conversa creada, encara sense missatges.",
    "sprintTitle": "Estat del Sprint actual",
    "sprintDescription": "Resum funcional del prototip implementat.",
    "sprintItems": [
      "Registre, login i rols implementats.",
      "Cercador, filtres i perfils públics disponibles.",
      "Xat intern amb actualització en temps real operatiu.",
      "Valoracions i puntuació mitjana visibles."
    ]
  },
  "search": {
    "title": "Cercar perfils",
    "description": "Troba jugadors, entrenadors, clubs i professionals del futbol amateur.",
    "name": "Nom",
    "namePlaceholder": "Ex: Marc",
    "role": "Rol",
    "city": "Ciutat",
    "cityPlaceholder": "Ex: Girona",
    "province": "Província",
    "provincePlaceholder": "Ex: Girona",
    "availability": "Disponibilitat",
    "applyFilters": "Aplicar filtres",
    "clear": "Netejar",
    "clearFilters": "Netejar filtres",
    "resultsFound": "{count} resultat{plural} trobat{plural}.",
    "noResultsTitle": "No hi ha resultats",
    "noResultsDescription": "No s’han trobat perfils que coincideixin amb els filtres aplicats. Prova de canviar el rol, la ubicació o la disponibilitat."
  },
  "profileCard": {
    "viewProfile": "Veure perfil",
    "noRating": "Sense valoracions",
    "noBio": "Aquest perfil encara no ha afegit una biografia.",
    "reviewSingular": "valoració",
    "reviewPlural": "valoracions",
    "locationNotSpecified": "Ubicació no indicada"
  },
  "publicProfile": {
    "generalInfo": "Informació general",
    "generalInfoDescription": "Dades públiques principals del perfil.",
    "sportsInfo": "Informació esportiva",
    "sportsInfoDescription": "Dades específiques del perfil de jugador.",
    "technicalInfo": "Informació tècnica",
    "technicalInfoDescription": "Dades específiques del perfil d’entrenador o cos tècnic.",
    "clubInfo": "Informació del club",
    "clubInfoDescription": "Dades principals de l’entitat o responsable esportiu.",
    "professionalInfo": "Informació professional",
    "professionalInfoDescription": "Dades específiques del perfil de professional de l’staff.",
    "position": "Posició",
    "category": "Categoria",
    "currentClub": "Club actual",
    "license": "Llicència o formació",
    "clubName": "Nom del club",
    "professionalType": "Tipus de professional",
    "priceRange": "Rang de preu",
    "services": "Serveis oferts",
    "location": "Ubicació",
    "availability": "Disponibilitat",
    "biography": "Biografia",
    "reviewsTitle": "Valoracions",
    "reviewsDescription": "Les valoracions permeten reforçar la confiança entre usuaris de la plataforma.",
    "averageRating": "Puntuació mitjana",
    "signInToReview": "Inicia sessió per valorar aquest perfil.",
    "cannotReviewOwnProfile": "No pots valorar el teu propi perfil.",
    "ratingLabel": "Puntuació",
    "comment": "Comentari",
    "commentPlaceholder": "Escriu una recomanació breu o una valoració del perfil.",
    "saveReview": "Desar valoració",
    "noPublishedReviews": "Encara no hi ha valoracions publicades per aquest perfil.",
    "contactTitle": "Contacte",
    "contactDescription": "Pots iniciar una conversa interna amb aquest perfil per fer un primer contacte dins de FUTCON.",
    "signInToContact": "Inicia sessió per contactar",
    "cannotContactOwnProfile": "No pots contactar amb el teu propi perfil",
    "contact": "Contactar",
    "ratingOptions": {
      "1": "1 - Dolenta",
      "2": "2 - Millorable",
      "3": "3 - Correcta",
      "4": "4 - Bona",
      "5": "5 - Excel·lent"
    },
    "backToSearch": "Tornar al cercador",
    "sportInfo": "Informació esportiva",
    "sportInfoDescription": "Dades específiques del perfil de jugador.",
    "staffType": "Tipus de professional",
    "reviews": "Valoracions",
    "noReviews": "Sense valoracions",
    "reviewSingular": "valoració",
    "reviewPlural": "valoracions",
    "loginToReview": "Inicia sessió per valorar aquest perfil.",
    "ownReviewBlocked": "No pots valorar el teu propi perfil.",
    "rating": "Puntuació",
    "loginToContact": "Inicia sessió per contactar",
    "ownContactBlocked": "No pots contactar amb el teu propi perfil",
    "contactButton": "Contactar"
  },
  "profileEdit": {
    "loadError": "No s’ha pogut carregar el perfil.",
    "title": "Editar perfil",
    "description": "Actualitza la informació comuna i específica del teu perfil a FUTCON.",
    "assignedRole": "Rol assignat",
    "commonInfo": "Informació comuna",
    "commonInfoDescription": "Aquesta informació és compartida per qualsevol tipus de perfil.",
    "displayName": "Nom visible",
    "bio": "Biografia breu",
    "bioPlaceholder": "Explica breument qui ets, què busques o quina experiència tens.",
    "city": "Ciutat",
    "province": "Província",
    "availability": "Disponibilitat",
    "availabilityDescriptions": {
      "available": "Busco equip, club o oportunitats professionals.",
      "open_to_offers": "Actualment tinc vinculació, però estic obert a propostes.",
      "unavailable": "No busco noves oportunitats en aquest moment."
    },
    "playerInfo": "Informació de jugador",
    "playerInfoDescription": "Camps específics per construir la fitxa esportiva del jugador.",
    "position": "Posició",
    "preferredFoot": "Cama hàbil",
    "playerCategory": "Categoria",
    "playerCurrentClub": "Club actual",
    "experienceYears": "Anys d’experiència",
    "birthYear": "Any de naixement",
    "heightCm": "Alçada en cm",
    "coachInfo": "Informació d’entrenador",
    "coachInfoDescription": "Camps específics per mostrar experiència i perfil tècnic.",
    "coachCategory": "Categoria",
    "coachCurrentClub": "Club actual",
    "coachingLicense": "Llicència o formació",
    "preferredAgeGroup": "Etapa o edat preferida",
    "clubInfo": "Informació de club",
    "clubInfoDescription": "Camps específics per identificar l’entitat o responsable esportiu.",
    "clubName": "Nom del club",
    "clubCategory": "Categoria principal",
    "website": "Web",
    "contactRole": "Rol de contacte",
    "staffInfo": "Informació de professional de l’staff",
    "staffInfoDescription": "Camps específics per mostrar serveis, experiència i disponibilitat professional.",
    "staffKind": "Tipus de professional",
    "priceRange": "Rang de preu orientatiu",
    "worksRemotely": "Ofereixo serveis remots",
    "services": "Serveis oferts",
    "placeholders": {
      "city": "Ex: Girona",
      "province": "Ex: Girona",
      "position": "Ex: Davanter centre",
      "preferredFoot": "Ex: Dreta",
      "playerCategory": "Ex: 3a Catalana",
      "playerCurrentClub": "Ex: CF Banyoles",
      "coachCategory": "Ex: Juvenil Preferent",
      "coachCurrentClub": "Ex: UE Figueres",
      "coachingLicense": "Ex: UEFA C",
      "preferredAgeGroup": "Ex: Futbol base, amateur sènior...",
      "clubName": "Ex: CF Banyoles",
      "clubCategory": "Ex: 2a Catalana",
      "website": "https://...",
      "contactRole": "Ex: Coordinador esportiu",
      "priceRange": "Ex: 20-30 €/sessió",
      "services": "Ex: recuperació de lesions, readaptació, nutrició esportiva..."
    },
    "verificationTitle": "Confiança i verificació",
    "verificationDescription": "La verificació permet reforçar la credibilitat del perfil dins de FUTCON.",
    "currentStatus": "Estat actual",
    "verificationDescriptions": {
      "unverified": "Encara no has sol·licitat la verificació del perfil.",
      "pending": "La sol·licitud de verificació està pendent de revisió.",
      "verified": "Aquest perfil ha estat verificat.",
      "rejected": "La verificació ha estat rebutjada. Pots tornar a sol·licitar-la."
    },
    "alreadyVerified": "El teu perfil ja consta com a verificat.",
    "verificationPending": "La teva sol·licitud de verificació està pendent de revisió.",
    "optionalMessage": "Missatge opcional",
    "requestPlaceholder": "Ex: Sol·licito la verificació perquè soc responsable d’un club / jugador federat / professional de l’staff...",
    "requestVerification": "Sol·licitar verificació"
  },
  "conversations": {
    "title": "Missatges",
    "description": "Converses iniciades amb altres perfils de FUTCON.",
    "emptyTitle": "Encara no tens converses",
    "emptyDescription": "Quan contactis amb un jugador, entrenador, club o professional, la conversa apareixerà aquí.",
    "noConversationMessages": "Encara no hi ha missatges en aquesta conversa.",
    "openConversation": "Obrir conversa",
    "backToMessages": "Tornar als missatges",
    "conversationWith": "Conversa amb",
    "profileFallback": "Perfil",
    "messagePlaceholder": "Escriu un missatge...",
    "realtimeNote": "Els missatges s’actualitzen en temps real dins de la conversa.",
    "sendMessage": "Enviar missatge",
    "emptyThread": "Encara no hi ha missatges. Escriu el primer missatge per iniciar la conversa."
  },
  "admin": {
    "permissionError": "No tens permisos per accedir al panell d’administració.",
    "eyebrow": "Administració",
    "title": "Panell d’administració",
    "description": "Revisa i gestiona les sol·licituds de verificació dels perfils de FUTCON.",
    "totalRequests": "Sol·licituds totals",
    "pendingReview": "Pendents de revisió",
    "resolved": "Resoltes",
    "pendingTitle": "Sol·licituds pendents",
    "pendingDescription": "Revisa els perfils que han demanat verificació.",
    "requestMessage": "Missatge de la sol·licitud",
    "noRequestMessage": "L’usuari no ha afegit cap missatge.",
    "requestedOn": "Sol·licitada el {date}",
    "ownRequest": "Aquesta sol·licitud ha de ser resolta per un altre administrador.",
    "approve": "Aprovar",
    "reject": "Rebutjar",
    "noPendingTitle": "No hi ha sol·licituds pendents",
    "noPendingDescription": "Quan un usuari sol·liciti la verificació del seu perfil, apareixerà en aquesta secció.",
    "historyTitle": "Historial recent",
    "historyDescription": "Sol·licituds verificades o rebutjades.",
    "resolution": "Resolució:",
    "noResolved": "Encara no hi ha sol·licituds resoltes.",
    "backToDashboard": "Tornar al dashboard",
    "pendingRequests": "Pendents de revisió",
    "resolvedRequests": "Resoltes",
    "pendingSection": "Sol·licituds pendents",
    "requestedAt": "Sol·licitada el",
    "ownRequestBlocked": "Aquesta sol·licitud ha de ser resolta per un altre administrador.",
    "notResolved": "No resolt"
  },
  "feedback": {
    "signup_missing_fields": "Cal omplir tots els camps.",
    "password_too_short": "La contrasenya ha de tenir com a mínim 6 caràcters.",
    "account_created_check_email": "Compte creat. Revisa el correu abans d’iniciar sessió.",
    "signin_missing_credentials": "Cal indicar correu electrònic i contrasenya.",
    "invalid_role": "Cal seleccionar un rol vàlid.",
    "profile_invalid_role": "El rol del perfil no és vàlid.",
    "display_name_required": "El nom visible és obligatori.",
    "invalid_availability": "L’estat de disponibilitat no és vàlid.",
    "club_name_required": "El nom del club és obligatori.",
    "invalid_staff_type": "El tipus de professional no és vàlid.",
    "profile_updated": "Perfil actualitzat correctament.",
    "profile_load_failed": "No s’ha pogut carregar el perfil.",
    "conversation_create_failed": "No s’ha pogut crear la conversa.",
    "review_saved": "Valoració desada correctament.",
    "invalid_rating": "La puntuació ha d’estar entre 1 i 5.",
    "own_review_blocked": "No pots valorar el teu propi perfil.",
    "verification_requested": "Sol·licitud de verificació enviada correctament.",
    "verification_approved": "Perfil verificat correctament.",
    "verification_rejected": "Sol·licitud rebutjada correctament.",
    "invalid_request": "Sol·licitud no vàlida.",
    "no_admin_permission": "No tens permisos per accedir al panell d’administració.",
    "empty_message": "El missatge no pot estar buit."
  },
  "notFound": {
    "title": "Perfil no trobat",
    "description": "El perfil que estàs intentant consultar no existeix o no és públic.",
    "action": "Tornar al cercador"
  }
} as const

type DeepMessages<T> = {
  [K in keyof T]: T[K] extends readonly (infer U)[]
    ? readonly (U extends object ? DeepMessages<U> : string)[]
    : T[K] extends object
      ? DeepMessages<T[K]>
      : string
}

type Messages = DeepMessages<typeof ca>

const es: Messages = {
  "localeTag": "es-ES",
  "common": {
    "unknownUser": "usuario",
    "notSpecified": "No indicada",
    "roleNotSpecified": "Rol no indicado",
    "locationNotSpecified": "Ubicaci?n no indicada",
    "noMessages": "Sin mensajes",
    "unresolved": "No resuelto",
    "backToDashboard": "Volver al panel",
    "backToSearch": "Volver al buscador",
    "searchProfiles": "Buscar perfiles",
    "viewProfile": "Ver perfil",
    "signIn": "Iniciar sesi?n",
    "cancel": "Cancelar",
    "saveChanges": "Guardar cambios",
    "rating": "valoraci?n",
    "ratings": "valoraciones",
    "noRatings": "Sin valoraciones",
    "back": "Volver",
    "save": "Guardar",
    "continue": "Continuar",
    "loading": "Cargando...",
    "noLocation": "Ubicaci?n no indicada",
    "noRole": "Rol no indicado"
  },
  "roles": {
    "player": "Jugador",
    "coach": "Entrenador / cuerpo técnico",
    "club": "Club o responsable",
    "staff": "Profesional del staff"
  },
  "rolePlural": {
    "all": "Todos los roles",
    "player": "Jugadores",
    "coach": "Entrenadores / cuerpo técnico",
    "club": "Clubes o responsables",
    "staff": "Profesionales del staff"
  },
  "availability": {
    "all": "Cualquier disponibilidad",
    "available": "Disponible",
    "open_to_offers": "Escucho ofertas",
    "unavailable": "No disponible"
  },
  "verification": {
    "unverified": "No verificado",
    "pending": "Verificación pendiente",
    "verified": "Perfil verificado",
    "rejected": "Verificación rechazada",
    "verifiedShort": "Verificado"
  },
  "staffKinds": {
    "physiotherapist": "Fisioterapeuta",
    "nutritionist": "Nutricionista",
    "physical_trainer": "Preparador físico",
    "analyst": "Analista",
    "other": "Otros"
  },
  "status": {
    "pending": "Pendiente",
    "verified": "Verificado",
    "rejected": "Rechazado",
    "unverified": "No verificado"
  },
  "nav": {
    "account": "Cuenta",
    "dashboard": "Panel",
    "search": "Buscar perfiles",
    "conversations": "Mensajes",
    "editProfile": "Editar perfil",
    "admin": "Admin",
    "signOut": "Cerrar sesión",
    "login": "Iniciar sesión",
    "register": "Crear cuenta",
    "subtitle": "Fútbol amateur conectado"
  },
  "theme": {
    "light": "Tema claro",
    "dark": "Tema oscuro",
    "toggle": "Cambiar tema"
  },
  "language": {
    "label": "Idioma"
  },
  "home": {
    "eyebrow": "Marketplace para el fútbol amateur",
    "title": "Conecta clubes, jugadores y profesionales del fútbol amateur.",
    "description": "FUTCON es una plataforma orientada a facilitar el descubrimiento de perfiles, el primer contacto y la generación de confianza dentro del ecosistema del fútbol amateur.",
    "dashboardCta": "Ir al panel",
    "registerCta": "Crear cuenta",
    "loginCta": "Iniciar sesión",
    "exploreCta": "Explorar perfiles",
    "targetTitle": "¿Para quién es FUTCON?",
    "userTypes": [
      "Jugadores que buscan oportunidades",
      "Entrenadores y cuerpo técnico",
      "Clubes y responsables deportivos",
      "Fisioterapeutas, nutricionistas y preparadores físicos"
    ],
    "features": [
      {
        "title": "Perfiles diferenciados",
        "description": "Jugadores, entrenadores, clubes y profesionales del staff disponen de una ficha adaptada a su rol."
      },
      {
        "title": "Búsqueda con filtros",
        "description": "Permite localizar perfiles por rol, ubicación y disponibilidad dentro del ecosistema del fútbol amateur."
      },
      {
        "title": "Comunicación interna",
        "description": "Los usuarios pueden iniciar conversaciones y contactar directamente con otros perfiles de la plataforma."
      },
      {
        "title": "Confianza y valoraciones",
        "description": "Las valoraciones y la disponibilidad visible ayudan a reforzar la credibilidad de los perfiles."
      }
    ]
  },
  "auth": {
    "login": {
      "eyebrow": "Acceso a FUTCON",
      "title": "Vuelve a conectar con el ecosistema del fútbol amateur.",
      "description": "Accede a tu perfil, consulta mensajes, busca perfiles y mantén actualizada tu disponibilidad.",
      "cardTitle": "Iniciar sesión",
      "cardDescription": "Introduce tus credenciales para acceder a la cuenta.",
      "email": "Correo electrónico",
      "password": "Contraseña",
      "submit": "Entrar",
      "noAccount": "¿Aún no tienes cuenta?",
      "createOne": "Crea una",
      "emailPlaceholder": "nombre@ejemplo.com"
    },
    "register": {
      "eyebrow": "Crea tu perfil",
      "title": "Únete a FUTCON y haz visible tu perfil.",
      "description": "Regístrate para crear un perfil adaptado a tu rol, aparecer en el buscador y contactar con otros usuarios de la plataforma.",
      "cardTitle": "Crear cuenta",
      "cardDescription": "Esta cuenta te permitirá configurar el perfil y seleccionar tu rol dentro de FUTCON.",
      "displayName": "Nombre visible",
      "displayNamePlaceholder": "Ej: Marc Garcia",
      "email": "Correo electrónico",
      "emailPlaceholder": "nombre@ejemplo.com",
      "password": "Contraseña",
      "submit": "Crear cuenta",
      "hasAccount": "¿Ya tienes cuenta?",
      "signIn": "Inicia sesión"
    }
  },
  "onboarding": {
    "eyebrow": "Configuraci?n inicial",
    "title": "Selecciona tu rol dentro de FUTCON",
    "description": "Esta selecci?n permite adaptar tu perfil, los campos de edici?n y la informaci?n que se mostrar? en el buscador.",
    "roles": [
      {
        "value": "player",
        "title": "Jugador",
        "description": "Crea un perfil deportivo, muestra tu disponibilidad y facilita que clubes o entrenadores te encuentren.",
        "highlights": [
          "Posici?n",
          "Categor?a",
          "Club actual",
          "Disponibilidad"
        ]
      },
      {
        "value": "coach",
        "title": "Entrenador / cuerpo t?cnico",
        "description": "Muestra tu experiencia t?cnica, categor?a, formaci?n y disponibilidad para nuevos proyectos.",
        "highlights": [
          "Experiencia",
          "Licencia",
          "Categor?a",
          "Club actual"
        ]
      },
      {
        "value": "club",
        "title": "Club o responsable",
        "description": "Busca perfiles, contacta con jugadores o profesionales y representa una entidad deportiva.",
        "highlights": [
          "Nombre del club",
          "Categor?a",
          "Ubicaci?n",
          "Contacto"
        ]
      },
      {
        "value": "staff",
        "title": "Profesional del staff",
        "description": "Ofrece servicios vinculados al rendimiento, salud, preparaci?n f?sica o soporte t?cnico.",
        "highlights": [
          "Servicios",
          "Precio orientativo",
          "Experiencia",
          "Trabajo remoto"
        ]
      }
    ],
    "initialRoleTitle": "Rol inicial del perfil",
    "initialRoleDescription": "M?s adelante el modelo permitir?a asociar m?s de un rol a un mismo perfil.",
    "continue": "Continuar"
  },
  "dashboard": {
    "welcome": "Bienvenido, {name}",
    "description": "Gestiona tu perfil, consulta oportunidades y accede a tus mensajes.",
    "role": "Rol",
    "availability": "Disponibilidad",
    "location": "Ubicaci?n",
    "biography": "Biograf?a",
    "completeBioTitle": "Completa tu biograf?a",
    "completeBioDescription": "Una descripci?n breve ayuda a otros usuarios a entender mejor tu perfil.",
    "editProfile": "Editar perfil",
    "searchProfiles": "Buscar perfiles",
    "viewMessages": "Ver mensajes",
    "quickActionsTitle": "Acciones r?pidas",
    "quickActionsDescription": "Accesos principales para seguir utilizando FUTCON.",
    "exploreAvailableProfiles": "Explorar perfiles disponibles",
    "updateAvailability": "Actualizar disponibilidad",
    "checkConversations": "Consultar conversaciones",
    "latestConversations": "?ltimas conversaciones",
    "latestConversationsDescription": "Conversaciones recientes iniciadas con otros perfiles.",
    "emptyConversationsTitle": "A?n no tienes conversaciones",
    "emptyConversationsDescription": "Ve al buscador, abre un perfil e inicia una conversaci?n.",
    "conversationCreated": "Conversaci?n creada, todav?a sin mensajes.",
    "sprintTitle": "Estado del Sprint actual",
    "sprintDescription": "Resumen funcional del prototipo implementado.",
    "sprintItems": [
      "Registro, login y roles implementados.",
      "Buscador, filtros y perfiles p?blicos disponibles.",
      "Chat interno con actualizaci?n en tiempo real operativo.",
      "Valoraciones y puntuaci?n media visibles."
    ]
  },
  "search": {
    "title": "Buscar perfiles",
    "description": "Encuentra jugadores, entrenadores, clubes y profesionales del fútbol amateur.",
    "name": "Nombre",
    "namePlaceholder": "Ej: Marc",
    "role": "Rol",
    "city": "Ciudad",
    "cityPlaceholder": "Ej: Girona",
    "province": "Provincia",
    "provincePlaceholder": "Ej: Girona",
    "availability": "Disponibilidad",
    "applyFilters": "Aplicar filtros",
    "clear": "Limpiar",
    "clearFilters": "Limpiar filtros",
    "resultsFound": "{count} resultado{plural} encontrado{plural}.",
    "noResultsTitle": "No hay resultados",
    "noResultsDescription": "No se han encontrado perfiles que coincidan con los filtros aplicados. Prueba a cambiar el rol, la ubicación o la disponibilidad."
  },
  "profileCard": {
    "viewProfile": "Ver perfil",
    "noRating": "Sin valoraciones",
    "noBio": "Este perfil todavía no ha añadido una biografía.",
    "reviewSingular": "valoración",
    "reviewPlural": "valoraciones",
    "locationNotSpecified": "Ubicación no indicada"
  },
  "publicProfile": {
    "generalInfo": "Informaci?n general",
    "generalInfoDescription": "Datos p?blicos principales del perfil.",
    "sportsInfo": "Informaci?n deportiva",
    "sportsInfoDescription": "Datos espec?ficos del perfil de jugador.",
    "technicalInfo": "Informaci?n t?cnica",
    "technicalInfoDescription": "Datos espec?ficos del perfil de entrenador o cuerpo t?cnico.",
    "clubInfo": "Informaci?n del club",
    "clubInfoDescription": "Datos principales de la entidad o responsable deportivo.",
    "professionalInfo": "Informaci?n profesional",
    "professionalInfoDescription": "Datos espec?ficos del perfil de profesional del staff.",
    "position": "Posici?n",
    "category": "Categor?a",
    "currentClub": "Club actual",
    "license": "Licencia o formaci?n",
    "clubName": "Nombre del club",
    "professionalType": "Tipo de profesional",
    "priceRange": "Rango de precio",
    "services": "Servicios ofrecidos",
    "location": "Ubicaci?n",
    "availability": "Disponibilidad",
    "biography": "Biograf?a",
    "reviewsTitle": "Valoraciones",
    "reviewsDescription": "Las valoraciones permiten reforzar la confianza entre usuarios de la plataforma.",
    "averageRating": "Puntuaci?n media",
    "signInToReview": "Inicia sesi?n para valorar este perfil.",
    "cannotReviewOwnProfile": "No puedes valorar tu propio perfil.",
    "ratingLabel": "Puntuaci?n",
    "comment": "Comentario",
    "commentPlaceholder": "Escribe una recomendaci?n breve o una valoraci?n del perfil.",
    "saveReview": "Guardar valoraci?n",
    "noPublishedReviews": "Todav?a no hay valoraciones publicadas para este perfil.",
    "contactTitle": "Contacto",
    "contactDescription": "Puedes iniciar una conversaci?n interna con este perfil para realizar un primer contacto dentro de FUTCON.",
    "signInToContact": "Inicia sesi?n para contactar",
    "cannotContactOwnProfile": "No puedes contactar con tu propio perfil",
    "contact": "Contactar",
    "ratingOptions": {
      "1": "1 - Mala",
      "2": "2 - Mejorable",
      "3": "3 - Correcta",
      "4": "4 - Buena",
      "5": "5 - Excelente"
    },
    "backToSearch": "Volver al buscador",
    "sportInfo": "Informaci?n deportiva",
    "sportInfoDescription": "Datos espec?ficos del perfil de jugador.",
    "staffType": "Tipo de profesional",
    "reviews": "Valoraciones",
    "noReviews": "Sin valoraciones",
    "reviewSingular": "valoraci?n",
    "reviewPlural": "valoraciones",
    "loginToReview": "Inicia sesi?n para valorar este perfil.",
    "ownReviewBlocked": "No puedes valorar tu propio perfil.",
    "rating": "Puntuaci?n",
    "loginToContact": "Inicia sesi?n para contactar",
    "ownContactBlocked": "No puedes contactar con tu propio perfil",
    "contactButton": "Contactar"
  },
  "profileEdit": {
    "loadError": "No se ha podido cargar el perfil.",
    "title": "Editar perfil",
    "description": "Actualiza la informaci?n com?n y espec?fica de tu perfil en FUTCON.",
    "assignedRole": "Rol asignado",
    "commonInfo": "Informaci?n com?n",
    "commonInfoDescription": "Esta informaci?n es compartida por cualquier tipo de perfil.",
    "displayName": "Nombre visible",
    "bio": "Biograf?a breve",
    "bioPlaceholder": "Explica brevemente qui?n eres, qu? buscas o qu? experiencia tienes.",
    "city": "Ciudad",
    "province": "Provincia",
    "availability": "Disponibilidad",
    "availabilityDescriptions": {
      "available": "Busco equipo, club u oportunidades profesionales.",
      "open_to_offers": "Actualmente tengo vinculaci?n, pero estoy abierto a propuestas.",
      "unavailable": "No busco nuevas oportunidades en este momento."
    },
    "playerInfo": "Informaci?n de jugador",
    "playerInfoDescription": "Campos espec?ficos para construir la ficha deportiva del jugador.",
    "position": "Posici?n",
    "preferredFoot": "Pierna h?bil",
    "playerCategory": "Categor?a",
    "playerCurrentClub": "Club actual",
    "experienceYears": "A?os de experiencia",
    "birthYear": "A?o de nacimiento",
    "heightCm": "Altura en cm",
    "coachInfo": "Informaci?n de entrenador",
    "coachInfoDescription": "Campos espec?ficos para mostrar experiencia y perfil t?cnico.",
    "coachCategory": "Categor?a",
    "coachCurrentClub": "Club actual",
    "coachingLicense": "Licencia o formaci?n",
    "preferredAgeGroup": "Etapa o edad preferida",
    "clubInfo": "Informaci?n de club",
    "clubInfoDescription": "Campos espec?ficos para identificar la entidad o responsable deportivo.",
    "clubName": "Nombre del club",
    "clubCategory": "Categor?a principal",
    "website": "Web",
    "contactRole": "Rol de contacto",
    "staffInfo": "Informaci?n de profesional del staff",
    "staffInfoDescription": "Campos espec?ficos para mostrar servicios, experiencia y disponibilidad profesional.",
    "staffKind": "Tipo de profesional",
    "priceRange": "Rango de precio orientativo",
    "worksRemotely": "Ofrezco servicios remotos",
    "services": "Servicios ofrecidos",
    "placeholders": {
      "city": "Ej: Girona",
      "province": "Ej: Girona",
      "position": "Ej: Delantero centro",
      "preferredFoot": "Ej: Derecha",
      "playerCategory": "Ej: 3a Catalana",
      "playerCurrentClub": "Ej: CF Banyoles",
      "coachCategory": "Ej: Juvenil Preferente",
      "coachCurrentClub": "Ej: UE Figueres",
      "coachingLicense": "Ej: UEFA C",
      "preferredAgeGroup": "Ej: F?tbol base, amateur s?nior...",
      "clubName": "Ej: CF Banyoles",
      "clubCategory": "Ej: 2a Catalana",
      "website": "https://...",
      "contactRole": "Ej: Coordinador deportivo",
      "priceRange": "Ej: 20-30 ?/sesi?n",
      "services": "Ej: recuperaci?n de lesiones, readaptaci?n, nutrici?n deportiva..."
    },
    "verificationTitle": "Confianza y verificaci?n",
    "verificationDescription": "La verificaci?n permite reforzar la credibilidad del perfil dentro de FUTCON.",
    "currentStatus": "Estado actual",
    "verificationDescriptions": {
      "unverified": "Todav?a no has solicitado la verificaci?n del perfil.",
      "pending": "La solicitud de verificaci?n est? pendiente de revisi?n.",
      "verified": "Este perfil ha sido verificado.",
      "rejected": "La verificaci?n ha sido rechazada. Puedes volver a solicitarla."
    },
    "alreadyVerified": "Tu perfil ya consta como verificado.",
    "verificationPending": "Tu solicitud de verificaci?n est? pendiente de revisi?n.",
    "optionalMessage": "Mensaje opcional",
    "requestPlaceholder": "Ej: Solicito la verificaci?n porque soy responsable de un club / jugador federado / profesional del staff...",
    "requestVerification": "Solicitar verificaci?n"
  },
  "conversations": {
    "title": "Mensajes",
    "description": "Conversaciones iniciadas con otros perfiles de FUTCON.",
    "emptyTitle": "Aún no tienes conversaciones",
    "emptyDescription": "Cuando contactes con un jugador, entrenador, club o profesional, la conversación aparecerá aquí.",
    "noConversationMessages": "Todavía no hay mensajes en esta conversación.",
    "openConversation": "Abrir conversación",
    "backToMessages": "Volver a mensajes",
    "conversationWith": "Conversación con",
    "profileFallback": "Perfil",
    "messagePlaceholder": "Escribe un mensaje...",
    "realtimeNote": "Los mensajes se actualizan en tiempo real dentro de la conversación.",
    "sendMessage": "Enviar mensaje",
    "emptyThread": "Todavía no hay mensajes. Escribe el primer mensaje para iniciar la conversación."
  },
  "admin": {
    "permissionError": "No tienes permisos para acceder al panel de administraci?n.",
    "eyebrow": "Administraci?n",
    "title": "Panel de administraci?n",
    "description": "Revisa y gestiona las solicitudes de verificaci?n de los perfiles de FUTCON.",
    "totalRequests": "Solicitudes totales",
    "pendingReview": "Pendientes de revisi?n",
    "resolved": "Resueltas",
    "pendingTitle": "Solicitudes pendientes",
    "pendingDescription": "Revisa los perfiles que han pedido verificaci?n.",
    "requestMessage": "Mensaje de la solicitud",
    "noRequestMessage": "El usuario no ha a?adido ning?n mensaje.",
    "requestedOn": "Solicitada el {date}",
    "ownRequest": "Esta solicitud debe ser resuelta por otro administrador.",
    "approve": "Aprobar",
    "reject": "Rechazar",
    "noPendingTitle": "No hay solicitudes pendientes",
    "noPendingDescription": "Cuando un usuario solicite la verificaci?n de su perfil, aparecer? en esta secci?n.",
    "historyTitle": "Historial reciente",
    "historyDescription": "Solicitudes verificadas o rechazadas.",
    "resolution": "Resoluci?n:",
    "noResolved": "Todav?a no hay solicitudes resueltas.",
    "backToDashboard": "Volver al panel",
    "pendingRequests": "Pendientes de revisi?n",
    "resolvedRequests": "Resueltas",
    "pendingSection": "Solicitudes pendientes",
    "requestedAt": "Solicitada el",
    "ownRequestBlocked": "Esta solicitud debe ser resuelta por otro administrador.",
    "notResolved": "No resuelto"
  },
  "feedback": {
    "signup_missing_fields": "Hay que rellenar todos los campos.",
    "password_too_short": "La contraseña debe tener como mínimo 6 caracteres.",
    "account_created_check_email": "Cuenta creada. Revisa el correo antes de iniciar sesión.",
    "signin_missing_credentials": "Hay que indicar correo electrónico y contraseña.",
    "invalid_role": "Hay que seleccionar un rol válido.",
    "profile_invalid_role": "El rol del perfil no es válido.",
    "display_name_required": "El nombre visible es obligatorio.",
    "invalid_availability": "El estado de disponibilidad no es válido.",
    "club_name_required": "El nombre del club es obligatorio.",
    "invalid_staff_type": "El tipo de profesional no es válido.",
    "profile_updated": "Perfil actualizado correctamente.",
    "profile_load_failed": "No se ha podido cargar el perfil.",
    "conversation_create_failed": "No se ha podido crear la conversación.",
    "review_saved": "Valoración guardada correctamente.",
    "invalid_rating": "La puntuación debe estar entre 1 y 5.",
    "own_review_blocked": "No puedes valorar tu propio perfil.",
    "verification_requested": "Solicitud de verificación enviada correctamente.",
    "verification_approved": "Perfil verificado correctamente.",
    "verification_rejected": "Solicitud rechazada correctamente.",
    "invalid_request": "Solicitud no válida.",
    "no_admin_permission": "No tienes permisos para acceder al panel de administración.",
    "empty_message": "El mensaje no puede estar vacío."
  },
  "notFound": {
    "title": "Perfil no encontrado",
    "description": "El perfil que intentas consultar no existe o no es público.",
    "action": "Volver al buscador"
  }
}

const en: Messages = {
  "localeTag": "en-GB",
  "common": {
    "unknownUser": "user",
    "notSpecified": "Not specified",
    "roleNotSpecified": "Role not specified",
    "locationNotSpecified": "Location not specified",
    "noMessages": "No messages",
    "unresolved": "Unresolved",
    "backToDashboard": "Back to dashboard",
    "backToSearch": "Back to search",
    "searchProfiles": "Search profiles",
    "viewProfile": "View profile",
    "signIn": "Sign in",
    "cancel": "Cancel",
    "saveChanges": "Save changes",
    "rating": "review",
    "ratings": "reviews",
    "noRatings": "No reviews",
    "back": "Back",
    "save": "Save",
    "continue": "Continue",
    "loading": "Loading...",
    "noLocation": "Location not provided",
    "noRole": "Role not provided"
  },
  "roles": {
    "player": "Player",
    "coach": "Coach / technical staff",
    "club": "Club or manager",
    "staff": "Staff professional"
  },
  "rolePlural": {
    "all": "All roles",
    "player": "Players",
    "coach": "Coaches / technical staff",
    "club": "Clubs or managers",
    "staff": "Staff professionals"
  },
  "availability": {
    "all": "Any availability",
    "available": "Available",
    "open_to_offers": "Open to offers",
    "unavailable": "Unavailable"
  },
  "verification": {
    "unverified": "Unverified",
    "pending": "Verification pending",
    "verified": "Verified profile",
    "rejected": "Verification rejected",
    "verifiedShort": "Verified"
  },
  "staffKinds": {
    "physiotherapist": "Physiotherapist",
    "nutritionist": "Nutritionist",
    "physical_trainer": "Fitness coach",
    "analyst": "Analyst",
    "other": "Other"
  },
  "status": {
    "pending": "Pending",
    "verified": "Verified",
    "rejected": "Rejected",
    "unverified": "Unverified"
  },
  "nav": {
    "account": "Account",
    "dashboard": "Dashboard",
    "search": "Search profiles",
    "conversations": "Messages",
    "editProfile": "Edit profile",
    "admin": "Admin",
    "signOut": "Sign out",
    "login": "Sign in",
    "register": "Create account",
    "subtitle": "Amateur football connected"
  },
  "theme": {
    "light": "Light theme",
    "dark": "Dark theme",
    "toggle": "Toggle theme"
  },
  "language": {
    "label": "Language"
  },
  "home": {
    "eyebrow": "Marketplace for amateur football",
    "title": "Connect clubs, players and professionals in amateur football.",
    "description": "FUTCON is a platform designed to help users discover profiles, make first contact and build trust within the amateur football ecosystem.",
    "dashboardCta": "Go to dashboard",
    "registerCta": "Create account",
    "loginCta": "Sign in",
    "exploreCta": "Explore profiles",
    "targetTitle": "Who is FUTCON for?",
    "userTypes": [
      "Players looking for opportunities",
      "Coaches and technical staff",
      "Clubs and sports managers",
      "Physiotherapists, nutritionists and fitness coaches"
    ],
    "features": [
      {
        "title": "Role-based profiles",
        "description": "Players, coaches, clubs and staff professionals have a profile adapted to their role."
      },
      {
        "title": "Filtered search",
        "description": "Users can find profiles by role, location and availability within the amateur football ecosystem."
      },
      {
        "title": "Internal communication",
        "description": "Users can start conversations and contact other profiles directly through the platform."
      },
      {
        "title": "Trust and reviews",
        "description": "Reviews and visible availability help increase profile credibility."
      }
    ]
  },
  "auth": {
    "login": {
      "eyebrow": "Access FUTCON",
      "title": "Reconnect with the amateur football ecosystem.",
      "description": "Access your profile, check messages, search profiles and keep your availability up to date.",
      "cardTitle": "Sign in",
      "cardDescription": "Enter your credentials to access your account.",
      "email": "Email",
      "password": "Password",
      "submit": "Enter",
      "noAccount": "Do not have an account yet?",
      "createOne": "Create one",
      "emailPlaceholder": "name@example.com"
    },
    "register": {
      "eyebrow": "Create your profile",
      "title": "Join FUTCON and make your profile visible.",
      "description": "Register to create a profile adapted to your role, appear in search and contact other platform users.",
      "cardTitle": "Create account",
      "cardDescription": "This account lets you configure your profile and choose your role within FUTCON.",
      "displayName": "Display name",
      "displayNamePlaceholder": "E.g. Marc Garcia",
      "email": "Email",
      "emailPlaceholder": "name@example.com",
      "password": "Password",
      "submit": "Create account",
      "hasAccount": "Already have an account?",
      "signIn": "Sign in"
    }
  },
  "onboarding": {
    "eyebrow": "Initial setup",
    "title": "Select your role in FUTCON",
    "description": "This selection adapts your profile, editing fields and the information shown in search.",
    "roles": [
      {
        "value": "player",
        "title": "Player",
        "description": "Create a sports profile, show your availability and help clubs or coaches find you.",
        "highlights": [
          "Position",
          "Category",
          "Current club",
          "Availability"
        ]
      },
      {
        "value": "coach",
        "title": "Coach / technical staff",
        "description": "Show your technical experience, category, training and availability for new projects.",
        "highlights": [
          "Experience",
          "Licence",
          "Category",
          "Current club"
        ]
      },
      {
        "value": "club",
        "title": "Club or manager",
        "description": "Search profiles, contact players or professionals and represent a sports organisation.",
        "highlights": [
          "Club name",
          "Category",
          "Location",
          "Contact"
        ]
      },
      {
        "value": "staff",
        "title": "Staff professional",
        "description": "Offer services linked to performance, health, fitness preparation or technical support.",
        "highlights": [
          "Services",
          "Guide price",
          "Experience",
          "Remote work"
        ]
      }
    ],
    "initialRoleTitle": "Initial profile role",
    "initialRoleDescription": "In a later model, more than one role could be associated with the same profile.",
    "continue": "Continue"
  },
  "dashboard": {
    "welcome": "Welcome, {name}",
    "description": "Manage your profile, check opportunities and access your messages.",
    "role": "Role",
    "availability": "Availability",
    "location": "Location",
    "biography": "Biography",
    "completeBioTitle": "Complete your biography",
    "completeBioDescription": "A short description helps other users understand your profile better.",
    "editProfile": "Edit profile",
    "searchProfiles": "Search profiles",
    "viewMessages": "View messages",
    "quickActionsTitle": "Quick actions",
    "quickActionsDescription": "Main shortcuts to keep using FUTCON.",
    "exploreAvailableProfiles": "Explore available profiles",
    "updateAvailability": "Update availability",
    "checkConversations": "Check conversations",
    "latestConversations": "Latest conversations",
    "latestConversationsDescription": "Recent conversations started with other profiles.",
    "emptyConversationsTitle": "You do not have conversations yet",
    "emptyConversationsDescription": "Go to search, open a profile and start a conversation.",
    "conversationCreated": "Conversation created, no messages yet.",
    "sprintTitle": "Current Sprint status",
    "sprintDescription": "Functional summary of the implemented prototype.",
    "sprintItems": [
      "Registration, login and roles implemented.",
      "Search, filters and public profiles available.",
      "Internal chat with real-time updates operating.",
      "Reviews and average rating visible."
    ]
  },
  "search": {
    "title": "Search profiles",
    "description": "Find players, coaches, clubs and professionals in amateur football.",
    "name": "Name",
    "namePlaceholder": "E.g. Marc",
    "role": "Role",
    "city": "City",
    "cityPlaceholder": "E.g. Girona",
    "province": "Province",
    "provincePlaceholder": "E.g. Girona",
    "availability": "Availability",
    "applyFilters": "Apply filters",
    "clear": "Clear",
    "clearFilters": "Clear filters",
    "resultsFound": "{count} result{plural} found.",
    "noResultsTitle": "No results",
    "noResultsDescription": "No profiles match the applied filters. Try changing the role, location or availability."
  },
  "profileCard": {
    "viewProfile": "View profile",
    "noRating": "No reviews",
    "noBio": "This profile has not added a biography yet.",
    "reviewSingular": "review",
    "reviewPlural": "reviews",
    "locationNotSpecified": "Location not specified"
  },
  "publicProfile": {
    "generalInfo": "General information",
    "generalInfoDescription": "Main public profile details.",
    "sportsInfo": "Sports information",
    "sportsInfoDescription": "Specific details for the player profile.",
    "technicalInfo": "Technical information",
    "technicalInfoDescription": "Specific details for the coach or technical staff profile.",
    "clubInfo": "Club information",
    "clubInfoDescription": "Main details about the organisation or sports manager.",
    "professionalInfo": "Professional information",
    "professionalInfoDescription": "Specific details for the staff professional profile.",
    "position": "Position",
    "category": "Category",
    "currentClub": "Current club",
    "license": "Licence or training",
    "clubName": "Club name",
    "professionalType": "Professional type",
    "priceRange": "Price range",
    "services": "Services offered",
    "location": "Location",
    "availability": "Availability",
    "biography": "Biography",
    "reviewsTitle": "Reviews",
    "reviewsDescription": "Reviews help strengthen trust between platform users.",
    "averageRating": "Average rating",
    "signInToReview": "Sign in to review this profile.",
    "cannotReviewOwnProfile": "You cannot review your own profile.",
    "ratingLabel": "Rating",
    "comment": "Comment",
    "commentPlaceholder": "Write a short recommendation or review for the profile.",
    "saveReview": "Save review",
    "noPublishedReviews": "There are no published reviews for this profile yet.",
    "contactTitle": "Contact",
    "contactDescription": "You can start an internal conversation with this profile to make first contact inside FUTCON.",
    "signInToContact": "Sign in to contact",
    "cannotContactOwnProfile": "You cannot contact your own profile",
    "contact": "Contact",
    "ratingOptions": {
      "1": "1 - Poor",
      "2": "2 - Needs improvement",
      "3": "3 - Fair",
      "4": "4 - Good",
      "5": "5 - Excellent"
    },
    "backToSearch": "Back to search",
    "sportInfo": "Sports information",
    "sportInfoDescription": "Specific details for the player profile.",
    "staffType": "Professional type",
    "reviews": "Reviews",
    "noReviews": "No reviews",
    "reviewSingular": "review",
    "reviewPlural": "reviews",
    "loginToReview": "Sign in to review this profile.",
    "ownReviewBlocked": "You cannot review your own profile.",
    "rating": "Rating",
    "loginToContact": "Sign in to contact",
    "ownContactBlocked": "You cannot contact your own profile",
    "contactButton": "Contact"
  },
  "profileEdit": {
    "loadError": "The profile could not be loaded.",
    "title": "Edit profile",
    "description": "Update the common and role-specific information for your FUTCON profile.",
    "assignedRole": "Assigned role",
    "commonInfo": "Common information",
    "commonInfoDescription": "This information is shared by every profile type.",
    "displayName": "Display name",
    "bio": "Short biography",
    "bioPlaceholder": "Briefly explain who you are, what you are looking for or what experience you have.",
    "city": "City",
    "province": "Province",
    "availability": "Availability",
    "availabilityDescriptions": {
      "available": "I am looking for a team, club or professional opportunities.",
      "open_to_offers": "I am currently attached, but open to proposals.",
      "unavailable": "I am not looking for new opportunities right now."
    },
    "playerInfo": "Player information",
    "playerInfoDescription": "Specific fields to build the player sports profile.",
    "position": "Position",
    "preferredFoot": "Preferred foot",
    "playerCategory": "Category",
    "playerCurrentClub": "Current club",
    "experienceYears": "Years of experience",
    "birthYear": "Birth year",
    "heightCm": "Height in cm",
    "coachInfo": "Coach information",
    "coachInfoDescription": "Specific fields to show experience and technical profile.",
    "coachCategory": "Category",
    "coachCurrentClub": "Current club",
    "coachingLicense": "Licence or training",
    "preferredAgeGroup": "Preferred stage or age group",
    "clubInfo": "Club information",
    "clubInfoDescription": "Specific fields to identify the organisation or sports manager.",
    "clubName": "Club name",
    "clubCategory": "Main category",
    "website": "Website",
    "contactRole": "Contact role",
    "staffInfo": "Staff professional information",
    "staffInfoDescription": "Specific fields to show services, experience and professional availability.",
    "staffKind": "Professional type",
    "priceRange": "Guide price range",
    "worksRemotely": "I offer remote services",
    "services": "Services offered",
    "placeholders": {
      "city": "E.g. Girona",
      "province": "E.g. Girona",
      "position": "E.g. Centre forward",
      "preferredFoot": "E.g. Right",
      "playerCategory": "E.g. 3a Catalana",
      "playerCurrentClub": "E.g. CF Banyoles",
      "coachCategory": "E.g. Juvenil Preferent",
      "coachCurrentClub": "E.g. UE Figueres",
      "coachingLicense": "E.g. UEFA C",
      "preferredAgeGroup": "E.g. Youth football, senior amateur...",
      "clubName": "E.g. CF Banyoles",
      "clubCategory": "E.g. 2a Catalana",
      "website": "https://...",
      "contactRole": "E.g. Sports coordinator",
      "priceRange": "E.g. 20-30 ?/session",
      "services": "E.g. injury recovery, return to play, sports nutrition..."
    },
    "verificationTitle": "Trust and verification",
    "verificationDescription": "Verification helps strengthen profile credibility within FUTCON.",
    "currentStatus": "Current status",
    "verificationDescriptions": {
      "unverified": "You have not requested profile verification yet.",
      "pending": "The verification request is pending review.",
      "verified": "This profile has been verified.",
      "rejected": "Verification was rejected. You can request it again."
    },
    "alreadyVerified": "Your profile is already marked as verified.",
    "verificationPending": "Your verification request is pending review.",
    "optionalMessage": "Optional message",
    "requestPlaceholder": "E.g. I am requesting verification because I am a club manager / federated player / staff professional...",
    "requestVerification": "Request verification"
  },
  "conversations": {
    "title": "Messages",
    "description": "Conversations started with other FUTCON profiles.",
    "emptyTitle": "You do not have conversations yet",
    "emptyDescription": "When you contact a player, coach, club or professional, the conversation will appear here.",
    "noConversationMessages": "There are no messages in this conversation yet.",
    "openConversation": "Open conversation",
    "backToMessages": "Back to messages",
    "conversationWith": "Conversation with",
    "profileFallback": "Profile",
    "messagePlaceholder": "Write a message...",
    "realtimeNote": "Messages update in real time inside the conversation.",
    "sendMessage": "Send message",
    "emptyThread": "There are no messages yet. Write the first message to start the conversation."
  },
  "admin": {
    "permissionError": "You do not have permission to access the admin panel.",
    "eyebrow": "Administration",
    "title": "Admin panel",
    "description": "Review and manage profile verification requests in FUTCON.",
    "totalRequests": "Total requests",
    "pendingReview": "Pending review",
    "resolved": "Resolved",
    "pendingTitle": "Pending requests",
    "pendingDescription": "Review the profiles that requested verification.",
    "requestMessage": "Request message",
    "noRequestMessage": "The user did not add a message.",
    "requestedOn": "Requested on {date}",
    "ownRequest": "This request must be resolved by another administrator.",
    "approve": "Approve",
    "reject": "Reject",
    "noPendingTitle": "No pending requests",
    "noPendingDescription": "When a user requests profile verification, it will appear in this section.",
    "historyTitle": "Recent history",
    "historyDescription": "Verified or rejected requests.",
    "resolution": "Resolution:",
    "noResolved": "There are no resolved requests yet.",
    "backToDashboard": "Back to dashboard",
    "pendingRequests": "Pending review",
    "resolvedRequests": "Resolved",
    "pendingSection": "Pending requests",
    "requestedAt": "Requested on",
    "ownRequestBlocked": "This request must be resolved by another administrator.",
    "notResolved": "Not resolved"
  },
  "feedback": {
    "signup_missing_fields": "Please fill in all fields.",
    "password_too_short": "The password must be at least 6 characters long.",
    "account_created_check_email": "Account created. Check your email before signing in.",
    "signin_missing_credentials": "Please provide an email and password.",
    "invalid_role": "Please select a valid role.",
    "profile_invalid_role": "The profile role is not valid.",
    "display_name_required": "Display name is required.",
    "invalid_availability": "The availability status is not valid.",
    "club_name_required": "Club name is required.",
    "invalid_staff_type": "The professional type is not valid.",
    "profile_updated": "Profile updated successfully.",
    "profile_load_failed": "The profile could not be loaded.",
    "conversation_create_failed": "The conversation could not be created.",
    "review_saved": "Review saved successfully.",
    "invalid_rating": "The rating must be between 1 and 5.",
    "own_review_blocked": "You cannot review your own profile.",
    "verification_requested": "Verification request sent successfully.",
    "verification_approved": "Profile verified successfully.",
    "verification_rejected": "Request rejected successfully.",
    "invalid_request": "Invalid request.",
    "no_admin_permission": "You do not have permission to access the admin panel.",
    "empty_message": "The message cannot be empty."
  },
  "notFound": {
    "title": "Profile not found",
    "description": "The profile you are trying to view does not exist or is not public.",
    "action": "Back to search"
  }
}

export const messages = {
  ca,
  es,
  en,
} as const

export function getMessages(locale: Locale) {
  return messages[locale] ?? messages.ca
}
