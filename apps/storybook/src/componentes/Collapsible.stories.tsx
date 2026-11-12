import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@rafaelfachinelli/datum-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronDown } from 'lucide-react'

const meta = {
  title: 'Componentes/Collapsible',
  component: Collapsible,
  argTypes: {
    defaultOpen: {
      description: 'Começa aberto (sem controlar o estado).',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    open: {
      description: 'Aberto ou fechado, quando o estado é controlado.',
      control: false,
    },
    onOpenChange: {
      description: 'Chamado com o novo estado ao abrir ou fechar.',
    },
    disabled: {
      description: 'Impede abrir e fechar.',
      control: 'boolean',
    },
  },
  decorators: [Story => <div className="max-w-md">{Story()}</div>],
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

function Example(props: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible className="grid gap-2" {...props}>
      <CollapsibleTrigger
        render={<Button variant="ghost" className="group w-fit px-2" />}
      >
        O que o agente olhou no site
        <ChevronDown className="transition-transform group-aria-expanded:rotate-180 motion-reduce:transition-none" />
      </CollapsibleTrigger>
      <CollapsibleContent className="text-ink-muted text-sm">
        <ul className="list-disc space-y-1 pl-6">
          <li>A página inicial e o cardápio.</li>
          <li>O tempo de carregamento no celular.</li>
          <li>Os links do rodapé.</li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

export const Closed: Story = {
  args: { defaultOpen: false },
  render: args => <Example {...args} />,
}

export const Open: Story = {
  args: { defaultOpen: true },
  render: args => <Example {...args} />,
}
