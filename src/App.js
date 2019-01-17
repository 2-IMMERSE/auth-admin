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
import { Admin, Resource } from 'admin-on-rest';
import authClient from './listeners/auth';
import restClient from './restClient';
import config from './config';

// Controllers
import { Dashboard } from './components/Dashboard';
import { UserList, UserEdit, UserCreate } from './components/Users';
import { KeyList, KeyCreate } from './components/Keys';
import { DeviceList } from './components/Devices';

// Icons
import UsersIcon from 'material-ui/svg-icons/social/person';
import KeysIcon from 'material-ui/svg-icons/communication/vpn-key';
import DevicesIcon from 'material-ui/svg-icons/device/devices';

const rc = restClient(config.baseURL);

class App extends Component {
  render() {
    return (
      <Admin title="2Immerse Authentication" authClient={authClient} dashboard={Dashboard} restClient={rc}>
        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UsersIcon} />
        <Resource name="keys" list={KeyList} create={KeyCreate} icon={KeysIcon} />
        <Resource name="devices" list={DeviceList} icon={DevicesIcon} />
      </Admin>
    );
  }
}

export default App;
