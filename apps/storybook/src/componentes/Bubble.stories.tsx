import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from '@rafaelfachinelli/datum-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ExternalLink } from 'lucide-react'

const meta = {
  title: 'Componentes/Bubble',
  component: Bubble,
  args: { variant: 'accent', align: 'start' },
  argTypes: {
    variant: {
      description:
        'A cor do balão: `accent` na cor da temporada, `secondary` e `muted` neutros, `tinted` com um toque da temporada, `outline` só com borda, `ghost` sem fundo, `danger` para um erro.',
      control: 'select',
      options: [
        'accent',
        'secondary',
        'muted',
        'tinted',
        'outline',
        'ghost',
        'danger',
      ],
      table: { defaultValue: { summary: 'accent' } },
    },
    align: {
      description:
        'Empurra o balão para a direita (`end`), mesmo fora de uma Message.',
      control: 'inline-radio',
      options: ['start', 'end'],
      table: { defaultValue: { summary: 'start' } },
    },
  },
  decorators: [Story => <div className="max-w-xl">{Story()}</div>],
} satisfies Meta<typeof Bubble>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <Bubble {...args}>
      <BubbleContent>Quanto custa renovar o domínio do site?</BubbleContent>
    </Bubble>
  ),
}

const variants = [
  ['accent', 'Pode publicar a página nova da Páscoa?'],
  ['secondary', 'Publiquei. Está no ar em confeitaria.com.br/pascoa.'],
  ['muted', 'Agente do site entrou na conversa.'],
  ['tinted', 'Dica: a página tem 3 fotos sem texto alternativo.'],
  ['outline', 'Rascunho salvo, ainda não publicado.'],
  ['ghost', 'Uma resposta longa, sem balão, que ocupa a largura toda.'],
  ['danger', 'Não consegui publicar: o servidor recusou a conexão.'],
] as const

export const Variants: Story = {
  render: () => (
    <BubbleGroup className="gap-3">
      {variants.map(([variant, text]) => (
        <Bubble key={variant} variant={variant}>
          <BubbleContent>{text}</BubbleContent>
        </Bubble>
      ))}
    </BubbleGroup>
  ),
}

export const WithReactions: Story = {
  render: () => (
    <div className="grid gap-8 pb-4">
      <Bubble variant="secondary">
        <BubbleContent>
          O site passou no teste de velocidade: nota 96 no celular.
        </BubbleContent>
        <BubbleReactions>
          <span role="img" aria-label="Comemorando">
            🎉
          </span>
          <span className="text-ink-muted text-xs tabular-nums">2</span>
        </BubbleReactions>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>Mostra pra vó, ela vai gostar!</BubbleContent>
        <BubbleReactions align="start">
          <span role="img" aria-label="Coração">
            ❤️
          </span>
        </BubbleReactions>
      </Bubble>
    </div>
  ),
}

export const AsLink: Story = {
  render: () => (
    <Bubble variant="outline">
      <BubbleContent
        render={
          <a
            href="https://rafaelfachinelli.com"
            target="_blank"
            rel="noreferrer"
          />
        }
        className="flex items-center gap-2"
      >
        Ver o relatório de velocidade
        <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
      </BubbleContent>
    </Bubble>
  ),
}
