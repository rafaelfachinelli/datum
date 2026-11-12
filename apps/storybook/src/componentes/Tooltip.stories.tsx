import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@rafaelfachinelli/datum-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Code, Globe, Mail, Share2 } from 'lucide-react'

const meta = {
  title: 'Componentes/Tooltip',
  component: Tooltip,
  decorators: [
    Story => (
      <div className="flex min-h-32 items-center justify-center">{Story()}</div>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <Tooltip {...args}>
      <TooltipTrigger
        render={
          <Button variant="outline" size="icon" aria-label="Compartilhar" />
        }
      >
        <Share2 />
      </TooltipTrigger>
      <TooltipContent>Compartilhar</TooltipContent>
    </Tooltip>
  ),
}

export const Open: Story = {
  args: { defaultOpen: true },
  render: args => (
    <Tooltip {...args}>
      <TooltipTrigger
        render={
          <Button variant="outline" size="icon" aria-label="Compartilhar" />
        }
      >
        <Share2 />
      </TooltipTrigger>
      <TooltipContent>Compartilhar</TooltipContent>
    </Tooltip>
  ),
}

export const Sides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-x-24 gap-y-12">
      {(['top', 'right', 'bottom', 'left'] as const).map(side => (
        <Tooltip key={side} defaultOpen>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            {side}
          </TooltipTrigger>
          <TooltipContent side={side}>Dica em {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-2">
        {(
          [
            [Code, 'Código'],
            [Globe, 'Site'],
            [Mail, 'E-mail'],
          ] as const
        ).map(([Icon, label]) => (
          <Tooltip key={label}>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon" aria-label={label} />}
            >
              <Icon />
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
}

export const OnDisabledAction: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger
        render={
          <span
            tabIndex={0}
            className="inline-flex rounded-[var(--datum-radius-md)]"
          />
        }
      >
        <Button disabled>Enviar</Button>
      </TooltipTrigger>
      <TooltipContent>Preencha o nome, o e-mail e a mensagem</TooltipContent>
    </Tooltip>
  ),
}
