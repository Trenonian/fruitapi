namespace fruitapi.Controllers {

    export class HomeController {
        public message = 'Hello from the home page!';
    }

    export class FruitListController {
        public fruit;
        public message;

        constructor(
            private $http: ng.IHttpService
        ) {
            $http.get('/api/fruit')
                .then((s) => {
                    var data: any = s.data;
                    this.fruit = data;
                })
                .catch((e) => {
                    this.message = 'List of fruits could not be loaded';
                });
        }
    }

    export class FruitEditController {
        public fruit;
        public message;
        display = false;

        public updateColor() {
            this.fruit.color = `${this.fruit.red},${this.fruit.green},${this.fruit.blue}`;
        };

        saveChanges() {
            this.$http.put(`/api/fruit/${this.$stateParams['id']}`, this.fruit)
                .then((s) => {
                    this.$state.go('fruitList');
                })
                .catch((e) => {
                    console.log(e);
                    this.message = 'Fruit could not be edited.';
                });
        }

        delFruit() {
            this.$http.delete(`/api/fruit/${this.$stateParams['id']}`)
                .then((s) => {
                    this.$state.go('fruitList');
                })
                .catch((e) => {
                    console.log(e);
                    this.message = 'Fruit could not be deleted.';
                });
        }

        constructor(
            private $http: ng.IHttpService,
            private $state: ng.ui.IStateService,
            private $stateParams: ng.ui.IStateParamsService
        ) {
            $http.get(`/api/fruit/${$stateParams['id']}`)
                .then((s) => {
                    var data: any = s.data;
                    this.fruit = {};
                    this.fruit.name = data.name;
                    this.fruit.description = data.description;
                    this.fruit.red = data.red;
                    this.fruit.green = data.green;
                    this.fruit.blue = data.blue;
                    this.display = true;
                    this.updateColor();
                })
                .catch((e) => {
                    console.log(e);
                    $state.go('fruitList');
                });
        }
    }

    export class FruitCreateController {
        public fruit;
        public message;
        public fruitCount = 0;
        public updateColor() {
            this.fruit.color = `${this.fruit.red},${this.fruit.green},${this.fruit.blue}`;
        };

        addFruit() {
            this.$http.post('/api/fruit/', this.fruit)
                .then((s) => {
                    this.fruitCount++;
                    this.message = `Fruit ${this.fruitCount} was successfully added.`;
                    angular.element('input').first().select();
                    this.fruit.name = '';
                    this.fruit.description = '';
                    this.fruit.red = 120;
                    this.fruit.green = 120;
                    this.fruit.blue = 120;
                    this.updateColor();
                })
                .catch((e) => {
                    console.log(e);
                    this.message = 'Fruit could not be added.';
                });
        }

        constructor(
            private $http: ng.IHttpService,
            private $state: ng.ui.IStateService
        ) {
            this.fruit = {};
            this.fruit.red = 120;
            this.fruit.green = 120;
            this.fruit.blue = 120;
            this.updateColor();
        }
    }

}
