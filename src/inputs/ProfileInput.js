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
import { PropTypes } from 'prop-types';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/github';

export class ProfileInput extends Component {
    static propTypes = {
        label: PropTypes.string,
        record: PropTypes.object,
        source: PropTypes.string.isRequired,
        default: PropTypes.object,
    };

    onChange(newValue) {
        console.log(this.props.record);
        console.log(this.props.record[this.props.source]);
        try {
            this.props.record[this.props.source] = JSON.parse(newValue);
        } catch (e) {

        }
    }

    render() {
        if (!this.props.record[this.props.source]) {
            this.props.record[this.props.source] = this.props.default;
        }

        const data = JSON.stringify(this.props.record[this.props.source], null, 4);
        return (
            <AceEditor
                width="100%"
                height="400px"
                mode="json"
                theme="github"
                onChange={this.onChange.bind(this)}
                name={this.id}
                editorProps={{$blockScroller: true}}
                value={data}
                showPrintMargin={false}
            />
        );
    }
}