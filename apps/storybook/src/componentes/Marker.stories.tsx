import { Marker, MarkerContent, MarkerIcon } from '@rafaelfachinelli/datum-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bot, Globe, Sparkles } from 'lucide-react'

const meta = {
  title: 'Componentes/Marker',
  component: Marker,
  args: { variant: 'default' },
  argTypes: {
    variant: {
      description:
        '`default` é uma linha simples, `separator` centraliza o texto entre dois traços, `border` sublinha com um fio.',
      control: 'select',
      options: ['default', 'separator', 'border'],
      table: { defaultValue: { summary: 'default' } },
    },
  },
  decorators: [Story => <div className="max-w-xl">{Story()}</div>],
} satisfies Meta<typeof Marker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <Marker {...args}>
      <MarkerIcon>
        <Bot />
      </MarkerIcon>
      <MarkerContent>O agente do site entrou na conversa.</MarkerContent>
    </Marker>
  ),
}

export const Separator: Story = {
  args: { variant: 'separator' },
  render: args => (
    <Marker {...args}>
      <MarkerContent>Hoje</MarkerContent>
    </Marker>
  ),
}

export const Border: Story = {
  args: { variant: 'border' },
  render: args => (
    <Marker {...args}>
      <MarkerIcon>
        <Globe />
      </MarkerIcon>
      <MarkerContent>
        Conversa sobre{' '}
        <a href="https://rafaelfachinelli.com">confeitaria.com.br</a>
      </MarkerContent>
    </Marker>
  ),
}

export const LiveStatus: Story = {
  render: args => (
    <div role="status">
      <Marker {...args}>
        <MarkerIcon>
          <Sparkles />
        </MarkerIcon>
        <MarkerContent className="shimmer">
          Analisando as páginas do site…
        </MarkerContent>
      </Marker>
    </div>
  ),
}
