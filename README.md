<img src="https://www.colegioweb.com.br/wp-content/uploads/2017/12/Liberados-os-gabaritos-do-PSC-2018-da-UFAM.png" width="150" align="right">


> ICC008 ~ **Programação para a Web II** ~ 2019/2

----------------------------------------

**Curso:** Ciência da Computação <br>
**Professor:** David Fernandes de Oliveira <br>
**Aluno:** Micael Levi ― 21554923 <br>

----------------------------------------

## Uso local

```bash
cd Chess

cp .env.prod.example .env
vim .env # Informe as credenciais da sua instância MySQL

npm install

npm run db:migrate

npm run db:seed-all

npm start
```

## Uso local para desenvolvimento

```bash
cd Chess

cp .env.dev.example .env.dev
vim .env.dev # Informe as credenciais da sua instância MySQL

npm install

NODE_ENV=development npm run db:seed-all

npm run dev
```


## Regras do Trabalho Prático
> vide [trabalho_pratico](./trabalho_pratico.pdf)

1. [ ] :one: A aplicação deverá ter uma rota `/sobre`, que deverá conter o conteúdo da seção Sobre o jogo de Xadrez deste documento. Essa página também deverá conter uma imagem das peças de xadrez, tal como mostrado em https://xadrezapp.herokuapp.com/sobre.

2. [ ] :two: Os usuários poderão se cadastrar na aplicação através da rota `/signup`. Os campos do formulário de cadastro são: nome completo (precisa ter entre e 100 caracteres), endereço de e-mail (precisa ser um email válido), curso na UFAM, senha de acesso e confirmação de senha. A senha precisa ter 6 caracteres ou mais, e é importante verificar se a senha digitada pelo usuário é igual à senha digitada no campo de confirmação.

3. [ ] :three: O banco de dados deverá obedecer o esquema da Figura 2. Cada uma das tabelas deverá conter um Modelo e ao menos uma Migração. A tabela area deverá ser alimentada através de um _seeder_ do Sequelize.

4. [ ] :four: As senhas deverão ser armazenadas no banco de dados de forma criptografada, através do módulo **bcrypt** (vide slides da disciplina).

5. [ ] :five: Quando o usuário não estiver logado na aplicação, o menu superior deverá conter apenas as opções: **Sobre** (rota `/sobre`), **Login** (rota `/login`) e **Sign Up** (rota `/signup`). Ao acessar a tela de login (que deverá conter apenas os campos email e senha) e informar as credenciais corretamente, o menu superior deverá passar a conter as seguintes opções: **Nova Partida** (rota `/partida`), **Ranking** (rota `/ranking`), **Curso** (rota `/curso`), **Sobre** (rota `/sobre`) e **Logout** (rota `/logout`).

6. [ ] :six: A opção **Nova Partida** (rota `/partida`) irá iniciar uma nova partida de xadrez. No entanto, o jogador que iniciou a partida deverá aguardar a chegada de algum oponente (vide Figura 4). As peças brancas serão do jogador que iniciou a partida, enquanto as peças pretas serão do oponente. A Figura 3 mostra a página que é carregada quando a usuária Mariana Mozart clica em **Nova Partida**.

7. [ ] :seven: A página principal de todos os usuários irá apresentar uma listagem das partidas aguardando oponentes. A Figura 4 mostra a página principal de um usuário fictício chamado Eduardo Berlot. Quando o Eduardo aceita o desafio da Mariana (clicando na partida mostrada na página principal), ele será direcionado para a página contendo o tabuleiro e poderá iniciar o jogo com a Mariana (vide Figura 5). Note que, como o Eduardo Berlot ficou com as peças pretas, então a parte de baixo de seu tabuleiro deverá conter as peças pretas. Por outro lado, como a Mariana ficou com as peças brancas, a parte de baixo de seu
tabuleiro deverá conter as peças brancas.

8. [ ] :eight: A implementação do chat apresentado nas Figuras 3 e 5 não é obrigatória. No entanto, o desenvolvimento do chat irá render alguns pontos extras para o aluno. A ideia do chat é a troca de mensagens entre os dois competidores da partida.

9. [ ] :nine: A opção **Ranking** do menu superior (rota `/ranking`) deverá mostrar uma página contendo uma listagem dos usuários com seus respectivos números de vitórias. O ranking deve mostrar apenas usuários que já venceram ao menos uma partida, e é ordenado de forma decrescente de acordo com o número de vitórias de cada um.

10. [ ] :one::zero: Todos os acessos à aplicação deverão gerar logs  través do middleware `Morgan` com a opção short.

11. [ ] :one::one: Os pacotes `@fortawesome/fontawesome-free`, `jquery`, `popper.js` e `bootstrap` deverão ser instalados na aplicação. Esses pacotes serão usados pelo template da aplicação (vide regra 08). Para maiores informações sobre esses pacotes, favor consultar os slides da disciplina.

12. [ ] :one::two: O site [Bootswatch](https://bootswatch.com) – possui um conjunto de templates baseados no Bootstrap. Vá até esse site, escolha um dos temas disponíveis e instale ele em sua aplicação.

13. [ ] :one::three: Deverá ser implementado um **CRUD** para o modelo `Curso`, nos moldes do que fora implementado pelo professor durante as aulas. As páginas do CRUD deverão usar ícones do pacote @fortawesome/fontawesome-free. Todos os formulários deverão usar o **CSRF** - Cross-Site Request Forgery.
