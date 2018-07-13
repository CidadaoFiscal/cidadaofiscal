import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'expenseType'})
export class ExpenseTypePipe implements PipeTransform {
    transform(value: string): string {
        const typeNumber = ('' + value).trim();
        switch (typeNumber) {
            case '1':
                return 'Aluguel de Veículo, Passagem, Hospedagem';
            case '2':
                return 'Consultoria Jurídica, Assessoria Técnica';
            case '3':
                return 'Material de expediente, Copias, Encadernação';
            case '4':
                return 'Divulgação de Atividade Parlamentar';
            case '5':
                return 'Serviços de internet, Website, Softwares';
            case '6':
                return 'Serviços Gráficos, Edição de Revistas e Jornais';
            case '7':
                return 'Locação de Imóveis';
            case '8':
                return 'Manutenção de veículos';
            case '9':
                return 'Serviço Postal, Telefonia, Assinatura Jornal';
            default:
                return typeNumber;
        }
    }
}
