import { Controller, Post, Get, Patch, Delete, Body, ValidationPipe, Param, ParseIntPipe } from '@nestjs/common';
import { PlanService } from '../service/plan.service';
import { PlanDto } from '../dto/plan.dto';
import { Plan } from '../model/plan.entity';
import { UpdatePlanDto } from '../dto/update-plan.dto';

@Controller('plan')
export class PlanController {

    constructor(
        private planService: PlanService
    ) {}

    @Post()
    createPlan(@Body(ValidationPipe) planDto: PlanDto): Promise<void> {
        return this.planService.createPlan(planDto);
    }

    @Get()
    getPlans(): Promise<Plan[]> {
        return this.planService.getPlans();
    }

    @Get('/:id')
    getPlanById(@Param('id', ParseIntPipe) id: number ): Promise<Plan> {
        return this.planService.getPlanById(id)
    }

    // @UseGuards(AuthGuard())
    @Delete('/:id')
    deletePlan(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.planService.deletePlan(id);
    }

    @Patch('/:id')
    updatePlan(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) planDto: UpdatePlanDto
    ): Promise<Plan> {
        return this.planService.updatePlan(id, planDto);
    }

}
