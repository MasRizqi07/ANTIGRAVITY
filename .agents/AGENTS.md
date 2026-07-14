# Project-Scoped Governance Rules & Decisions

This workspace is subject to the following project-scoped decisions and rules:

## 1. ESLint Configuration Architecture (Governance Alignments)

As verified during Phase 0:

- `@antigravity/eslint-config` (the coordination layer config) is a simple preset that is less strict than framework-specific rules.
- **ai-coo** and **warkop-yareh** maintain custom configs because they are framework-integrated and strictly configured:
  - Both use `tseslint.configs.recommendedTypeChecked` which is stricter and type-aware.
  - Both are monorepos configured with workspace presets tailored for Next.js and NestJS respectively.
- **seapedia** and **Cake Boss** now have standalone `eslint.config.mjs` configurations matching the project NestJS patterns.
- Direct extension of the workspace configuration `@antigravity/eslint-config` is skipped to avoid syntax/path issues with framework-specific plugins and cross-repo resolution (since seapedia and Cake Boss are separate repositories not in the main pnpm workspace scope).
