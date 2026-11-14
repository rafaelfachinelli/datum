import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
} from '@rafaelfachinelli/datum-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Image, Trash2 } from 'lucide-react'

const meta = {
  title: 'Componentes/Dialog',
  component: Dialog,
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
      description: 'Chamado com o novo estado e o motivo ao abrir ou fechar.',
    },
    disableEscapeDismissal: {
      description:
        'Não fecha com Esc: para uma escolha que precisa de uma das ações do rodapé.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disablePointerDismissal: {
      description: 'Não fecha com um clique no fundo.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    modal: {
      description:
        '`true` prende o foco, trava a rolagem e bloqueia o resto da página.',
      control: false,
      table: { defaultValue: { summary: 'true' } },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="outline" />}>
        Renomear projeto
      </DialogTrigger>
      <DialogContent closeLabel="Fechar">
        <DialogHeader>
          <DialogTitle>Renomear projeto</DialogTitle>
          <DialogDescription>
            O endereço do projeto muda junto com o nome.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Field label="Nome">
            <Input defaultValue="Esboço de arquitetura" />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancelar
          </DialogClose>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/** Open from the start, so the accessibility check runs on the window itself. */
export const Open: Story = {
  args: { defaultOpen: true },
  render: args => (
    <div className="h-96">
      <Dialog {...args}>
        <DialogTrigger render={<Button variant="outline" />}>
          Abrir
        </DialogTrigger>
        <DialogContent closeLabel="Fechar">
          <DialogHeader>
            <DialogTitle>Detalhes</DialogTitle>
            <DialogDescription>
              A janela abre no meio da tela e prende o foco até fechar.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="text-sm">
              Esc, um clique no fundo ou o botão de fechar devolvem o foco ao
              botão que abriu.
            </p>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(['sm', 'md', 'lg', 'full'] as const).map(size => (
        <Dialog key={size}>
          <DialogTrigger render={<Button variant="outline" />}>
            {size}
          </DialogTrigger>
          <DialogContent size={size} closeLabel="Fechar">
            <DialogHeader>
              <DialogTitle>Tamanho {size}</DialogTitle>
              <DialogDescription>
                No celular, todos ocupam quase toda a largura; o full ocupa a
                tela inteira.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p className="text-sm">
                Escolha pelo conteúdo: uma confirmação curta cabe no sm, um
                formulário no md, uma tabela larga no lg.
              </p>
            </DialogBody>
            <DialogFooter>
              <DialogClose render={<Button />}>Entendi</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
}

/**
 * A choice that must be answered: Escape and the backdrop do not close it, only the actions (and the close button,
 * which cancels).
 */
export const WithActions: Story = {
  args: { disableEscapeDismissal: true, disablePointerDismissal: true },
  render: args => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="danger" />}>
        <Trash2 />
        Excluir projeto
      </DialogTrigger>
      <DialogContent size="sm" closeLabel="Cancelar">
        <DialogHeader>
          <DialogTitle>Excluir o projeto?</DialogTitle>
          <DialogDescription>
            As conversas e os arquivos do projeto somem junto. Não dá para
            desfazer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Manter
          </DialogClose>
          <DialogClose render={<Button variant="danger" />}>
            Excluir
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

const terms = Array.from({ length: 18 }, (_, i) => i + 1)

export const LongContent: Story = {
  render: args => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="outline" />}>
        Ler os termos
      </DialogTrigger>
      <DialogContent size="lg" closeLabel="Fechar">
        <DialogHeader>
          <DialogTitle>Termos de uso</DialogTitle>
          <DialogDescription>
            O texto rola entre o título e as ações.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          {terms.map(n => (
            <p key={n} className="text-ink-muted mb-3 text-sm">
              {n}. O conteúdo é mais alto que a janela, então só o corpo rola: o
              título e as ações continuam à vista. Sem nada focável dentro, o
              corpo recebe o foco pelo Tab para o teclado poder rolar.
            </p>
          ))}
        </DialogBody>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Recusar
          </DialogClose>
          <DialogClose render={<Button />}>Aceitar</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Media: Story = {
  render: args => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="outline" />}>
        <Image />
        Ver imagem
      </DialogTrigger>
      <DialogContent variant="media" closeLabel="Fechar">
        <DialogBody>
          <img
            src="./og.png"
            width={1200}
            height={630}
            alt="O cartão de compartilhamento do Datum: o logo sobre a prancheta."
          />
        </DialogBody>
        <DialogHeader>
          <DialogTitle className="text-base">
            Cartão de compartilhamento
          </DialogTitle>
          <DialogDescription>1200 × 630, em og/og.html.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
}

const video = `<!doctype html><html lang="pt-BR"><body style="margin:0;display:grid;place-items:center;height:100vh;background:#050c20;color:#e6edf8;font:16px system-ui">Um vídeo incorporado (iframe) ocupa 16:9.</body></html>`

/** An embedded player: an iframe keeps 16:9 and fits the screen. */
export const MediaEmbed: Story = {
  render: args => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="outline" />}>
        Ver vídeo
      </DialogTrigger>
      <DialogContent variant="media" closeLabel="Fechar">
        <DialogBody>
          <iframe title="Vídeo de exemplo" srcDoc={video} />
        </DialogBody>
        <DialogHeader>
          <DialogTitle className="sr-only">Vídeo de exemplo</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
}
