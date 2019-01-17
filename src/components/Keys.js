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
import { Filter, List, Create, Datagrid, TextField, DeleteButton } from 'admin-on-rest';
import { SimpleForm, TextInput, LongTextInput } from 'admin-on-rest';

class KeyFilter extends Component {
    render() {
        return (
            <Filter {...this.props}>
                <TextInput label="Search" source="q" alwaysOn />
            </Filter>
        )
    }
}

export class KeyList extends Component {
    render() {
        return (
            <List {...this.props} filters={<KeyFilter />}>
                <Datagrid>
                    <TextField source="id" />
                    <DeleteButton />
                </Datagrid>
            </List>
        );
    }
}

export class KeyCreate extends Component {
    render() {
        return (
            <Create {...this.props}>
                <SimpleForm>
                    <LongTextInput source="data" />
                </SimpleForm>
            </Create>
        )
    }
}