import { Button, Spinner } from '@rafaelfachinelli/datum-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Componentes/Spinner',
  component: Spinner,
  args: { label: 'Carregando' },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: args => (
    <div className="text-ink flex items-center gap-6">
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
    </div>
  ),
}

/**
 * A region still loading: the spinner in the middle of the space the content will take, with its words below. The
 * words say it, so the region is the status and the spinner goes without a label.
 */
export const Region: Story = {
  render: () => (
    <div
      role="status"
      className="border-line text-ink-muted flex h-64 max-w-md flex-col items-center justify-center gap-3 rounded-[var(--datum-radius-md)] border border-dashed"
    >
      <Spinner size="lg" className="text-season-accent" />
      <p className="m-0 text-sm">Carregando a equipe…</p>
    </div>
  ),
}

export const InAButton: Story = {
  render: () => <Button loading>Salvando</Button>,
}
