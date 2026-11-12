import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@rafaelfachinelli/datum-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  CircleAlert,
  CircleCheck,
  FileSearch,
  Gauge,
  Globe,
  Hourglass,
  Search,
} from 'lucide-react'

const meta = {
  title: 'Componentes/Trace',
  component: TraceLine,
  args: { status: 'running' },
  argTypes: {
    status: {
      description:
        'O estado do passo: `running` faz o título brilhar, `pending` apaga a linha, `error` pinta na cor de perigo. Sem status, o passo terminou.',
      control: 'select',
      options: [undefined, 'running', 'pending', 'error'],
    },
  },
  decorators: [Story => <div className="max-w-xl">{Story()}</div>],
} satisfies Meta<typeof TraceLine>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <Trace>
      <TraceLine {...args}>
        <TraceIcon>
          <Gauge />
        </TraceIcon>
        <TraceTitle>Medindo a velocidade da página inicial</TraceTitle>
        <TraceDescription>4,2 s</TraceDescription>
      </TraceLine>
    </Trace>
  ),
}

export const Statuses: Story = {
  render: () => (
    <Trace>
      <TraceLine>
        <TraceIcon>
          <CircleCheck />
        </TraceIcon>
        <TraceTitle>Abri confeitaria.com.br</TraceTitle>
        <TraceDescription>0,8 s</TraceDescription>
      </TraceLine>
      <TraceLine status="error">
        <TraceIcon>
          <CircleAlert />
        </TraceIcon>
        <TraceTitle>O formulário de encomendas não respondeu</TraceTitle>
        <TraceDescription>30 s</TraceDescription>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <Search />
        </TraceIcon>
        <TraceTitle>Procurando o erro nos registros do servidor</TraceTitle>
      </TraceLine>
      <TraceLine status="pending">
        <TraceIcon>
          <Hourglass />
        </TraceIcon>
        <TraceTitle>Testar um pedido de ponta a ponta</TraceTitle>
      </TraceLine>
    </Trace>
  ),
}

export const LinkedStep: Story = {
  render: () => (
    <Trace>
      <a href="https://rafaelfachinelli.com">
        <TraceLine>
          <TraceIcon>
            <Globe />
          </TraceIcon>
          <TraceTitle>Li a página de encomendas</TraceTitle>
          <TraceDescription>confeitaria.com.br/encomendas</TraceDescription>
        </TraceLine>
      </a>
    </Trace>
  ),
}

export const CollapsibleStep: Story = {
  render: () => (
    <Trace>
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <FileSearch />
            </TraceIcon>
            <TraceTitle>Li 3 arquivos do site</TraceTitle>
            <TraceDescription>1,4 s</TraceDescription>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <ul className="grid gap-1 font-mono text-xs">
            <li>encomendas/index.html</li>
            <li>encomendas/formulario.js</li>
            <li>config/email.json</li>
          </ul>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine status="error">
            <TraceIcon>
              <CircleAlert />
            </TraceIcon>
            <TraceTitle>O envio de e-mail falhou</TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          O provedor recusou a senha. Ela venceu em 11 de novembro.
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  ),
}
