import { Button } from '@rafaelfachinelli/datum-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight, Download, Plus } from 'lucide-react'

const meta = {
  title: 'Componentes/Button',
  component: Button,
  args: { children: 'Baixar currículo' },
  argTypes: {
    variant: {
      description: 'Peso visual da ação.',
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'danger'],
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      description:
        'Altura e espaçamento. `icon` é quadrado, para botões só com ícone.',
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      table: { defaultValue: { summary: 'md' } },
    },
    loading: {
      description: 'Mostra o indicador, bloqueia cliques e marca `aria-busy`.',
      control: 'boolean',
    },
    disabled: { description: 'Desabilita o botão.', control: 'boolean' },
    render: {
      description:
        'Desenha outro elemento (por exemplo um link) com o visual do componente. Veja a história **As Link**.',
      control: false,
    },
    children: { description: 'O texto e, se houver, o ícone.' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Variants: Story = {
  render: args => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
      <Button {...args} variant="danger">
        Danger
      </Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: args => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="icon" aria-label="Adicionar">
        <Plus />
      </Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: args => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args}>
        <Download />
        Baixar currículo
      </Button>
      <Button {...args} variant="outline">
        Ver projetos
        <ArrowRight />
      </Button>
    </div>
  ),
}

export const Loading: Story = {
  args: { loading: true, children: 'Enviando' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const AsLink: Story = {
  render: args => (
    <Button
      {...args}
      render={<a href="https://rafaelfachinelli.com" />}
      nativeButton={false}
      variant="outline"
    >
      Abrir o portfólio
    </Button>
  ),
}
