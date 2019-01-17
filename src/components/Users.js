/*Copyright 2018 Cisco and/or its affiliates

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
import React, { Component } from 'react';
import { Filter, List, Edit, Create, Datagrid, TextField, EditButton, DeleteButton } from 'admin-on-rest';
import { TabbedForm, FormTab, TextInput, CheckboxGroupInput } from 'admin-on-rest';
import { required, email } from 'admin-on-rest';
import { ProfileInput } from '../inputs/ProfileInput';

class UserFilter extends Component {
    render() {
        return (
            <Filter {...this.props}>
                <TextInput label="Search" source="q" alwaysOn />
            </Filter>
        )
    }
}

export class UserList extends Component {
    render() {
        return (
            <List {...this.props} filters={<UserFilter />}>
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="email" />
                    <TextField source="display_name" />
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            </List>
        );
    }
}

export class UserEdit extends Component {
    render() {
        return (
            <Edit {...this.props}>
                <TabbedForm>
                    <FormTab label="details">
                        <TextInput source="email" type="email" valdate={[required, email]} />
                        <TextInput source="password" type="password" valdate={required} />
                        <TextInput source="first_name" />
                        <TextInput source="last_name" />
                        <TextInput source="display_name" />
                    </FormTab>
                    <FormTab label="profile">
                        <ProfileInput source="profile" default={{"communal":{},"companion":{}}} />
                    </FormTab>
                    <FormTab label="settings">
                        <ProfileInput source="settings" default={{}} />
                    </FormTab>
                    <FormTab label="roles">
                        <CheckboxGroupInput source="roles" choices={[
                            { id: 'ROLE_ADMIN', name: 'Admin' },
                            { id: 'ROLE_DEVELOPER', name: 'Developer' },
                            { id: 'ROLE_DEMO_MODE', name: 'Demo Mode' }
                        ]} />
                    </FormTab>
                </TabbedForm>
            </Edit>
        )
    }
}

export class UserCreate extends Component {
    render() {
        return (
            <Create {...this.props}>
                <TabbedForm>
                    <FormTab label="details">
                        <TextInput source="email" type="email" valdate={[required, email]} />
                        <TextInput source="password" type="password" valdate={required} />
                        <TextInput source="first_name" />
                        <TextInput source="last_name" />
                        <TextInput source="display_name" />
                    </FormTab>
                    <FormTab label="profile">
                        <ProfileInput source="profile" default={{"communal":{},"companion":{}}} />
                    </FormTab>
                    <FormTab label="settings">
                        <ProfileInput source="settings" default={{}} />
                    </FormTab>
                    <FormTab label="roles">
                        <CheckboxGroupInput source="roles" choices={[
                            { id: 'ROLE_ADMIN', name: 'Admin' },
                            { id: 'ROLE_DEVELOPER', name: 'Developer' },
                            { id: 'ROLE_DEMO_MODE', name: 'Demo Mode' }
                        ]} />
                    </FormTab>
                </TabbedForm>
            </Create>
        )
    }
}
