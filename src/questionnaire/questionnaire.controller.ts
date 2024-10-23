import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { QuestionnaireMsg } from 'src/common/constants';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { QuestionnaireService } from './questionnaire.service';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @MessagePattern(QuestionnaireMsg.CREATE)
  async create(@Payload() createQuestionnaireDto: CreateQuestionnaireDto) {
    try {
      return await this.questionnaireService.create(createQuestionnaireDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @MessagePattern(QuestionnaireMsg.FIND_ALL)
  async findAll() {
    try {
      return await this.questionnaireService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @MessagePattern(QuestionnaireMsg.FIND_ONE)
  async findOne(@Payload('id') id: string) {
    try {
      return await this.questionnaireService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @MessagePattern(QuestionnaireMsg.UPDATE)
  async update(
    @Payload('id') id: string,
    @Payload() updateQuestionnaireDto: UpdateQuestionnaireDto,
  ) {
    try {
      return await this.questionnaireService.update(id, updateQuestionnaireDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @MessagePattern(QuestionnaireMsg.DELETE)
  async remove(@Payload('id') id: string) {
    try {
      return await this.questionnaireService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
