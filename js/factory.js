var factories = {};

factories.listOfTopic = function () {
  var factory = {};
  var items = [
    {'id': 1, 'name': "Загальні положення"},
    {'id': 2, 'name': "Обов'язки і права водіїв механічних транспортних засобів"},
    {'id': 2, 'name': "Рух транспортних засобів із спеціальними сигналами"},
    {'id': 2, 'name': "Обов'язки і права пішоходів"},
    {'id': 2, 'name': "Обов'язки і права пасажирів"},
    {'id': 2, 'name': "Вимоги до велосипедистів"},
    {'id': 2, 'name': "Вимоги до осіб, які керують гужовим транспортом і погоничів тварин"},
    {'id': 2, 'name': "Регулювання дорожнього руху"},
    {'id': 2, 'name': "Попереджувальні сигнали"},
    {'id': 2, 'name': "Початок руху та зміна його напрямку"},
    {'id': 2, 'name': "Розташування транспортних засобів на дорозі"},
    {'id': 2, 'name': "Швидкість руху"},
    {'id': 2, 'name': "Дистанція, інтервал, зустрічний роз'їзд"},
    {'id': 2, 'name': "Обгін"},
    {'id': 2, 'name': "Зупинка і стоянка"},
    {'id': 2, 'name': "Проїзд перехресть"},
    {'id': 2, 'name': "Переваги маршрутних транспортних засобів"},
    {'id': 2, 'name': "Проїзд пішохідних переходів і зупинок транспортних засобів"},
    {'id': 2, 'name': "Використання зовнішніх світлових приладів"},
    {'id': 2, 'name': "Рух через залізничні переїзди"},
    {'id': 2, 'name': "Перевезення пасажирів"},
    {'id': 2, 'name': "Перевезення вантажу"},
    {'id': 2, 'name': "Буксирування та експлуатація транспортних составів"},
    {'id': 2, 'name': "Навчальна їзда"},
    {'id': 2, 'name': "Рух транспортних засобів у колонах"},
    {'id': 2, 'name': "Рух у житловій та пішохідній зоні"},
    {'id': 2, 'name': "Рух по автомагістралях і дорогах для автомобілів"},
    {'id': 2, 'name': "Рух по гірських дорогах і на крутих спусках"},
    {'id': 2, 'name': "Міжнародний рух"},
    {'id': 2, 'name': "Номерні, розпізнавальні знаки, написи і позначення"},
    {'id': 2, 'name': "Технічний стан транспортних засобів та їх обладнання"},
    {'id': 2, 'name': "Окремі питання організації дорожнього руху, що потребують узгодження з Державтоінспекцією"},
    {'id': 2, 'name': "Дорожні знаки"},
    {'id': 2, 'name': "Дорожня розмітка"}
  ];

  factory.getItems = function () {
    return items;
  };

  return factory;

};


factories.itemsFactory = function ($http) {
  var factory = {};

  factory.getItemById = function (id, callback) {

	  !isNaN(id) && $http.get('data/' + id + '.txt').
      success(function(data) {
        callback(data);
      });
  };


  factory.getFilteredItem = function (filter) {
    return data.filter(function(item){
      return item.text.search(filter) > -1;
    });
  };
  return factory;
};


factories.signFactory = function($http){
  var factory = {};
  var data = [
    {id: '1', desc: 'Попереджувальні знаки', img: 'img/sign/1/main.jpg'},
    {id:'2', desc: 'Знаки пріоритету', img: 'img/sign/2/main.gif'},
    {id:'3', desc: 'Заборонні знаки', img: 'img/sign/3/main.gif'},
    {id:'4', desc: 'Наказові знаки', img: 'img/sign/4/main.gif'},
    {id:'5', desc: 'Інформаційно-вказівні знаки', img: 'img/sign/5/main.gif'},
    {id:'6', desc: 'Знаки сервісу', img: 'img/sign/6/main.gif'},
    {id:'7', desc: 'Таблички до дорожніх знаків', img: 'img/sign/7/main.gif'}
  ];

  factory.get = function(){
    return data;
  };


  factory.getSignById = function (id, callback) {

	  !isNaN(id) && $http.get('data/signs/' + id + '.txt').
      success(function(data) {
        callback(data);
      });

  };
  return factory;
};

mainApp.factory(factories);