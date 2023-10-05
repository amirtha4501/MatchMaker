import { Controller, Post, Get, Patch, Delete, Body, ValidationPipe, Query, Param, ParseIntPipe } from '@nestjs/common';
import { ProfileService } from '../service/profile.service';
import { GetProfilesFilterDto } from '../dto/get-profiles-filter.dto';
import { Profile } from '../model/profile.entity';
// import { UpdateProfileDto } from 'src/dto/update-profiles.dto';
import { ProfileDto } from '../dto/profile.dto';

@Controller('profile')
export class ProfileController {

    constructor(
        private profileService: ProfileService
    ) {}

    @Post()
    createProfile(@Body(ValidationPipe) profileDto: ProfileDto): Promise<void> {
        return this.profileService.createProfile(profileDto);
    }

    @Get()
    getProfiles(@Query(ValidationPipe) filterDto: GetProfilesFilterDto): Promise<Profile[]> {
        return this.profileService.getProfiles(filterDto);
    }

    @Get('/:id')
    getProfileById(@Param('id', ParseIntPipe) id: number ): Promise<Profile> {
        return this.profileService.getProfileById(id)
    }

    // @UseGuards(AuthGuard())
    @Delete('/:id')
    deleteProfile(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.profileService.deleteProfile(id);
    }

    @Patch('/:id')
    updateProfileStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) profileDto: ProfileDto
    ): Promise<Profile> {
        return this.profileService.updateProfile(id, profileDto);
    }

}
