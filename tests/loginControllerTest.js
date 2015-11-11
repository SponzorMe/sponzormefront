'use strict';

describe("probando controlador hello", function()
{
    beforeEach(module("sponzorme"));

    describe("LoginController", function()
    {
        var scope, ctrl;

        beforeEach(inject(function($rootScope, $controller)
        {
            scope = $rootScope.$new();
            ctrl = $controller("LoginController", {$scope:scope});
        }));

        it("Envio de un login incorrecto es incorrecto", function()
        {
            scope.email = "test@test.com";
            scope.password = "testm";
            scope.sendfrom();
            expect(scope.loagind).toEqual(false);
        })
    })
})
