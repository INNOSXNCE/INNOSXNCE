# INNOSXNCE — CI/CD Contributor Manual

This document is the **exact, step-by-step operating manual** for shipping changes to this repository. Follow it literally. Every command is copy-pasteable. Every rule stated here is enforced by automation — none of it is convention or courtesy.

**Read this once fully before your first PR. After that, use the [Quick Reference](#quick-reference) at the bottom.**

---

## 1. The system in one picture

```
 you push a branch ──► open a PR against main
                          │
                          ├─► CI runs (lint, typecheck, build on Node 20/22/24)   [REQUIRED]
                          ├─► CodeQL security analysis                            [REQUIRED]
                          └─► Preview deploy → URL posted as a PR comment         [not required]
                          │
              1 human approval (NOT yourself — GitHub forbids self-approval)
                          │
                       merge to main
                          │
              production deploy starts, then PAUSES
                          │
              a reviewer clicks "Approve and deploy" in the Actions tab
                          │
                 site goes live at https://innosxnce.vercel.app
```

Two separate human gates exist **on purpose**:

1. **PR approval** — someone other than the author reviews the code.
2. **Production approval** — after merge, someone explicitly releases the deploy.

Merging does **not** put anything live. Only the second gate does.

---

## 2. Hard rules (enforced by machines, not by trust)

| Rule | Enforced by | What happens if you ignore it |
|---|---|---|
| You cannot push directly to `main` | Branch protection | Push is rejected |
| Every change needs a PR | Branch protection | No other path exists |
| CI must pass on Node 20, 22, and 24 | Required status checks | Merge button stays disabled |
| CodeQL analysis must pass | Required status check | Merge button stays disabled |
| 1 approving review, not from the PR author | Branch protection | Merge button stays disabled |
| Production deploy requires explicit approval | `production` GitHub Environment | Deploy job waits indefinitely until approved |

---

## 3. Standard workflow — exact steps

### Step 1 — Start from a fresh `main`

```bash
git checkout main
git pull --ff-only
```

If `git pull --ff-only` fails, your local `main` has diverged. Do **not** force anything; run `git status`, and if you have no local commits on `main` that you need, run `git reset --hard origin/main`.

### Step 2 — Create a branch

```bash
git checkout -b <type>/<short-description>
```

Branch name format: `<type>/<kebab-case-description>`. Types in use: `feat`, `fix`, `ci`, `docs`, `chore`. Examples that exist in history: `ci/preview-deploys`, `fix/postcss-xss-override`.

### Step 3 — Make your change, verify locally BEFORE pushing

Run the exact same three things CI will run:

```bash
npm run lint        # must exit with no errors
npx tsc --noEmit    # must exit with no errors
npm run build       # must complete with 0 errors
```

If any of these fail locally, they **will** fail in CI. Fix them first — do not "push and see".

### Step 4 — Commit and push

```bash
git add <the specific files you changed>   # do not use `git add .` blindly
git commit -m "Short imperative summary of what the change does"
git push -u origin <your-branch-name>
```

Commit message format: first line is imperative mood ("Add X", "Fix Y", not "Added" / "Fixes"), ≤ 72 characters, describes the change honestly.

### Step 5 — Open the PR

```bash
gh pr create --base main --title "<same style as commit message>" --body "<what + why + how you verified it>"
```

The PR body must answer three questions: **what** changed, **why**, and **how you verified it** (commands you ran, what you observed).

### Step 6 — Wait for checks, then check the preview

Within ~1–2 minutes, the PR will show these checks:

- `install, lint, typecheck, build (node 20)` — must pass
- `install, lint, typecheck, build (node 22)` — must pass
- `install, lint, typecheck, build (node 24)` — must pass
- `Analyze (javascript-typescript)` / `CodeQL` — must pass
- `Deploy preview` — deploys your branch and **posts the preview URL as a comment on the PR**

**Open the preview URL and look at your change with your own eyes.** The preview is built from the exact commit that will become production if merged — if it looks wrong in preview, it will be wrong in production.

If a check fails: click the failing check → read the log → fix locally → push again. Every push re-runs all checks and produces a fresh preview.

### Step 7 — Get a review

Request a review from a teammate. **You cannot approve your own PR** — GitHub disables it, this is not a policy you can ask to bypass. The reviewer should open the preview URL as part of the review.

### Step 8 — Merge

Once checks are green and you have 1 approval, merge via the GitHub UI ("Merge pull request"). Then delete the branch when GitHub offers to.

### Step 9 — Release to production (the second gate)

Merging started a `Deploy` workflow run that is now **paused, waiting**:

1. Go to the repo → **Actions** tab → the `Deploy` run for your merge commit.
2. Click **Review deployments** → check `production` → **Approve and deploy**.
3. Wait ~1 minute for the run to finish, then verify: open **https://innosxnce.vercel.app** and confirm your change is live.

Only environment reviewers can approve this. If you are not one, ask one (currently: the repo maintainer). If a deploy should **not** go out yet, simply don't approve — it waits harmlessly. To discard it, reject it; the change ships with the next approved deploy anyway since deploys always build from current `main`.

---

## 4. Working with AI (strongly encouraged)

This entire CI/CD system was built and debugged with an AI coding agent (Claude Code), and it is designed to be operated with one. Use AI as your default first collaborator, with these exact rules:

### What to delegate to the AI

- Writing and refactoring code, then running `npm run lint`, `npx tsc --noEmit`, `npm run build` locally to prove it.
- Diagnosing failed CI checks: paste the failing job URL or log into the agent and ask for root cause **before** attempting fixes yourself.
- Git mechanics: branching, commits, pushes, opening PRs with `gh`, resolving lockfile conflicts (for Dependabot PRs, the correct fix is commenting `@dependabot rebase` on the PR — never hand-edit `package-lock.json`).
- Dependency triage: ask it to check whether a bump is compatible before merging (see §5).

### What to keep human

- **PR approvals.** An AI wrote the code; a human must be the one who reviews it. Never rubber-stamp.
- **Production deploy approvals.** The "Approve and deploy" click is a human decision, always.
- **Anything touching secrets or repo settings** (GitHub Environments, branch protection, Vercel tokens). Humans do these in the GitHub UI.

### How to prompt the AI effectively on this repo

1. Tell it the invariants up front: *"This repo requires PRs into `main`, CI on Node 20/22/24 + CodeQL must pass, 1 non-author approval, and production deploys pause at an environment gate."* (Or just point it at this file.)
2. Ask it to **verify, not just claim**: after any change, it must show you the passing lint/typecheck/build output.
3. Have it watch CI after pushing (`gh pr checks <number> --watch`) and report the result instead of assuming success.
4. When something fails, give it the actual log, not a paraphrase.

---

## 5. Dependabot PRs — exact handling

Dependabot opens dependency-bump PRs automatically. Handle them by these rules:

| Situation | Action |
|---|---|
| Minor/patch bump, CI green | Approve and merge. Safe by policy. |
| `@types/*` bump, CI green | Approve and merge. |
| PR shows a merge conflict in `package.json`/`package-lock.json` | Comment `@dependabot rebase` on the PR. Wait ~1 min. Never resolve by hand. |
| **`eslint` major bump (→10+)** | **Close it** with a comment. `eslint-config-next` bundles plugins incompatible with ESLint 10 (`contextOrFilename.getFilename is not a function`). Blocked until upstream ships support. |
| **`typescript` major bump (→7+)** | **Close it** with a comment. Bundled `typescript-eslint` cannot parse TS 7 (`Cannot read properties of undefined (reading 'Cjs')`). Blocked until upstream ships support. |
| CI red for any other reason | Investigate with the AI before merging or closing. |

**Known quirks — do not "fix" these:**

- Dependabot PRs **skip** the `Deploy preview` job (they run without secrets, so a preview is impossible). A skipped preview on a Dependabot PR is correct behavior, not a failure.
- `package.json` contains `"overrides": { "postcss": "$postcss" }`. This forces the postcss copy that `next` pins transitively up to our patched direct version (closed a real XSS advisory, CVE-2026-41305). **Do not remove it.** If npm ever errors with `EOVERRIDE`, the direct `postcss` entry and the override have drifted — keep the `$postcss` reference form.

---

## 6. Deploy system reference

File: `.github/workflows/deploy.yml`. Two jobs:

| Job | Trigger | Gate | Vercel env | Notes |
|---|---|---|---|---|
| `Deploy preview` | every PR against `main` | none (fast by design) | `preview` | Skipped for forks and Dependabot (no secrets). Posts URL comment on the PR. |
| `Deploy to production` | push to `main` (i.e., a merge) or manual dispatch | `production` environment — human approval | `production` | Never runs on PRs. |

- Secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) live in **two GitHub Environments** (`preview` and `production`), never in code. The Vercel project belongs to the team's Vercel account; if a token rotates, both environments must be updated in **Settings → Environments**.
- **Rollback / redeploy an older version:** Actions → `Deploy` → **Run workflow** → choose the old commit SHA or tag as the ref → approve the production gate. No special rollback machinery — any ref can be deployed.
- The per-deployment `*.vercel.app` URLs (long hash names) return HTTP 302 due to Vercel deployment protection; the public production URL is **https://innosxnce.vercel.app**. A 302 on the hash URL is normal.

---

## 7. What to do when things go wrong

| Symptom | Do exactly this |
|---|---|
| A required check is red on your PR | Open the check's log link → find the first error → fix locally → verify with the same command CI ran → push. |
| `Deploy preview` red on a **non-Dependabot** PR | Real problem. Check the job log; usually a Vercel credential or build issue. Escalate to the maintainer if the log shows empty `VERCEL_*` values. |
| Merge button disabled but checks green | You're missing the 1 non-author approval. Get a review. |
| Deploy run stuck on "waiting" | Not stuck — it's the production gate. An environment reviewer must approve it (§3 step 9). |
| Production deploy failed after approval | Open the run log. If `vercel pull` failed with "No existing credentials", the environment secrets are missing/rotated — maintainer must fix them in Settings → Environments → production. |
| You pushed to a branch and nothing happened | PRs trigger checks, bare branches don't. Open a PR. |
| Local `main` diverged / weird git state | `git fetch origin && git status`, read what it says, and if in doubt ask the AI to diagnose **before** running any `--force` or `reset --hard`. |

---

## Quick Reference

```bash
# start
git checkout main && git pull --ff-only
git checkout -b feat/my-change

# verify BEFORE pushing (same as CI)
npm run lint && npx tsc --noEmit && npm run build

# ship
git add <files> && git commit -m "Do the thing"
git push -u origin feat/my-change
gh pr create --base main --title "Do the thing" --body "what / why / how verified"
gh pr checks --watch          # wait for green
# → click the preview URL comment, eyeball it
# → get 1 approval (not yourself) → merge in UI
# → Actions tab → Deploy run → Review deployments → Approve and deploy
# → verify https://innosxnce.vercel.app
```

**The two golden rules:** nothing merges without a second human's approval, and nothing goes live without an explicit deploy approval. Everything else, automate — preferably with an AI doing the typing and a human doing the judging.
