'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('curso', [
        {
          id: 1,
          initials: 'IE08',
          name: 'Ciência da Computação',
          description: 'Curso de alunos top!',
          id_area: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          initials: 'IT16',
          name: 'Engenharia de Software',
          description: 'O Curso de Bacharelado em Engenharia de Software visa desenvolver um profissional comprometido com a aplicação das soluções nas organizações administrativas no que concerne aos problemas da área.',
          id_area: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          initials: 'FT05',
          name: 'Engenharia da Computação',
          description: 'Curso top em reprovação xD',
          id_area: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          initials: 'IE15',
          name: 'Sistemas de Informação',
          description: 'RIP ~ press F to pay respects...',
          id_area: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          initials: 'IE01',
          name: 'Estatística',
          description: 'O curso de Estatística forma especialistas em matemática voltada para a análise e interpretação de dados. O estatístico é o profissional responsável por coordenar o levantamento de informações e montar bancos de dados.',
          id_area: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          initials: 'FT09',
          name: 'Engenharia Mecânica',
          description: 'O curso de Engenharia Mecânica forma profissionais capazes de executar procedimentos que envolvam projeto, fabricação, operação e manutenção de máquinas, equipamentos e sistemas mecânicos.',
          id_area: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          initials: 'FT08',
          name: 'Engenharia de Materiais',
          description: 'O curso de Engenharia de Materiais forma profissionais capazes de pesquisar novos materiais e soluções para os já existentes.',
          id_area: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          initials: 'FT11',
          name: 'Engenharia de Petróleo e Gás',
          description: 'O curso de Engenharia de Petróleo e Gás prepara profissionais para atuar em todas as etapas da cadeia produtiva do petróleo e gás natural.',
          id_area: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          initials: 'FT12',
          name: 'Engenharia Química',
          description: 'O curso de Engenharia Química forma profissionais habilitados para o trabalho na indústria e que lidam com transformações físico-químicas da matéria-prima.',
          id_area: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 10,
          initials: 'IE03-B',
          name: 'Matemática - Bacharelado',
          description: 'O matemático usa a lógica na formulação de teorias e no teste de hipóteses. Desenvolve aplicações dos cálculos na pesquisa pura e na ciência aplicada.',
          id_area: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('curso', null, {});
  }
};
