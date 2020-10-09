import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line

export default interface IPDFProvider {
    generate(documentDefinition: TDocumentDefinitions): Promise<string>;
    delete(filename: string): Promise<void>;
}
