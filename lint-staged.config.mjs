export default {
  'packages/**/*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  '*': (filenames) => {
    // Filter only files in the root hub directory
    const rootFiles = filenames.filter(
      (f) => !f.includes('/') && !f.includes('\\')
    );
    const jsFiles = rootFiles.filter((f) => /\.(js|mjs|ts)$/.test(f));
    const formatFiles = rootFiles.filter((f) =>
      /\.(json|md|yaml|yml|js|mjs|ts)$/.test(f)
    );

    const cmds = [];
    if (jsFiles.length > 0) {
      cmds.push(`eslint --fix ${jsFiles.join(' ')}`);
    }
    if (formatFiles.length > 0) {
      cmds.push(`prettier --write ${formatFiles.join(' ')}`);
    }
    return cmds;
  },
};
