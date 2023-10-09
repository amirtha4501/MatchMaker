import { Injectable, NotFoundException } from '@nestjs/common';
import { GetProfilesFilterDto } from '../dto/get-profiles-filter.dto';
import { ProfileRepository } from '../repository/profile.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../model/profile.entity';
import { UpdateProfileDto } from '../dto/update-profiles.dto';
import { ProfileDto } from '../dto/profile.dto';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileRepository)
        private profileRepository: ProfileRepository,
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository
    ) {}

    async createProfile(profileDto: ProfileDto): Promise<void> {

        const user = await this.authRepository.getUserById(profileDto.user_id);

        if (user)
            return this.profileRepository.createProfile(profileDto, user);
        else
            throw new NotFoundException(`User with ID '${profileDto.user_id}' not found`);
    }

    async getProfiles(filterDto: GetProfilesFilterDto): Promise<Profile[]> {
        return this.profileRepository.getProfiles(filterDto);
    }

    async getProfileById(id: number): Promise<Profile> {
        const found = await this.profileRepository.findOne(id);
        if(!found) {
            throw new NotFoundException(`Profile with ID '${id}' not found`);
        }

        return found;
    }

    async deleteProfile( id: number ): Promise<void> {

        const result = await this.profileRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`Profile ID ${id} not found to delete`);
        }
    }

    async updateProfile(
        id: number,
        profileDto: ProfileDto
    ): Promise<Profile> {
        const profile = await this.getProfileById(id);
        const { img_data_1, img_data_2, img_data_3, name, gender, birth_date, birth_place, religion, caste, star, rasi, qualification, job, income, height, mother_tongue, known_language, marital_status, father_name, mother_name, contact, sibiling_count, family_status, expected_qualification, expected_place, expected_income, expected_caste, expected_subcaste, expected_marital_status, expected_age_difference, expected_height, expected_weight } = profileDto;

        const user = await this.authRepository.getUserById(id);

        if (!user) {
            throw new Error("User doesn't exists");
        }

        profile.img_data_1 = img_data_1,
        profile.img_data_2 = img_data_2,
        profile.img_data_3 = img_data_3,
        profile.name = name,
        profile.gender = gender,
        profile.birth_date = birth_date,
        profile.birth_place = birth_place,
        profile.religion = religion,
        profile.caste = caste,
        profile.star = star,
        profile.rasi = rasi,
        profile.qualification = qualification,
        profile.job = job,
        profile.income = income,
        profile.height = height,
        profile.mother_tongue = mother_tongue,
        profile.known_language = known_language,
        profile.marital_status = marital_status,
        profile.father_name = father_name,
        profile.mother_name = mother_name,
        profile.contact = contact,
        profile.sibiling_count = sibiling_count,
        profile.family_status = family_status,
        profile.expected_qualification = expected_qualification,
        profile.expected_place = expected_place,
        profile.expected_income = expected_income,
        profile.expected_caste = expected_caste,
        profile.expected_subcaste = expected_subcaste,
        profile.expected_marital_status = expected_marital_status,
        profile.expected_age_difference = expected_age_difference,
        profile.expected_height = expected_height,
        profile.expected_weight = expected_weight
        profile.expected_weight = expected_weight
        profile.expected_weight = expected_weight

        await profile.save()
        return profile;
    }

}
