import path from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line

import GeneratePDFService from '@modules/reenrollment/services/GeneratePDFService';

class GeneratePDFModel {
    public async execute(): Promise<string> {
        const imageLogo = path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'assets',
            'images',
            'logo.png',
        );

        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: [20, 20, 20, 20],
            info: {
                title: 'Checklist de Documentos',
                author: 'Colégio Santiago',
                subject: 'Checklist de Documentos',
                keywords: 'Checklist, Documentos',
                creator: 'Colégio Santiago',
                producer: 'Colégio Santiago',
            },
            styles: {
                heading: {
                    fontSize: 12,
                    bold: true,
                    alignment: 'center',
                },
                subheading: {
                    fontSize: 10,
                    bold: true,
                },
            },
            defaultStyle: {
                font: 'Arial',
                fontSize: 10,
                lineHeight: 1.25,
                alignment: 'justify',
            },
            content: [
                {
                    columns: [
                        {
                            image: imageLogo,
                            width: 65,
                            alignment: 'center',
                        },
                        {
                            text: [
                                {
                                    text:
                                        'Checklist de Documentos de Matrícula/Rematrícula',
                                    style: 'heading',
                                },
                                {
                                    text: `\nDocumento Emitido em _____/_____/_____`,
                                    style: 'subheading',
                                    alignment: 'center',
                                },
                            ],
                        },
                        {
                            text: '',
                            width: 65,
                        },
                    ],
                },
                {
                    text: '\nIdentificação do Aluno',
                    style: 'subheading',
                },
                // ALUNO
                {
                    columns: [
                        `Nome: ________________________________________`,
                        {
                            text: `Turma: ____________________`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Data de Nascimento: ____/____/____`,
                        {
                            text: `Naturalidade: _______________`,
                            alignment: 'center',
                            width: '*',
                        },
                        {
                            text: `UF: ____`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Nacionalidade: ____________________`,
                        {
                            text: `Sexo: ____________________`,
                            alignment: 'center',
                            width: '*',
                        },
                        {
                            text: `Cor/Raça: ____________________`,
                            alignment: 'right',
                        },
                    ],
                },
                // RESPONSÁVEL FINANCEIRO
                {
                    text: '\nResponsável Financeiro',
                    style: 'subheading',
                },
                `Nome: ________________________________________`,
                `E-mail: ________________________________________`,
                `CEP: ____________________`,
                `Endereço: Rua ____________________ Número _____ Bairro ____________________ Cidade ____________________`,
                {
                    columns: [
                        `RG: ____________________`,
                        {
                            text: `CPF: ____________________`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Aniversário: _____/_____`,
                        {
                            text: `Grau de Instrução: ____________________`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Profissão: ____________________`,
                        {
                            text: `Telefone Comercial: ____________________`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Telefone Fixo: ____________________`,
                        {
                            text: `Telefone Celular: ____________________`,
                            alignment: 'right',
                        },
                    ],
                },
                // RESPONSÁVEL SOLIDÁRIO
                {
                    text: '\nResponsável Solidário',
                    style: 'subheading',
                },
                `Nome: ________________________________________`,
                `E-mail: ________________________________________`,
                {
                    columns: [
                        `RG: ____________________`,
                        {
                            text: `CPF: ____________________`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Aniversário: _____/_____`,
                        {
                            text: `Grau de Instrução: _______________`,
                            alignment: 'center',
                            width: '*',
                        },
                        {
                            text: `Profissão: ____________________`,
                            alignment: 'right',
                        },
                    ],
                },
                // Checklist
                {
                    columns: [
                        {
                            text: `\n\n\n02 fotos 3x4\n
                            CPF pai (  ) mãe (  )\n
                            RG  pai (  ) mãe (  )\n
                            Histórico escolar\n
                            Cartão de vacina\n
                            Carteira de plano de saúde\n
                            Comprovante de residência\n
                            Certidão de nascimento do aluno\n
                            Declaração de transferência escolar\n
                            Declaração de quitação de débito da escola de origem\n
                            Laudo — Aluno com Deficiência/Necesidades Especiais\n
                            Relatório — Aluno com Deficiência/Necesidades Especiais\n\n\n`,
                            width: 'auto',
                        },
                        {
                            width: '*',
                            alignment: 'right',
                            text: `\n\n\nAssinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n\n\n`,
                        },
                    ],
                },
                {
                    columns: [
                        '______________________________\nSECRETARIA',
                        '______________________________\nDIREÇÃO',
                        '______________________________\nATENDENTE',
                    ],
                    alignment: 'center',
                },
            ],
        } as TDocumentDefinitions;

        const generatePDF = new GeneratePDFService();

        const fileName = await generatePDF.execute({
            docDefinition,
        });

        return fileName;
    }
}

export default GeneratePDFModel;
