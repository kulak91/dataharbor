import { type UserConfig } from '@commitlint/types';

import { ProjectPrefix } from './project.config';

const COMMIT_MODIFIERS = ['+', '*', '-'];
const COMMIT_MESSAGE_REGEXP = new RegExp(
  `^(((${ProjectPrefix.APP})-[0-9]{1,6})|(${ProjectPrefix.ENVIRONMENTS.join(
    '|',
  )})): ([${COMMIT_MODIFIERS.join(',')}]) (.*\\S)$`,
);
const COMMIT_MESSAGE_MATCH_RULE_MESSAGE = `commit message doesn't match format requirements
Commit message must have one of the following formats:
  - <project-prefix>-<issue-number>: <modifier> <description>
  - <environment>: <modifier> <description>
Where:
  - <project-prefix>: ${ProjectPrefix.APP}
  - <modifier>: ${COMMIT_MODIFIERS.join(', ')}
  - <environment>: ${ProjectPrefix.ENVIRONMENTS.join(', ')}
Examples:
  - dat-5: + articles feed page
  - dat-12: * create article form
  - production: - comments in ui/ux`;

const configuration: UserConfig = {
  parserPreset: {
    parserOpts: {
      headerPattern: COMMIT_MESSAGE_REGEXP,
      headerCorrespondence: ['prefix', 'modifier', 'description'],
    },
  },
  defaultIgnores: true,
  plugins: [
    {
      rules: {
        'commit-message-match': ({ header }): [true] | [false, string] => {
          if (!COMMIT_MESSAGE_REGEXP.test(header)) {
            return [false, COMMIT_MESSAGE_MATCH_RULE_MESSAGE];
          }

          return [true];
        },
      },
    },
  ],
  rules: {
    'commit-message-match': [2, 'always'],
  },
};

export default configuration;
