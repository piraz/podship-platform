/**
 * Copyright 2015-2017 Flavio Garcia
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

steal(
    "jquery", "can-component", "can-stache",
    function($, Component, Stache) {
    var LoginModel = Model.extend({
        create : "POST /user/login"
    },{});

    Component.extend({
        tag: "pod-login",
        template: Stache.from("/assets/components/login/login_form.stache"),
        viewModel:{
            error: false,
            errorMessage: '',
            userNameError: false,
            passwordError: false,
            login: new LoginModel(),
            processLogin: function(login) {
                window.location = login.next_url;
            },
            processLoginError: function(response) {
                var errorMessage = '';
                if(response.responseJSON.errors.hasOwnProperty('username')) {
                    this.viewModel.attr('userNameError', true);
                }
                if(response.responseJSON.errors.hasOwnProperty('password')) {
                    this.viewModel.attr('passwordError', true);
                }
                var errors = new can.Map(response.responseJSON.errors);
                errors.each(
                    function(element, index, list) {
                        if(!this.viewModel.attr('error')){
                            this.viewModel.attr('error', true);
                        }
                        errorMessage += element[0] + '<br>';
                    }.bind(this)
                );
                this.viewModel.attr('errorMessage', errorMessage);
            }
        },
        events: {
            "#login_button click": function() {
                this.viewModel.attr('error', false);
                this.viewModel.attr('errorMessage', '');
                this.viewModel.attr('userNameError', false);
                this.viewModel.attr('passwordError', false);
                var form = this.element.find( 'form' );
                var values = can.deparam(form.serialize());
                var parameters = [];
                //values._xsrf = getCookie('_xsrf');
                this.viewModel.login.attr(values).save(
                    this.viewModel.processLogin.bind(this),
                    this.viewModel.processLoginError.bind(this)
                );
            }
        }
    });

    $("#podLogin").html(Stache("<pod-login></pod-login>")());
});
