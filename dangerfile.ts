import { message, danger, fail, warn, markdown } from 'danger';

const modifiedMD = danger.git.modified_files.join('- ');
message('Changed Files in this PR: \n - ' + modifiedMD);

const titleRegexPattern = /^\w+: .+$/;

// if (!danger.github.pr.assignee) {
//   const method = danger.github.pr.title.includes('WIP') ? warn : fail;
//   method('This pull request needs an assignee, and optionally include any reviewers.');
// }

if (!danger.github.pr.title.match(titleRegexPattern)) {
  warn('The PR title should match this pattern `<type>: <subject>`');
}

const packageChanged = danger.git.modified_files.includes('package.json');
const lockfileChanged = danger.git.modified_files.includes('pnpm-lock.yaml');
if (packageChanged && !lockfileChanged) {
  const message = 'Changes were made to package.json, but not to `pnpm-lock.yaml`';
  const idea = 'Perhaps you need to run `pnpm install`?';
  fail(`${message} - <i>${idea}</i>`);
}

let errorCount = 0;
const bigPRThreshold = 600;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  fail(':exclamation: Big PR (' + ++errorCount + ')');
  markdown(
    '> (' +
      errorCount +
      ') : Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.'
  );
}
