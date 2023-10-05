import { EntityRepository, Repository } from "typeorm";
import { ProfileSignupDto } from "../dto/profile.dto";
import { Profile } from "../model/profile.entity";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";


@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {

    async profileSignUp(profileSignupDto: ProfileSignupDto): Promise<void> {
        const profile = new Profile();
        const { user_id, img_data_1, img_data_2, img_data_3, name, gender, birth_date, birth_place, religion, caste, star, rasi, qualification, job, income, height, mother_tongue, known_language, marital_status, father_name, mother_name, contact, sibiling_count, family_status, expected_qualification, expected_place, expected_income, expected_caste, expected_subcaste, expected_marital_status, expected_age_difference, expected_height, expected_weight } = profileSignupDto;

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

        try {
            await profile.save();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

}