import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'expenseType'})
export class ExpenseTypePipe implements PipeTransform {
    transform(value: string): string {
        const typeNumber = ('' + value).trim();
        switch (typeNumber) {
            case '1':
                return 'Locação de Imóveis';
            case '2':
                return 'Hospedagens, Passagens e Locação de Transportes';
            case '3':
                return 'Consultoria, Assessoria e Pesquisa de Trabalhos Técnicos';
            case '4':
                return 'Divulgação de Atividade Parlamentar';
            case '5':
                return 'Material de Expediente';
            case '6':
                return 'Aquis./Loc. de Software; TV a Cabo; Internet; Manut. de Site';
            case '7':
                return 'Serviços Postais';
            case '8':
                return 'Peças, Acessórios e Serviços para Veículos';
            case '9':
                return 'Cópias Heliográficas e Encadernações em Geral';
            case '10':
                return 'Serviços Gráficos (Edição de Jornais, Revistas, etc.)';
            case '11':
                return 'Assinaturas de Jornais, Revistas, etc.';
            case '12':
                return 'Serviços de Telecomunicações em Geral';
            default:
                return typeNumber;
        }
    }
}
