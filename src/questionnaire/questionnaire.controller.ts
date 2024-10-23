import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { QuestionnaireMsg } from 'src/common/constants';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { QuestionnaireService } from './questionnaire.service';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @MessagePattern(QuestionnaireMsg.CREATE)
  create(@Body() createQuestionnaireDto: CreateQuestionnaireDto) {
    return this.questionnaireService.create(createQuestionnaireDto);
  }

  @MessagePattern(QuestionnaireMsg.FIND_ALL)
  findAll() {
    console.log('findAll');
    return this.questionnaireService.findAll();
  }

  @MessagePattern(QuestionnaireMsg.FIND_ONE)
  findOne(@Body('id') id: string) {
    return this.questionnaireService.findOne(+id);
  }

  @MessagePattern(QuestionnaireMsg.UPDATE)
  update(
    @Body('id') id: string,
    @Body() updateQuestionnaireDto: UpdateQuestionnaireDto,
  ) {
    return this.questionnaireService.update(+id, updateQuestionnaireDto);
  }

  @MessagePattern(QuestionnaireMsg.DELETE)
  remove(@Body('id') id: string) {
    return this.questionnaireService.remove(+id);
  }
}
