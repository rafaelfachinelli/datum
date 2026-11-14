import {
  Button,
  Callout,
  CalloutContent,
  CalloutTitle,
  DevicePreview,
  type DevicePreviewDevice,
} from '@rafaelfachinelli/datum-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ExternalLink } from 'lucide-react'
import { useState } from 'react'

// A small responsive page, as an agent's artifact would be: one column on a phone, two from 640 px. Inside an iframe
// the page sees the device's width, so its media queries answer to the tab.
const page = `<!doctype html>
<html lang="pt-BR">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root { color-scheme: dark; }
  body { margin: 0; font: 16px/1.5 system-ui, sans-serif; background: #071027; color: #e6edf8; }
  header { padding: 24px; border-bottom: 1px solid #7dd3fc52; }
  h1 { margin: 0; font-size: 24px; }
  p { margin: 8px 0 0; color: #a3b3cc; }
  main { display: grid; gap: 16px; padding: 24px; }
  @media (min-width: 640px) { main { grid-template-columns: 1fr 1fr; } }
  section { padding: 16px; border: 1px solid #7dd3fc52; border-radius: 4px; background: #0a1530; }
  h2 { margin: 0; font-size: 18px; }
</style>
</head>
<body>
  <header><h1>Cardápio da semana</h1><p>Uma página de exemplo: uma coluna no celular, duas no computador.</p></header>
  <main>
    ${Array.from({ length: 8 }, (_, i) => `<section><h2>Dia ${i + 1}</h2><p>Arroz, feijão, salada e o prato do dia.</p></section>`).join('')}
  </main>
</body>
</html>`

// Browsers do not open data: URLs in a new tab, so the example opens the page as a blob.
function openInNewTab() {
  const url = URL.createObjectURL(new Blob([page], { type: 'text/html' }))
  window.open(url, '_blank', 'noopener')
}

function Page() {
  return <iframe title="Cardápio da semana" srcDoc={page} />
}

const labels = {
  phoneLabel: 'Celular',
  desktopLabel: 'Computador',
  listLabel: 'Dispositivo',
}

const meta = {
  title: 'Componentes/DevicePreview',
  component: DevicePreview,
  args: { ...labels, children: null },
  argTypes: {
    children: {
      description:
        'O que é mostrado, quase sempre um iframe: um iframe filho direto preenche a tela; outro conteúdo rola dentro dela.',
      control: false,
    },
    defaultDevice: {
      description:
        'O dispositivo da primeira vez, quando o componente guarda a escolha.',
      control: 'inline-radio',
      options: ['phone', 'desktop'],
      table: { defaultValue: { summary: 'phone' } },
    },
    device: {
      description:
        'O dispositivo mostrado, quando a página controla a escolha.',
      control: false,
    },
    onDeviceChange: {
      description: 'Chamado com o dispositivo escolhido.',
    },
    phoneLabel: { description: 'A aba do celular, no idioma da página.' },
    desktopLabel: { description: 'A aba do computador, no idioma da página.' },
    listLabel: {
      description: 'O nome acessível do grupo de abas, no idioma da página.',
    },
    toolbarEnd: {
      description:
        'Ações no fim da barra, como um link que abre o conteúdo em outra aba.',
      control: false,
    },
    height: {
      description:
        '`fill` ocupa a altura do pai (que precisa ter uma); um número (px) ou um comprimento CSS fixa a altura.',
      control: 'text',
      table: { defaultValue: { summary: 'fill' } },
    },
  },
  decorators: [Story => <div className="h-[720px]">{Story()}</div>],
} satisfies Meta<typeof DevicePreview>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <DevicePreview {...args}>
      <Page />
    </DevicePreview>
  ),
}

export const Desktop: Story = {
  args: { defaultDevice: 'desktop' },
  render: args => (
    <DevicePreview {...args}>
      <Page />
    </DevicePreview>
  ),
}

/** An action at the end of the toolbar: here, opening the content on its own. */
export const WithToolbarEnd: Story = {
  render: args => (
    <DevicePreview
      {...args}
      toolbarEnd={
        <Button variant="ghost" size="sm" onClick={openInNewTab}>
          <ExternalLink />
          Abrir em outra aba
        </Button>
      }
    >
      <Page />
    </DevicePreview>
  ),
}

/** The page holds the choice: buttons outside also switch the device. */
export const Controlled: Story = {
  render: function Render(args) {
    const [device, setDevice] = useState<DevicePreviewDevice>('phone')
    return (
      <div className="flex h-full flex-col gap-3">
        <p className="text-ink-muted m-0 text-sm">
          Dispositivo: <span className="text-ink">{device}</span>
        </p>
        <div className="min-h-0 flex-1">
          <DevicePreview {...args} device={device} onDeviceChange={setDevice}>
            <Page />
          </DevicePreview>
        </div>
      </div>
    )
  },
}

/** Content that is not an iframe flows inside the screen and scrolls there. */
export const PlainContent: Story = {
  render: args => (
    <DevicePreview {...args}>
      <div className="grid gap-4 p-4">
        {Array.from({ length: 6 }, (_, i) => (
          <Callout key={i}>
            <CalloutTitle>Aviso {i + 1}</CalloutTitle>
            <CalloutContent>
              Sem iframe, o conteúdo rola dentro da tela, mas as media queries
              continuam vendo a janela inteira.
            </CalloutContent>
          </Callout>
        ))}
      </div>
    </DevicePreview>
  ),
}

/** A fixed height shorter than the phone: the frame scales down to fit. */
export const FixedHeight: Story = {
  args: { height: 480 },
  decorators: [Story => <div>{Story()}</div>],
  render: args => (
    <DevicePreview {...args}>
      <Page />
    </DevicePreview>
  ),
}

/** In a narrow, short space (a side panel, a phone) the frame scales down to fit both ways. */
export const NarrowWindow: Story = {
  decorators: [
    Story => <div className="h-[520px] max-w-[320px]">{Story()}</div>,
  ],
  render: args => (
    <DevicePreview {...args}>
      <Page />
    </DevicePreview>
  ),
}
