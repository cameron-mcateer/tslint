/**
 * @license
 * Copyright 2016 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {camelize} from "underscore.string";

import {AbstractFormatter} from "../language/formatter/abstractFormatter";
import {IFormatterMetadata} from "../language/formatter/formatter";
import {RuleFailure} from "../language/rule/rule";

import * as Utils from "../utils";

export class Formatter extends AbstractFormatter {
    /* tslint:disable:object-literal-sort-keys */
    public static metadata: IFormatterMetadata = {
        formatterName: "msbuild",
        description: "Formats errors for consumption by msbuild.",
        descriptionDetails: Utils.dedent`
            The output is compatible with both msbuild and Visual Studio. All failures have the
            'warning' severity.`,
        sample: "myFile.ts(1,14): warning: Missing semicolon",
        consumer: "machine",
    };
    /* tslint:enable:object-literal-sort-keys */

    public format(failures: RuleFailure[]): string {
        const outputLines = failures.map((failure: RuleFailure) => {
            const fileName = failure.getFileName();
            const failureString = failure.getFailure();
            const camelizedRule = camelize(failure.getRuleName());

            const lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
            const positionTuple = `(${lineAndCharacter.line + 1},${lineAndCharacter.character + 1})`;

            return `${fileName}${positionTuple}: warning ${camelizedRule}: ${failureString}`;
        });

        return outputLines.join("\n") + "\n";
    }
}
