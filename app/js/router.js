

  /*$routeProvider.when('/login', {
    templateUrl: 'profile/login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/signup', {
    templateUrl: 'profile/signup.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/forgot-password', {
    templateUrl: 'profile/forgot_password.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/home', {
    templateUrl: 'home.html',
    controller: 'LookController as lkCtrl',
    resolve: {
      payload: ['LookModel', function (looks) {
        //TODO: need to know the current user here
        return looks.all();
      }],
      action: function(){return 'list';}
    }
  });
  $routeProvider.when('/feed', { redirectTo: '/home' });
  //$routeProvider.when('/looks', { redirectTo: '/home' }); //list


  $routeProvider.when('/looks/new', {
    templateUrl: 'look/form.html',
    controller: 'LookController as lkCtrl',
    resolve: {
      payload: ['LookModel', function (LookModel) {
        return new LookModel();
      }],
      action: function(){return 'new';}
    }
  }); //new
  $routeProvider.when('/looks/view/:id', {
    templateUrl: 'look/view.html',
    controller: 'LookController as lkCtrl',
    resolve: {
      payload: function ($route, LookModel) {
        return LookModel.getById($route.current.params.id);
      },
      action: function(){return 'view';}
    }
  }); //edit

  $routeProvider.when('/$resource/list-of-books', {
    templateUrl: 'books_resource.html',
    controller: 'BooksResourceController'
  });

  $routeProvider.when('/$http/list-of-books', {
    templateUrl: 'books_http.html',
    controller: 'BooksHttpController',
    resolve: {
      books: function(BookService) {
        return BookService.getBooks();
      }
    }
  });*/

  
