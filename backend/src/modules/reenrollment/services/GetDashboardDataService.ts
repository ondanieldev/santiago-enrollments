import { injectable, inject } from 'tsyringe';

import IReenrollmentsRepository from '../repositories/IReenrollmentsRepository';
import IGetDashboardDataDTO from '../dtos/IGetDashboardDataDTO';

@injectable()
export default class GetDashboardDataService {
    constructor(
        @inject('ReenrollmentsRepository')
        private reenrollmentsRepository: IReenrollmentsRepository,
    ) {}

    public async execute(): Promise<IGetDashboardDataDTO> {
        const data = await this.reenrollmentsRepository.getDashboardData();

        return data;
    }
}
