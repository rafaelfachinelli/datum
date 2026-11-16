import { Button, Toaster, useToast } from '@rafaelfachinelli/datum-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Componentes/Toast',
  component: Toaster,
  args: { closeLabel: 'Fechar', children: null },
  decorators: [
    (Story, context) => (
      <Toaster
        closeLabel={context.args.closeLabel}
        timeout={context.args.timeout}
      >
        <Story />
      </Toaster>
    ),
  ],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

/** Something done: the answer was sent, and the page moved on. */
function SendButton() {
  const toast = useToast()
  return (
    <Button onClick={() => toast.success('Enviado: a mudança vai para o site')}>
      Enviar
    </Button>
  )
}

export const Default: Story = {
  render: () => <SendButton />,
}

function Tones() {
  const toast = useToast()
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast.success('Salvo')}>
        Feito
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.show('A equipe foi avisada')}
      >
        Neutro
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.show('A prévia ainda está sendo montada', {
            tone: 'warning',
            description: 'Abra o link em alguns minutos.',
          })
        }
      >
        Atenção
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.show('A resposta não chegou', {
            tone: 'danger',
            description: 'Tente de novo.',
          })
        }
      >
        Falhou
      </Button>
    </div>
  )
}

export const AllTones: Story = {
  render: () => <Tones />,
}
