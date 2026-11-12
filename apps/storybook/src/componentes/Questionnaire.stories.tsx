import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@rafaelfachinelli/datum-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

const meta = {
  title: 'Componentes/Questionnaire',
  component: Questionnaire,
  args: { shortcuts: 'letters' },
  argTypes: {
    shortcuts: {
      description:
        'Atalhos de teclado para as escolhas: letras (A, B, C) ou números (1, 2, 3).',
      control: 'inline-radio',
      options: [undefined, 'letters', 'numbers'],
    },
    items: {
      description:
        'As perguntas e as escolhas de cada uma, na ordem. Definem os atalhos e o total do progresso.',
      control: false,
    },
    onSubmit: {
      description:
        'Chamado ao enviar a última pergunta (um `submit` de formulário).',
    },
  },
  decorators: [Story => <div className="max-w-lg">{Story()}</div>],
} satisfies Meta<typeof Questionnaire>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  {
    name: 'site',
    required: true,
    choices: [
      { value: 'confeitaria' },
      { value: 'blog' },
      { value: 'portfolio' },
    ],
  },
  {
    name: 'permissoes',
    choices: [{ value: 'fotos' }, { value: 'paginas' }, { value: 'dominio' }],
  },
  { name: 'email' },
] as const

function SetupFlow(props: React.ComponentProps<typeof Questionnaire>) {
  const [sent, setSent] = React.useState<string | null>(null)

  return (
    <div className="grid gap-4">
      <Questionnaire
        {...props}
        items={items}
        onSubmit={event => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          setSent(
            [
              `Site: ${data.get('site') ?? '—'}`,
              `Pode: ${data.getAll('permissoes').join(', ') || 'nada sozinho'}`,
              `Avisos: ${data.get('email') || 'sem e-mail'}`,
            ].join(' · '),
          )
        }}
      >
        <QuestionnaireProgress
          label="Progresso"
          format={(current, total) => `Pergunta ${current} de ${total}`}
        />

        <QuestionnaireItem name="site" required>
          <QuestionnaireTitle>
            Qual site o agente vai cuidar?
          </QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="confeitaria">
              Confeitaria da família
              <QuestionnaireChoiceDescription>
                confeitaria.com.br
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="blog">
              Blog de receitas
              <QuestionnaireChoiceDescription>
                receitasdavo.com.br
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="portfolio">
              Portfólio
              <QuestionnaireChoiceDescription>
                rafaelfachinelli.com
              </QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError>Escolha um site para seguir.</QuestionnaireError>
        </QuestionnaireItem>

        <QuestionnaireItem name="permissoes" multiple>
          <QuestionnaireTitle>
            O que ele pode fazer sem perguntar?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            O resto ele pergunta aqui na conversa antes de fazer.
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="fotos">
              Trocar fotos por versões mais leves
            </QuestionnaireChoice>
            <QuestionnaireChoice value="paginas">
              Publicar páginas que você aprovou
            </QuestionnaireChoice>
            <QuestionnaireChoice value="dominio">
              Renovar o domínio
            </QuestionnaireChoice>
          </QuestionnaireChoices>
        </QuestionnaireItem>

        <QuestionnaireItem name="email">
          <QuestionnaireTitle>Para onde mandar os avisos?</QuestionnaireTitle>
          <QuestionnaireDescription>
            Quando o site cair ou algo vencer. Pode pular e ver só aqui.
          </QuestionnaireDescription>
          <QuestionnaireInput
            type="email"
            aria-label="E-mail para os avisos"
            placeholder="voce@exemplo.com"
          />
        </QuestionnaireItem>

        <QuestionnaireActions>
          <QuestionnairePrevious>Voltar</QuestionnairePrevious>
          <QuestionnaireSkip>Pular</QuestionnaireSkip>
          <QuestionnaireNext>Seguir</QuestionnaireNext>
          <QuestionnaireSubmit>Concluir</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
      {sent && (
        <p role="status" className="text-ink-muted text-sm">
          {sent}
        </p>
      )}
    </div>
  )
}

export const Flow: Story = {
  render: args => <SetupFlow {...args} />,
}

export const WithoutShortcuts: Story = {
  args: { shortcuts: undefined },
  render: args => <SetupFlow {...args} />,
}
