import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from '../model/plan.entity';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { PlanRepository } from '../repository/plan.repository';
import { PlanDto } from '../dto/plan.dto';

@Injectable()
export class PlanService {
    constructor(
        @InjectRepository(PlanRepository)
        private planRepository: PlanRepository,
        // @InjectRepository(AuthRepository)
        // private authRepository: AuthRepository
    ) {}

    async createPlan(planDto: PlanDto): Promise<void> {
        console.log("Plan", planDto);
        return this.planRepository.createPlan(planDto);
    }

    async getPlans(): Promise<Plan[]> {
        return this.planRepository.getPlans();
    }

    async getPlanById(id: number): Promise<Plan> {
        const found = await this.planRepository.findOne(id);
        if(!found) {
            throw new NotFoundException(`Plan with ID '${id}' not found`);
        }

        return found;
    }

    async deletePlan( id: number ): Promise<void> {

        const result = await this.planRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`Plan ID ${id} not found to delete`);
        }
    }

    async updatePlan(
        id: number,
        planDto: UpdatePlanDto
    ): Promise<Plan> {
        const plan = await this.getPlanById(id);
        const { plan_name, currency, price, description, billing_cycle, active } = planDto;

        plan.plan_name = plan_name
        plan.currency = currency
        plan.price = price
        plan.description = description
        plan.billing_cycle = billing_cycle
        plan.active = (`${active}` == "true") ? true : false;

        await plan.save()
        return plan;
    }

}
