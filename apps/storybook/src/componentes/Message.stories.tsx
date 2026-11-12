import {
  Bubble,
  BubbleContent,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from '@rafaelfachinelli/datum-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bot, CheckCheck } from 'lucide-react'

const meta = {
  title: 'Componentes/Message',
  component: Message,
  argTypes: {
    align: {
      description:
        'O lado da mensagem: `end` (à direita) para quem está lendo, `start` (à esquerda) para o outro lado da conversa.',
      control: 'inline-radio',
      options: ['start', 'end'],
      table: { defaultValue: { summary: 'start' } },
    },
  },
  decorators: [Story => <div className="max-w-xl">{Story()}</div>],
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

function AgentAvatar() {
  return (
    <MessageAvatar className="size-8">
      <Bot className="text-season-accent size-4" aria-hidden="true" />
    </MessageAvatar>
  )
}

export const FromThePerson: Story = {
  args: { align: 'end' },
  render: args => (
    <Message {...args}>
      <MessageContent>
        <Bubble>
          <BubbleContent>
            O site da confeitaria está demorando para abrir no celular. Dá pra
            ver o que é?
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ),
}

export const FromTheAgent: Story = {
  args: { align: 'start' },
  render: args => (
    <Message {...args}>
      <AgentAvatar />
      <MessageContent>
        <Bubble variant="secondary">
          <BubbleContent>
            Olhei agora: as fotos do cardápio têm 4 MB cada. Posso gerar versões
            menores e trocar no site?
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ),
}

export const Grouped: Story = {
  render: () => (
    <Message>
      <AgentAvatar />
      <MessageContent>
        <MessageGroup>
          <Bubble variant="secondary">
            <BubbleContent>Pronto, troquei as 12 fotos.</BubbleContent>
          </Bubble>
          <Bubble variant="secondary">
            <BubbleContent>
              A página inicial caiu de 9 para 2 segundos no 4G.
            </BubbleContent>
          </Bubble>
          <Bubble variant="secondary">
            <BubbleContent>Quer que eu faça o mesmo na galeria?</BubbleContent>
          </Bubble>
        </MessageGroup>
      </MessageContent>
    </Message>
  ),
}

export const WithHeaderAndFooter: Story = {
  render: () => (
    <div className="grid gap-6">
      <Message>
        <AgentAvatar />
        <MessageContent>
          <MessageHeader>Agente do site · 14:02</MessageHeader>
          <Bubble variant="secondary">
            <BubbleContent>
              O formulário de encomendas voltou a enviar e-mails. O problema era
              a senha do provedor, que venceu ontem.
            </BubbleContent>
          </Bubble>
          <MessageFooter>Verificado com um pedido de teste</MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <MessageHeader>Você · 14:05</MessageHeader>
          <Bubble>
            <BubbleContent>Valeu! Me avisa se vencer de novo.</BubbleContent>
          </Bubble>
          <MessageFooter className="gap-1">
            <CheckCheck className="size-3.5" aria-hidden="true" />
            Lida
          </MessageFooter>
        </MessageContent>
      </Message>
    </div>
  ),
}
