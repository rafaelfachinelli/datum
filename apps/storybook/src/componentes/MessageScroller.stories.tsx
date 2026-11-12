import {
  Bubble,
  BubbleContent,
  Button,
  Marker,
  MarkerContent,
  Message,
  MessageAvatar,
  MessageContent,
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@rafaelfachinelli/datum-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bot } from 'lucide-react'
import * as React from 'react'

const meta = {
  title: 'Componentes/MessageScroller',
  component: MessageScrollerProvider,
  args: { autoScroll: true, defaultScrollPosition: 'end' },
  argTypes: {
    autoScroll: {
      description:
        'Acompanha as mensagens novas enquanto quem lê está no fim da conversa.',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    defaultScrollPosition: {
      description:
        'Onde a conversa abre: no começo, no fim ou na última âncora (`last-anchor`).',
      control: 'select',
      options: ['start', 'end', 'last-anchor'],
    },
  },
  decorators: [Story => <div className="max-w-xl">{Story()}</div>],
} satisfies Meta<typeof MessageScrollerProvider>

export default meta
type Story = StoryObj<typeof meta>

type Turn = { id: string; from: 'person' | 'agent'; text: string }

const conversation: Turn[] = [
  ['person', 'Oi! O site da confeitaria saiu do ar?'],
  ['agent', 'Não, está no ar. Só a página de encomendas responde devagar.'],
  ['person', 'Desde quando?'],
  ['agent', 'Desde ontem às 19h, quando o plano de hospedagem renovou.'],
  ['person', 'Mudou alguma coisa no plano?'],
  [
    'agent',
    'Mudou: o plano novo tem metade da memória. O formulário de encomendas usa mais que isso nos horários de pico.',
  ],
  ['person', 'E o que dá pra fazer?'],
  [
    'agent',
    'Duas saídas: voltar ao plano anterior (R$ 12 a mais por mês) ou eu deixo o formulário mais leve, sem custo.',
  ],
  ['person', 'Deixa mais leve então.'],
  ['agent', 'Combinado. Começo agora e aviso aqui quando terminar.'],
  ['person', 'Quanto tempo leva?'],
  ['agent', 'Uns 20 minutos, com os testes.'],
].map(([from, text], index) => ({
  id: `m${index}`,
  from: from as Turn['from'],
  text,
}))

function AgentAvatar() {
  return (
    <MessageAvatar className="size-8">
      <Bot className="text-season-accent size-4" aria-hidden="true" />
    </MessageAvatar>
  )
}

function TurnMessage({ turn }: { turn: Turn }) {
  return turn.from === 'person' ? (
    <Message align="end">
      <MessageContent>
        <Bubble>
          <BubbleContent>{turn.text}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  ) : (
    <Message>
      <AgentAvatar />
      <MessageContent>
        <Bubble variant="ghost">
          <BubbleContent>{turn.text}</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}

export const LongConversation: Story = {
  render: args => (
    <div className="border-line-strong bg-surface h-96 rounded-[var(--datum-radius-md)] border">
      <MessageScrollerProvider {...args}>
        <MessageScroller>
          <MessageScrollerViewport aria-label="Mensagens" className="p-4">
            <MessageScrollerContent className="gap-6">
              <MessageScrollerItem>
                <Marker variant="separator">
                  <MarkerContent>Hoje</MarkerContent>
                </Marker>
              </MessageScrollerItem>
              {conversation.map(turn => (
                <MessageScrollerItem
                  key={turn.id}
                  messageId={turn.id}
                  scrollAnchor={turn.from === 'person'}
                >
                  <TurnMessage turn={turn} />
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton label="Ir para o fim" />
          <MessageScrollerButton direction="start" label="Ir para o começo" />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  ),
}

const reply =
  'Terminei. O formulário de encomendas agora carrega as fotos dos bolos só quando aparecem na tela e guarda o cardápio em cache por uma hora. No horário de pico de ontem ele usaria 40% da memória do plano, em vez de 130%. Testei três pedidos, e os e-mails chegaram em menos de um minuto.'

function StreamingConversation(
  props: React.ComponentProps<typeof MessageScrollerProvider>,
) {
  const words = React.useMemo(() => reply.split(' '), [])
  const [shown, setShown] = React.useState(0)
  const [run, setRun] = React.useState(0)

  React.useEffect(() => {
    setShown(0)
    const timer = setInterval(() => {
      setShown(count => {
        if (count >= words.length) {
          clearInterval(timer)
          return count
        }
        return count + 1
      })
    }, 80)
    return () => clearInterval(timer)
  }, [run, words.length])

  const streaming = shown < words.length

  return (
    <div className="grid gap-3">
      <div className="border-line-strong bg-surface h-80 rounded-[var(--datum-radius-md)] border">
        <MessageScrollerProvider {...props}>
          <MessageScroller>
            <MessageScrollerViewport aria-label="Mensagens" className="p-4">
              <MessageScrollerContent className="gap-6">
                {conversation.slice(8).map(turn => (
                  <MessageScrollerItem
                    key={turn.id}
                    messageId={turn.id}
                    scrollAnchor={turn.from === 'person'}
                  >
                    <TurnMessage turn={turn} />
                  </MessageScrollerItem>
                ))}
                <MessageScrollerItem messageId="reply" aria-busy={streaming}>
                  <TurnMessage
                    turn={{
                      id: 'reply',
                      from: 'agent',
                      text: words.slice(0, shown).join(' '),
                    }}
                  />
                </MessageScrollerItem>
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton label="Ir para o fim" />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => setRun(value => value + 1)}
      >
        Responder de novo
      </Button>
    </div>
  )
}

export const StreamingReply: Story = {
  render: args => <StreamingConversation {...args} />,
}
