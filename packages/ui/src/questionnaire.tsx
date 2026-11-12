'use client'

import { Questionnaire as QuestionnairePrimitive } from '@shadcn/react/questionnaire'
import * as React from 'react'

import { type ButtonProps, buttonVariants } from './button.js'
import { controlClass } from './input.js'
import { cn } from './lib/cn.js'

/**
 * A form asked one question at a time (a `form`): choices, short answers, previous / skip / next. `items` lists the
 * questions and their choices, so the keyboard shortcuts (`shortcuts="letters"`) and the order are known up front.
 */
export function Questionnaire({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Root>) {
  return (
    <QuestionnairePrimitive.Root
      data-slot="questionnaire"
      className={cn('flex w-full min-w-0 flex-col gap-6', className)}
      {...props}
    />
  )
}

export type QuestionnaireProgressProps = Omit<
  React.ComponentProps<typeof QuestionnairePrimitive.Progress>,
  'aria-label' | 'children' | 'render'
> & {
  /** The accessible name of the progress bar, in the page's language ("Progresso"). */
  label: string
  /** The progress shown and spoken, from the current question and the total: (1, 3) => "Pergunta 1 de 3". */
  format: (current: number, total: number) => string
}

/** Where the person is in the questionnaire, as text and as a progress bar for screen readers. */
export function QuestionnaireProgress({
  className,
  label,
  format,
  ...props
}: QuestionnaireProgressProps) {
  return (
    <QuestionnairePrimitive.Progress
      data-slot="questionnaire-progress"
      aria-label={label}
      className={cn(
        'text-ink-muted min-h-[1lh] w-fit min-w-[14ch] font-mono text-xs font-medium tabular-nums',
        className,
      )}
      // The primitive writes its text in English; replace it with the consumer's.
      render={(renderProps, state) => {
        const text = state.total
          ? format(state.current, state.total)
          : undefined
        return (
          <div {...renderProps} aria-valuetext={text}>
            {text}
          </div>
        )
      }}
      {...props}
    />
  )
}

/** One question (a `fieldset`); only the current one is shown. `multiple` turns the choices into checkboxes. */
export function QuestionnaireItem({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Item>) {
  return (
    <QuestionnairePrimitive.Item
      data-slot="questionnaire-item"
      className={cn(
        'flex min-w-0 flex-col gap-5 border-0 p-0 outline-none',
        className,
      )}
      {...props}
    />
  )
}

/** The question (a `legend`). */
export function QuestionnaireTitle({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Title>) {
  return (
    <QuestionnairePrimitive.Title
      data-slot="questionnaire-title"
      className={cn(
        'font-display text-ink text-base font-semibold text-pretty [&:not(:has(~[data-slot=questionnaire-description]))]:mb-5',
        className,
      )}
      {...props}
    />
  )
}

/** A line under the question that helps answer it. */
export function QuestionnaireDescription({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Description>) {
  return (
    <QuestionnairePrimitive.Description
      data-slot="questionnaire-description"
      className={cn('text-ink-muted text-sm text-pretty', className)}
      {...props}
    />
  )
}

/** The list of choices. */
export function QuestionnaireChoices({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choices>) {
  return (
    <QuestionnairePrimitive.Choices
      data-slot="questionnaire-choices"
      className={cn(
        'group/questionnaire-choices grid min-w-0 gap-3',
        className,
      )}
      {...props}
    />
  )
}

/** One choice, a card with a radio (or a checkbox in a `multiple` question) and, with shortcuts on, its key. */
export function QuestionnaireChoice({
  children,
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Choice>) {
  return (
    <QuestionnairePrimitive.Choice
      data-slot="questionnaire-choice"
      className={cn(
        'group/questionnaire-choice border-line-strong text-ink hover:bg-well relative flex min-h-11 cursor-pointer items-start gap-3 rounded-[var(--datum-radius-md)] border bg-transparent px-4 py-3.5 text-start text-sm transition-colors outline-none select-none',
        'has-[>input:focus-visible]:ring-season-accent has-[>input:focus-visible]:ring-offset-board has-[>input:focus-visible]:ring-2 has-[>input:focus-visible]:ring-offset-2',
        'data-checked:border-season-accent data-checked:bg-well data-invalid:border-danger',
        'data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <QuestionnairePrimitive.ChoiceInput
        data-slot="questionnaire-choice-input"
        className="absolute inset-0 z-10 size-full cursor-pointer opacity-0"
      />
      <span
        aria-hidden="true"
        data-slot="questionnaire-choice-indicator"
        className="border-line-strong group-data-checked/questionnaire-choice:border-season-accent group-data-checked/questionnaire-choice:bg-season-accent group-data-checked/questionnaire-choice:text-season-on-accent pointer-events-none relative flex size-4 shrink-0 translate-y-[--spacing(0.45)] items-center justify-center rounded-[var(--datum-radius-sm)] border group-has-data-[slot=questionnaire-choice-description]/questionnaire-choice:translate-y-0.5 group-data-[type=radio]/questionnaire-choice:rounded-full"
      >
        <span
          data-slot="questionnaire-choice-indicator-dot"
          className="bg-season-on-accent hidden size-2 rounded-full group-data-checked/questionnaire-choice:block group-data-[type=checkbox]/questionnaire-choice:hidden"
        />
        <svg
          data-slot="questionnaire-choice-indicator-check"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="hidden size-3.5 group-data-checked/questionnaire-choice:block group-data-[type=radio]/questionnaire-choice:hidden"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <QuestionnairePrimitive.ChoiceLabel
        data-slot="questionnaire-choice-label"
        className="flex min-w-0 flex-1 flex-col gap-1 leading-snug"
      >
        {children}
      </QuestionnairePrimitive.ChoiceLabel>
      <QuestionnairePrimitive.ChoiceShortcut
        data-slot="questionnaire-choice-shortcut"
        className="border-line-strong bg-surface text-ink-muted pointer-events-none ms-auto hidden size-5 shrink-0 translate-y-[--spacing(0.45)] items-center justify-center rounded-[var(--datum-radius-sm)] border font-mono text-[0.625rem] leading-none font-medium group-has-data-[slot=questionnaire-choice-description]/questionnaire-choice:translate-y-0.5 group-data-[shortcut]/questionnaire-choice:inline-flex"
      />
    </QuestionnairePrimitive.Choice>
  )
}

/** A second line inside a choice. */
export function QuestionnaireChoiceDescription({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="questionnaire-choice-description"
      className={cn('text-ink-muted', className)}
      {...props}
    />
  )
}

/** A short written answer. Give it an `aria-label` or label it with the title. */
export function QuestionnaireInput({
  className,
  ...props
}: React.ComponentProps<typeof QuestionnairePrimitive.Input>) {
  return (
    <div
      data-slot="questionnaire-input-wrapper"
      className="group/questionnaire-input relative w-full min-w-0"
    >
      <QuestionnairePrimitive.Input
        data-slot="questionnaire-input"
        className={cn(
          controlClass,
          'h-9 min-h-11 px-3 py-1 text-base sm:min-h-0 md:text-sm',
          className,
        )}
        {...props}
      />
    </div>
  )
}

export type QuestionnaireErrorProps = Omit<
  React.ComponentProps<typeof QuestionnairePrimitive.Error>,
  'children'
> & {
  /** The message, in the page's language ("Escolha uma resposta para seguir."). Shown only when the item is invalid. */
  children: React.ReactNode
}

/** Why the person cannot go on yet. Announced as an alert when it shows. */
export function QuestionnaireError({
  className,
  ...props
}: QuestionnaireErrorProps) {
  return (
    <QuestionnairePrimitive.Error
      data-slot="questionnaire-error"
      className={cn('text-danger text-sm', className)}
      {...props}
    />
  )
}

/** The row of navigation buttons: previous on the left, skip and next (or submit) on the right. */
export function QuestionnaireActions({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="questionnaire-actions"
      className={cn(
        'grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 sm:min-h-9',
        className,
      )}
      {...props}
    />
  )
}

type NavigationProps<T extends React.ElementType> = Omit<
  React.ComponentProps<T>,
  'children'
> &
  Pick<ButtonProps, 'size' | 'variant'> & {
    /** The button text, in the page's language. */
    children: React.ReactNode
  }

/** Back to the previous question. Hidden on the first one. */
export function QuestionnairePrevious({
  className,
  size = 'md',
  variant = 'outline',
  ...props
}: NavigationProps<typeof QuestionnairePrimitive.Previous>) {
  return (
    <QuestionnairePrimitive.Previous
      data-slot="questionnaire-previous"
      data-size={size}
      data-variant={variant}
      className={cn(
        buttonVariants({ size, variant }),
        'col-start-1 row-start-1 min-h-11 justify-self-start sm:min-h-0',
        className,
      )}
      {...props}
    />
  )
}

/** Skips the question. Shown only when it is not required. */
export function QuestionnaireSkip({
  className,
  size = 'md',
  variant = 'outline',
  ...props
}: NavigationProps<typeof QuestionnairePrimitive.Skip>) {
  return (
    <QuestionnairePrimitive.Skip
      data-slot="questionnaire-skip"
      data-size={size}
      data-variant={variant}
      className={cn(
        buttonVariants({ size, variant }),
        'col-start-2 row-start-1 min-h-11 justify-self-end sm:min-h-0',
        className,
      )}
      {...props}
    />
  )
}

/** On to the next question (Enter). Hidden on the last one. */
export function QuestionnaireNext({
  className,
  size = 'md',
  variant = 'primary',
  ...props
}: NavigationProps<typeof QuestionnairePrimitive.Next>) {
  return (
    <QuestionnairePrimitive.Next
      data-slot="questionnaire-next"
      data-size={size}
      data-variant={variant}
      className={cn(
        buttonVariants({ size, variant }),
        'col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0',
        className,
      )}
      {...props}
    />
  )
}

/** Sends the answers. Shown only on the last question. */
export function QuestionnaireSubmit({
  className,
  size = 'md',
  variant = 'primary',
  ...props
}: NavigationProps<typeof QuestionnairePrimitive.Submit>) {
  return (
    <QuestionnairePrimitive.Submit
      data-slot="questionnaire-submit"
      data-size={size}
      data-variant={variant}
      className={cn(
        buttonVariants({ size, variant }),
        'col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0',
        className,
      )}
      {...props}
    />
  )
}
