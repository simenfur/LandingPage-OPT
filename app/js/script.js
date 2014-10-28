'use strict';
angular.module('app', ['ui.bootstrap', 'ngResource']);
angular.module('app').controller('CarouselDemoCtrl', function($scope, $window, $http) {



    $scope.myInterval = 5000;
    $scope.currentText = '';
    var counter = 1;
    var slides = $scope.slides = [];
    $scope.showTwoSlides = true;

    $scope.imgClass = function() {
        if ($scope.showTwoSlides)
            return "two-slides";
        else
            return "one-slide";
    }

    $scope.$watch(function() {
        if ($window.innerWidth < 560) {
            $scope.showTwoSlides = false;
        } else {
            $scope.showTwoSlides = true;
        }
    }, function(value) {
        console.log(value);
    });

    $scope.addSlide = function() {
        slides.push({
            image:  '/img/erik.jpg',
            name:   'Erik Fl&aring;gen',
            /* include erik.html here */
            number: counter,
            id: 1337
        });
        counter++;
        slides.push({
            image: '/img/mikael.jpg',
            name: 'Mikael Johansson',
            /* include mikael.html here */
            number: counter,
            id: 1337,
        });
        counter++;
        slides.push({
            image: '/img/john-ole.jpg',
            name: 'John Ole B. Elvehaug',
            /* include john-ole.html here */
            number: counter,
            id: 1337,
        });
        counter++;
        slides.push({
            image: '/img/sondre.jpg',
            name: 'Sondre Krogh-Bjerke',
            /* include sondre.html here */
            number: counter,
            id: 1337,
        });
        counter++;
    };
    $scope.addSlide();

    $scope.getActiveSlide = function() {
        return slides.filter(function(s) {
            return s.active;
        })[0];
    };

    $scope.getNextActiveSlide = function() {
        for (var i = 0; i < slides.length; i++) {
            if (slides[i].active) {
                return slides[(i + 1) % slides.length];
            }
        }

    }


    $scope.login = function() {
        FB.login(function(response) {

            if (!response.authResponse) {
                return;
            }

            $scope.userData = response;


            //get user info from FB:
            FB.api('/me', function(response) {
                var requestData = {
                    firstName: response.first_name,
                    lastName: response.last_name,
                    gender: response.gender,
                    facebookId: response.id,
                };

                $http.post('/opt/api/auth', requestData)
                    .success(function(data) {
                        $window.location.href = "https://online-pt-mvp.app.iterate.no/#/";
                    })
                    .error(function(e) {
                        console.log("err");
                    });
            });
        });
    };

    window.fbAsyncInit = function() {
        FB.init({
            appId: '824591080914567',
            cookie: true, // enable cookies to allow the server to access
            // the session
            xfbml: true, // parse social plugins on this page
            version: 'v2.1' // use version 2.1
        });
    };
    // Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


});
