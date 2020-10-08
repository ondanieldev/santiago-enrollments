// import path from 'path';
// import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line
// import { format as formatDate } from 'date-fns';

// import ReenrollmentsRepository from '@modules/reenrollment/infra/mongoose/repositories/ReenrollmentsRepository';
// import GeneratePDFService from '@modules/reenrollment/services/GeneratePDFService';
// import IPrettierEnrollmentDTO from '@modules/reenrollment/dtos/IPrettierEnrollmentDTO';
// import { IReenrollmentsRepository } from '@modules/reenrollment/repositories/IReenrollmentsRepository';

// interface IRequest {
//     reenrollment: IPrettierEnrollmentDTO;
//     contract_year: string;
//     discount_percent: number;
//     monthly_value?: number;
// }

// class GenerateReceiptPdfService {
//     private reenrollmentsRepository: IReenrollmentsRepository;

//     constructor() {
//         this.reenrollmentsRepository = new ReenrollmentsRepository();
//     }

//     public async execute({
//         reenrollment,
//         discount_percent,
//         contract_year,
//         monthly_value,
//     }: IRequest): Promise<string> {
//         const monthlyValue =
//             contract_year === '2020'
//                 ? monthly_value || 0
//                 : reenrollment.monthly_value || 0;
//         const monthlyWithDiscount =
//             monthlyValue - (monthlyValue * discount_percent) / 100;

//         const logoImage = path.resolve(
//             __dirname,
//             '..',
//             '..',
//             '..',
//             'assets',
//             'images',
//             'logo.png',
//         );

//         const docDefinition = {
//             pageSize: 'A4',
//             pageOrientation: 'portrait',
//             pageMargins: [20, 20, 20, 20],
//             info: {
//                 title: 'Recibo',
//                 author: 'Colégio Santiago',
//                 subject: 'Recibo',
//                 keywords: 'Controle, Mensalidade',
//                 creator: 'Colégio Santiago',
//                 producer: 'Colégio Santiago',
//             },
//             styles: {
//                 heading: {
//                     fontSize: 10,
//                     bold: true,
//                     alignment: 'center',
//                 },
//                 phrase: {
//                     alignment: 'center',
//                 },
//                 tableHeader: {
//                     alignment: 'center',
//                     bold: true,
//                 },
//             },
//             defaultStyle: {
//                 font: 'Arial',
//                 fontSize: 9,
//                 lineHeight: 1.25,
//                 alignment: 'justify',
//             },
//             content: [
//                 {
//                     columns: [
//                         {
//                             image: logoImage,
//                             width: 65,
//                             alignment: 'left',
//                         },
//                         {
//                             text: 'RECIBO',
//                             alignment: 'center',
//                         },
//                         {
//                             text: `Betim, ${formatDate(
//                                 new Date(),
//                                 'dd/MM/yyyy',
//                             )}`,
//                             alignment: 'right',
//                         },
//                     ],
//                 },
//                 {
//                     columns: [
//                         {

//                         }
//                         `Valor da mensalidade ${reenrollment.student_name}`,
//                         `Turma ${reenrollment.student_name}`,
//                     ],
//                 },
//             ],
//         } as TDocumentDefinitions;

//         const generatePDF = new GeneratePDFService();

//         const fileName = await generatePDF.execute({
//             docDefinition,
//             deleteFileName: reenrollment.monthly_control,
//         });

//         await this.reenrollmentsRepository.updateMonthlyControl({
//             enrollment_number: reenrollment.enrollment_number,
//             monthly_control: fileName,
//         });

//         return fileName;
//     }
// }

// export default GenerateReceiptPdfService;
