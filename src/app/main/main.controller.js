var idiomaselect = '';
var sponzorme = angular.module('sponzorme', ['pascalprecht.translate', 'ui.router', 'ngCookies', 'customizationService', 'ngDialog', 'angularFileUpload']);

sponzorme.config(function ($translateProvider) {
  $translateProvider.translations('es', {
    /*
  |--------------------------------------------------------------------------
  | Language strings for views
  |--------------------------------------------------------------------------
  */

  dashboard:  'Dashboard',

  events:  'Eventos',

  settings:  'Configuración',

  sponzors:  'Patrocinadores',

  account:  'Cuenta',

  addevent:  'Añadir Evento',

  seesponzors :  'Ver Sponzors',

  sponzoring:  'Sponzoring',

  following:  'Siguiendo',

  logout:  'Salir',

  about:  'Acerca de',

  support:  'Apoyo',

  testimonialt  : "Testimonios",

  blog:  'Blog',

  balance:  'Saldo',

  comunity:  'Comunidad',

  peak:  'Beneficios',

  yourevents  :  'Sus Eventos',

  suggestions :  'Sugerencias',

  latestsponzors:  'Últimos Sponzors',

  neweventtitle :   'Titulo',

  neweventtitledescription   :  'Dar un nombre distintivo',

  neweventdescription    :  'Descripción',

  neweventdescriptiondescription :  'Dile a las personas lo especial de tu evento',

  neweventlocation:   'Ubicación',

  neweventlocationdescription:  'Especifica donde es la cuestion',

  neweventorganizer:  'Nombre Organizador',

  neweventorganizerdescription:   'Quién es el organizador',

  neweventstarts:   'Comienza',

  neweventstartsdescription:  'La acción comienza',

  neweventends:   'Finaliza',

  neweventendsdescription:  'La acción Finaliza!',

  neweventtype:   'Tipo de evento',

  neweventtypedescription:  'Tipo de evento',

  neweventtopic:  'Tema Evento',

  neweventtopicdescription:   'Tema Evento',

  neweventprivacy:  'Listado de Privacidad',

  neweventprivacydescription:   'Listado de Privacidad',

  privacyoption0:   'Página Pública',

  privacyoption1:   'Página privada',

  privacydescription0:  'Listar en SponzorMe y Motores de busqueda',

  privacydescription1:  'No listar este evento publicamente',

  eventsponzors:  'Patrocinadores',

  goldSponzor:  'Patrocinador Oro',

  silverSponzor:  'Patrocinador Plata Sponzor',

  bronzeSponzor:  'Patrocinador Bronce',

  buttonsugestions:   'Botòn',

  eventdetails:   'Detalles del evento',

  submitbutton:   'Enviar',

  deleteEvent:  'Evento Borrado.',

  createEventSuccess:   'El evento ha sido creado exitosamente',

  removeEventSuccess:   'El evento ha sido exitosamente removido',

  eventaditionalseetings:   'Configuración adicional',

  choosetype:   '-- Elegir tipo --',

  eventprivacy:   'Tipo',

  eventtype:  'Privacidad',

  typesponzor:  'Tipo de patrocinador',

  quantitysponzor:  'Cantidad Disponible',

  pricesponzor:   'Precio',

  actionssponzor:   'Acciones',

  editaccountname:  'Nombre completo',

  editaccountemail:   'Correo Electronico',

  editaccountcompany:   'Empresa',

  editaccountage:   'Edad',

  editaccountsex:   'Sexo',

  editaccountlocation:  'Ubicación',

  editaccountdescription:   'Descripción',

  editaccount:  'Editar Cuenta',

  by:   'Por',

  close:  'Cerrar',

  youfollowing:   'Tus Eventos Seguidos',

  yousponzoring:  'Sus Eventos Patrocinados',

  name:   'Nombre',

  email:  'Correo Electronico',

  location:   'Ubicación',

  eventtitle:   'Título del evento',

  state:  'Estado',

  options:  'Opciones',

  yousponzring:   'Eventons que tu estas patrocinando',

  title:  'Tìtulo',

  title:  'Comienza',

  perks:  'Perks',

  kind:   'Tipo',

  quantity:   'Cantidad',

  usd:  'USD',

  navigation:   'Navegación',

  home:   'Inicio',

  notification:   'Notificación',

  notifications:  'Notificaciones',

  starts:   'Comienza',

  friendemail:  'Email de tu amigo',

  friendmessage:  'Mensaje a tu amigo',

  invitefriendstring:  'Invita a tu amigo',

  seemore:  'Ver Mas ...',

  manage:  'Gestionar',

  searchtitle:  'Busca tu proximo evento ...',

  eventbriteMessage:  'Conectar tu cuenta con eventbrite',

  eventbriteButton:  'Conectar !',

  eventbriteButtonUnconnect:  'Desconectar =(',

  evenbriteNotConnected:  "Opss, ",

  evenbriteConnected:  "Hemos conectado las cuentas satisfactoriamente, Algo salió mal. Seras redirigido a la pagina principal.",

  Import:  "Importar",

  eventbriteEvents:  "Lista de tus eventos de eventbrite",

  configureImport:  "Configurar tu importación desde eventbrite",

  comunitySize: "Tamaño de tu comunidad",

  meetupMessage: "Conectar tu cuenta con Meetup",

  meetupButton:  'Conectar con Meetup!',

  /*
  |--------------------------------------------------------------------------
  | Task Lists
  |--------------------------------------------------------------------------
  */

  todo : 'Lista de Tareas',

  todoEvent : 'Evento',

  chooseEvent : 'Elegir un Evento',

  todoPeak : 'Tipo de Patrocinador',

  choosepeak : 'Elegir un Patrocinador',

  removeTodo:  'Tarea Borrada',

  todoTitle:  'Titulo de la Tarea',

  todoDescription:  'Descripcion de la Tarea',

  todosList:  'Estado de Tareas',

  todoActions:  'Acciones',

  todosListSponzor:  'Mis Tareas',

  todoStatus:  'Estado',

  addTodosListSponzor:  'Agregar Tareas',

  addSponzorTodo:  'Agregar Tarea',


  /*
    |--------------------------------------------------------------------------
    | Language strings for views
    |--------------------------------------------------------------------------
    */
    subject: 'Bienvenido a SponzorMe',


    click: 'Click Aquí',

    invitefriend: 'Hola, <br/><br/> Estas invitado para usar <a href="http://sponzor.me">SponzorMe</a>.',

    header       : '<p dir="ltr">Hola,</p><br/><p dir="ltr">Mi nombre es Carlos y soy el fundador de SponzorMe. Yo solo queria contactarte y decirte gracias por unirte! Te queria decir que este proyecto nació de una </br> necesidad que yo mismo tenía cada vez que organizaba un evento y que es un problema que muchas veces acaba con las comunidades y con el entusiasmo de sus </br>organizadores. Si tienes un tiempo te invito a leer nuestra entrada donde puedes ver lo que motiva al equipo de SponzorMe ( <a href="http://bloges.sponzor.me/">http://bloges.sponzor.me/</a> )</p><br/><p dir="ltr">Como sabes esto es un viaje y no sabemos la mayoría de las cosas, es por esto que vamos a necesitar de tu ayuda. Cualquier comentario, preocupación, </br> problema, sugerencia. Estoy disponible para escucharte.</p><br/><p dir="ltr">Mi correo es: <a href="mailto:carlos@sponzor.me">carlos@sponzor.me</a></p><br/><p dir="ltr">Para empezar debes confirmar tu correo electronico en el siguiente link:</p><br/><p dir="ltr">',
    'footer'           :'</p><br/><p dir="ltr">Gracias de nuevo por unirte - Es grandioso conocerte :)</p><br/><p dir="ltr">Un abrazo,</p><p>Carlos Rojas</p>',


    /*
  |--------------------------------------------------------------------------
  | Group Repositiory Messages
  |--------------------------------------------------------------------------
  */

  created     : "Grupo creado.",

  loginreq    : "Campo de login requerido.",

  userexists    : "El usuario ya existe.",

  updated     : "El grupo ha sido actualizado.",

  updateproblem   : "Hubo un problema actualizando el grupo.",

  namereq     : "Debes proveer un nombre para el grupo.",

  groupexists   : "El grupo que intentas crear ya existe.",

  notfound    : "El grupo no fue encontrado.",


  /*
  |--------------------------------------------------------------------------
  | Validation Language Lines
  |--------------------------------------------------------------------------
  |
  | The following language lines contain the default error messages used by
  | the validator class. Some of these rules have multiple versions such
  | such as the size rules. Feel free to tweak each of these messages.
  |
  */

  title     : "Ingresar",
  rememberme  : "Recuerdame",
  signin      : "Registrarse",
  forgot    : "¿Olvidó su contraseña?",



  /*
  |--------------------------------------------------------------------------
  | Language strings for views
  |--------------------------------------------------------------------------
  */

  flashsuccess   :  'Exitoso',

  flasherror   :  'Error',

  flashwarning   :  'Cuidado',

  flashinfo    :  'FYI',

  register     :  'Registrarse',

  login      :  "Ingresar",

  logout     :  "Salir",

  home       :  "Home",

  users      :  "Usuarios",

  user       :  "Usuario",

  groups     :  "Grupos",

  helloworld   :  "SponzorMe",

  description  :  "Events, Sponsors, Marketplace",

  loginstatus  :  "Tu estas ingresado actualmente.",

  sessiondata  :  "Datos de la sesión",

  currentusers   :  "Usuarios Actuales",

  options    :  'Opciones',

  status     :  "Estado",

  active     :  "Activo",

  notactive    :  "No activo",

  suspended    :  "Suspendido",

  banned     :  "Baneado",

  actionedit   :  "Editar",

  actionsuspend  :  "Suspender",

  actionunsuspend  :  "No suspender",

  actionban    :  "Prohibir",

  actionunban  :  "No Prohibir",

  actiondelete   :  "Borrar",

  sponsorreg   :  "Eres Patrocinador?",

  organizerreg   :  "Eres Organizador?",

  copy   :  "Conectamos Eventos con Patrocinadores",

  nextaction   :  "Solo sube tu evento y deja que la magia comience...",

  testimonialt   :  "Testimonios",

  blog   :  "Blog",

  blogUrl  :  "http://bloges.sponzor.me/",

  woman  :  "Mujer",

  man  :  "Hombre",

  ageiam   :  "Tengo",

  old  :  "Años",

  chooseSex  :  "Genero",

  livein   :  "Vivo en",

  country  :  "País",

  state  :  "Departamento",

  city   :  "Ciudad",

  next   :  "Siguiente",

  areyouinterested   :  "¿Estoy interesado en?",

  weresendingandemail  :  "Hemos enviado un email a",

  toactivateyouraccount  :  "para activar tu cuenta.",

  forbidden  :  "Prohibido",

  aboutyou   :  "Algo sobre tí!",

  almostdone   :  "Ya casi está!",

  dashboard  :  "Dashboard",

  team   :  "Equipo",

  support  :  "Soporte",

  supportUrl   :  "http://support.sponzor.me/",

  terms  :  "Terminos del Servicio",

  privacy  :  "Privacidad",

  getting  :  "Vamos a hacerlo",

  error404  : "Ohh.....Esto es bochornoso pero no hemos podido encontrar tu solicitud.",

  backhome  : "Regresar",


  language : "Mi leguaje favorito es: ",

  chooseLang : "Escoje tu lenguaje",

  en : "Inglés",

  es : "Español",

  pt : "Portugues",


  /*
  |--------------------------------------------------------------------------
  | Pagination Language Lines
  |--------------------------------------------------------------------------
  |
  | The following language lines are used by the paginator library to build
  | the simple pagination links. You are free to change them to anything
  | you want to customize your views to better match your application.
  |
  */

  previous : '&laquo; Anterior',

  next     : 'Siguiente &raquo;',


  /*
  |--------------------------------------------------------------------------
  | User Repositiory Messages
  |--------------------------------------------------------------------------
  */

  headprivacy:  "Política de privacidad",

  head2privacy: "Acerca de SponzorMe:",

  head3privacy: "Nuestra política:",

    head4privacy:  "Consentimiento:",

  head5privacy: "Información que recopilamos:",

  head6privacy: "1. Datos personales:",

    head7privacy:  "2. Datos no personales::",

  head8privacy: "3. Cookies, etiquetas de píxel, objetos locales compartidos, almacenamiento web y tecnología similares:",

  head9privacy: "El uso que hacemos de la información recopilada:",

    head10privacy:  "1. Datos personales:",

  head11privacy:  "2. Datos no personales:",

  head12privacy:  "Divulgación de la información recopilada:",

    head13privacy:  "1. Datos personales:",

  head14privacy:  "2. Datos no personales:",

  head15privacy:  "Tus opciones:",

    head16privacy:  "Exclusiones:",

  head17privacy:  "Niños:",

  head18privacy:  "Enlaces a otros sitios web:",

    head19privacy:  "Almacenamiento y seguridad:",

  head20privacy:  "Leyes internacionales de privacidad:",

  head21privacy:  "Programas de Puerto Seguro entre EE. UU. y la U.E. y entre EE. UU. y Suiza:",

    head22privacy:  "Otros términos y condiciones:",

  head23privacy:  "Cambios en esta Política de privacidad:",

  head24privacy:  "Acceso a la información:",

    head25privacy:  "Conservación y eliminación:",

  head26privacy:  "Contacto de SponzorMe:",

  head27privacy:  "Resolución de disputas:",

  text1:  'Te damos la bienvenida a SponzorMe. SponzorMe, Inc. ("Compañía", "nosotros", "nosotros" y/o "nuestro") permite que la gente de todo el mundo planifique, promocione y venda entradas para cualquier evento. Y hacemos que descubrir y compartir eventos a los que se va a asistir con personas que se conoce sea más fácil para todo el mundo. Lo hacemos a través de nuestros sitios web y dominios, los servicios están disponibles en nuestros sitios web y dominios o a través de ellos o también los podemos proporcionar nosotros, y el software disponible en nuestros sitios web y dominios o que proporcionemos nosotros, (incluidas nuestras aplicaciones móviles) (de forma colectiva, los "Services").',

  text2:  'La presente Política de privacidad establece nuestra política con respecto a la información, incluida la información personal ("Datos personales"), que recabamos de usuarios y/o visitantes de los Servicios (incluido a través de los agentes de dichos usuarios y visitantes) ("tú" o "tu"), incluidos (i) usuarios registrados que son organizadores de eventos, planificadores y organizaciones benéficas ("Organizadores"), (ii) usuarios que desean comprar entradas, registrarse o realizar donaciones para eventos (gratuitos o de pago) que los Organizadores muestran en los Servicios ("Compradores") y (iii) otros usuarios No organizadores o visitantes de los Servicios ("otros No organizadores").</br>Nos tomamos muy en serio la privacidad de tus Datos personales y cualquier otra información. Por esa razón, hemos creado esta Política de privacidad. Lee la Política de privacidad, que incluye información importante acerca de tus Datos Personales y otro tipo de información.</br>Si tienes cualquier pregunta, no dudes en conectarte con nosotros mediante el siguiente enlace: https://www.sponzor.me/contact-us.',
  text3:  'Al utilizar los Servicios o al permitir que alguien utilice los Servicios en tu nombre, estás dando tu consentimiento a la recogida, el uso, la divulgación, la transferencia y el almacenamiento de acuerdo con esta Política de privacidad de cualquier Dato personal u otro tipo de información recibida como resultado de dicho uso.',
  text4:  'Cuando interactúas con nosotros a través de los Servicios, podemos recopilar Datos personales y otra información acerca de ti, tal y como se describe a continuación:',
  text5:  'Organizadores: Recopilamos tus Datos personales cuando nos los proporciones voluntariamente, como la información a los Servicios, como cuando te registras para acceder a los Servicios como Organizador, te conectas con nosotros para resolver tus dudas, respondes a una de nuestras encuestas o usas determinados Servicios. Los Datos personales que podemos recoger incluyen, entre otros, tu nombre, dirección, correo electrónico y otra información que permita identificarte personalmente. En algunos casos, se recogerán los datos de tu tarjeta de crédito (por ejemplo, el número de la tarjeta de crédito y la fecha de expiración, la dirección de facturación, etc.), algunos de los cuales pueden ser Datos personales, con el fin de asegurar ciertos pagos. Además, si usas nuestros servicios de procesamiento de pagos, recogeremos información financiera sobre ti (por ejemplo, información de tu cuenta bancaria o una dirección a la que enviar cheques) que es necesaria para facilitar los pagos y la información necesaria por razones tributarias (por ejemplo, tu número de identificación del contribuyente).</br>Compradores y otros no organizadores: Recopilaremos tus Datos personales cuando voluntariamente nos los proporciones, como información para los Servicios (incluyendo páginas de registro de eventos dentro de los Servicios), como cuando te registras para acceder a los Servicios (ya sea como Organizador o de otro modo), te registras para un evento como Comprador, te conectas con nosotros para resolver tus dudas, respondes a una de nuestras encuestas o utilizas determinadas partes de los Servicios. Los Datos personales que podemos recopilar incluyen, entre otros, tu nombre, dirección, dirección de correo electrónico, código postal y otro tipo de información que permita identificarte personalmente. Si te registras para un evento de pago, recopilaremos información financiera (por ejemplo, el número de la tarjeta de crédito y la fecha de expiración, dirección de facturación, etc.), algunos de los cuales pueden resultar Datos personales. Además, los Organizadores pueden configurar páginas de registro en eventos para recoger prácticamente cualquier información de los Compradores relacionada con el registro para un evento de un Organizador que se encuentre en la lista de los Servicios. Si un Comprador proporciona voluntariamente esa información en relación con el registro para un evento o de otro tipo, estará disponible para nosotros y la almacenaremos de acuerdo con esta Política de privacidad. Además, dicha información se entregará al Organizador del evento en cuestión aplicable de acuerdo con "Divulgación de la información recopilada: organizadores" a continuación.</br>Enlaces a la política de privacidad: Nos esforzamos por proporcionar un enlace a esta Política de privacidad en el pie de cada página en nuestros sitios web, incluidas las páginas en las que se recopilan Datos personales, y para hacer que esté disponible en todo nuestro software.',
  text6:  'Datos que no permitan identificarte: Cuando interactúas con los Servicios, recogemos cierta información personal que no permita identificarte ("Datos no personales"). Los Datos no personales que recogemos incluyen, entre otros, tu dirección IP, tu tipo de navegador de Internet, otras características del dispositivo y el software, nombres de dominio del Proveedor de servicios de Internet, tu ubicación geográfica aproximada, un registro de tu uso de los Servicios, la hora del uso y Datos personales agregados que no se pueden usar para identificarte personalmente. Dicha información, que se recoge de forma pasiva mediante diferentes tipos de tecnología, no se puede utilizar para identificarte personalmente. Asimismo, recopilamos Datos no personales (como, entre otros, del tipo que se ha indicado anteriormente) de terceros. La información que recogemos de terceros se combinará con la información que recopilemos.</br>Datos personales agregados: En un esfuerzo continuado para mejorar la comprensión de los usuarios y el servicio que proporcionados, realizamos frecuentes informes de datos demográficos, intereses y comportamiento de nuestros clientes basándonos en los Datos personales y cualquier otro tipo de información que hayamos recopilado. Estos informes se compilarán y se analizarán de forma global y dicha información global no permitirá identificarte personalmente y, por lo tanto, tiene consideración de Datos no personales y recibe el tratamiento oportuno según esta Política de privacidad.',
  text7:  'Si deseas obtener más información acerca del uso que hacemos de estas tecnologías, consulta nuestra Política de cookies, que se incorpora como anexo por referencia en la presente Política de privacidad.',
  text8:  'Utilizamos los Datos personales recopilados de manera coherente con esta Política de privacidad. Podemos utilizar los Datos personales de la siguiente manera: </br>Razones específicas: Si proporcionas Datos personales por algún motivo concreto, es posible que usemos los Datos personales relacionados con la razón por la que se facilitaron. Por ejemplo, si te conectas con nosotros por correo electrónico, utilizaremos los Datos personales que nos facilites para responder a tu pregunta o resolver el problema, y responderemos a la dirección de correo electrónico desde la que se envió el mensaje.</br>Acceso y uso: Si proporcionas Datos personales para obtener acceso a los servicios o utilizarlos, o cualquier función relacionada, utilizaremos tus Datos personales para proporcionarte acceso a los servicios o funciones, o utilizarlos y para controlar el uso de dichos los Servicios o funciones. Por ejemplo, si proporcionas información sobre los pagos (por ejemplo, cuenta bancaria o información de la tarjeta de crédito) a los Servicios para la compra de entradas como Comprador o el procesamiento de pagos como Organizador, utilizaremos esa información para facilitar dicha compra o procesar dichos pagos.</br>Fines comerciales internos: Puede que usemos tus Datos personales con fines comerciales internos como, por ejemplo, para que nos ayuden a mejorar el contenido y la funcionalidad de los Servicios, comprender mejor a nuestros usuarios, mejorar los Servicios, proteger, identificar o tratar actividades fraudulentas, reforzar nuestros Términos de servicio, gestionar tu cuenta y proporcionarte un servicio de atención al cliente y, de manera general, gestionar los Servicios y nuestra actividad.</br>Marketing: Puede que usemos tus Datos personales para ponernos en contacto contigo en el futuro por razones de marketing y publicidad, como, sin limitaciones información acerca de servicios o eventos que consideremos puedan ser de tu interés, para desarrollar materiales promocionales o de marketing y facilitártelos, y para mostrar contenido y publicidad en los Servicios o relacionados con estos que creamos que pueda ser pertinente para ti. En concreto, los Organizadores deben tener en cuenta que podemos usar la información que recibimos o almacenamos relacionada con los Compradores (incluyendo, sin limitaciones, la obtenida a través de la página de registro a un evento de un Organizador) de acuerdo con los términos de esta Política de privacidad, como en la forma establecida anteriormente.</br>Correos electrónicos del organizador: Dejamos que los Organizadores utilicen nuestro sistema de correo electrónico para ponerse en contacto con los Compradores por sus eventos actuales y pasados, por lo que es posible que recibas mensajes de correo electrónicos procedentes de nuestro sistema originados por dichos Organizadores.</br>Si quisiéramos utilizar Datos personales de forma que no respete esta Política de privacidad, se te informará antes de hacer dicho uso o en el momento en que se recojan dichos Datos personales, u obtendremos tu consentimiento tras su recopilación, pero siempre antes de hacer uso de ellos.',
  text9:  'Ya que los Datos no personales no se pueden usar para identificarte personalmente, podemos utilizar dicha información con cualquier finalidad legal.',
  text10:  'No nos dedicamos a vender tus Datos personales. Consideramos que esta información es una parte vital de nuestra relación contigo. Por lo tanto, no venderemos tus Datos personales a terceros, incluidas terceras partes publicitarias. Sin embargo, existen algunas circunstancias bajo las cuales podemos revelar, transferir o compartir tus Datos personales con determinadas terceras partes sin más notificación que la indicada anteriormente:</br>Transferencias de negocio: A medida que desarrollamos nuestro actividad, podríamos comprar o vender negocios o activos. En caso de venta, fusión, reorganización, disolución corporativa o evento similar, los Datos personales pueden ser parte de los activos transferidos. Tienes conocimiento de ello y aceptas que cualquier sucesor o comprador de la Empresa (o sus activos) siga teniendo derecho a utilizar tus Datos personales y otro tipo de información de acuerdo con los términos de esta Política de privacidad.</br>Subsidiarias y afiliados: También podríamos compartir tus Datos personales con nuestras subsidiarias y/o afiliados por razones coherentes con esta Política de privacidad. Nuestras subsidiarias y afiliados estarán obligadas a conservar los Datos personales de acuerdo con esta Política de privacidad.</br>Agentes, asesores y terceros relacionados: Nosotros, al igual que muchas compañías, en ocasiones contratamos a otras empresas para que realicen ciertas actividades relacionadas con el negocio. Entre dichas funciones se incluyen, por ejemplo, envíos de información, distribución de entradas, prevención de fraudes, mantenimiento de bases de datos y procesamiento de pagos. Cuando contratamos a otras empresas para que realicen dichas funciones, es posible que les proporcionemos información, como Datos personales, relacionada con la realización de dichas funciones.</br>Organizadores: Al comprar entradas, registrarte o realizar donaciones para un evento o la página de recaudación de fondos relacionada, aceptas que facilitemos tus Datos personales a los Organizadores de dicho evento y página de recaudación de fondos relacionada, si la hubiera. En el caso de páginas de recaudación de fondos, podemos facilitar tu información personal tanto a la organización benéfica que organiza la página de recaudación de fondos como al Organizador del evento al que está vinculada la página de recaudación de fondos. Estos Organizadores no están obligados a tratar tus Datos personales de acuerdo con la presente Política de privacidad. Asimismo nos eximes de cualquier responsabilidad por las acciones llevadas a cabo por dichos Organizadores en relación con tus Datos personales. Es importante que revises las políticas aplicables de los Organizadores de un evento (y de la página de recaudación de fondos relacionada, si la hubiera) antes de facilitar Datos personales u otra información en relación con dicho evento o la página de recaudación de fondos relacionada.</br>Facebook y otras conexiones de terceros: Podemos conectar tu cuenta de SponzorMe a tus cuentas en servicios de terceros como Facebook. En ese caso, podríamos recopilar, utilizar, divulgar, transferir y almacenar información relacionada con tu cuenta con dichos servicios de terceros de acuerdo con esta Política de privacidad. Por ejemplo, si te conectas a Facebook, almacenamos tu ID de Facebook, tu nombre, apellidos, correo electrónico, ubicación, lista de amigos e imagen de perfil y utilizamos estos datos para conectar con tu cuenta de Facebook y proporcionar ciertas funciones en los Servicios, como recomendar eventos en los que están interesados tus amigos de Facebook y compartir los eventos en los que estás interesado con determinados grupos de personas como, por ejemplo, tus amigos de Facebook.</br>Requisitos legales: Podremos divulgar tus Datos personales si la ley así lo exige (incluidas, entre otros casos, la respuesta a una citación o una solicitud en aplicación de la ley, o si lo solicita un tribunal o una agencia gubernamental) o considerando de buena fe que dicha acción es necesaria (i) para cumplir con una obligación legal, (ii) para proteger o defender nuestros derechos, intereses o propiedades o los de terceros, (iii) para evitar, investigar o identificar actividades fraudulentas relacionadas con los Servicios, (iv) para actuar en circunstancias de urgencia para proteger la seguridad personal de los usuarios de los Servicios o del público, o (v) para protegernos contra responsabilidades legales.',
  text11:  'Ya que los Datos no personales no se pueden usar para identificarte personalmente, podemos revelar, transferir o compartir tus Datos no personales con cualquier motivo legítimo.',
  text12:  'Tienes varias opciones al tratar con tus Datos personales:</br>Limitar los Datos personales que facilitas: Puedes utilizar los Servicios, sin necesidad de aportar ningún Dato personal o limitando los Datos personales que facilitas. Si decides no facilitar ningún Dato personal o limitar los Datos personales proporcionados, es posible que no puedas utilizar ciertas funciones de los Servicios. Por ejemplo, en el momento de abrir una cuenta, o comprar o vender entradas, deberás facilitar tu nombre y dirección de correo electrónico.</br>Darte de baja: Puedes "darte de baja" para dejar de recibir el boletín de SponzorMe por correo electrónico iniciando sesión, haciendo clic en "Cuenta" y siguiendo las instrucciones para las "preferencias de correo electrónico". Puedes modificar tus elecciones en cualquier momento en tu cuenta de SponzorMe. Si un Organizador utiliza nuestro sistema para mandarte mensajes de correo electrónico, también podrás "darte de baja" para dejar de recibir dichas comunicaciones. Ten en cuenta que si anulas tu suscripción a recibir los correos electrónicos de un organizador determinado, ya no recibirás más correos electrónicos de ese organizador en concreto a través de nuestro sistema (pero podrías seguir recibiendo correos enviados por dicho organizador mediante otros medios distintos a nuestro sistema). Sin embargo, seguirás recibiendo comunicaciones de SponzorMe, así como comunicaciones de otros organizadores a cuyos eventos hayas asistido o te hayas registrado para asistir, o que hayan obtenido tu dirección de correo electrónico de cualquier otra forma. Asimismo, si anulas tu suscripción a nuestras comunicaciones, seguirás recibiendo correos electrónicos de los organizadores. Así que si desea dejar de recibir cualquier tipo de comunicación, tendrás que anular tu suscripción a las diversas comunicaciones por separado. También puedes anular tu suscripción a las comunicaciones de todos los organizadores a través de nuestro sistema. La tramitación de tu solicitud de anulación de suscripción puede tardar hasta 24 horas en completarse. Ten en cuenta que no puedes anular tu suscripción a las comunicaciones de actualización de los servicios. Puedes dejar de recibir comunicaciones de Servicios únicamente si te pones en contacto con nosotros en https://www.SponzorMe.es/contact-us y cierras tu cuenta. Al elegir dejar de recibir cualquier comunicación por nuestra parte o a través de nuestro sistema, dejarás de recibir actualizaciones acerca de tu cuenta o de eventos en los que estés registrado como asistente o a los que ya hayas asistido, incluyendo las comunicaciones relativas a dinero. No te recomendamos que lo hagas, a no ser que no tengas pensado seguir usando los Servicios, no estés registrado para asistir a un evento, no estés organizando un evento actualmente y no necesites recibir ninguna comunicación nuestra o a través de nuestro sistema. Incluso si decides no recibir ninguna comunicación más, seguiremos reteniendo tus datos Personales y No personales, de acuerdo con la Política de privacidad; sin embargo, ya no los usaremos para ponernos en contacto contigo. No obstante, aquellos organizadores que ya hayan recibido tus Datos Personales de acuerdo con lo estipulado en esta Política de privacidad podrán seguir usando esa información para ponerse en contacto contigo de acuerdo con sus propias Políticas de privacidad, pero no podrán usar nuestro sistema a tal efecto.</br>No realizar seguimiento: Actualmente no participamos en ningún marco "No realizar seguimiento" que nos permita responder a señales u otros mecanismos que nos envíes en relación con la recogida de tus Datos personales.',
  text13: 'Dicha Política de privacidad no afecta a ningún Dato personal que hayamos podido almacenar diferente de los Datos personales recopilados a través de nuestros Servicios. Esta Política de privacidad no se aplicará a ninguna información no solicitada que nos facilites a nosotros o a otro usuario o visitante a través de los Servicios o por cualquier otra vía. Esto incluye, sin limitación, la información publicada en áreas públicas de los Servicios, como los paneles de noticias, cualquier idea relacionada con nuevos productos o modificaciones en productos existentes, cartas de reclamación o de solicitud, avisos de Digital Millennium Copyright Act, y otros envíos no solicitados (de forma colectiva, "Información no solicitada"). Toda la Información no solicitada se considerará como no confidencial y podremos reproducirla, utilizarla, publicarla, distribuirla y explotarla libremente sin limitaciones ni atribuciones.',
  text14: 'No almacenamos de manera intencionada Datos personales de niños menores de 13 años. Si tienes menos de 13 años, no envíes Datos personales a través de los Servicios. Animamos a los padres y tutores legales a que supervisen el uso que hacen los menores de Internet y a que ayuden a aplicar nuestra Política de privacidad enseñando a sus hijos a que nunca faciliten Datos personales a través de los Servicios sin su consentimiento. Si tienes razones para creer que un menor de 13 años nos ha facilitado sus Datos personales a través de los Servicios, contacta con nosotros, y haremos todo lo que esté en nuestra mano para eliminar dicha información de nuestras bases de datos.',
  text15: 'Esta Política de privacidad solo es aplicable para los Servicios. Los Servicios pueden contener enlaces a otros sitios web no controlados por nosotros ("Sitios de terceros"). Las políticas y procedimientos que se describen aquí no son aplicables para los Sitios de terceros. Los enlaces desde los Servicios no implican que estemos de acuerdo con los Sitios de terceros ni que los hayamos revisado. Te recomendamos que te pongas en contacto directamente con dichos sitios para obtener más información sobre sus políticas de privacidad.',
  text16: 'Podemos almacenar Datos personales por sí solos o integrándolos en bases de datos pertenecientes y mantenidas por nuestros afiliados, agentes o servicio de proveedores. Adoptamos las medidas que consideramos razonables para proteger los Datos personales proporcionados por los Servicios contra su pérdida, uso inadecuado, acceso no autorizado, publicación inadvertida, modificación y destrucción. Sin embargo, ninguna transmisión realizada en Internet o por correo electrónico está nunca completamente segura o libre de errores. En concreto, los mensajes de correo electrónico enviados a los Servicios o desde estos podrían no ser seguros. Por lo tanto, se debe tener especial cuidado a la hora de decidir qué tipo de información nos envías por correo electrónico. Recuérdalo cuando publiques cualquier Dato personal en Internet.',
  text17: 'Si visitas nuestro sitio web o utilizas una de nuestras aplicaciones de software desde fuera de los EE. UU., ten en cuenta que estás enviando información (incluyendo Datos personales) a los EE. UU., donde se encuentran nuestros servidores. Conservaremos y procesaremos tus Datos personales y no personales de acuerdo con las leyes de privacidad de los EE. UU. y esta Política de privacidad. Ten en cuenta que las leyes de privacidad de los EE. UU. podrían no ser las mismas, o ser menos restrictivas en algunos casos, que las leyes de privacidad de tu país.',
  text18: 'Participamos en el marco de trabajo de Puerto Seguro entre EE. UU. y la U.E. y entre EE. UU. y Suiza que comprende la recopilación, el uso y la conservación de información personal recabada en países miembros de la Unión Europea y Suiza. Nuestra participación significa que autocertificamos nuestra adhesión a los principios de Puerto Seguro de notificación, opción, transferencia ulterior, seguridad, integridad, acceso y aplicación en relación con dicha información personal. Para obtener más información sobre estos marcos de protección y sobre nuestra participación en ellos, visita el sitio web de Puerto Seguro del Departamento de Comercio de EE. UU. Si tienes alguna pregunta sobre nuestra participación, ponte en contacto con nuestro responsable de privacidad de Puerto Seguro de SponzorMe en la siguiente dirección: SponzorMe, Inc., A/A: Responsable de privacidad, 2081 Street Center, Berkeley, CA 94704, EE. UU., o por correo electrónico en la siguiente dirección: privacy@sponzor.me',
  text19: 'Tu acceso y uso de los Servicios está sujeto a Términos de servicio. Si utilizas las interfaces de programación de aplicaciones de SponzorMe (la "API de SponzorMe"), estarás sujeto a las Condiciones de uso de la API de SponzorMe.',
  text20: 'Los Servicios y nuestra empresa pueden cambiar cada cierto tiempo. Como resultado, a veces podría ser necesario realizar cambios en la presente Política de privacidad. Nos reservamos el derecho, a nuestra entera discreción, de actualizar o modificar la presente Política de privacidad en cualquier momento (colectivamente, "Modificaciones"). Las Modificaciones de la presente Política de privacidad se publicarán en el sitio web de SponzorMe con la fecha de "Última actualización" cambiada en la parte superior de dicha Política de privacidad. En algunas circunstancias, SponzorMe podría, sin estar obligado a ello, proporcionarte un aviso adicional de dichas Modificaciones, por ejemplo, a través de correo electrónico o mediante notificaciones en el Servicio. Las Modificaciones entrarán en vigor 30 días después de la fecha de "Última actualización" o la fecha que te comuniquemos en cualquier otro aviso. Revisa esta política periódicamente, especialmente antes de facilitar Datos personales. La presente Política de privacidad se actualizó por última vez en la fecha indicada arriba. Si continúas usando los Servicios tras la entrada en vigor de cualquier Modificación de la presente Política de privacidad significará que aceptas dichas Modificaciones. Si no aceptas todas las Modificaciones de la presente Política de privacidad, deberás dejar de acceder a, navegar por y utilizar de cualquier otro modo los Servicios.',
  text21: 'Los Organizadores podrán acceder a los Datos personales almacenados por nosotros y actualizarlos si inician sesión y visitan la página Mi cuenta. Asimismo, los Organizadores podrán conectarse con nosotros directamente en la dirección que se indica más abajo en referencia a Datos personales a los que no se puede acceder desde la página Mi cuenta. Los compradores y otros no Organizadores no disponen de cuenta formal en SponzorMe; sin embargo, puedes crear una cuenta formal si te inscribes. Una vez inscrito, podrás actualizar tus Datos personales y acceder a ellos en la página Mi cuenta. Los compradores y otros no Organizadores también pueden ponerse en contacto con nosotros directamente para solicitar la actualización de los Datos personales en la dirección que se indica más abajo. Tomaremos las medidas razonables para responder a las solicitudes relacionadas con Datos personales en un plazo de 30 días; sin embargo, podríamos rechazar las solicitudes que no sean razonables (es decir, que requieran un esfuerzo desproporcionado o cambios materiales en nuestros sistemas de información), o las que sean poco prácticas o abusivas (es decir, las solicitudes repetidas, las solicitudes realizadas de mala fe o las que pudieran comprometer la información de terceros). Ten en cuenta que quizás no puedas acceder o actualizar Datos no personales, muchos de los cuales se conservan en forma agregada.',
  text22: 'Podremos conservar tus Datos personales mientras continúes utilizando los Servicios. Puedes cerrar tu cuenta poniéndote en contacto con nosotros. Sin embargo, podremos conservar Datos personales y Datos no personales durante más tiempo si las leyes aplicables así lo permite o lo exigen. Aunque eliminemos tus Datos personales, estos pueden continuar en soportes de archivo o copia de seguridad y en otros sistemas de información.',
  text23: 'Si tienes cualquier pregunta acerca de esta Política de privacidad o nuestras prácticas al manejar la información, no dudes en ponerte en contacto con nosotros. Puedes escribirnos aquí: http://www.Sponzor.me/contact-us o llamarnos al +1 5104176510',
  text24: 'Si tienes alguna reclamación sobre las prácticas relacionadas con la política de privacidad de SponzorMe, escríbenos a la siguiente dirección: SponzorMe, Inc., A/A: Responsable de privacidad, 2081 Center Street, Berkeley, CA 94704, EE. UU., o envíanos un correo electrónico a la dirección: privacy@sponzor.me. Tomaremos las medidas razonables para colaborar contigo e intentar resolver tu reclamación. Como parte de nuestra participación en el marco de trabajo de Puerto Seguro entre EE. UU. y la U.E. y entre EE. UU. y Suiza, SponzorMe ha designado a TRUSTe como su único mecanismo para la resolución de conflictos para todas las reclamaciones relacionadas con los principios de Puerto Seguro. Puedes presentar dicha reclamación a TRUSTe a través de Internet aquí, por fax al número 415-520-3420 o por correo electrónico al Departamento de aplicación de Puerto Seguro de TRUSTe a la dirección indicada aquí; sin embargo, en cualquier caso, únicamente deberás hacerlo después de ponerte primero en contacto con nuestro Responsable de privacidad para comunicarle tu reclamación y dejarnos una cantidad de tiempo razonable para tratar de resolver dicha reclamación. Si envías un fax o un correo a TRUSTe para presentar una reclamación, deberás incluir la siguiente información: el nombre de la empresa, la presunta violación de privacidad, tu información de contacto y si deseas compartir con la empresa los detalles de tu reclamación. Para obtener más información sobre TRUSTe o sobre el funcionamiento del proceso de resolución de conflictos de TRUSTe, haz clic aquí o solicita dicha información a TRUSTe en cualquiera de las direcciones indicadas anteriormente. El proceso de resolución de conflictos de TRUSTe se llevará a cabo en inglés.',


  /*
  |--------------------------------------------------------------------------
  | Session Repository Messages
  |--------------------------------------------------------------------------
  */

  invalid   : "Nombre de usuario o contraseña invalido.",

  notactive :  "Tu no has activado esta cuenta aun. <a href=':url' class='alert-link'>¿Reenviar de nuevo el codigo de activación?</a>",

  suspended : "Tu cuenta ha sido temporalmente suspendida.",

  banned  : "Tu cuenta ha sido baneada.",


  /*
  |--------------------------------------------------------------------------
  | Language strings for views
  |--------------------------------------------------------------------------
  */
  eventbrite_msg: 'Por favor conecte su cuenta de Eventbrite',
  meetup_msg: 'Por favor conecte su cuenta de Meetup',


  /*
  |--------------------------------------------------------------------------
  | Validation Language Lines
  |--------------------------------------------------------------------------
  |
  | The following language lines contain the default error messages used by
  | the validator class. Some of these rules have multiple versions such
  | such as the size rules. Feel free to tweak each of these messages.
  |
  */

  title: "Registrarse",
  rememberme: "Recuerdame",
  signin: "Registrarse",
  forgot: "¿Olvidó su contraseña?",


  /*
  |--------------------------------------------------------------------------
  | User Repositiory Messages
  |--------------------------------------------------------------------------
  */

  testimonial1 :  "SponzorMe es una herramienta que se debio haber construido hace mucho tiempo...",

  testimonial2 :  "Necesitábamos esta herramienta para que cada evento sea cada vez más fácil y gratificante...",

  testimonial3: "Gracias a SponzorMe yo me puedo concentrar en crear mas contenido para mi comunidad...",


  /*
  |--------------------------------------------------------------------------
  | User Repositiory Messages
  |--------------------------------------------------------------------------
  */

  created   :  "Tu cuenta ha sido creada, revisa tu email por el link de confirmación.",

  loginreq  : "El campo de login es requerido.",

  exists  : "El usuario ya existe.",

  notfound  : "Usuario no encontrado.",

  noaccess  : "No tienes permisos para ejecutar esta acción.",

  updated : "Perfil actualizado.",

  notupdated: "Imposible actualizar el perfil.",

  activated : "Activación completada. <a href=':url' class='alert-link'>Ya puedes logear!</a>",

  notactivated: "La activación no se puede completar.",

  alreadyactive:  "La cuenta ya se encuentra activada.",

  emailconfirm: "Revisa tu e-mail por el link de confirmación.",

  emailinfo : "Revisa tu e-mail por instrucciones.",

  emailpassword:  "Tu contraseña ha cambiado, revisa tu email por mas instrucciones.",

  problem : "Hay un problema, por favor contacta con el administrador.",

  passwordchg:  "Tu contraseña ha cambiado.",

  passwordprob: "Tu contraseña no se puede cambiar.",

  oldpassword:  "Contraseña original incorrecta.",

  suspended : "La cuenta ha sido suspendida por :minutes minutos.",

  unsuspended:  "La cuenta ha sido reestablecida.",

  banned  : "El usuario ha sido baneado.",

  unbanned  : "El usuario ha sido des-baneado.",


  /*
  |--------------------------------------------------------------------------
  | Validation Language Lines
  |--------------------------------------------------------------------------
  |
  | The following language lines contain the default error messages used
  | by the validator class. Some of the rules contain multiple versions,
  | such as the size (max, min, between) rules. These versions are used
  | for different input types such as strings and files.
  |
  | These language lines may be easily changed to provide custom error
  | messages in your application. Error messages for custom validation
  | rules may also be added to this file.
  |
  */

  accepted       : "El campo :attribute debe ser aceptado.",
  active_url     : "El campo :attribute no es una URL válida.",
  after          : "El campo :attribute debe ser una fecha después de :date.",
  alpha          : "El campo :attribute sólo puede contener letras.",
  alpha_dash     : "El campo :attribute sólo puede contener letras, números y guiones.",
  alpha_num      : "El campo :attribute sólo puede contener letras y números.",
  array          : "El campo :attribute debe ser un arreglo.",
  before         : "El campo :attribute debe ser una fecha antes :date.",

  //between        : {},
    between_numeric : "El campo :attribute debe estar entre :min - :max.",
    between_file    : "El campo :attribute debe estar entre :min - :max kilobytes.",
    between_string  : "El campo :attribute debe estar entre :min - :max caracteres.",
    between_array   : "El campo :attribute debe tener entre :min y :max elementos.",

  confirmed      : "El campo :attribute confirmación no coincide.",
  date           : "El campo :attribute no es una fecha válida.",
  date_format    : "El campo :attribute no corresponde con el formato :format.",
  different      : "El campo :attribute and :other debe ser diferente.",
  digits         : "El campo :attribute debe ser de :digits dígitos.",
  digits_between : "El campo :attribute debe terner entre :min y :max dígitos.",
  emailerror          : "El formato del :attribute es invalido.",
  exists         : "El campo :attribute seleccionado es inválido.",
  image          : "El campo :attribute debe ser una imagen.",
  In             : "El campo :attribute seleccionado es inválido.",
  integer        : "El campo :attribute debe ser un entero.",
  ip             : "El campo :attribute Debe ser una dirección IP válida.",
  match          : "El formato :attribute es inválido.",
  //max            : {},
    max_numeric : "El campo :attribute debe ser menor que :max.",
    max_file    : "El campo :attribute debe ser menor que :max kilobytes.",
    max_string  : "El campo :attribute debe ser menor que :max caracteres.",
    max_array   : "El campo :attribute debe tener al menos :min elementos.",

  mimes         : "El campo :attribute debe ser un archivo de tipo :values.",
  //min           : {},
    min_numeric : "El campo :attribute debe tener al menos :min.",
    min_file    : "El campo :attribute debe tener al menos :min kilobytes.",
    min_string  : "El campo :attribute debe tener al menos :min caracteres.",

  not_in                : "El campo :attribute seleccionado es invalido.",
  numeric               : "El campo :attribute debe ser un numero.",
  regex                 : "El formato del campo :attribute es inválido.",
  required              : "El campo :attribute es requerido",
  required_if           : "El campo :attribute es requerido cuando el campo :other es :value.",
  required_with         : "El campo :attribute es requerido cuando :values está presente.",
  required_with_all     : "El campo :attribute es requerido cuando :values está presente.",
  required_without      : "El campo :attribute es requerido cuando :values no está presente.",
  required_without_all  : "El campo :attribute es requerido cuando ningún :values está presentes.",
  same                  : "El campo :attribute y :other debe coincidir.",
  //size                  : {}
    size_numeric : "El campo :attribute debe ser :size.",
    size_file    : "El campo :attribute debe terner :size kilobytes.",
    size_string  : "El campo :attribute debe tener :size caracteres.",
    size_array  : "El campo :attribute debe contener :size elementos.",

  unique : "El campo :attribute ya ha sido tomado.",
  url    : "El formato de :attribute es inválido.",

  /*
  |--------------------------------------------------------------------------
  | Custom Validation Language Lines
  |--------------------------------------------------------------------------
  |
  | Here you may specify custom validation messages for attributes using the
  | convention "attribute_rule" to name the lines. This helps keep your
  | custom validation clean and tidy.
  |
  | So, say you want to use a custom validation message when validating that
  | the "email" attribute is unique. Just add "email_unique" to this array
  | with your custom message. The Validator will handle the rest!
  |
  */

  //custom : {}
  //custom_attribute_name : {},
  custom_attribute_name_rule_name  : 'custom-message',

  /*
  |--------------------------------------------------------------------------
  | Validation Attributes
  |--------------------------------------------------------------------------
  |
  | The following language lines are used to swap attribute place-holders
  | with something more reader friendly such as "E-Mail Address" instead
  | of "email". Your users will thank you.
  |
  | The Validator class will automatically search this array of lines it
  | is attempting to replace the :attribute place-holder in messages.
  | It's pretty slick. We think you'll like it.
  |
  */

  //attributes : {},
  attributes_username : 'Usuario',
  attributes_password : 'Contraseña',
  attributes_confirmpassword : 'Confirmar contraseña',

  /*
  |--------------------------------------------------------------------------
  | User Repositiory Messages
  |--------------------------------------------------------------------------
  */

  testimonial1  :   'SponzorMe es una herramienta que se debio haber construido hace mucho tiempo...',

  testimonial2    :  'Necesitábamos esta herramienta para que cada evento sea cada vez más fácil y gratificante...',

  testimonial3    :  'Gracias a SponzorMe yo me puedo concentrar en crear mas contenido para mi comunidad...',



  });
  $translateProvider.translations('en', {
    /*
    |--------------------------------------------------------------------------
    | Language strings for views
    |--------------------------------------------------------------------------
    */
    dashboard: 'Dashboard',

    events            : 'Events',

    settings            : 'Settings',

    sponzors            : 'Sponzors',

    account          : 'Account',

    addevent            : 'Add Event',

    seesponzors         : 'See Sponzors',

    sponzoring          : 'Sponzoring',

    following           : 'Following',

    logout           : 'Logout',

    about            : 'About',

    support          : 'Support',

    blog             : 'Blog',

    balance          : 'Balance',

    comunity            : 'Comunity',

    peak             : 'Perks',

    yourevents         : 'Your Events',

    suggestions        : 'Suggestions',

    latestsponzors       : 'Latest Sponzors',

    neweventtitle         :  'Title',

    neweventtitledescription   :  'Give it a Short Distinc Name',

    neweventdescription     :  'Description',

    neweventdescriptiondescription:  'Tell people what\'s special about this event',

    neweventlocation        :  'Location',

    neweventlocationdescription :  'Specify where it\'s the held',

    neweventorganizer       :  'Organizer Name',

    neweventorganizerdescription :  'Who is the organizer',

    neweventstarts       :  'Starts',

    neweventstartsdescription  :  'The Action Starts',

    neweventends         :  'Ends',

    neweventendsdescription  :  'The Action Ends!',

    neweventtype        :  'Event Type',

    neweventtypedescription  :  'Event Type',

    neweventtopic        :  'Event Topic',

    neweventtopicdescription   :  'Event Topic',

    neweventprivacy      :  'Listing Privacy',

    neweventprivacydescription :  'Listing Privacy',

    privacyoption0        :  'Public Page',

    privacyoption1       :  'Private Page',

    privacydescription0    :  'List this item in SponzorMe publicy.',

    privacydescription1    :  'Do not list this event publicy.',

    eventsponzors       :  'Sponzors',

    goldSponzor     :  'Gold Sponzor',

    silverSponzor      :  'Silver Sponzor',

    bronzeSponzor       :  'Bronze Sponzor',

    buttonsugestions      :  'Button',

    eventdetails          :  'Event Details',

    submitbutton        :  'Submit',

    deleteEvent         :  'Event Deleted.',

    createEventSuccess   :  'The Event has been created successfuly',

    removeEventSuccess    :  'The Event has been Remove successfuly',

    eventaditionalseetings  :  'Additional Settings',

    choosetype      :  '-- Choose Type --',

    eventprivacy       :  'Privacy',

    eventtype      :  'Type',

    typesponzor      :  'Type of Sponzor',

    quantitysponzor    :  'Quantity Available',

    pricesponzor       :  'Price',

    actionssponzor       :  'Actions',

    editaccountname     :  'Full Name',

    editaccountemail      :  'E-mail',

    editaccountcompany    :  'Company',

    editaccountage       :  'Age',

    editaccountsex      :  'Sex',

    editaccountlocation  :  'Location',

    editaccountdescription   :  'Description',

    editaccount       :  'Edit Account',

    by           :  'By',

    close          :  'Close',

    youfollowing         :  'Your Followed Events',

    yousponzoring        :  'Your Sponsored Events',

    name            :  'Name',

    email          :  'E-mail',

    location         :  'Location',

    eventtitle        :  'Event Title',

    state          :  'State',

    options        :  'Options',

    yousponzring         :  'Events You are Sponzoring',

    title         :  'Title',

    starts       :  'Starts',

    perks          :  'Perks',

    kind           :  'Kind',

    quantity           :  'Quantity',

    usd           :  'USD',

    navigation        :  'Navigation',

    home         :  'Home',

    notification         :  'Notification',

    notifications       :  'Notifications',

    starts           :  'Starts',

    friendemail          : 'Friends Email',

    friendmessage       : 'Message to your friend',

    invitefriendstring       : 'Invite your friend',

    friendemailrequired   : 'Email field is required',

    invitefriendcomplete     :'Your Friend has been invited',

    invitefriendcomplete     :'Your Friend has been invited',

    friendinvitiation      :'Has been invited to know Sponzor.me',

    seemore       : 'See More ...',

    manage          : 'Manage',

    searchtitle        : 'Search for you next event...',

    eventbriteMessage     : 'Connect account with EventBrite',

    eventbriteButton     : 'Connect to Eventbrite!',

    eventbriteButtonUnconnect : 'Unconnect',

    evenbriteNotConnected: "Opss Something was not good, you will be redirected to the Dashboard Page",

    evenbriteConnected: "You are connected successfuly, you will be redirected to the Dashboard Page",

    Import: "Import",

    eventbriteEvents: "List of your Eventbrite Events",

    comunitySize :"Comunity Size",

    meetupMessage :"Connect account with Meetup",

    meetupButton        : 'Connect to Meetup!',

    chooseGroup      : 'Choose group',

    configureMeetupImport  : "Configure your import from Meetup",

    configureEventbriteImport : "Configure your import from eventbrite",

    eventImage:"Image",

    sponzor :"Sponzor",

    errorAddingImage:"You must upload a valid image",

    errorInNewEventFields:"You must complete appropriately all form fields",

    pasteSponzorsForm:"Place this code in your website and let's start!",

    newEventInvalidDates:"Invalid dates for the event",

    eventPendingApprobation :"Waiting for the organizer approbation",

    OrganizerName :"Organizer Name",

    OrganizerEmail :"Organizer Email",

    eventApprobed : "Event Aprobbed",

    newSponzorEmailNotification : "new Sponzor is interested in your Event!",

    sponzorButton       : 'Sponzor!',

    sponzoringKind       : 'Sponzoring Kind',

    description : 'Description',

    contactOrganizer:'Ask to Organizer',

    nextEvent:'Next Event',

    members:'Miembros',

    sponzorButtonNotSponsor:"You need an Sponzor account to Sponzor this event",

    sponzorButtonNotlogin:"Log in to sponzor",

    eventstate0:"Waiting your approbation",

    eventstate1:"Aprobed",

    meetupconnectaccounttest: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    eventbriteconnectaccounttest : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    /*
    |--------------------------------------------------------------------------
    | Task Lists
    |--------------------------------------------------------------------------
    */

    todo:"Task List",

    todoEvent:"Event",

    chooseEvent:"Choose an Event",

    todoPeak:"Type of Sponzor",

    choosepeak:"Choose an Sponzor",

    todoTitle : "Task Title",

    removeTodo : "Task Deleted",

    todoDescription : "Task Description",

    todosList : "Tasks Status",

    todoActions : "Actions",

    todosListSponzor : "My Tasks",

    todoStatus : "Status",

    addTodosListSponzor : "Add Tasks",

    addSponzorTodo : "Add Task",

    taskNoCompleted:"No completed",

    taskCompleted :"Completed",

    errorInFieldsTask:"You must complete all fields",

    taskCreated:"Task created successfuly",

    /*
    |--------------------------------------------------------------------------
    | Messages for pusher notifications
    |--------------------------------------------------------------------------
    */

    NotificationNewSponzorAnEvent: 'You have a new Sponzor for the event <a href="#/sponzors"> :titleEvent </a>',

    NotificationOrganizerSponzorAceptance : 'The organizer has accepted your sponzoring in the event <a href="#/sponzors">:titleEvent</a>',

    OrganizerSponzorAceptanceEmailNotification: 'Your sponzoring by the event :titleEvent has been accepted',

    NotificationOrganizerSponzorDesaceptance:'Your sponzoring by the event <a href="#/sponzors"> :titleEvent </a> has been not accepted',

    OrganizerSponzorDesaceptanceEmailNotification:'Your sponzoring by the event :titleEvent has been not accepted',

    NotificationSponzorDelete:'Your sponzoring by the event :titleEvent has been not accepted and has been removed',

    NotificationOrganizerDelete:'The sponzoring by the event :titleEvent has been removed by the sponzor',

    NotificationSponzorDeleteEmailNotification: 'Your sponzoring by the event :titleEvent has been not accepted and has been removed',

    NotificationOrganizerDeleteEmailNotification:'The sponzoring by the event :titleEvent has been removed by the sponzor',


    /*
  |--------------------------------------------------------------------------
  | Language strings for views
  |--------------------------------------------------------------------------
  */
    subject: 'Welcome to SponzorMe',

    click : 'Click Here',

    invitefriend : 'Hello, <br/> <br/> You are invited to use <a href="http://sponzor.me">SponzorMe</a>.',

    header : '<p dir="ltr"></br>Hi,</br></p><br/><br/><p dir="ltr">My name is Carlos and I’m the founder of SponzorMe. I’m reaching out to say thank you for joining us! This project was born out of a necessity that I had </br>myself every time I would organize an event, and it is a problem that can end with a community and the enthusiasm of its organizers. Please take a moment</br>to read more about what motivates me and the team behind SponzorMe <a href="http://blogen.sponzor.me/">http://blogen.sponzor.me/</a>.</p><br/><p dir="ltr">As you know this is a journey and there are many unknowns so I need your help, any comment, suggestion, trouble or feedback that you have is welcome. I’m here to help.</p><br/><p dir="ltr">You can get in touch with me personally at <a href="mailto:carlos@sponzor.me">carlos@sponzor.me</a></p><br/><p dir="ltr">Please verify your email to get started with the following link:',
    footer : '</p><br/><p dir="ltr">Again, thanks for joining - is great to meet you :)</p><br/><p dir="ltr">All the best,</p><p>Carlos Rojas</p>',

  /*
  |--------------------------------------------------------------------------
  | Group Repositiory Messages
  |--------------------------------------------------------------------------
  */

  created     : "Group Created.",

  loginreq    : "Login field required.",

  userexists  : "User already exists.",

  updated     : "Group has been updated.",

  updateproblem : "There was a problem updating the group.",

  namereq     : "You must provide a group name.",

  groupexists   : "That group already exists.",

  notfound    : "Group not found.",


  /*
  |--------------------------------------------------------------------------
  | Validation Language Lines
  |--------------------------------------------------------------------------
  |
  | The following language lines contain the default error messages used by
  | the validator class. Some of these rules have multiple versions such
  | such as the size rules. Feel free to tweak each of these messages.
  |
  */

  title        : "Login",
  rememberme       : "Rememberme",
  signin       : "Sign Up",
  forgot : "Forgot Password?",


  /*
  |--------------------------------------------------------------------------
  | Language strings for views
  |--------------------------------------------------------------------------
  */

  flashsuccess  : 'Exitoso',

  flasherror  : 'Error',

  flashwarning  : 'Warning',

  flashinfo   : 'FYI',

  register    : 'Sign In',

  login    : "Login",

  logout    : "Logout",

  home      : "Home",

  users    : "Users",

  user      : "User",

  groups    : "Groups",

  helloworld  : "SponzorMe",

  description : "Events, Sponsors, Marketplace",

  loginstatus : "You are currently logged in.",

  sessiondata : "Session Data",

  currentusers  : "Current Users",

  options   : 'Options',

  status    : "Status",

  active    : "Active",

  notactive   : "Not Active",

  suspended   : "Suspended",

  banned    : "Banned",

  actionedit : "Edit",

  actionsuspend : "Suspend",

  actionunsuspend : "Un-Suspend",

  actionban   : "Ban",

  actionunban : "Un-Ban",

  actiondelete : "Delete",

  sponsorreg  : "Sponzor?",

  organizerreg  : "Organizer?",

  copy  : "We connect events with Sponzors",

  nextaction  : "Just upload your event and let the magic begin...",

  testimonialt  : "Testimonials",

  blog  : "Blog",

  blogUrl : "http://blogen.sponzor.me/",

  woman : "Female",

  man : "Male",

  ageiam  : "I am",

  old : "Old",

  chooseSex : "Gender",

  livein  : "I live in",

  country : "Country",

  state : "State",

  city  : "City",

  next  : "Next",

  areyouinterested  : "Are you interested in?",

  weresendingandemail : "We sent an email to",

  toactivateyouraccount : "to activate your account",

  forbidden : "Forbidden",

  aboutyou  : "Tell us about yourself...",

  almostdone  : "Almost Done!",

  dashboard : "Dashboard",

  team  : "Team",

  support : "Support",

  supportUrl  : "http://support.sponzor.me/",

  terms : "Terms of Service",

  privacy : "Privacy",

  location  : "Location",

  getting : "Let's do it",

  error404 :"Ohh.....This is embarrassing but we could not find your request.",

  backhome :"Back to home",

  language:"My Prefer language is: ",

  chooseLang:"Choose language",

  en:"English",

  es:"Spanish",

  pt:"Portuguese",


  /*
  |--------------------------------------------------------------------------
  | Pagination Language Lines
  |--------------------------------------------------------------------------
  |
  | The following language lines are used by the paginator library to build
  | the simple pagination links. You are free to change them to anything
  | you want to customize your views to better match your application.
  |
  */

  previous : '&laquo; Previous',

  next     : 'Next &raquo;',

  /*
  |--------------------------------------------------------------------------
  | User Repositiory Messages
  |--------------------------------------------------------------------------
  */

  headprivacy:  "Privacy Policy",

  head2privacy:  "About SponzorMe:",

  head3privacy:  "Our Policy:",

  head4privacy:  "Consent:",

  head5privacy:  "Information We Collect:",

  head6privacy:  "1. Personal Data:",

  head7privacy:  "2. Non-Personal Data:",

  head8privacy:  "3. Cookies, Pixels Tags, Local Shared Objects, Web Storage and Similar Technologies:",

  head9privacy:  "Our Use of Information That We Collect:",

  head10privacy  :  "1. Personal Data:",

  head11privacy  :  "2. Non-Personal Data:",

  head12privacy:  "Our Disclosure of Information That We Collect:",

  head13privacy  :  "1. Personal Data:",

  head14privacy  :  "2. Non-Personal Data:",

  head15privacy:  "Your Choices:",

  head16privacy  :  "Exclusions:",

  head17privacy  :  "Children:",

  head18privacy:  "Links to Other Web Sites:",

  head19privacy  :  "Storage and Security:",

  head20privacy  :  "International Privacy Laws:",

  head21privacy:  "US-EU & US-Swiss Safe Harbor Programs:",

  head22privacy  :  "Other Terms and Conditions:",

  head23privacy  :  "Changes to This Privacy Policy:",

  head24privacy:  "Access to Information:",

  head25privacy  :  "Retention and Deletion:",

  head26privacy  :  "Contacting SponzorMe:",

  head27privacy:  "Dispute Resolution:",

  text1:  'Welcome to SponzorMe. SponzorMe, Inc. ("SponzorMe", "we", "us" and/or "our") enables people all over the world to plan, promote, and sell tickets to any event. And we make it easy for everyone to discover events, and to share the events they are attending with the people they know. We do this through our websites and domains, the services available on or through our websites and domains or otherwise provided by us, and the software available on or through our websites and domains or otherwise provided by us (including our mobile applications) (collectively, the "Services").',

  text2:  'This Privacy Policy sets forth our policy with respect to information, including personally identifiable information ("Personal Data"), that is collected from users of and/or visitors to the Services (including through those users and visitors agents) ("you" or "your"), including (i) registered users who are event organizers, planners and charitable organizations ("Organizers"), (ii) users who want to purchase tickets to, register for or donate to events (whether free or paid) listed by Organizers on the Services ("Buyers"), and (iii) other non-Organizer users or visitors to the Services ("other non-Organizers").</br>We take the privacy of your Personal Data and other information seriously. Because of that, we have created this Privacy Policy. Please read this Privacy Policy as it includes important information regarding your Personal Data and other information.</br>If you have any questions or concerns, please do not hesitate to contact us by using the following link:https://www.SponzorMe.com/contact-us.',

  text3:  'By using the Services or allowing someone to use the Services on your behalf, you are consenting to our collection, use, disclosure, transfer and storage in accordance with this Privacy Policy of any Personal Data or other information received by us as a result of such use.',
  text4:  'When you interact with us through the Services, we may collect Personal Data and other information from you, as further described below:',
  text5:  'Organizers: We collect Personal Data from you when you voluntarily provide such information to the Services, such as when you register for access to the Services as an Organizer, contact us with inquiries, respond to one of our surveys or use certain Services. The Personal Data we may collect includes without limitation your name, address, email address and other personally identifiable information. In some cases we may collect your credit card information (e.g., your credit card number and expiration date, billing address, etc.), some of which may constitute Personal Data, to secure certain payments. In addition, if you use our payment processing services, we will collect financial information from you (e.g., your bank account information or an address to send checks) as necessary to facilitate payments and information required for tax purposes (e.g., your taxpayer identification number).</br> Buyers and other non-Organizers: We collect Personal Data from you when you voluntarily provide such information to the Services (including event registration pages within the Services), such as when you register for access to the Services (whether as an Organizer or otherwise), register for an event as a Buyer, contact us with inquiries, respond to one of our surveys or use certain parts of the Services. The Personal Data we may collect includes without limitation your name, address, email address, zip code and other personally identifiable information. If you register for a paid event, we will collect financial information from you (e.g., your credit card number and expiration date, billing address, etc.) some of which may constitute Personal Data. In addition, Organizers can set up event registration pages to collect virtually any information from Buyers in connection with registration for an Organizers event listed on the Services. If a Buyer voluntarily provides that information in connection with registration for an event or otherwise, it will be available to us and will be held by us in accordance with this Privacy Policy. In addition, such information will be delivered to the Organizer of the applicable event in accordance with "Our Disclosure of Information That We Collect: Organizers" below.</br>Privacy Policy Links: We make an effort to provide a link to this Privacy Policy in the footer of every page on our websites, including those pages on which Personal Data is collected, and to make it available in all of our software.',
  text6:  'Non-Identifiable Data: When you interact with the Services, we collect certain personally non-identifiable information ("Non-Personal Data"). The Non-Personal Data we collect includes without limitation Internet Protocol (IP) addresses, Internet browser type, other characteristics of your device and software, domain names of your Internet Service Provider, your approximate geographic location, a record of your usage of the Services, the time of your usage and aggregated Personal Data that cannot be used to specifically identify you. Such information, which is collected passively using various technologies, cannot, in and of itself, be used to specifically identify you. We also collect Non-Personal Data (including, without limitation, of the type set forth above) from third parties. The information we collect from third parties may be combined with the information we collect.</br> Aggregated Personal Data: In an ongoing effort to better understand and serve the users of the Services, we often conduct research on our customer demographics, interests and behavior based on Personal Data and other information that we have collected. This research may be compiled and analyzed on an aggregate basis and this aggregate information does not identify you personally and therefore is considered and treated as Non-Personal Data under this Privacy Policy.',

  text7:  'Please refer to our Cookie Policy, which is hereby incorporated by reference into this Privacy Policy, for more information about our use of these technologies.',
  text8:  "We use the Personal Data we collect in a manner that is consistent with this Privacy Policy. We may use the Personal Data as follows:</br>Specific Reason: If you provide Personal Data for a certain reason, we may use the Personal Data in connection with the reason for which it was provided. For instance, if you contact us by e-mail, we will use the Personal Data you provide to answer your question or resolve your problem and will respond to the email address from which the contact came.</br>Access and Use: If you provide Personal Data in order to obtain access to or use of the Services or any functionality thereof, we will use your Personal Data to provide you with access to or use of the Services or functionality and to monitor your use of such Services or functionality. For instance, if you supply payment information (e.g., bank account or credit card information) to the Services for the purpose of purchasing tickets as a Buyer or processing payments as an Organizer, we will use that information to facilitate such purchase or process such payments.</br>Internal Business Purposes: We may use your Personal Data for internal business purposes including without limitation to help us improve the content and functionality of the Services, to better understand our users, to improve the Services, to protect against, identify or address wrongdoing, to enforce our Terms of Service, to manage your account and provide you with customer service, and to generally manage the Services and our business.</br>Marketing: We may use your Personal Data to contact you in the future for our marketing and advertising purposes, including without limitation to inform you about services or events we believe might be of interest to you, to develop promotional or marketing materials and provide those materials to you, and to display content and advertising on or off the Services that we believe might be of relevance to you. In particular, Organizers should note that we may use information we receive or collect regarding Buyers (including without limitation via an Organizer's event registration page) in accordance with the terms of this Privacy Policy, including in the manner set forth above.</br>Organizer Emails: We allow Organizers to use our email system to contact Buyers for their current and past events, so you may receive emails from our system that originate with such Organizers.</br>If we intend to use any Personal Data in any manner that is not consistent with this Privacy Policy, you will be informed of such anticipated use prior to or at the time at which the Personal Data is collected or we will obtain your consent subsequent to such collection but prior to such use.",
  text9:  'Because Non-Personal Data cannot be used to personally identify you, we may use such information for any lawful purpose.',
  text10:  'We are not in the business of selling your Personal Data. We consider this information to be a vital part of our relationship with you. Therefore, we will not sell your Personal Data to third parties, including third party advertisers. There are, however, certain circumstances in which we may disclose, transfer or share your Personal Data with certain third parties without further notice to you, as set forth below:</br>Business Transfers: As we develop our business, we might sell or buy businesses or assets. In the event of a corporate sale, merger, reorganization, dissolution or similar event, Personal Data may be part of the transferred assets. You acknowledge and agree that any successor to or acquirer of SponzorMe (or its assets) will continue to have the right to use your Personal Data and other information in accordance with the terms of this Privacy Policy.</br>Subsidiaries and Affiliates: We may also share your Personal Data with our subsidiaries and/or affiliates for purposes consistent with this Privacy Policy. Our subsidiaries and affiliates will be bound to maintain that Personal Data in accordance with this Privacy Policy.</br>Agents, Consultants and Related Third Parties: We, like many businesses, sometimes engage other companies to perform certain business-related functions. Examples of such functions include mailing information, ticket fulfillment, fraud prevention, maintaining databases and processing payments. When we engage another company to perform such functions, we may provide them with information, including Personal Data, in connection with their performance of such functions.</br>Organizers: When you purchase tickets to, register for or donate to an event or related fundraising page on the Services, you consent to our providing your Personal Data to the Organizers of such event and related fundraising page, if applicable. For fundraising pages we may provide your personal information both to the Organizer charity of the fundraising page and the Organizer of the event to which the fundraising page is linked. These Organizers are not bound to treat your Personal Data in accordance with this Privacy Policy. You agree that we are not responsible for the actions of these Organizers with respect to your Personal Data. It is important that you review the applicable policies of the Organizers of an event (and the related fundraising page, if applicable) before providing Personal Data or other information in connection with that event or related fundraising page.</br>Facebook and Other Third Party Connections: You can connect your SponzorMe account to your accounts on third party services like Facebook, in which case we may collect, use, disclose, transfer and store information relating to your account with such third party services in accordance with this Privacy Policy. For example, if you connect with Facebook, we store your Facebook id, first name, last name, email, location, friends list and profile picture and use them to connect with your Facebook account to provide certain functionality on the Services, like recommending events that your Facebook friends are interested in and sharing the events you are interested in with certain groups of people like your Facebook friends.</br>Legal Requirements: We may disclose your Personal Data if required to do so by law (including, without limitation responding to a subpoena or request from law enforcement, court or government agency) or in the good faith belief that such action is necessary (i) to comply with a legal obligation, (ii) to protect or defend our rights, interests or property or that of third parties, (iii) to prevent, investigate, or identify possible wrongdoing in connection with the Services, (iv) to act in urgent circumstances to protect the personal safety of users of the Services or the public, or (v) to protect against legal liability.',
  text11:  'Because Non-Personal Data cannot be used to personally identify you, we may disclose, transfer or share Non-Personal Data for any lawful purpose.',
  text12:  "You have several choices available when it comes to your Personal Data:</br>Limit the Personal Data You Provide: You can use the Services without providing any Personal Data or with limiting the Personal Data you provide. If you choose not to provide any Personal Data or limit the Personal Data you provide, you may not be able to use certain functionality of the Services. For instance, in order to open an account, or buy or sell tickets, your name and email address will be required.</br>Opt Out: You can 'opt out' of receiving SponzorMe newsletter emails by logging in, clicking on 'Account' and following the instructions to 'email preferences.'' You may modify your choices at any time in your SponzorMe account. In the event an Organizer uses our system to email you, you will be able to 'opt out' of receiving those communications as well. Please note that if you unsubscribe from receiving a particular Organizer's emails, you will no longer receive emails from the particular Organizer that are sent through our system (but you may still receive emails sent by that Organizer through means other than our system), however, you will still receive SponzorMe communications and communications from other Organizers whose events you have attended or are registered to attend or who have otherwise obtained your email address. Likewise, if you unsubscribe from our communications you will continue to receive communications from Organizers. So you may have to unsubscribe from multiple emails before you stop receiving all communications. You can also unsubscribe from receiving all Organizer emails sent through our system. It may take up to 24 hours for us to process an unsubscribe request. Note that you cannot unsubscribe from update communications about the Services. You can stop receiving Service communications only by contacting us at https://www.SponzorMe.com/contact-us and closing your account. By electing to stop receiving all communications from us or through our system you will no longer receive any updates on your account or on events you are registered to attend or have previously attended, including communications regarding refunds. We do not recommend that you do this unless you plan to no longer use the Services, are not currently registered for an event, are not currently organizing an event and will have no need to receive further communications from us or through our system. Even after you opt out of all communications, we will retain your Personal Data and Non-Personal Data in accordance with this Privacy Policy, however, we will no longer use it to contact you. However, Organizers who have received your Personal Data in accordance with this Privacy Policy may still use that Personal Data to contact you in accordance with their own privacy policies, but they may not use our system to do so.</br>Do Not Track: We currently do not participate in any 'Do Not Track' frameworks that would allow us to respond to signals or other mechanisms from you regarding the collection of your Personal Data.",
  text13: 'This Privacy Policy does not apply to any Personal Data collected by us other than Personal Data collected through the Services. This Privacy Policy shall not apply to any unsolicited information you provide to us or another user or visitor through the Services or through any other means. This includes, but is not limited to, information posted to any public areas of the Services, such as bulletin boards, any ideas for new products or modifications to existing products, claim or demand letters, Digital Millennium Copyright Act notices, and other unsolicited submissions (collectively, "Unsolicited Information"). All Unsolicited Information shall be deemed to be non-confidential and we shall be free to reproduce, use, disclose, distribute and exploit such Unsolicited Information without limitation or attribution.',
  text14: "We do not knowingly collect Personal Data from children under the age of 13. If you are under the age of 13, please do not submit any Personal Data through the Services. We encourage parents and legal guardians to monitor their children's Internet usage and to help enforce our Privacy Policy by instructing their children never to provide Personal Data through the Services without their permission. If you have reason to believe that a child under the age of 13 has provided Personal Data to us through the Services, please contact us, and we will endeavor to delete that information from our databases.",
  text15: 'This Privacy Policy applies only to the Services. The Services may contain links to other websites not operated or controlled by us (the "Third Party Sites"). The policies and procedures we described here do not apply to the Third Party Sites. The links from the Services do not imply that we endorse or have reviewed the Third Party Sites. We suggest contacting those sites directly for information on their privacy policies.',
  text16: 'We may store Personal Data itself or such information may be included in databases owned and maintained by our affiliates, agents or service providers. We take what we believe to be reasonable steps to protect the Personal Data provided via the Services from loss, misuse, unauthorized access, inadvertent disclosure, alteration, and destruction. However, no Internet or e-mail transmission is ever fully secure or error free. In particular, e-mail sent to or from the Services may not be secure. Therefore, you should take special care in deciding what information you send to us via e-mail. Please keep this in mind when disclosing any Personal Data via the Internet.',
  text17: 'If you are visiting our website or using one of our software applications from outside the United States, please be aware that you are sending information (including Personal Data) to the United States where our servers are located. We will hold and process your Personal Data and Non-Personal Data in accordance with privacy laws in the United States and this Privacy Policy. Please note that privacy laws in the United States may not be the same as, and in some cases may be less protective than, the privacy laws in your country.',
  text18: "We participate in the US-EU & US-Swiss Safe Harbor Frameworks covering the collection, use and retention of personal information gathered in the European Union member countries and Switzerland. Our participation means that we self certify that we adhere to the Safe Harbor principles of notice, choice, onward transfer, security, integrity, access and enforcement with respect to such personal information. For more information about these frameworks and our participation in them, please visit the US Department of Commerce's Safe Harbor website. If you have any questions about our participation, please contact our SponzorMe Safe Harbor Privacy Contact at SponzorMe, Inc., Attn: Privacy Officer, 2081 Center Street, Berkeley, CA 94704, USA, or by email to privacy@SponzorMe.com.",
  text19: 'Your access to and use of the Services is subject to the Terms of Service. If you are using the SponzorMe application programming interfaces (the "SponzorMe APIs"), you are subject to the SponzorMe API Terms of Use.',
  text20: 'The Services and our business may change from time to time. As a result, at times it may be necessary for us to make changes to this Privacy Policy. We reserve the right, in our sole discretion, to update or modify this Privacy Policy at any time (collectively, "Modifications"). Modifications to this Privacy Policy will be posted to the SponzorMe website with a change to the "Last Updated" date at the top of this Privacy Policy. In certain circumstances SponzorMe may, but need not, provide you with additional notice of such Modifications, such as via email or with in-Service notifications. Modifications will be effective 30 days following the "Last Updated" date or such other date as communicated in any other notice to you. Please review this policy periodically, and especially before you provide any Personal Data. This Privacy Policy was last updated on the date indicated above. Your continued use of the Services following the effectiveness of any Modifications to this Privacy Policy constitutes acceptance of those Modifications. If any Modification to this Privacy Policy is not acceptable to you, your sole remedy is to cease accessing, browsing and otherwise using the Services.',
  text21: 'Organizers may access and update their Personal Data being stored by us by logging in and visiting the My Account page. Organizers may also contact us directly at the address specified below with respect to Personal Data that is not accessible through the My Account page. Buyers and other non-Organizers do not have a formal account with SponzorMe, however, you can create a formal account by signing up. After signing up, you can update and access your Personal Data on the My Account page. Buyers and other non-Organizers can also contact us directly with requests to update Personal Data at the address specified below. We will take reasonable steps to respond to requests relating to Personal Data within 30 days, however, we may reject requests that we find to be unreasonable (i.e., require disproportionate efforts or material changes to our information systems), impractical or abusive (i.e., repetitive requests, requests made in bad faith, requests that would compromise third party information). Note that you may not have access to or the ability to update Non-Personal Data, much of which is held in aggregate form.',
  text22: 'We may retain your Personal Data as long as you continue to use the Services. You may close your account by contacting us. However, we may retain Personal Data and Non-Personal Data for an additional period as is permitted or required under applicable laws. Even if we delete your Personal Data it may persist on backup or archival media and other information systems.',
  text23: 'Please also feel free to contact us if you have any questions about this Privacy Policy or our information practices. You may contact us by writing to http://www.SponzorMe.com/contact-us or by calling us at 5104176510.',
  text24: "If you have a complaint about SponzorMe's privacy practices you should write to us at SponzorMe, Inc., Attn: Privacy Officer, 155 5th St, 7th Floor, San Francisco, CA 94103, USA, or by email to privacy@SponzorMe.com. We will take reasonable steps to work with you to attempt to resolve your complaint. As part of our participation in the US-EU & US-Swiss Safe Harbor Frameworks, SponzorMe has appointed TRUSTe as its exclusive dispute resolution mechanism for all Safe Harbor Framework related complaints. You may raise such a complaint with TRUSTe by Internet here or by fax to 415-520-3420 or by mail to the TRUSTe Safe Harbor Compliance Department at the address listed here, but in each case only after first contacting our Privacy Officer with your complaint and allowing us a reasonable amount of time to address your complaint. If you are faxing or mailing TRUSTe to lodge a complaint, you must include the following information: the name of the company, the alleged privacy violation, your contact information, and whether you would like the particulars of your complaint shared with the company. For information about TRUSTe or the operation of TRUSTe's dispute resolution process, click here or request this information from TRUSTe at any of the addresses listed above. The TRUSTe dispute resolution process will be conducted in English.",


  /*
  |--------------------------------------------------------------------------
  | Session Repository Messages
  |--------------------------------------------------------------------------
  */

  invalid   : "Invalid username or password.",

  notactive :  "You have not yet activated this account. <a href=':url' class='alert-link'>Resend Activation Email?</a>",

  suspended : "Your account has been temporarily suspended.",

  banned  : "You have been banned.",

  /*
  |--------------------------------------------------------------------------
  | Language strings for views
  |--------------------------------------------------------------------------
  */
  eventbrite_msg: 'Please connect your Eventbrite account',

  meetup_msg: 'Please connect your Meetup account',


  /*
  |--------------------------------------------------------------------------
  | Validation Language Lines
  |--------------------------------------------------------------------------
  |
  | The following language lines contain the default error messages used by
  | the validator class. Some of these rules have multiple versions such
  | such as the size rules. Feel free to tweak each of these messages.
  |
  */

  title         : "Register",
  rememberme       : "Rememberme",
  signin       : "Sign Up",
  forgot : "Forgot Password?",


  /*
  |--------------------------------------------------------------------------
  | Validation Attributes
  |--------------------------------------------------------------------------
  |
  | The following language lines are used to swap attribute place-holders
  | with something more reader friendly such as "E-Mail Address" instead
  | of "email". Your users will thank you.
  |
  | The Validator class will automatically search this array of lines it
  | is attempting to replace the :attribute place-holder in messages.
  | It's pretty slick. We think you'll like it.
  |
  */

  //attributes : {},
  attributes_username : 'User',
  attributes_password : 'Password',
  attributes_confirmpassword : 'Confirm password',



  /*
  |--------------------------------------------------------------------------
  | User Repositiory Messages
  |--------------------------------------------------------------------------
  */

  testimonial1    :  "SponzorMe is a tool that should have been built long ago...",

  testimonial2   :  "We needed this tool for every event becoming easier and rewarding...",

  testimonial3    :  "Thanks to SponzorMe I can focus on creating better content for my community...",
/*
  |--------------------------------------------------------------------------
  | User Repositiory Messages
  |--------------------------------------------------------------------------
  */

  created     :  "Your account has been created. Check your email for the confirmation link.",

  loginreq    :  "Login field required.",

  exists    :  "User already exists.",

  notfound    :  "User not found",

  noaccess    :  "You are not allowed to do that.",

  updated   :  "Profile updated",

  notupdated  :  "Unable to update profile",

  activated   :  "Activation complete. <a href=':url' class='alert-link'>You may now login</a>",

  notactivated  :  "Activation could not be completed.",

  alreadyactive :  "That account has already been activated.",

  emailconfirm  :  "Check your email for the confirmation link.",

  emailinfo   :  "Check your email for instructions.",

  emailpassword :  "Your password has been changed. Check your email for the new password.",

  problem   :  "There was a problem. Please contact the system administrator.",

  passwordchg :  "Your password has been changed.",

  passwordprob  :  "Your password could not be changed.",

  oldpassword :  "You did not provide the correct original password.",

  suspended   :  "User has been suspended for :minutes minutes.",

  unsuspended :  "Suspension removed.",

  banned    :  "User has been banned.",

  unbanned    :  "User has been unbanned.",


  /*
  |--------------------------------------------------------------------------
  | Validation Language Lines
  |--------------------------------------------------------------------------
  |
  | The following language lines contain the default error messages used by
  | the validator class. Some of these rules have multiple versions such
  | such as the size rules. Feel free to tweak each of these messages.
  |
  */

  accepted: "The :attribute must be accepted.",
  active_url: "The :attribute is not a valid URL.",
  after: "The :attribute must be a date after :date.",
  alpha: "The :attribute may only contain letters.",
  alpha_dash: "The :attribute may only contain letters, numbers, and dashes.",
  alpha_num: "The :attribute may only contain letters and numbers.",
  before: "The :attribute must be a date before :date.",
  //between: {}
    between_numeric : "The :attribute must be between :min - :max.",
    between_file    : "The :attribute must be between :min - :max kilobytes.",
    between_string  : "The :attribute must be between :min - :max characters.",

  confirmed        : "The :attribute confirmation does not match.",
  date             : "The :attribute is not a valid date.",
  date_format      : "The :attribute does not match the format :format.",
  different        : "The :attribute and :other must be different.",
  digits           : "The :attribute must be :digits digits.",
  digits_between   : "The :attribute must be between :min and :max digits.",
  emailerror            : "The :attribute format is invalid.",
  exists           : "The selected :attribute is invalid.",
  image            : "The :attribute must be an image.",
  In               : "The selected :attribute is invalid.",
  integer          : "The :attribute must be an integer.",
  ip               : "The :attribute must be a valid IP address.",
  //max              : {},
    max_numeric : "The :attribute may not be greater than :max.",
    max_file    : "The :attribute may not be greater than :max kilobytes.",
    max_string  : "The :attribute may not be greater than :max characters.",

  mimes            : "The :attribute must be a file of type: :values.",
  //min              : {},
    min_numeric : "The :attribute must be at least :min.",
    min_file    : "The :attribute must be at least :min kilobytes.",
    min_string  : "The :attribute must be at least :min characters.",

  not_in           : "The selected :attribute is invalid.",
  numeric          : "The :attribute must be a number.",
  regex            : "The :attribute format is invalid.",
  required        : "The :attribute field is required.",
  required_with    : "The :attribute field is required when :values is present.",
  required_without : "The :attribute field is required when :values is not present.",
  same             : "The :attribute and :other must match.",
  //size             : {},
    size_numeric : "The :attribute must be :size.",
    size_file    : "The :attribute must be :size kilobytes.",
    size_string  : "The :attribute must be :size characters.",

  unique           : "The :attribute has already been taken.",
  url              : "The :attribute format is invalid.",

  /*
  |--------------------------------------------------------------------------
  | Custom Validation Language Lines
  |--------------------------------------------------------------------------
  |
  | Here you may specify custom validation messages for attributes using the
  | convention "attribute.rule" to name the lines. This makes it quick to
  | specify a specific custom language line for a given attribute rule.
  |
  */

  'custom' : {},

  /*
  |--------------------------------------------------------------------------
  | Custom Validation Attributes
  |--------------------------------------------------------------------------
  |
  | The following language lines are used to swap attribute place-holders
  | with something more reader friendly such as E-Mail Address instead
  | of "email". This simply helps us make messages a little cleaner.
  |
  */

  'attributes' : {},

  /*
  |--------------------------------------------------------------------------
  | Language strings for widgets
  |--------------------------------------------------------------------------
  */

  sponzorname:'Sponsor Name',

  sponzornameplaceholder:'YourCompany Inc.',

  contactsname:'Contact\'s Name',

  contactsnameplaceholder:'Alexander the Sponsor',

  contactsemail:'Contact\'s Email',

  contactsemailplacelhoder:'you@YourCompany.com',

  phonenumber:'Phone Number',

  phonenumberplceholder:'(650) 555-0123',

  whichlevelsponzor:'Wich level of Sponsorship would you like to participate in?',

  whichlevelsponzorplaceholder:'Contacts Name',

  submitbutton:'Submit',

  price:'Price',

  signupform:'Sign Up Form',

  details:"Sponsorship details",

  nosponzoremail:"We Sorry, the entered email is not a valid sponzor email.",

  sponzoringsaveandemailsent:"Your sponzorchip request has been sent please check your email to further instructions",

  validationRules:"Please complete all field form",

  /*
  |--------------------------------------------------------------------------
  | User Repositiory Messages
  |--------------------------------------------------------------------------
  */

  testimonial1    :  "SponzorMe is a tool that should have been built long ago...",

  testimonial2    :  "We needed this tool for every event becoming easier and rewarding...",

  testimonial3    :  "Thanks to SponzorMe I can focus on creating better content for my community...",


  });

  $translateProvider.translations('pt', {

      /*
    |--------------------------------------------------------------------------
    | Language strings for views
    |--------------------------------------------------------------------------
    */
    dashboard           : 'Dashboard',

    events            : 'Eventos',

    settings            : 'Configuração',

    sponzors            : 'Sponzors',

    account           : 'Conta',

    addevent            : 'Adicionar Evento',

    seesponzors         : 'Ver Sponzors',

    sponzoring          : 'Sponzoring',

    following           : 'Seguinte',

    logout            : 'Sair',

    about             : 'Sobre o que',

    support           : 'Apoio',

    blog              : 'Blog',

    balance           : 'Saldo',

    comunity            : 'Comunidade',

    peak              : 'Beneficios',

    yourevents          : 'Seus Eventos',

    suggestions         : 'Sugestões',

    latestsponzors        : 'Últimas Sponsors',

    neweventtitle         :  'Tìtulo',

    neweventtitledescription    :  'Dê um nome distinto',

    neweventdescription     :  'Descrição',

    neweventdescriptiondescription:  'Diga às pessoas o quão especial o seu evento',

    neweventlocation        :  'Localização',

    neweventlocationdescription :  'Especifica onde está a questão',

    neweventorganizer       :  'Nome Organizer',

    neweventorganizerdescription  :  'Quem é o organizador',

    neweventstarts        :  'Inicia',

    neweventstartsdescription   :  'A ação começa',

    neweventends          :  'Termina',

    neweventendsdescription   :  'As extremidades de ação!',

    neweventtype          :  'Tipo de evento',

    neweventtypedescription   :  'Tipo de evento',

    neweventtopic         :  'Tema do evento',

    neweventtopicdescription    :  'Tema do evento',

    neweventprivacy       :  'Lista de Privacidade',

    neweventprivacydescription  :  'Lista de Privacidade',

    privacyoption0        :  'Página Pública',

    privacyoption1        :  'Site privado',

    privacydescription0     :  'Lista em SponzorMe e Search Engines',

    privacydescription1     :  'Nenhuma lista evento público',

    eventsponzors         :  'Sponsors',

    goldSponzor         :  'Patrocinador Ouro',

    silverSponzor         :  'Patrocinador Prata',

    bronzeSponzor         :  'Bronze Sponsor',

    buttonsugestions        :  'Botão',

    eventdetails          :  'Detalhes do Evento',

    submitbutton          :  'Enviar',

    deleteEvent           :  'Evento excluído',

    createEventSuccess      :  'O evento foi criado com sucesso',

    removeEventSuccess      :  'O evento foi removido com sucesso',

    eventaditionalseetings    :  'Configurações adicionais',

    choosetype          :  '-- Escolha o tipo de --',

    eventprivacy          :  'Tipo',

    eventtype           :  'Privacidade',

    typesponzor         :  'Tipo de patrocinador',

    quantitysponzor       :  'Quantidade disponível',

    pricesponzor          :  'Preço',

    actionssponzor        :  'Ações',

    editaccountname       :  'Nome completo',

    editaccountemail        :  'E-mail',

    editaccountcompany      :  'Negócio',

    editaccountage        :  'Idade',

    editaccountsex        :  'Sexo',

    editaccountlocation     :  'Localização',

    editaccountdescription    :  'Descrição',

    editaccount         :  'Editar Conta',

    by              :  'Por',

    close             :  'Desligar',

    youfollowing          :  'Seus Eventos Seguido',

    yousponzoring         :  'Seus Eventos Patrocinados',

    name              :  'Nome',

    email             :  'E-mail',

    location            :  'Localização',

    eventtitle          :  'Título do Evento',

    state             :  'Estado',

    options           :  'Opções',

    yousponzring          :  'Eventos que você está patrocinando',

    title             :  'Título',

    title             :  'Inicia',

    perks             :  'Benefícios',

    kind              :  'Tipo',

    quantity            :  'Quantidade',

    usd             :  'USD',

    navigation          :  'Navegação',

    home              :  'Iniciação',

    notification          :  'Notificação',

    notifications         :  'Notificações',

    starts            :  'Inicia',

    friendemail           : 'E-mail do seu amigo',

    friendmessage         : 'Mensagem para seu amigo',

    invitefriendstring          : 'Convide seu amigo',

    seemore           : 'Veja mais ...',

    manage            : 'Gerir',

    searchtitle         : 'Procure o seu próximo evento ...',

    eventbriteMessage       : 'Conecte-se com a sua conta Eventbrite',

    eventbriteButton        : 'Conectar !',

    eventbriteButtonUnconnect   : 'Sair =(',

    evenbriteNotConnected     : "Opss, ",

    evenbriteConnected      : "Temos conectado com sucesso contas, algo deu errado. Você será redirecionado para a página inicial.",

    Import            : "Importação",

    eventbriteEvents        : "Liste seus eventos Eventbrite",

    configureImport       : "Configure sua importação a partir de Eventbrite",

    comunitySize :"Tamanho da sua comunidade",

    meetupMessage :"Conecte sua conta com Meetup",

    meetupButton        : 'Conecte-se com Meetup!',

    /*
    |--------------------------------------------------------------------------
    | Task Lists
    |--------------------------------------------------------------------------
    */

    todo:"Listas de tarefas",

    todoEvent:"Evento",

    chooseEvent:"Escolha um Evento",

    todoPeak:"Tipo de Patrocínio",

    choosepeak:"Escolha um Patrocinador",

    removeTodo : "tarefa excluído",

    todoTitle : "Título da tarefa",

    todoDescription : "Descrição da tarefa",

    todosList : "O status da tarefa",

    todoActions : "Ações",

    todosListSponzor : "Minhas tarefas",

    todoStatus : "Estado",

    addTodosListSponzor : "AAdicionar tarefas",

    addSponzorTodo : "Adicionar tarefa",


    /*
    |--------------------------------------------------------------------------
    | Language strings for views
    |--------------------------------------------------------------------------
    */

    subject                      : 'Bem-vindo ao SponzorMe',


    click                        : 'Clique Aqui',

    invitefriend                 : 'Olá, <br/><br/> Você está convidado a usar <a href="http://sponzor.me">SponzorMe</a>.',

    header                       : '<p dir="ltr">Olá,</p><br/><p dir="ltr">Meu nome é Carlos e eu sou o fundador da SponzorMe. Eu só queria entrar em contato com você e dizer obrigado por se juntar! </br>Eu queria dizer que este projeto nasceu de uma necessidade que eu tinha sempre que organizar um evento e é um problema que muitas </br> vezes acaba com as comunidades e com o entusiasmo de seus organizadores. Se você tiver tempo eu convido você a ler a nossa entrada, </br> onde você pode ver o que motiva a equipe SponzorMe (<a href="http://blogpt.sponzor.me/">http://blogpt.sponzor.me/</a> )</p><p dir="ltr">Como você sabe que esta é uma jornada e sabemos que a maioria das coisas, é por isso que vamos precisar da sua ajuda. </br> Quaisquer comentários, preocupações, problemas, sugestões. Estou disponível para ouvir.</p><br/><p dir="ltr">Meu e-mail é: <a href="mailto:carlos@sponzor.me">carlos@sponzor.me</a></p><br/><p dir="ltr">Para começar você deve confirmar seu e-mail no seguinte link:</p><br/><p dir="ltr">',
    footer: '</p><br/><p dir="ltr">Mais uma vez obrigado por se juntar - É muito bom conhecê-lo :)</p><br/><p dir="ltr">Um abraço,,</p><p>Carlos Rojas</p>',


  /*
  |--------------------------------------------------------------------------
  | Validation Attributes
  |--------------------------------------------------------------------------
  |
  | The following language lines are used to swap attribute place-holders
  | with something more reader friendly such as "E-Mail Address" instead
  | of "email". Your users will thank you.
  |
  | The Validator class will automatically search this array of lines it
  | is attempting to replace the :attribute place-holder in messages.
  | It's pretty slick. We think you'll like it.
  |
  */

  //attributes : {},
  attributes_username : 'Usuário',
  attributes_password : 'Senha',
  attributes_confirmpassword : 'Confirme sua senha',



    /*
  |--------------------------------------------------------------------------
  | User Repositiory Messages
  |--------------------------------------------------------------------------
  */

  testimonial1    :  "SponzorMe é uma ferramenta que deve ter construído há muito tempo...",

  testimonial2    :  "Precisávamos essa ferramenta para todos os eventos cada vez mais fácil e gratificante...",

  testimonial3    :  "Graças a SponzorMe eu posso me concentrar na criação de mais conteúdo para minha comunidade...",



  });
  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy(null);

});


/**
 * Route configuration for the Dashboard module.
 */
sponzorme.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/');

    // Application routes
    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'views/home.blade.html',
            controller: 'HomeController'
        })
        .state('events', {
            url: '/events',
            templateUrl: 'events.html',
            controller: 'eventsController'
        })
        .state('sponzors', {
            url: '/sponzors',
            templateUrl: 'sponzors.html'

        })
        .state('settings', {
            url: '/settings',
            templateUrl: 'settings.html',
            controller: 'settingsController'
        })
        .state('sponzoring', {
            url: '/sponzoring',
            templateUrl: 'sponzoring.html'
        })
        .state('following', {
            url: '/following',
            templateUrl: 'following.html'
        })
        .state('friend', {
            url: '/friend',
            templateUrl: 'friend.html'
        })
        .state('eventbrite', {
            url: '/eventbrite',
            templateUrl: 'eventbrite.html'
        })
        .state('todo', {
            url: '/todo',
            templateUrl: 'todo.html'
        })
        .state('privacy', {
            url: '/privacy',
            templateUrl: 'views/privacy.blade.html',
            controller: 'HomeController'
        })
        .state('testimonials', {
            url: '/testimonials',
            templateUrl: 'views/testimonials.blade.html',
            controller: 'HomeController'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/sessions/login.blade.html',
            controller: 'LoginController'
        })
        .state('sponzorscreate', {
            url: '/sponsors/create',
            templateUrl: 'views/sponsors/create.blade.html',
            controller: 'SponzorsCreateController'
        })
        .state('userscreate', {
            url: '/users/create',
            templateUrl: 'views/users/create.blade.html',
            controller: 'UsersCreateController'
        })

        .state('usersprincipal', {
            url: '/users/dashboard',
            templateUrl: 'views/users/dashboard/main.blade.html',
            controller: 'UsersPrincipalController'
        })

        .state('usersmenu', {
            url: '/users/menu',
            templateUrl: 'views/users/dashboard/menu.blade.html',
            controller: 'UsersMenuController'
        })

        .state('usersevent', {
            url: '/users/events',
            templateUrl: 'views/users/dashboard/events.blade.html',
            controller: 'UsersEventsController'
        })

        .state('userssponzoring', {
            url: '/users/sponzors',
            templateUrl: 'views/users/dashboard/sponzors.blade.html',
            controller: 'UsersSponzorsController'
        })

        .state('userstasklist', {
            url: '/users/todo',
            templateUrl: 'views/users/dashboard/todo.blade.html',
            controller: 'UsersTodoController'
        })

        .state('usersfriend', {
            url: '/users/friend',
            templateUrl: 'views/users/dashboard/friend.blade.html',
            controller: 'UsersFriendController'
        })

        .state('userssettings', {
            url: '/users/settings',
            templateUrl: 'views/users/dashboard/settings.blade.html',
            controller: 'UsersSettingsController'
        })

        .state('sponsorsprincipal', {
            url: '/sponsors/dashboard',
            templateUrl: 'views/sponsors/dashboard/main.blade.html',
            controller: 'SponsorsMainController'
        })

        .state('sponsorsfollowing', {
            url: '/sponsors/following',
            templateUrl: 'views/sponsors/dashboard/events.blade.html',
            controller: 'SponsorsMainController'
        })

        .state('sponsorssponzoring', {
            url: '/sponsors/sponzoring',
            templateUrl: 'views/sponsors/dashboard/sponzors.blade.html',
            controller: 'SponsorsSponzoringController'
        })

        .state('sponsorssettings', {
            url: '/sponsors/settings',
            templateUrl: 'views/sponsors/dashboard/settings.blade.html',
            controller: 'SponsorsSettingsController'
        })

        .state('sponsorsfriend', {
            url: '/sponsors/friend',
            templateUrl: 'views/sponsors/dashboard/friend.blade.html',
            controller: 'SponsorsFriendController'
        })
}]);

sponzorme.controller('setlogin', ['$cookies', function($cookies) {
  // Retrieving a cookie
  var cookiesponzorme = $cookies.cookiesponzorme;

  var hoy = new Date();
  var string = hoy.getDate() + (hoy.getMonth() + 1) + hoy.getFullYear() + Math.random();
  // Setting a cookie
 $cookies.cookiesponzorme = string;
}]);


sponzorme.controller('HomeController', function ($scope, $translate, $cookies) {

  var cookieini = $cookies.cookiesponzorme;

  if(isNaN(cookieini)){
     $scope.vieuser = 1;
  }else{
     $scope.vieuser = 0;
  }

  $scope.typeuser = 1;

  $scope.userfroups = 0;

  $scope.changeLanguage = function (key) {
    console.log(key);
    $translate.use(key);
    idiomaselect = key;
  };
});


sponzorme.controller('LoginController', function ($scope, $translate, $cookies) {

  var cookieini = $cookies.cookiesponzorme;

  if(isNaN(cookieini)){
     $scope.vieuser = 1;
  }else{
     $scope.vieuser = 0;
  }

  $scope.typeuser = 1;

  $scope.userfroups = 0;

  $scope.changeLanguage = function (key) {
    console.log(key);
    $translate.use(key);
    idiomaselect = key;
  };
});

sponzorme.controller('SponzorsCreateController', function ($scope, $translate, $cookies) {

  var cookieini = $cookies.cookiesponzorme;

  if(isNaN(cookieini)){
     $scope.vieuser = 1;
  }else{
     $scope.vieuser = 0;
  }

  $scope.typeuser = 1;

  $scope.userfroups = 0;

  $scope.changeLanguage = function (key) {
    console.log(key);
    $translate.use(key);
    idiomaselect = key;
  };
});


sponzorme.controller('UsersCreateController', function ($scope, $translate, $cookies) {

  var cookieini = $cookies.cookiesponzorme;

  if(isNaN(cookieini)){
     $scope.vieuser = 1;
  }else{
     $scope.vieuser = 0;
  }

  $scope.typeuser = 1;

  $scope.userfroups = 0;

  $scope.changeLanguage = function (key) {
    console.log(key);
    $translate.use(key);
    idiomaselect = key;
  };
});


sponzorme.controller('UsersPrincipalController', function ($scope, $translate, $cookies) {

  var cookieini = $cookies.cookiesponzorme;

  if(isNaN(cookieini)){
     $scope.vieuser = 1;
  }else{
     $scope.vieuser = 0;
  }

  $scope.typeuser = 1;

  $scope.userfroups = 0;

  $translate.use(idiomaselect);

  $scope.menuprincipal = 'views/users/menu.blade.html';
});


sponzorme.controller('UsersMenuController', function ($scope, $translate, $cookies) {

  var cookieini = $cookies.cookiesponzorme;

  if(isNaN(cookieini)){
     $scope.vieuser = 1;
  }else{
     $scope.vieuser = 0;
  }

  $scope.typeuser = 1;

  $scope.userfroups = 0;

  console.log(idiomaselect);

  $translate.use(idiomaselect);
});


/**
* Indicadores Controller
**/

sponzorme.controller('indicatorsController', ['$scope', '$cookies', 'Customization',indicatorsController]);
function indicatorsController($scope,$cookies,Customization){
    $scope.eventos = {};
    $scope.eventos.size = "";
    $scope.eventos.list = "";
    $scope.event.current = "";

    $scope.sponzors = "";
    $scope.sponzors.size = "";

    $scope.users = {};
    $scope.users.size = "";

    Customization.getEventsByOrganizer($scope.event.organizer).success(function(adata)
    {
        $scope.eventos.size = adata.Events.length;
        $scope.eventos.list = adata.Events;
        $scope.event.current = adata.Events[0].id;
    });
    Customization.getSponzorsByOrganizer($scope.event.organizer).success(function(adata)
    {
        $scope.sponzors.size = adata.Sponzors.length;
        var balance=0;
        for(i=0;i<adata.Sponzors.length;i++)
        {
            if(adata.Sponzors[i].eventstate==1)
            {
                balance=balance+adata.Sponzors[i].usd;
            }
        }
        $scope.sponzors.balance = balance;
    });
    Customization.countAllUsers().success(function(adata)
    {
        $scope.users.size=adata.size+1000;
    });
}


/**
 * Events Controller
 */
sponzorme.controller('eventsController', ['$scope', '$filter','$cookies', 'Customization','ngDialog', 'FileUploader', eventsController]);
function eventsController($scope,$filter,$cookies,Customization,ngDialog,FileUploader){
    if(window.location.hash=="#/events")
    {
       Customization.getEventsByOrganizer($scope.event.organizer).success(function(adata)
        {
            $scope.eventos.list = adata.Events;
            $scope.event.current = adata.Events[0].id;
        });
        Customization.getCategories1().success(function(adata)
        {
            $scope.categorias.list = adata;
        });
    }

    $scope.addsponzor = function () {
        $scope.sponzors.push({
            kind: "",
            usd: 0,
            quantity: 1
        });
    }
    $scope.removeSponzor = function(index){
        $scope.sponzors.splice(index, 1);
    }
    $scope.removeEvent = function(index){
        ngDialog.open({ template: 'loading.html', controller: 'eventsController', scope: $scope });//Mostramos el Loading
        Customization.removeEvent(index)
        .success(function(data){
            $scope.alerts.push({msg: data.message});
            Customization.getEventsByOrganizer($scope.event.organizer).success(function(adata)
            {
                $scope.eventos.list = adata.Events;
                $scope.event.current = adata.Events[0].id;
            });
            ngDialog.close();//Cerraos el loading
            $scope.message="removeEvent";
            ngDialog.open({ template: 'generalMessage.html', controller: 'eventsController', scope: $scope });
        })
        .error(function(data) {
            console.log(data);
        });
    }

    $scope.imageEvent = function(eventId)
    {
        $scope.currentImage=eventId;
        ngDialog.open({ template: 'generalImage.html', controller: 'eventsController', scope: $scope });
    }
    $scope.seeEvent = function(e)
    {
        $scope.seeEventData=e;
        ngDialog.open({ template: 'seeEvent.html', controller: 'eventsController', scope: $scope });
    }
    $scope.path = function()
    {
        var newURL = window.location.host + "/" + window.location.pathname;
        var pathArray = newURL.split( '/' );
        var newPathname = "";
        for (i = 0; i < pathArray.length-2; i++) {
            if(pathArray[i]!="")
                newPathname += pathArray[i]+"/";
        }
        newPathname=window.location.protocol + "//"+ newPathname;
        var path = newPathname;
        return path;
    }
    $scope.codeWidget = function (eventId)
    {
        $scope.eventId=eventId;
        ngDialog.open({ template: 'codeWidget.html', controller: 'eventsController', scope: $scope });
    }
    $scope.newEvent = function(){
        $scope.newevent.peaks =  $scope.sponzors;
        $scope.newevent.location_reference=$scope.details3.reference;
        if($scope.imageReady)
        {
            ngDialog.open({ template: 'loading.html', controller: 'emptyController', scope: $scope });//Mostramos el Loading
            $scope.newevent.starts=$filter('date')($scope.newevent.starts, "yyyy-MM-dd HH:mm:00");
            $scope.newevent.ends=$filter('date')($scope.newevent.ends, "yyyy-MM-dd HH:mm:00");
            var message = "";
            Customization.saveEvent($scope.newevent)
                .success(function(data) {
                    if(data.success)
                    {
                        path=$scope.path();
                        uploader.queue[0].url=path+'api/v1/event/upload/image/'+data.evento_id;
                        uploader.uploadAll(); //Subo la imagen

                        $scope.alerts = [{type: 'success', msg: data.message}];
                        Customization.getEventsByOrganizer($scope.event.organizer).success(function(adata)
                        {
                            $scope.eventos.list = adata.Events;
                            $scope.event.current = adata.Events[0].id;
                            $scope.event.message=data.message;
                        });
                        $(".form-group").removeClass("has-error");
                        $(".form-group").removeClass("has-success");
                        $scope.newevent={"organizer":$scope.event.organizer}; //Limpiamos el evento
                        $scope.sponzors = []; //Limpiamos los sponzors
                        $scope.imageReady=false;

                    }
                    else
                    {
                        message = String(data.message);
                        message = message.replace("[","").replace("]","").replace(/,/g," ");
                        $scope.alerts.push({msg: unescape(message)});
                        if(angular.isUndefined($scope.newevent.title)){
                            $("#title").removeClass("has-success");
                            $("#title").addClass("has-error");
                        }
                        else
                        {
                            $("#title").removeClass("has-error");
                            $("#title").addClass("has-success");
                        }
                        if(angular.isUndefined($scope.newevent.location)){
                            $("#location").removeClass("has-success");
                            $("#location").addClass("has-error");
                        }
                        else{
                            $("#location").removeClass("has-error");
                            $("#location").addClass("has-success");
                        }
                        if(angular.isUndefined($scope.newevent.description)){
                            $("#description").removeClass("has-success");
                            $("#description").addClass("has-error");
                        }
                        else{
                            $("#description").removeClass("has-error");
                            $("#description").addClass("has-success");
                        }
                        if(angular.isUndefined($scope.newevent.starts)){
                            $("#starts").removeClass("has-success");
                            $("#starts").addClass("has-error");
                        }
                        else{
                            $("#starts").removeClass("has-error");
                            $("#starts").addClass("has-success");
                        }
                        if(angular.isUndefined($scope.newevent.ends)){
                            $("#ends").removeClass("has-success");
                            $("#ends").addClass("has-error");
                        }
                        else{
                            $("#ends").removeClass("has-error");
                            $("#ends").addClass("has-success");
                        }
                        $scope.text=message;
                        ngDialog.close();//Si hubo error cerramos el loading.
                        $scope.message="errorInFields";//Seteamos el mensaje de error
                        ngDialog.open({ template: 'generalMessage.html', controller: 'emptyController', scope: $scope }); //Mostramos el mensaje
                    }

                })
                .error(function(data) {
                    console.log(data);
                    $scope.text=message;
                    ngDialog.close();//Si hubo error cerramos el loading.
                    $scope.message="errorInFields";//Seteamos el mensaje de error
                    ngDialog.open({ template: 'generalMessage.html', controller: 'emptyController', scope: $scope }); //Mostramos el mensaje

                });
        }
        else
        {
            $scope.message="errorImage";
            ngDialog.open({ template: 'generalMessage.html', controller: 'emptyController', scope: $scope });
        }
    };
       $scope.imageReady=false;
       $scope.uploader = new FileUploader();
       var uploader = $scope.uploader = new FileUploader();
        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
            });
        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter,  options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
            ngDialog.close();//Cerraos el loading
            $scope.message="errorImage";
            ngDialog.open({ template: 'generalMessage.html', controller: 'emptyController', scope: $scope });
        };
        uploader.onAfterAddingFile = function(fileItem) {
            $scope.imageReady=true;
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            if(response.success)
            {

                $scope.imageReady=true;
                $scope.imagePath=response.path;
                uploader.clearQueue();
                document.getElementById("imageInput").value = "";
                $scope.temp.image="";
                ngDialog.close();
                ngDialog.open({ template: 'successevent.html', controller: 'emptyController', scope: $scope });
            }
            else
            {
                ngDialog.close();//Cerramos el loading
                $scope.message="errorImage";
                ngDialog.open({ template: 'generalMessage.html', controller: 'emptyController', scope: $scope });
            }
        };
}


sponzorme.controller('peaksController', ['$scope', '$cookieStore', 'Customization',peaksController]);
function peaksController($scope,$Cookie,Customization){
    $scope.$watch('event.current', function(newvalue, oldvalue){
        $scope.loadingpeaks=true;
        if($scope.event.current)
        {
            //Mostramos el boton de cargar.
            Customization.getPeaks(newvalue).success(function(adata)
            {
                $scope.peaks=adata.Peaks;
                $scope.loadingpeaks=false; //Ocultamos el boton de cargar
            });
        }
    });
}

sponzorme.controller('rssController', ['$scope', '$cookieStore','$location', 'Customization','ngDialog',rssController]);
function rssController($scope,$Cookie,$location,Customization,ngDialog){
    $scope.rss = [];
    var blogUrl= $('#page').find("#blogUrl");
    //console.log(blogUrl);
    var url=blogUrl+"feeds/posts/default";
    var url = 'http://blogen.sponzor.me/feeds/posts/default';
    $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
        dataType: 'json',
        success: function(data) {
          //console.log(data);
            for(i=0;i<data.responseData.feed.entries.length;i++)
            {
                 $scope.rss[i]={
                    "title":data.responseData.feed.entries[i].title,
                    "link":data.responseData.feed.entries[i].link
                };
            }
        }
    });
}


sponzorme.controller('UsersEventsController', function ($scope, $translate, $cookies, FileUploader) {

  var cookieini = $cookies.cookiesponzorme;

  if(isNaN(cookieini)){
     $scope.vieuser = 1;
  }else{
     $scope.vieuser = 0;
  }

  $scope.typeuser = 1;

  $scope.userfroups = 0;

  console.log(idiomaselect);

  $translate.use(idiomaselect);

  $scope.menuprincipal = 'views/users/menu.blade.html';

  $scope.uploader = new FileUploader({
    url: 'upload.php'
  });

});


sponzorme.controller('UsersSponzorsController', function ($scope, $translate, $cookies) {

  var cookieini = $cookies.cookiesponzorme;

  if(isNaN(cookieini)){
     $scope.vieuser = 1;
  }else{
     $scope.vieuser = 0;
  }

  $scope.typeuser = 1;

  $scope.userfroups = 0;

  console.log(idiomaselect);

  $translate.use(idiomaselect);

  $scope.menuprincipal = 'views/users/menu.blade.html';


});


sponzorme.controller('sponzorsController', ['$scope', '$cookieStore', 'Customization','ngDialog',sponzorsController]);
function sponzorsController($scope,$Cookie,Customization,ngDialog){

    $scope.event.organizer = 42;

    Customization.getSponzorsByOrganizer($scope.event.organizer).success(function(adata)
    {
        $scope.sponzors.list=adata.Sponzors;
    });
    $scope.updateRelSponzorPeak = function(id,state){
        ngDialog.open({ template: 'loading.html', controller: 'sponzorsController', scope: $scope });//Mostramos el Loading
        Customization.updateRelSponzorPeak(id,state).success(function(adata)
        {
            $scope.alerts.push({msg: adata.message});
            Customization.getSponzorsByOrganizer($scope.event.organizer).success(function(adata){
                $scope.sponzors.list=adata.Sponzors;
                ngDialog.close();
            });
        });
    }
    $scope.removeRelSponzorPeak = function(id){
        ngDialog.open({ template: 'loading.html', controller: 'sponzorsController', scope: $scope });//Mostramos el Loading
        Customization.removeRelSponzorPeak(id).success(function(adata){
            $scope.alerts.push({msg: adata.message});
            Customization.getSponzorsByOrganizer($scope.event.organizer).success(function(adata){
                $scope.sponzors.list=adata.Sponzors;
                ngDialog.close();
            });
        });
    }
    $scope.getTaskSponzorPeak = function (relPeak){
        ngDialog.open({ template: 'loading.html', controller: 'sponzorsController', scope: $scope });//Mostramos el Loading
        Customization.getTaskBySponzorRelPeak(relPeak,0).success(function(adata){
           $scope.todo.list=adata.TaskBySponzor;
           ngDialog.close();
        });
    }
    $scope.removeTaskSponzorPeak = function (idTaskSponzor, relPeak){
        ngDialog.open({ template: 'loading.html', controller: 'sponzorsController', scope: $scope });//Mostramos el Loading
        Customization.removeTaskSponzorPeak(idTaskSponzor).success(function(adata){
           $scope.getTaskSponzorPeak(relPeak);
           ngDialog.close();
        });
    }
    $scope.updateStatusTaskSponzorPeak = function (idTaskSponzor, status, relPeak){
        ngDialog.open({ template: 'loading.html', controller: 'sponzorsController', scope: $scope });//Mostramos el Loading
        Customization.updateStatusTaskSponzorPeak(idTaskSponzor,status).success(function(adata){
           $scope.getTaskSponzorPeak(relPeak);
           ngDialog.close();
        });
    }
}


sponzorme.controller('UsersTodoController', function ($scope, $translate, $cookies) {

  var cookieini = $cookies.cookiesponzorme;

  if(isNaN(cookieini)){
     $scope.vieuser = 1;
  }else{
     $scope.vieuser = 0;
  }

  $scope.typeuser = 1;

  $scope.userfroups = 0;

  console.log(idiomaselect);

  $translate.use(idiomaselect);

  $scope.menuprincipal = 'views/users/menu.blade.html';


});


sponzorme.controller('todoController', ['$scope', '$cookieStore','$location', 'Customization','ngDialog',todoController]);
function todoController($scope,$Cookie,$location,Customization,ngDialog){

    $scope.addTodo = function ()
    {
        ngDialog.open({ template: 'loading.html', controller: 'sponzorsController', scope: $scope });//Mostramos el Loading
        Customization.setPeakTodo(
        $scope.todo.title,
        $scope.todo.description,
        $scope.todo.event.id,
        $scope.todo.peak.id,
        0
    ).success(function(adata){
        //Limpiamos los datos
        if(adata.success){
            $scope.todo.title="";
            $scope.todo.description="";
            $scope.updateTodos();
            ngDialog.close();
            $scope.message="taskCreated";//Seteamos el mensaje de error
            ngDialog.open({ template: 'generalMessage.html', controller: 'eventsController', scope: $scope }); //Mostramos el mensaje
        }
        else{
            ngDialog.close();
            $scope.message="errorInFieldsTask";//Seteamos el mensaje de error
            ngDialog.open({ template: 'generalMessage.html', controller: 'eventsController', scope: $scope }); //Mostramos el mensaje

        }

        }).error(function(data) {
            console.log(data);
        });
    }
    $scope.updatePeak = function ()
    {
       Customization.getPeaks($scope.todo.event.id).success(function(adata)
        {
            $scope.peaks=adata.Peaks;
        });
    }
    $scope.updateTodos = function ()
    {
       Customization.getPeakTodo($scope.todo.peak.id).success(function(adata)
        {
            $scope.todo.list=adata.Todos;
        });
    }
    $scope.removeTodo = function(todoId)
    {
        Customization.removeTodo(todoId).success(function(adata)
        {
            //Si se borro exitosamente el todo entonces mostramos el template.
            $scope.message="removeTodo";
            ngDialog.open({ template: 'generalMessage.html', controller: 'todoController', scope: $scope });
            $scope.updateTodos();
        });
    }

    $scope.event = {};
    $scope.event.organizer = 42;

    Customization.getEventsByOrganizer($scope.event.organizer).success(function(adata)
    {
        $scope.events=adata.Events;
    });
}


sponzorme.controller('UsersFriendController', function ($scope, $translate, $cookies) {

  var cookieini = $cookies.cookiesponzorme;

  if(isNaN(cookieini)){
     $scope.vieuser = 1;
  }else{
     $scope.vieuser = 0;
  }

  $scope.typeuser = 1;

  $scope.userfroups = 0;

  console.log(idiomaselect);

  $translate.use(idiomaselect);

  $scope.menuprincipal = 'views/users/menu.blade.html';


});


sponzorme.controller('friendController', ['$scope', '$cookieStore','$location', 'Customization','ngDialog',friendController]);
function friendController($scope,$Cookie,$location,Customization,ngDialog){
    $scope.invitefriend = function(){
        Customization.inviteFriend($scope.friend.email,$scope.friend.message).success(function(adata){
            $scope.alerts.push({msg: adata.message});
            if(adata.success==true)
            {
                $scope.friend.email="";
                $scope.friend.message="";
            }
        });
    }
}


sponzorme.controller('UsersSettingsController', function ($scope, $translate, $cookies, FileUploader) {

  var cookieini = $cookies.cookiesponzorme;

  if(isNaN(cookieini)){
     $scope.vieuser = 1;
  }else{
     $scope.vieuser = 0;
  }

  $scope.typeuser = 1;

  $scope.userfroups = 0;

  console.log(idiomaselect);

  $translate.use(idiomaselect);

  $scope.menuprincipal = 'views/users/menu.blade.html';

  $scope.uploader = new FileUploader({
    url: 'upload.php'
  });

});



sponzorme.controller('SponsorsMainController', function ($scope, $translate, $cookies) {

  var cookieini = $cookies.cookiesponzorme;

  if(isNaN(cookieini)){
     $scope.vieuser = 1;
  }else{
     $scope.vieuser = 0;
  }

  $scope.typeuser = 1;

  $scope.userfroups = 0;

  $translate.use(idiomaselect);

  $scope.menuprincipal = 'views/sponsors/menu.blade.html';

});

//Este controlador es solo para el dashboard de los sponzors
sponzorme.controller('searchController', ['$scope', '$cookieStore','$location', 'Customization','ngDialog',searchController]);
function searchController($scope,$Cookie,$location,Customization,ngDialog){

    $scope.openDialog = function(id)
    {
        $scope.search.current=$scope.search.list[id];
        $scope.loading=1;
        ngDialog.open({ template: 'peaksDialog.html', controller: 'searchController', scope: $scope });
        Customization.getPeaks($scope.search.list[id].event).success(function(adata)
        {
            $scope.peaks=adata.Peaks;
            $scope.loading=0;
        });
    }
    $scope.sponzor = function(idpeak,user)//Esta es la función que ejecuta el patrocinio cuando se le da en el boton de listo
    {
        ngDialog.close();//Cerramos el dialogo de los peaks
        ngDialog.open({ template: 'loading.html', controller: 'searchController', scope: $scope });//Mostramos el Loading general
        Customization.setSponzorPeak({"peak":idpeak,"user":user})
        .success(function(adata)
        {
            $location.path("/following");
            ngDialog.close(); //Cerramos el loading general
        });
    }
    $scope.searchEvents = function() //Funcion que se ejecuta en el dashboard de los sponzors, cuando buscan un evento que patrocinar
    {
        if($scope.search1!="")
        {
            $scope.searchloading=1;
            Customization.searchEvents($scope.search1)
            .success(function(adata)
            {
                $scope.search.list = adata.Events;
                $scope.searchloading=0;
            })
            .error(function(data)
            {
                console.log(data);
            });
        }
        else
        {
            $("#search").addClass("has-error");
        }
    }
}

sponzorme.controller('SponsorsSponzoringController', function ($scope, $translate, $cookies) {

  var cookieini = $cookies.cookiesponzorme;

  if(isNaN(cookieini)){
     $scope.vieuser = 1;
  }else{
     $scope.vieuser = 0;
  }

  $scope.typeuser = 1;

  $scope.userfroups = 0;

  $translate.use(idiomaselect);

  $scope.menuprincipal = 'views/sponsors/menu.blade.html';

});


sponzorme.controller('sponzoringController', ['$scope', '$cookieStore','$location', 'Customization','ngDialog',sponzoringController]);
function sponzoringController($scope,$Cookie,$location,Customization,ngDialog){
    $scope.sponzors.list=[];
    $scope.sponzoringEventsloading=1;
    Customization.getEventsBySponzors($scope.sponzors.current,1).success(function(data)
    {
       $scope.sponzors.list=data.Sponzors;
       $scope.sponzoringEventsloading=0;
    }).
    error(function(data)
    {
        console.log(data);
    });
    $scope.removeRelSponzorPeak = function(id){
        Customization.removeRelSponzorPeak(id).success(function(adata){
            $scope.alerts.push({msg: adata.message});
            Customization.getEventsBySponzors($scope.sponzors.current).success(function(adata){
                $scope.sponzors.list=adata.Sponzors;
            });
        });
    }
    $scope.getTaskSponzorPeakSponzoring = function(relPeak,event,idPeak){
        $scope.todo.loadingTask=1;
        $scope.todo.loadingTaskRel=1;
        Customization.getTaskBySponzorRelPeak(relPeak,0).success(function(adata){
           $scope.todo.list=adata.TaskBySponzor;
           $scope.todo.loadingTask=0;
        });
        Customization.getTaskBySponzorRelPeak(relPeak,1).success(function(adata){
           $scope.todo.listSponzor=adata.TaskBySponzor;
           $scope.todo.loadingTaskRel=0;
        });
        $scope.todo.peak=idPeak;
        $scope.todo.currentRelPeak=relPeak;
        $scope.todo.currentEvent=event;
    }
    $scope.updateStatusTaskSponzorPeak = function (idTaskSponzor, status, relPeak){
        $scope.todo.loadingTaskRel=1;
        Customization.updateStatusTaskSponzorPeak(idTaskSponzor,status).success(function(adata){
            Customization.getTaskBySponzorRelPeak(relPeak,1).success(function(adata){
                $scope.todo.listSponzor=adata.TaskBySponzor;
                $scope.todo.loadingTaskRel=0;
            });
        });
    }
    $scope.createSponzorTask = function (){
        ngDialog.open({ template: 'createSponzorTodo.html', controller: 'sponzoringController', scope: $scope });
    }
    $scope.addTodo = function ()
    {
        $scope.todo.loadingTaskRel=1;
        Customization.setPeakTodo(
        $scope.todo.title,
        $scope.todo.description,
        $scope.todo.currentEvent,
        $scope.todo.peak,
        1,
        $scope.todo.currentRelPeak
    ).success(function(adata){
        $scope.todo.title="";
        $scope.todo.description="";
        ngDialog.close();
        Customization.getTaskBySponzorRelPeak($scope.todo.currentRelPeak,$scope.todo.currentEvent).success(function(adata){
            $scope.todo.listSponzor=adata.TaskBySponzor;
            $scope.todo.loadingTaskRel=0;
        });
    }).error(function(data) {
        console.log(data);
        $scope.todo.loadingTaskRel=0;
    });
    }
    $scope.removeTaskSponzorPeak = function (idTaskSponzor, relPeak){
        $scope.todo.loadingTaskRel=1;
        Customization.removeTaskSponzorPeak(idTaskSponzor).success(function(adata){
            Customization.getTaskBySponzorRelPeak(relPeak,1).success(function(adata){
                $scope.todo.listSponzor=adata.TaskBySponzor;
                $scope.todo.loadingTaskRel=0;
            });
        });
    }
}


sponzorme.controller('SponsorsSettingsController', function ($scope, $translate, $cookies) {

  var cookieini = $cookies.cookiesponzorme;

  if(isNaN(cookieini)){
     $scope.vieuser = 1;
  }else{
     $scope.vieuser = 0;
  }

  $scope.typeuser = 1;

  $scope.userfroups = 0;

  $translate.use(idiomaselect);

  $scope.menuprincipal = 'views/sponsors/menu.blade.html';

});

sponzorme.controller('settingsController', ['$scope', '$cookieStore', 'Customization','FileUploader','ngDialog',settingsController]);
function settingsController($scope,$Cookie,Customization, FileUploader, ngDialog){

    var uploader = $scope.uploader = new FileUploader();
    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    uploader.onAfterAddingFile = function(fileItem) {
        //console.info('onAfterAddingFile', fileItem);
    };

    $scope.path = function()
    {
        var newURL = window.location.host + "/" + window.location.pathname;
        var pathArray = newURL.split( '/' );
        var newPathname = "";
        for (i = 0; i < pathArray.length-2; i++) {
            if(pathArray[i]!="")
                newPathname += pathArray[i]+"/";
        }
        newPathname=window.location.protocol + "//"+ newPathname;
        var path = newPathname;
        return path;
    }

    var urlimage = $scope.path();
    $scope.imageReady=false;
    $scope.event = {};
    $scope.event.organizer = 21;
    $scope.account = {};
    $scope.viewUserInfo = function(){
        $scope.account.loadingEventbrite=false;
        Customization.getUserInfo($scope.event.organizer).success(function(adata){
            $scope.account.description=adata.User[0].description;
            d = new Date();
            if(adata.User[0].image != ""){
                $scope.account.image=urlimage+'/images/users/'+adata.User[0].image + '?'+d.getTime();
            }else{
                $scope.account.image=urlimage+'/images/photo.png';
            }

            $scope.account.name=adata.User[0].name;
            $scope.account.age=adata.User[0].age;
            $scope.account.sex=adata.User[0].sex;
            $scope.account.company=adata.User[0].company;
            $scope.account.email=adata.User[0].email;
            $scope.account.comunitySize=adata.User[0].comunity_size;
            $scope.account.location=adata.User[0].location;
            $scope.account.location_reference=adata.User[0].location_reference;
            $scope.account.eventbriteKey=adata.User[0].eventbriteKey;
            $scope.account.meetupRefreshKey=adata.User[0].meetupRefreshKey;
            if(adata.User[0].eventbriteKey!=undefined && adata.User[0].eventbriteKey.trim()!="")
            {
                Customization.getEventbriteEvents(adata.User[0].eventbriteKey).success(function(data){
                     $scope.eventbriteevents.list=data.Events.events;
                     $scope.account.loadingEventbrite=true;
                });
            }
        /*Funcionalidad de meetup desabilitada hasta nueva orden
        $scope.account.loadingGroupsMeetup=false;
       if($scope.account.meetupRefreshKey!=undefined && $scope.account.meetupRefreshKey.trim()!="")
        {
            Customization.getMeetupGroups($scope.account.meetupRefreshKey).success(function(data){
                 $scope.meetupgroups.list=data.Groups.results;
                 $scope.account.meetupRefreshKey=data.refresh_token;
                 $scope.account.loadingGroupsMeetup=true;
            });
        }
        */

        });
        $scope.options2 = {
          country: '',
          types: '(cities)'
        };
    }
    /*
    $scope.$watch('meetupgroups.current', function(newValue, oldValue)
    {
        if($scope.meetupgroups.current)
        {
            $scope.account.loadingMeetupEvents=false;
            Customization.getMeetupEventsByGroup(newValue,$scope.account.meetupRefreshKey)
            .success(function(data)
            {
                $scope.meetupevents.list=data.Events.results;
                $scope.account.meetupRefreshKey=data.refresh_token;
                $scope.account.loadingMeetupEvents=true;
            });
        }
    });
    */
    $scope.importFromEventbrite = function(e)
    {
        $scope.newevent.description=e.description.text;
        $scope.newevent.title=e.name.text;
        $scope.newevent.ends=e.end.local.split("T")[0];
        $scope.newevent.starts=e.start.local.split("T")[0];
        $scope.newevent.location= e.venue.address.address_1 +", " +e.venue.address.city+", " +e.venue.address.region;
        $scope.a=true;
    }
    $scope.unconnectMeetup = function()
    {
        Customization.unconnectMeetup($scope.event.organizer)
            .success(function(data)
            {
                $scope.viewUserInfo();
            });
    }
    $scope.unconnectEventbrite = function()
    {
        Customization.unconnectEventbrite($scope.event.organizer)
            .success(function(data)
            {
                $scope.viewUserInfo();
            });
    }
    $scope.importFromMeetup=function(e)
    {
        $scope.newevent.description=e.description;
        $scope.newevent.title=e.name;
        $scope.newevent.ends=e.dateEnds;
        $scope.newevent.starts=e.dateStarts;
        $scope.newevent.location=e.venue.address_1+", " +e.venue.name+", " +e.venue.city;
        $scope.b=true;
    }

    $scope.editAccount = function(){
        //**Acá se hacen las validaciones de las reglas del formulario
        if(angular.isUndefined($scope.details2.reference) &&
            ($scope.account.location_reference="" || angular.isUndefined($scope.account.location_reference)))
        {
            $("#location").addClass("has-error");
            $scope.account.location="";
        }
        else
        {

            path=$scope.path();
            if(uploader.queue[0] != undefined){
                uploader.queue[0].url=path+'api/v1/user/upload/image/'+$scope.event.organizer;
                uploader.uploadAll(); //Subo la imagen

                uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter,  options) {
                    console.info('onWhenAddingFileFailed', item, filter, options);
                    $scope.message="errorImage";
                    ngDialog.open({ template: 'generalMessage.html', controller: 'eventsController', scope: $scope });
                };
                uploader.onAfterAddingFile = function(fileItem) {
                    console.info('onAfterAddingFile', fileItem);
                    $scope.imageReady=true;
                };
                uploader.onCompleteItem = function(fileItem, response, status, headers) {
                    if(response.success)
                    {
                        $scope.imageReady=true;
                        $scope.imagePath=response.path;
                        $scope.account.image = urlimage+'/images/users/' +response.path;
                        $scope.accountheader.image = urlimage+'/images/users/'+response.path;
                        $scope.event.message="La imagen se actualizo satisfactoriamente";
                        ngDialog.open({ template: 'successevent.html', controller: 'settingsController', scope: $scope });
                        uploader.clearQueue();
                        document.getElementById("imageInput").value = "";
                    }
                };
            }

            $scope.account.userId=$scope.event.organizer;
            var a= {
                "description":$scope.account.description,
                "image":$scope.account.image,
                "name":$scope.account.name,
                "sex":$scope.account.sex,
                "age":$scope.account.age,
                "location":$scope.account.location,
                "location_reference":$scope.details2.reference,
                "email":$scope.account.email,
                "company":$scope.account.company,
                "comunity_size":$scope.account.comunitySize,
                "userId":$scope.event.organizer
            };
            Customization.editAccount(a).success(function(adata){
                    $scope.alerts.push({msg: adata.message});
                    $scope.viewUserInfo();
            });
        }
    }
    $scope.viewUserInfo();
}


sponzorme.controller('SponsorsFriendController', function ($scope, $translate, $cookies) {

  var cookieini = $cookies.cookiesponzorme;

  if(isNaN(cookieini)){
     $scope.vieuser = 1;
  }else{
     $scope.vieuser = 0;
  }

  $scope.typeuser = 1;

  $scope.userfroups = 0;

  $translate.use(idiomaselect);

  $scope.menuprincipal = 'views/sponsors/menu.blade.html';

});
