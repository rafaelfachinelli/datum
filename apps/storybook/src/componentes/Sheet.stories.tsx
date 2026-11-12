import {
  Button,
  Field,
  Input,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@rafaelfachinelli/datum-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Filter } from 'lucide-react'

const meta = {
  title: 'Componentes/Sheet',
  component: Sheet,
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline" />}>
        <Filter />
        Filtros
      </SheetTrigger>
      <SheetContent closeLabel="Fechar">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>Refine a lista de projetos.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-4">
          <Field label="Linguagem">
            <Input placeholder="TypeScript" />
          </Field>
          <Field label="Ano">
            <Input placeholder="2026" inputMode="numeric" />
          </Field>
        </div>
        <SheetFooter>
          <Button>Aplicar</Button>
          <SheetClose render={<Button variant="outline" />}>
            Cancelar
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const Open: Story = {
  args: { defaultOpen: true },
  render: args => (
    <div className="h-96">
      <Sheet {...args}>
        <SheetTrigger render={<Button variant="outline" />}>Abrir</SheetTrigger>
        <SheetContent closeLabel="Fechar">
          <SheetHeader>
            <SheetTitle>Detalhes</SheetTitle>
            <SheetDescription>
              O painel abre sobre a página e prende o foco até fechar.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  ),
}

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['left', 'right', 'top', 'bottom'] as const).map(side => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline" />}>
            {side}
          </SheetTrigger>
          <SheetContent side={side} closeLabel="Fechar">
            <SheetHeader>
              <SheetTitle>Painel em {side}</SheetTitle>
              <SheetDescription>
                Escolha a borda conforme o conteúdo e o dispositivo.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
}
