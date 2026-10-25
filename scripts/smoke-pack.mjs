// Installs the packed packages (exactly what npm would publish) into a new
// Vite + React + Tailwind 4 app and checks that it typechecks, builds, and
// gets the components' classes. Run after `npm run build`:
//   node scripts/smoke-pack.mjs
// With --published, it installs the versions in package.json from the npm
// registry instead, to check a release once it is out:
//   node scripts/smoke-pack.mjs --published
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'datum-smoke-'))
const app = path.join(work, 'app')
const run = (command, cwd) =>
  execSync(command, { cwd, stdio: 'pipe', encoding: 'utf8' })

function pack(dir) {
  const out = run(
    `npm pack --json --pack-destination "${work}"`,
    path.join(root, dir),
  )
  return path.join(work, JSON.parse(out)[0].filename)
}

function published(dir) {
  const { version } = JSON.parse(
    fs.readFileSync(path.join(root, dir, 'package.json'), 'utf8'),
  )
  return version
}

let tokens, ui
if (process.argv.includes('--published')) {
  tokens = published('packages/tokens')
  ui = published('packages/ui')
  console.log(`installing ${tokens} (tokens) and ${ui} (ui) from npm`)
} else {
  tokens = `file:${pack('packages/tokens')}`
  ui = `file:${pack('packages/ui')}`
  console.log(`packed ${path.basename(tokens)} and ${path.basename(ui)}`)
}

const files = {
  'package.json': JSON.stringify(
    {
      name: 'datum-smoke',
      private: true,
      type: 'module',
      dependencies: {
        '@rafaelfachinelli/datum-tokens': tokens,
        '@rafaelfachinelli/datum-ui': ui,
        react: '^19.0.0',
        'react-dom': '^19.0.0',
      },
      devDependencies: {
        '@tailwindcss/vite': '^4.3.3',
        '@types/react': '^19',
        '@types/react-dom': '^19',
        '@vitejs/plugin-react': '^5.0.0',
        tailwindcss: '^4.3.3',
        typescript: '~5.9.3',
        vite: '^7.1.0',
      },
    },
    null,
    2,
  ),
  'tsconfig.json': JSON.stringify({
    compilerOptions: {
      target: 'ES2022',
      module: 'ESNext',
      moduleResolution: 'Bundler',
      jsx: 'react-jsx',
      strict: true,
      noEmit: true,
      skipLibCheck: false,
    },
    include: ['src'],
  }),
  'vite.config.js': `import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
export default defineConfig({ plugins: [react(), tailwindcss()] })
`,
  'index.html': `<!doctype html><html><head><meta charset="utf-8" /></head>
<body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>
`,
  'src/styles.css': `@import 'tailwindcss';
@import '@rafaelfachinelli/datum-tokens/tokens.css';
@import '@rafaelfachinelli/datum-tokens/theme.css';
@import '@rafaelfachinelli/datum-ui/styles.css';
`,
  'src/main.tsx': `import './styles.css'
import { getSeason, seasonInlineScript } from '@rafaelfachinelli/datum-tokens'
import { Badge, Button, Card, CardContent, Stat } from '@rafaelfachinelli/datum-ui'
import { createRoot } from 'react-dom/client'

const season: string = getSeason()
console.log(season, seasonInlineScript.length)

createRoot(document.getElementById('root')!).render(
  <Card>
    <CardContent>
      <Badge>Datum</Badge>
      <Stat label="Componentes" value="14" />
      <Button loading>Enviar</Button>
    </CardContent>
  </Card>,
)
`,
}
for (const [name, content] of Object.entries(files)) {
  fs.mkdirSync(path.dirname(path.join(app, name)), { recursive: true })
  fs.writeFileSync(path.join(app, name), content)
}

run('npm install --no-audit --no-fund', app)
run('npx tsc -p tsconfig.json', app)
console.log('typecheck: ok')

// Plain Node ESM (no bundler): the relative imports must carry their extensions.
const season = run(
  `node --input-type=module -e "import { getSeason } from '@rafaelfachinelli/datum-tokens'; console.log(getSeason())"`,
  app,
).trim()
console.log(`node import: ok (season ${season})`)

run('npx vite build', app)
const css = fs
  .readdirSync(path.join(app, 'dist', 'assets'))
  .filter(file => file.endsWith('.css'))
  .map(file => fs.readFileSync(path.join(app, 'dist', 'assets', file), 'utf8'))
  .join('\n')
const expected = {
  'token variables': '--datum-color-board',
  'season accent utility': '.bg-season-accent',
  // Only the built Button has this class: proves @source scans the package's dist.
  'component class from dist': 'animation-duration:2s',
}
const missing = Object.entries(expected).filter(
  ([, needle]) => !css.includes(needle),
)
if (missing.length > 0) {
  console.error(
    `missing in the built CSS: ${missing.map(([label]) => label).join(', ')}`,
  )
  process.exit(1)
}
console.log(
  'vite build: ok, the CSS has the tokens and the components’ classes',
)
fs.rmSync(work, { recursive: true, force: true })
