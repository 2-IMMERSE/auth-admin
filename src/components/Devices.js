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
import { List, Datagrid, TextField, ReferenceField, DeleteButton } from 'admin-on-rest';

export class DeviceList extends Component {
    render() {
        return (
            <List {...this.props}>
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="code" />
                    <ReferenceField source="user" reference="users" linkType="show">
                        <TextField source="email" />
                    </ReferenceField>
                    <DeleteButton />
                </Datagrid>
            </List>
        );
    }
}