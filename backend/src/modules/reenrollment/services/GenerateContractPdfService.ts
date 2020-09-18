import PDFKit from 'pdfkit';
import mongoose from 'mongoose';
import fs from 'fs';
import { resolve } from 'path';
import { v4 } from 'uuid';

import AppError from '@shared/errors/AppError';
import {
    ReenrollmentSchema,
    IReenrollment,
} from '@modules/reenrollment/infra/mongoose/schemas/ReenrollmentSchema';

interface IRequest {
    _id: string;
}

class GenerateContractPdfService {
    public async execute({ _id }: IRequest): Promise<string> {
        const pdf = new PDFKit();

        const Reenrollment = mongoose.model<IReenrollment>(
            'Reenrollment',
            ReenrollmentSchema,
        );

        const reenrollment = await Reenrollment.findOne({
            student_name: _id,
        });

        if (!reenrollment) {
            throw new AppError('Rematrícula inválida!');
        }

        const arial = resolve(
            __dirname,
            '..',
            '..',
            '..',
            'assets',
            'fonts',
            `arial.ttf`,
        );

        const arialBold = resolve(
            __dirname,
            '..',
            '..',
            '..',
            'assets',
            'fonts',
            `arialbd.ttf`,
        );

        const calibri = resolve(
            __dirname,
            '..',
            '..',
            '..',
            'assets',
            'fonts',
            `calibri.ttf`,
        );

        // Defaults
        pdf.lineGap(1.5);

        pdf.font(calibri)
            // Header
            .fontSize(18)
            .text('Inst. Educacional Doce Mel - Colegio Santiago Ltda', {
                align: 'center',
            })
            .fontSize(10)
            .text(
                'Dá instrução ao sábio e ele se fará mais sábio, ensina o justo e ele crescerá em entendimento. Prov.9.9',
                { align: 'center' },
            )
            .moveDown()
            // Title
            .font(arialBold)
            .fontSize(14)
            .text('CONTRATO DE PRESTAÇÃO DE SERVIÇOS', { align: 'center' })
            .text('EDUCACIONAIS POR ADESÃO nº _______/201__', {
                align: 'center',
            })
            .moveDown()
            // Description
            .font(arial)
            .fontSize(8)
            .text(
                'Por este instrumento particular e na melhor forma de Direito, o ',
                { continued: true, align: 'justify' },
            )
            .font(arialBold)
            .text('INSTITUTO EDUCACIONAL DOCE MEL COLÉGIO SANTIAGO LTDA-ME', {
                continued: true,
            })
            .font(arial)
            .text(
                ', empresa mantenedora, CNPJ 04.379.032/0001-09, doravante denominado ',
                { continued: true },
            )
            .font(arialBold)
            .text('CONTRATADO', { continued: true })
            .font(arial)
            .text(', e de outro lado, como ', { continued: true })
            .font(arialBold)
            .text('CONTRATANTES', { continued: true })
            .font(arial)
            .text(
                ', por si e pelo aluno(a) beneficiário(a), identificados no quadro abaixo, nos termos da legislação em vigor, resolvem acordar os termos de contratação de serviços educacionais oferecidos pelo ',
                { continued: true },
            )
            .font(arialBold)
            .text('CONTRATADO', { continued: true })
            .font(arial)
            .text(', para o ano de 2021 conforme cláusulas que seguem:')
            .moveDown()
            // Financial Responsible
            .font(arialBold)
            .fontSize(9)
            .text(
                'IDENTIFICAÇÃO DO CONTRATANTE RESPONSÁVEL – (MAIOR DE 18 ANOS)',
            )
            .font(arial)
            .fontSize(7)
            .text(`Sr./Sra.: ${reenrollment.financial_name}`)
            .text(`Data de nascimento: ${reenrollment.financial_birth_date}`)
            .text(
                `Parentesco com o aluno: ${reenrollment.financial_birth_date}`,
            )
            .text(`Nacionalidade: ${reenrollment.financial_nacionality}`)
            .text(`Estado civil: ${reenrollment.financial_civil_state}`)
            .text(`Profissão: ${reenrollment.financial_profission}`)
            .text(`CPF: ${reenrollment.financial_cpf}`)
            .text(`RG: ${reenrollment.financial_rg}`)
            .text(`Rua: ${reenrollment.financial_address_street}`)
            .text(`Nº: ${reenrollment.financial_address_number}`)
            .text(`Bairro: ${reenrollment.financial_address_neighborhood}`)
            .text(`Cidade: ${reenrollment.financial_address_city}`)
            .text(`CEP: ${reenrollment.financial_address_cep}`)
            .text(
                `Telefone residencial: ${reenrollment.financial_residencial_phone}`,
            )
            .text(
                `Telefone comercial: ${reenrollment.financial_commercial_phone}`,
            )
            .text(`Telefone celular: ${reenrollment.financial_personal_phone}`)
            .text(`E-mail: ${reenrollment.financial_email}`)
            .moveDown()
            // Supportive Responsible
            .font(arialBold)
            .fontSize(9)
            .text('IDENTIFICAÇÃO DO CONTRATANTE SOLIDÁRIO – (MAIOR DE 18 ANOS)')
            .font(arial)
            .fontSize(7)
            .text(`Sr./Sra.: ${reenrollment.supportive_name}`)
            .text(`Data de nascimento: ${reenrollment.supportive_birth_date}`)
            .text(
                `Parentesco com o aluno: ${reenrollment.supportive_birth_date}`,
            )
            .text(`Nacionalidade: ${reenrollment.supportive_nacionality}`)
            .text(`Estado civil: ${reenrollment.supportive_civil_state}`)
            .text(`Profissão: ${reenrollment.supportive_profission}`)
            .text(`CPF: ${reenrollment.supportive_cpf}`)
            .text(`RG: ${reenrollment.supportive_rg}`)
            .text(`Rua: ${reenrollment.supportive_address_street}`)
            .text(`Nº: ${reenrollment.supportive_address_number}`)
            .text(`Bairro: ${reenrollment.supportive_address_neighborhood}`)
            .text(`Cidade: ${reenrollment.supportive_address_city}`)
            .text(`CEP: ${reenrollment.supportive_address_cep}`)
            .text(
                `Telefone residencial: ${reenrollment.supportive_residencial_phone}`,
            )
            .text(
                `Telefone comercial: ${reenrollment.supportive_commercial_phone}`,
            )
            .text(`Telefone celular: ${reenrollment.supportive_personal_phone}`)
            .text(`E-mail: ${reenrollment.supportive_email}`)
            .moveDown()
            // Student
            .font(arialBold)
            .fontSize(9)
            .text(
                'IDENTIFICAÇÃO DO BENEFICIÁRIO DOS SERVIÇOS DE EDUCAÇÃO ESCOLAR – ALUNO(A)',
            )
            .font(arial)
            .fontSize(7)
            .text(`Nome do aluno: ${reenrollment.student_name}`)
            .text(`Data nascimento: ${reenrollment.financial_birth_date}`)
            .text(`Natural de: ${reenrollment.student_birth_city}`)
            .text(`Nacionalidade: ${reenrollment.student_nacionality}`)
            .text(`Sério/ano/período que cursará: ${reenrollment.grade_name}`)
            .moveDown()
            // First clausule
            .font(arialBold)
            .fontSize(8)
            .text('CLÁUSULA PRIMEIRA:  DO OBJETO')
            .font(arial)
            .text(
                'O objeto do presente contrato é a prestação de serviços educacionais ao beneficiário indicado acima, conforme o calendário escolar, regimento interno e Projeto Político-Pedagógico da instituição de ensino e a apresentação dos demais documentos necessários a sua efetivação, em conformidade  com o previsto na legislação de ensino atualmente em vigor.',
                { align: 'justify' },
            )
            .font(arialBold)
            .text('§ 1º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'Entendem-se como serviços mencionados nesta cláusula os que objetivam ao cumprimento do programa de estudos destinados à turma, coletivamente, não incluídos os facultativos, de caráter opcional ou de grupo específico ou especial.',
            )
            .font(arialBold)
            .text('§ 2º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'O beneficiário estará sujeito às normas do Regimento Escolar da instituição, cujo exemplar encontra-se a disposição para consulta na secretaria da instituição. Regras disciplinares e informativos para os pais e alunos são entregues na primeira reunião de pais, no início do ano letivo. Submete-se ademais, às obrigações constantes na legislação aplicável à área de ensino e às emendas de outras fontes legais que regulamentem a matéria, tendo o ',
                { continued: true },
            )
            .font(arialBold)
            .text('CONTRATANTE', { continued: true })
            .font(arial)
            .text(
                ', portanto, ao firmar este documento, amplo e expresso conhecimento das relações ora ajustadas.',
            )
            .font(arialBold)
            .moveDown()
            // Second clausule
            .text('CLÁUSULA SEGUNDA: DO PREÇO E FORMA DE PAGAMENTO.')
            .font(arial)
            .text(
                'Pelos serviços educacionais referidos na cláusula anterior, o ',
                { continued: true, align: 'justify' },
            )
            .font(arialBold)
            .text('CONTRATANTE ', { continued: true })
            .font(arial)
            .text('pagará ao ', { continued: true })
            .font(arialBold)
            .text('CONTRATADO', { continued: true })
            .font(arial)
            .text(
                ',  uma ANUIDADE ESCOLAR, nos valores abaixo relacionados, fixada na forma da lei:',
            )
            .font(arialBold)
            .text('§ 1º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'O valor referido na cláusula anterior será pago em 12(doze) parcelas mensais e iguais, devendo a primeira parcela ser paga no ato da assinatura do contrato como  princípio de pagamento da anuidade escolar  e condição para concretização e celebração do contrato de prestação de serviços educacionais. As demais parcelas devem ser pagas até o  décimo dia  corrido de cada mês, iniciando-se em fevereiro e terminando em dezembro do ano do serviço contratado.',
            )
            .font(arialBold)
            .text('§ 2º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'A  1º parcela referida no parágrafo anterior somente será devolvida quando houver desistência formal do aluno entregue na diretoria da escola  antes do início das aulas, sendo retidos 10% (dez por cento) sobre o valor da matrícula a título de custos operacionais nos primeiros 10 dias, 20% do 11º ao 30º dia e 50% após 30 dias da matricula. Valores de livros já pagos cujos livros já foram encomendados e/ou entregues não serão reembolsados.',
            )
            .font(arialBold)
            .text('§ 3º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'O pagamento da 1ª parcela referida no parágrafo primeiro implica, automaticamente, aceitação de todos os termos do presente contrato, bem como do Regimento Escolar da instituição e demais regras de convivência. ',
            )
            .font(arialBold)
            .text('§ 4º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text('É facultado ao ', { continued: true })
            .font(arialBold)
            .text('CONTRATADO', { continued: true })
            .font(arial)
            .text(
                ', em caráter promocional, conceder descontos nas mensalidades. A referida concessão não integra o contrato, para quaisquer efeitos, não implicando novação. Caso o ',
                { continued: true },
            )
            .font(arialBold)
            .text('CONTRATANTE ', { continued: true })
            .font(arial)
            .text(
                'não faça uso da promoção no momento oportuno, esta não incidirá retroativamente.',
            )
            .font(arialBold)
            .text('§ 5º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'Caso o pagamento da primeira parcela seja efetuado em cheque,  este será recebido em carater pro solvendo, não se concretizando a validade do contrato,  senao após a regular compensação do cheque. ',
            )
            .font(arialBold)
            .text('§ 6º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'Na hipótese de não haver número suficiente de alunos que preencham uma série e/ou turma, em turno específico ou não, o ',
                { continued: true },
            )
            .font(arialBold)
            .text('CONTRATADO ', { continued: true })
            .font(arial)
            .text(
                'desobriga-se a validar este instrumento, salvo quanto àquele aluno beneficiário que se dispuser a transferir-se de turno, caso haja vaga. No caso de não validação do contrato, o ',
                { continued: true },
            )
            .font(arialBold)
            .text('CONTRATADO ', { continued: true })
            .font(arial)
            .text(
                'reembolsará integralmente os valores e taxas eventualmente pagas pelo ',
                { continued: true },
            )
            .font(arialBold)
            .text('CONTRATANTE.')
            .moveDown()
            // Third Clausule
            .font(arialBold)
            .text('CLAUSULA TERCEIRA:  DO ATRASO / INADIMPLÊNCIA')
            .font(arial)
            .text('Havendo atraso no pagamento de qualquer parcela, o ', {
                continued: true,
                align: 'justify',
            })
            .font(arialBold)
            .text('CONTRATANTE ', { continued: true })
            .font(arial)
            .text(
                'pagará o valor em atraso acrescido de multa de 2% (dois por cento).',
            )
            .font(arialBold)
            .text('§ 1º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'O valor em atraso também será devidamente atualizado pelo ',
                { continued: true },
            )
            .font(arialBold)
            .text('ÍNDICE NACIONAL DE PREÇOS AO CONSUMIDOR ', {
                continued: true,
            })
            .font(arial)
            .text(
                '(INPC) do mês anterior  ou o índice que vier a substituí-lo, e será acrescido de juros moratórios de 1% (um por cento) ao mês, sem prejuízo da multa prevista no caput.',
            )
            .font(arialBold)
            .text('§ 2º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text('Por liberalidade do ', { continued: true })
            .font(arialBold)
            .text('CONTRATANTE ', { continued: true })
            .font(arial)
            .text(
                'ou negociação formalizada  entre as partes as penalidades e acréscimos poderão não serem exigidas, o que  não significa novação, permanecendo em vigor todos os preceitos desta cláusula.',
            )
            .font(arialBold)
            .text('§ 3º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'Se o atraso for superior a 90(noventa) dias, poderá ainda o ',
                { continued: true },
            )
            .font(arialBold)
            .text('CONTRATADO:')
            .font(arialBold)
            .text('§ 4º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'Existindo débito ao final do ano letivo, o beneficiário será automaticamente desligado da instituição de ensino, desobrigando-se o ',
                { continued: true },
            )
            .font(arialBold)
            .text('CONTRATADO ', { continued: true })
            .font(arial)
            .text(
                'a deferir pedido de renovação do Contrato nos termos da Lei 9.870/99  ou regulamentação correlata.',
            )
            .font(arialBold)
            .text('§ 5º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'Além do dispositivo no parágrafo anterior, é pré-requisito indispensável para a renovação do contrato do aluno benificiário     para   o    ano letivo seguinte a inexistência de pendências com a Biblioteca.',
            )
            .moveDown()
            // Fourth Clausule
            .font(arialBold)
            .text('CLÁUSULA QUARTA:  DA TRANSFERÊNCIA / DESISTÊNCIA')
            .font(arial)
            .text(
                'A transferência e/ou desistência do curso devem ser requeridas por escrito, com antecedência mínima de 30(trinta) dias, através do formulário próprio e protocolado na Secretária da instituição de ensino, com observância das normas regimentais, e não excluem o direito do CONTRATADO de exigir o pagamento das parcelas vencidas.',
                { align: 'justify' },
            )
            .font(arialBold)
            .text('§ 1°. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'O período compreendido entre a data do último vencimento e a do efetivo desligamento do ',
                { continued: true },
            )
            .font(arialBold)
            .text('CONTRATANTE ', { continued: true })
            .font(arial)
            .text(
                'será calculado proporcionalmente ao número de dias frequentados, tendo por base o valor da mensalidade.',
            )
            .font(arialBold)
            .text('§ 2°. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'Por efetivo desligamento entender-se á  como o primeiro dia após transcorrido o prazo de 30 dias da entrega da  solicitação da rescisão e/ou após decorrido este prazo, o ultimo dia em que o aluno beneficiário frequentar o estabelecimento escolar.',
            )
            .font(arialBold)
            .text('§ 3°. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'A simples infrequência às aulas e/ou a não-participação nas atividades escolares, por qualquer motivo, sem a comunicação de que trata o caput desta cláusula,  não desobriga o ',
                { continued: true },
            )
            .font(arialBold)
            .text('CONTRATANTE ', { continued: true })
            .font(arial)
            .text(
                'do pagamento das parcelas contratadas da anuidade,  sendo devidas até  o dia do efetivo desligamento.',
            )
            .moveDown()
            // Fiveth Clausule
            .font(arialBold)
            .text('CLÁUSULA QUINTA: DA RECISÃO')
            .font(arial)
            .text('O presente contrato poderá ser rescindido:')
            .font(arialBold)
            .text('I ', { continued: true, align: 'justify' })
            .font(arial)
            .text('- Pelo ', { continued: true })
            .font(arialBold)
            .text('CONTRATANTE', { continued: true })
            .font(arial)
            .text(', a qualquer tempo, observada a cláusula 4ª.')
            .font(arialBold)
            .text('II ', { continued: true, align: 'justify' })
            .font(arial)
            .text('– Pelo ', { continued: true })
            .font(arialBold)
            .text('CONTRATADO', { continued: true })
            .font(arial)
            .text(
                ', por motivos disciplinares causados pelo aluno  beneficiário, ou outro previsto no regimento escolar, por incompatibilidade ou desarmonia do aluno beneficiário ou de seus responsáveis ou por atitudes por parte dos responsáveis ou beneficiário que tenham por finalidade denegrir a imagem da Escola ou o desrespeito para com os funcionários e educadores através de palavras e ações.',
            )
            .font(arialBold)
            .text('III ', { continued: true, align: 'justify' })
            .font(arial)
            .text('- Pelo acordo entre as partes.')
            .font(arialBold)
            .text('IV ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                '- Em razão do descumprimento de qualquer obrigação prevista neste instrumento, respeitada a legislação pertinente.',
            )
            .font(arialBold)
            .moveDown()
            // Sixth Clausule
            .text('CLÁUSULA SEXTA: DAS DISPOSIÇÕES GERAIS')
            .font(arial)
            .text('O ', { continued: true, align: 'justify' })
            .font(arialBold)
            .text('CONTRATANTE ', { continued: true })
            .font(arial)
            .text('se obriga a comunicar à ', { continued: true })
            .font(arialBold)
            .text('CONTRATADA', { continued: true })
            .font(arial)
            .text(
                ', imediatamente, qualquer mudança de endereço, telefones e e-mails constantes neste termo.',
            )
            .font(arialBold)
            .text('§ 1º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text('O ', { continued: true })
            .font(arialBold)
            .text('CONTRATANTE ', { continued: true })
            .font(arial)
            .text('se compromete a comunicar, imediata e expressamente, ao ', {
                continued: true,
            })
            .font(arialBold)
            .text('CONTRATADO', { continued: true })
            .font(arial)
            .text(
                ', sobre a existência e o teor de decisões judiciais que venham a alterar o regime de guarda do aluno benificiário, não se responsabilizando o ',
                { continued: true },
            )
            .font(arialBold)
            .text('CONTRATADO ', { continued: true })
            .font(arial)
            .text(
                'por quaisquer fatos que resultem da inobservância da presente cláusula.',
            )
            .font(arialBold)
            .text('§ 2º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'Tendo em  vista a orientação para que não se traga objetos de valor estranhos à vida estudantil, tais como: telefone celular, relógios, games, notebook, palm-top, MP’s, câmeras  fotográficas etc...o ',
                { continued: true },
            )
            .font(arialBold)
            .text('CONTRATADO ', { continued: true })
            .font(arial)
            .text(
                'não se responsabiliza por perdas ou furtos de objetos de valor do beneficiário e/ou ',
                { continued: true },
            )
            .font(arialBold)
            .text('CONTRATANTE ', { continued: true })
            .font(arial)
            .text(
                'que aconteçam em suas dependências ou vizinhanças, limitando-se a acionar a autoridade policial, quando for o caso.',
            )
            .font(arialBold)
            .text('§ 3º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'Os contratantes, pais ou representantes legais, são responsáveis pelos danos provocados por seus filhos ou aluno beneficiário menores no ambiente do ',
                { continued: true },
            )
            .font(arialBold)
            .text('CONTRATADO', { continued: true })
            .font(arial)
            .text(
                ', ou causados a terceiros que aconteçam nas dependências da Escola ou vizinhanças, sendo que os Pais e/ou responsáveis autorizam o uso das imagens do circuito interno de câmeras para comprovação destes danos.	',
            )
            .font(arialBold)
            .text('§ 4º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'A indicação da metodologia pedagógica e do material didático é de responsabilidade do ',
                { continued: true },
            )
            .font(arialBold)
            .text('CONTRATADO', { continued: true })
            .font(arial)
            .text(', declarando-se o ', { continued: true })
            .font(arialBold)
            .text('CONTRATANTE ', { continued: true })
            .font(arial)
            .text('ciente e concordante com a filosofia da instituição.')
            .font(arialBold)
            .text('§ 5º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text('O ', { continued: true })
            .font(arialBold)
            .text('CONTRATANTE ', { continued: true })
            .font(arial)
            .text('declara que foi informado, neste ato, que o ', {
                continued: true,
            })
            .font(arialBold)
            .text('CONTRATADO ', { continued: true })
            .font(arial)
            .text(
                'oferece, subsidiariamente, outros serviços para os alunos beneficiários interessados, que poderão ser adquiridos junto à Secretaria da Escola, com pagamento em separado, através das modalidades de aquisição, de acordo com a natureza de cada um dos serviços.',
            )
            .font(arialBold)
            .text('§ 6º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text('O ', { continued: true })
            .font(arialBold)
            .text('CONTRATANTE ', { continued: true })
            .font(arial)
            .text(
                'declara que foi informado, neste ato, que  não estão incluídos neste contrato, nem são remunerados pelo preço nele estabelecidos os serviços especiais de recuperação, serviços especiais de reforço e acompanhamento, progressão parcial, adaptação,  segunda chamada de avaliações, segunda via do cartão de identificação do aluno, transporte escolar, exames especiais, acompanhamento psicológico/neural/psicopedagógico, segunda via do caderno de comunicações, excursões e trabalhos de campo, taxa de artes, livros didáticos, eventos e fornecimento de segunda via de documentos, os opcionais e de uso facultativo para o aluno,  outras atividades de frequência facultativa, uniformes, merendas e materiais de uso individual que poderão ser objeto de ajuste à parte, os quais quando disponíveis terão os seus valores comunicados por circular da direção da Escola.',
            )
            .font(arialBold)
            .text('§ 7º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'O Contratante solidário assumirá todas as responsabilidades das cláusula deste contrato na falta do contratante principal ou se o contratante principal deixar de cumprir qualquer clausula deste contrato.',
            )
            .font(arialBold)
            .text('§ 8º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text(
                'As comunicações entre as partes, sejam elas de que natureza for, utilizará os diversos meios disponíveis, tais como: avisos na agenda escolar on-line, cartas, e-mails, ligações telefônicas, SMSs, WhatsApp, redes sociais, cujos contatos deverão ser informados na ficha de matricula.',
            )
            .font(arialBold)
            .text('§ 9º. ', { continued: true, align: 'justify' })
            .font(arial)
            .text('O ', { continued: true })
            .font(arialBold)
            .text('CONTRATANTE ', { continued: true })
            .font(arial)
            .text(
                'autoriza o uso da imagem e voz do aluno, para participação nas atividades remotas, via internet e conteúdos pedagógicos a serem divulgados aos outros alunos, nas redes sociais e site do colégio com a finalidade de garantir a complementação e a prestação do serviço educacional escolar.',
            )
            .moveDown()
            // Seventh Clausule
            .font(arialBold)
            .text('CLÁUSULA SÉTIMA: DO FORO', { align: 'left' })
            .font(arial)
            .text(
                'As partes elegem o foro da cidade de Betim para dirimir quaisquer duvidas provenientes deste contrato.',
            )
            .text(
                'E assim , por estarem justos e contratados, assim o presente em duas vias, também assinadas por duas testemunhas.',
            )
            .moveDown()
            .moveDown()
            .text(`Betim, MG ${Date.now()}`)
            .moveDown()
            .moveDown();

        const sign = `_________________________________________________________________________________________________________`;
        const signWidth = pdf.widthOfString(sign);
        const signHeight = pdf.heightOfString(sign);

        pdf.text(sign, {
            columns: 3,
            columnGap: 30,
            width: signWidth,
            height: signHeight,
            align: 'center',
        }).text(
            '            COLÉGIO SANTIAGO                              CONTRATANTE RESPONSÁVEL                         CONTRATANTE SOLIDÁRIO',
        );

        const fileHash = v4();

        const fileName = `contrato-${fileHash}.pdf`;

        const filePath = resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'tmp',
            fileName,
        );

        pdf.pipe(fs.createWriteStream(`${filePath}`));

        pdf.end();

        await Reenrollment.findOneAndUpdate(
            {
                student_name: _id,
            },
            {
                contract: fileName,
            },
            {
                useFindAndModify: false,
            },
        );

        if (reenrollment.contract) {
            const deletePath = resolve(
                __dirname,
                '..',
                '..',
                '..',
                '..',
                'tmp',
                reenrollment.contract,
            );

            fs.unlinkSync(deletePath);
        }

        return fileName;
    }
}

export default GenerateContractPdfService;
