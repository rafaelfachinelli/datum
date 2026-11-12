import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from '@rafaelfachinelli/datum-ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileCode, TriangleAlert } from 'lucide-react'

const meta = {
  title: 'Componentes/CodeBlock',
  component: CodeBlock,
  args: { variant: 'default', size: 'md' },
  argTypes: {
    variant: {
      description:
        '`default` para código; `danger` para um erro ou um log que falhou.',
      control: 'inline-radio',
      options: ['default', 'danger'],
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      description: 'O tamanho do texto e do respiro.',
      control: 'inline-radio',
      options: ['md', 'sm'],
      table: { defaultValue: { summary: 'md' } },
    },
  },
  decorators: [Story => <div className="max-w-xl">{Story()}</div>],
} satisfies Meta<typeof CodeBlock>

export default meta
type Story = StoryObj<typeof meta>

const redirect = `# Manda o endereço antigo para a página nova
location /cardapio-antigo {
  return 301 /cardapio;
}`

export const Plain: Story = {
  render: args => (
    <CodeBlock {...args}>
      <CodeBlockContent>{redirect}</CodeBlockContent>
    </CodeBlock>
  ),
}

export const WithHeaderAndCopy: Story = {
  render: args => (
    <CodeBlock {...args}>
      <CodeBlockHeader>
        <CodeBlockTitle>
          <FileCode aria-hidden="true" />
          nginx.conf
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton
            value={redirect}
            label="Copiar"
            copiedLabel="Copiado"
          />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>{redirect}</CodeBlockContent>
    </CodeBlock>
  ),
}

export const FloatingCopy: Story = {
  render: args => (
    <CodeBlock {...args}>
      <CodeBlockActions>
        <CodeBlockCopyButton
          value="npm run build"
          label="Copiar"
          copiedLabel="Copiado"
        />
      </CodeBlockActions>
      <CodeBlockContent>npm run build</CodeBlockContent>
    </CodeBlock>
  ),
}

export const ChangedLines: Story = {
  render: args => (
    <CodeBlock {...args}>
      <CodeBlockHeader>
        <CodeBlockTitle>config/email.json</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>
        <CodeBlockLine>{'{'}</CodeBlockLine>
        <CodeBlockLine>{'  "host": "smtp.provedor.com.br",'}</CodeBlockLine>
        <CodeBlockLine variant="removed">
          {'  "senha": "${SENHA_ANTIGA}",'}
        </CodeBlockLine>
        <CodeBlockLine variant="added">
          {'  "senha": "${SENHA_SMTP}",'}
        </CodeBlockLine>
        <CodeBlockLine variant="highlighted">
          {'  "remetente": "encomendas@confeitaria.com.br"'}
        </CodeBlockLine>
        <CodeBlockLine>{'}'}</CodeBlockLine>
      </CodeBlockContent>
    </CodeBlock>
  ),
}

const errorLog = `2026-11-11 19:02:14 ERRO  smtp: autenticação recusada (535 5.7.8)
2026-11-11 19:02:14 ERRO  encomendas: pedido #4821 sem e-mail de confirmação
2026-11-11 19:07:40 ERRO  smtp: autenticação recusada (535 5.7.8)`

export const Danger: Story = {
  args: { variant: 'danger' },
  render: args => (
    <CodeBlock {...args}>
      <CodeBlockHeader>
        <CodeBlockTitle>
          <TriangleAlert aria-hidden="true" />
          Registro do servidor
        </CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton
            value={errorLog}
            label="Copiar o registro"
            copiedLabel="Registro copiado"
          />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent wrap>{errorLog}</CodeBlockContent>
      <CodeBlockFooter className="text-xs">
        3 linhas das últimas 24 horas
      </CodeBlockFooter>
    </CodeBlock>
  ),
}
