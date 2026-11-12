'use client'

import * as React from 'react'
import {
  createCssVariablesTheme,
  createHighlighterCore,
  type GrammarState,
  type HighlighterCore,
} from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

// Code colors for CodeBlock, from shadcn/ui's highlighter (MIT), on Shiki. Its own entry point
// (`@rafaelfachinelli/datum-ui/highlight`), so only an app that colors code installs shiki. The colors are CSS
// variables (`--datum-code-*` in styles.css), so code follows Datum's palette.

// Each language loads the first time it is used.
const languages = {
  bash: () => import('shiki/langs/shellscript.mjs'),
  css: () => import('shiki/langs/css.mjs'),
  diff: () => import('shiki/langs/diff.mjs'),
  html: () => import('shiki/langs/html.mjs'),
  javascript: () => import('shiki/langs/javascript.mjs'),
  json: () => import('shiki/langs/json.mjs'),
  jsx: () => import('shiki/langs/jsx.mjs'),
  markdown: () => import('shiki/langs/markdown.mjs'),
  python: () => import('shiki/langs/python.mjs'),
  sql: () => import('shiki/langs/sql.mjs'),
  tsx: () => import('shiki/langs/tsx.mjs'),
  typescript: () => import('shiki/langs/typescript.mjs'),
  yaml: () => import('shiki/langs/yaml.mjs'),
}

const aliases: Record<string, keyof typeof languages> = {
  js: 'javascript',
  md: 'markdown',
  py: 'python',
  sh: 'bash',
  shell: 'bash',
  shellscript: 'bash',
  ts: 'typescript',
  yml: 'yaml',
  zsh: 'bash',
}

/** The languages CodeBlock colors, and their aliases. Anything else shows plain. */
export const highlightedLanguages = [
  ...Object.keys(languages),
  ...Object.keys(aliases),
]

const theme = createCssVariablesTheme({
  name: 'datum',
  variablePrefix: '--datum-code-',
  fontStyle: true,
})

let shared: Promise<HighlighterCore> | undefined

function getHighlighter() {
  shared ??= createHighlighterCore({
    themes: [theme],
    langs: [],
    engine: createJavaScriptRegexEngine({ forgiving: true }),
  })
  return shared
}

function languageOf(language: string) {
  const name = language.toLowerCase()
  if (name in languages) return name as keyof typeof languages
  return aliases[name] ?? null
}

/** Loads a language and returns a highlighter for it, or null for a language Datum does not color. */
async function loadHighlighter(language: string) {
  const lang = languageOf(language)
  if (!lang) return null
  const shiki = await getHighlighter()
  if (!shiki.getLoadedLanguages().includes(lang))
    await shiki.loadLanguage(languages[lang])
  return {
    // One React node per line, and the grammar state after the last line, to continue from it.
    highlight(code: string, state?: GrammarState) {
      const tokens = shiki.codeToTokens(code, {
        lang,
        theme: 'datum',
        grammarState: state,
      }).tokens
      return {
        lines: tokens.map(line =>
          line.map((token, index) => (
            <span
              key={index}
              style={{
                color: token.color,
                fontStyle:
                  token.fontStyle && token.fontStyle & 1 ? 'italic' : undefined,
                fontWeight:
                  token.fontStyle && token.fontStyle & 2 ? 600 : undefined,
              }}
            >
              {token.content}
            </span>
          )),
        ),
        state: shiki.getLastGrammarState(tokens),
      }
    },
  }
}

/**
 * The code's lines, colored, for CodeBlockLine. Plain lines until the highlighter loads, or for a language Datum does
 * not color. While the code streams, only the new complete lines are tokenized, from the grammar state of the last one.
 */
export function useHighlightedCode(
  value: string,
  language: string,
): React.ReactNode[] {
  // A trailing newline would render as an extra empty line.
  const code = value.endsWith('\n') ? value.slice(0, -1) : value
  const [loaded, setLoaded] = React.useState<{
    language: string
    highlighter: Awaited<ReturnType<typeof loadHighlighter>>
  } | null>(null)
  const highlighter = loaded?.language === language ? loaded.highlighter : null

  React.useEffect(() => {
    let cancelled = false
    loadHighlighter(language)
      .then(next => {
        if (!cancelled) setLoaded({ language, highlighter: next })
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [language])

  const [done, setDone] = React.useState<{
    highlighter: typeof highlighter
    text: string
    lines: React.ReactNode[]
    state?: GrammarState
  }>({ highlighter: null, text: '', lines: [] })

  let next = done
  if (next.highlighter !== highlighter || !code.startsWith(next.text)) {
    next = { highlighter, text: '', lines: [] }
  }

  const end = code.lastIndexOf('\n') + 1
  if (highlighter && end > next.text.length) {
    const result = highlighter.highlight(
      code.slice(next.text.length, end - 1),
      next.state,
    )
    next = {
      highlighter,
      text: code.slice(0, end),
      lines: [...next.lines, ...result.lines],
      state: result.state,
    }
  }

  if (next !== done) setDone(next)

  // The last line is still being written, so it is tokenized on every render.
  const tail = code.slice(end)

  return React.useMemo(() => {
    if (!highlighter) return code.split('\n')
    return [...next.lines, highlighter.highlight(tail, next.state).lines[0]]
  }, [code, highlighter, next, tail])
}
