import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from '@rafaelfachinelli/datum-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  CircleAlert,
  FileSpreadsheet,
  FileText,
  LoaderCircle,
  RotateCw,
  Upload,
  X,
} from 'lucide-react'

const meta = {
  title: 'Componentes/Attachment',
  component: Attachment,
  args: { state: 'done', size: 'md', orientation: 'horizontal' },
  argTypes: {
    state: {
      description:
        'Onde o arquivo está: `idle` (ainda não enviado, borda tracejada), `uploading`, `processing`, `error` ou `done`.',
      control: 'select',
      options: ['idle', 'uploading', 'processing', 'error', 'done'],
      table: { defaultValue: { summary: 'done' } },
    },
    size: {
      description: 'O tamanho do cartão.',
      control: 'inline-radio',
      options: ['md', 'sm', 'xs'],
      table: { defaultValue: { summary: 'md' } },
    },
    orientation: {
      description:
        '`horizontal` (ícone ao lado do nome) ou `vertical` (prévia em cima, para imagens).',
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      table: { defaultValue: { summary: 'horizontal' } },
    },
  },
  decorators: [Story => <div className="max-w-xl">{Story()}</div>],
} satisfies Meta<typeof Attachment>

export default meta
type Story = StoryObj<typeof meta>

function Spinner() {
  return (
    <LoaderCircle
      className="animate-spin motion-reduce:[animation-duration:2s]"
      aria-hidden="true"
    />
  )
}

function RemoveAction({ name }: { name: string }) {
  return (
    <AttachmentActions>
      <AttachmentAction aria-label={`Remover ${name}`}>
        <X />
      </AttachmentAction>
    </AttachmentActions>
  )
}

export const Default: Story = {
  render: args => (
    <Attachment {...args}>
      <AttachmentMedia>
        <FileText />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>cardapio-pascoa.pdf</AttachmentTitle>
        <AttachmentDescription>PDF · 1,2 MB</AttachmentDescription>
      </AttachmentContent>
      <RemoveAction name="cardapio-pascoa.pdf" />
    </Attachment>
  ),
}

export const States: Story = {
  render: () => (
    <div className="grid justify-items-start gap-3">
      <Attachment state="idle">
        <AttachmentMedia>
          <Upload />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>precos-2027.xlsx</AttachmentTitle>
          <AttachmentDescription>Pronto para enviar</AttachmentDescription>
        </AttachmentContent>
        <RemoveAction name="precos-2027.xlsx" />
      </Attachment>
      <Attachment state="uploading">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>fotos-bolos.zip</AttachmentTitle>
          <AttachmentDescription>Enviando · 64%</AttachmentDescription>
        </AttachmentContent>
        <RemoveAction name="fotos-bolos.zip" />
      </Attachment>
      <Attachment state="processing">
        <AttachmentMedia>
          <FileSpreadsheet />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>encomendas-outubro.csv</AttachmentTitle>
          <AttachmentDescription>O agente está lendo</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error">
        <AttachmentMedia>
          <CircleAlert />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>video-loja.mov</AttachmentTitle>
          <AttachmentDescription>Maior que 100 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Tentar de novo">
            <RotateCw />
          </AttachmentAction>
          <AttachmentAction aria-label="Remover video-loja.mov">
            <X />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="done">
        <AttachmentMedia>
          <FileText />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>contrato-hospedagem.pdf</AttachmentTitle>
          <AttachmentDescription>PDF · 340 KB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </div>
  ),
}

// A stand-in screenshot, drawn inline so the story needs no image file.
const screenshot = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" fill="#0e1b3b"/><rect x="10" y="12" width="76" height="10" rx="2" fill="#38bdf8"/><rect x="10" y="30" width="34" height="54" rx="2" fill="#a3b3cc"/><rect x="52" y="30" width="34" height="24" rx="2" fill="#6366f1"/><rect x="52" y="60" width="34" height="24" rx="2" fill="#fbbf24"/></svg>',
)}`

export const ImagePreview: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Attachment>
        <AttachmentMedia variant="image">
          <img src={screenshot} alt="" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>pagina-inicial.png</AttachmentTitle>
          <AttachmentDescription>PNG · 820 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentTrigger aria-label="Abrir pagina-inicial.png" />
      </Attachment>
      <Attachment state="uploading">
        <AttachmentMedia variant="image">
          <img src={screenshot} alt="" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>pagina-celular.png</AttachmentTitle>
          <AttachmentDescription>Enviando · 30%</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Attachment orientation="vertical">
        <AttachmentMedia variant="image">
          <img src={screenshot} alt="" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>pagina-inicial.png</AttachmentTitle>
          <AttachmentDescription>820 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentTrigger aria-label="Abrir pagina-inicial.png" />
        <RemoveAction name="pagina-inicial.png" />
      </Attachment>
      <Attachment orientation="vertical">
        <AttachmentMedia>
          <FileText />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>cardapio.pdf</AttachmentTitle>
          <AttachmentDescription>1,2 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </div>
  ),
}

const files = [
  ['cardapio-pascoa.pdf', 'PDF · 1,2 MB'],
  ['precos-2027.xlsx', 'Planilha · 48 KB'],
  ['contrato-hospedagem.pdf', 'PDF · 340 KB'],
  ['encomendas-outubro.csv', 'CSV · 12 KB'],
  ['logo-confeitaria.svg', 'SVG · 6 KB'],
] as const

export const Group: Story = {
  render: () => (
    <AttachmentGroup>
      {files.map(([name, details]) => (
        <Attachment key={name} size="sm">
          <AttachmentMedia>
            <FileText />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{name}</AttachmentTitle>
            <AttachmentDescription>{details}</AttachmentDescription>
          </AttachmentContent>
          <RemoveAction name={name} />
        </Attachment>
      ))}
    </AttachmentGroup>
  ),
}
