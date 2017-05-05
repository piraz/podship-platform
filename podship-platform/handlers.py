#!/usr/bin/env python
#
# Copyright 2015-2016 Flavio Garcia
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import firenado.tornadoweb
from tornado.escape import json_decode

from wtforms.fields import StringField, PasswordField
from wtforms.validators import DataRequired
from wtforms_tornado import Form
import wtforms_json

wtforms_json.init()


class LoginForm(Form):

    username = StringField(validators=[DataRequired(
        'The user name is required.')])
    password = PasswordField(validators=[DataRequired(
        'Password is required.')])


class IndexHandler(firenado.tornadoweb.TornadoHandler):

    def get(self):
        self.render('index.html')


class LoginHandler(firenado.tornadoweb.TornadoHandler):

    def get(self):
        self.render('login.html')

    def post(self):
        data = json_decode(self.request.body)
        form = LoginForm.from_json(data)
        error_data = {'errors': {}}
        if form.validate():
            is_valid_login = self.is_login_valid(form.data)
            if is_valid_login['status'] == 200:
                self.set_status(is_valid_login['status'])
                response = {'status': is_valid_login['status']}
                response['userid'] = is_valid_login['data']['userid']
                response['next_url'] = ""
                response['password'] = ""
                self.write(response)
            elif is_valid_login['status'] == 401:
                self.set_status(is_valid_login['status'])
                error_data['errors'] = is_valid_login['errors']
                self.write(error_data)
        else:
            self.set_status(401)
            error_data['errors'].update(form.errors)
            self.write(error_data)

    def is_login_valid(self, data):
        result = {
            'status': 401,
            'data': {},
            'errors': {}
        }
        if data['username'] == "user" and data['password'] == "pass":
            result['status'] = 200
            result['data'] =  {'userid': 1}
        else:
            result['errors']['form'] = "Invalid login data."
        return result

class LocaleHandler(firenado.tornadoweb.TornadoHandler):
    """ Returns the locale json to be used by the javascript """
    def get(self, lang):
        print(lang)
        import tornado.locale
        user_locale = tornado.locale.get("pt")
        # TODO: Add to a service
        locale = {
            "app": {
                "project": "diaspora*py"
            },
            "common": {
                "password": user_locale.translate("Password"),
                "username": "Username",
                "create": "Create",
                "add": "Add",
                "remove": "Remove",
                "delete": "Clear",
                "cancel": "Cancel",
                "save": "Save",
                "email": "E-mail",
                "search": "Search",
                "login": "Login",
                "register": "Register",
                "logged": "Logged in as <a href='/login' class='navbar-link'>$t(common.username)</a>"
            },
            "layout": {}
        }
        self.write(locale)
