# Cadastro de Itens - Aplicação Angular

## Descrição

Este projeto é uma aplicação Single Page Application (SPA) desenvolvida com Angular. A aplicação permite o cadastro de itens com diversas funcionalidades e validações 
para campos de entrada. Os itens podem ser classificados com diferentes unidades de medida e possuem funcionalidades específicas para produtos perecíveis.

## Funcionalidades

- **Cadastro de Itens**: Formulário para cadastrar e editar itens com validação e máscara de entrada.
- **Unidades de Medida**: Campos ajustáveis com base na unidade de medida selecionada (Litro, Quilograma, Unidade).
  - **Unidade**: Permite apenas números inteiros.
- **Validação de Preço**: Validação para garantir que o preço siga o formato monetário correto, com máscara e limite de casas decimais.
- **Data de Fabricação e Validade**: 
  - Validação para garantir que a data de fabricação não seja posterior à data de validade para itens perecíveis.
  - Mensagem de aviso se a data de validade for inferior à data atual.
- **Responsividade**: Layout adaptável para diferentes tamanhos de tela.

## Tecnologias Utilizadas

- **Angular 18**: Framework para construção da SPA.
- **Bootstrap**: Framework CSS para estilização e responsividade.
- **Ngx-Mask**: Biblioteca para máscaras de entrada.
- **RxJS**: Biblioteca para programação reativa.

## Estrutura do Projeto

- `src/app/models/`: Contém modelos de dados.
- `src/app/services/`: Contém serviços para manipulação de dados.
- `src/app/components/`: Contém componentes da aplicação.
  - `menu.component.ts`: Componente para o menu.
  - `item-form.component.ts`: Componente para o formulário de itens.
  - `item-list.component.ts`: Componente para a lista de itens.
- `app.config.ts`: Configuração da aplicação Angular sem módulos tradicionais.
- `index.html`: Arquivo principal da aplicação.

## Como Executar

1. **Clonar o Repositório**:
    ```bash
    git clone https://github.com/FabioAntunesO/project-front
    cd repo
    ```

2. **Instalar Dependências**:
    ```bash
    npm install
    ```

3. **Executar a Aplicação**:
    ```bash
    ng serve
    ```

4. **Acessar no Navegador**:
    Navegue até `http://localhost:4200` para acessar a aplicação.

## Observações

- Priorizei o cadastro, edição e exclusão de items, junto com validações de nome, quantidade(parcialmente), preço, produto perecivel e data. 
Foi priorizado também o layout e a responsividade das páginas para fornecer uma comunicação clara e boa usabilidade.

- Algumas validações ficaram incompletas por falta de tempo, como a validação das unidades de medida juntamente com a quantidade, 
no momento é uma validação complexa para mim e decidi entregar mais itens ao invés de concluir uma validação que pode ser aprimorada posteriormente.