var event_en = {
  'DEFAULT_EVENT': {
    'title': 'Your first event.',
    'description': 'Congrats!!! This is your first event. In this place your going to have your event description.',
    'location': 'San Francisco, California',
    'location_reference': 'ljsadljf3289uojklfhasd',
    'startdate': 'Today',
    'enddate': 'Today +2 Hours',
    'image': 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/event_default.jpg',
    'privacy': '0',
    'lang': 'en',
    'category': '14',
    'type': '1',
    'starts': moment(Date.now()).format('YYYY-MM-DD hh:mm:ss'),
    'ends': moment(Date.now() + 2).format('YYYY-MM-DD hh:mm:ss')
  },
  'PERKS': [{
    'kind': 'Gold',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }, {
    'kind': 'Plate',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }, {
    'kind': 'Bronze',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }]
};
var event_pt = {
  'DEFAULT_EVENT': {
    'title': 'Seu primeiro evento.',
    'description': 'Parabéns!!! Este é o seu primeiro evento. Aqui você terá a descrição do evento.',
    'location': 'São Paulo, Brasil',
    'location_reference': 'ljsadljf3289uojklfhasd',
    'startdate': 'Today',
    'enddate': 'Today +2 Hours',
    'image': 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/event_default.jpg',
    'privacy': '0',
    'lang': 'en',
    'category': '14',
    'type': '1',
    'starts': moment(Date.now()).format('YYYY-MM-DD hh:mm:ss'),
    'ends': moment(Date.now() + 2).format('YYYY-MM-DD hh:mm:ss')
  },
  'PERKS': [{
    'kind': 'Gold',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }, {
    'kind': 'Plate',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }, {
    'kind': 'Bronze',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }]
};
var event_es = {
  'DEFAULT_EVENT': {
    'title': 'Tu Primer Evento.',
    'description': 'Felicidades!!! Este es tu primer evento. En este lugar vas a tener la descripción de tu evento',
    'location': 'San Francisco, California',
    'location_reference': 'ljsadljf3289uojklfhasd',
    'startdate': 'Today',
    'enddate': 'Today +2 Hours',
    'image': 'https://s3-us-west-2.amazonaws.com/sponzormewebappimages/event_default.jpg',
    'privacy': '0',
    'lang': 'en',
    'category': '14',
    'type': '1',
    'starts': moment(Date.now()).format('YYYY-MM-DD hh:mm:ss'),
    'ends': moment(Date.now() + 2).format('YYYY-MM-DD hh:mm:ss')
  },
  'PERKS': [{
    'kind': 'Oro',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }, {
    'kind': 'Plata',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }, {
    'kind': 'Bronce',
    'usd': '0',
    'total_quantity': '1',
    'reserved_quantity': '0'
  }]
};
var dataTime = new Date();
var timer = parseInt(2 * 24 * 60 * 60 * 1000);
var dataExpDate = new Date(dataTime.getTime() + timer);
