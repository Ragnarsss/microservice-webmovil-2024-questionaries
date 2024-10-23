import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionMsg } from '../common/constants';

@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @MessagePattern(QuestionMsg.CREATE)
  async create(@Payload() createQuestionDto: CreateQuestionDto) {
    try {
      return await this.questionService.create(createQuestionDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @MessagePattern(QuestionMsg.FIND_ALL)
  async findAll() {
    try {
      return await this.questionService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @MessagePattern(QuestionMsg.FIND_ONE)
  async findOne(@Payload('id') id: string) {
    try {
      return await this.questionService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @MessagePattern(QuestionMsg.UPDATE)
  async update(
    @Payload('id') id: string,
    @Payload() updateQuestionDto: UpdateQuestionDto,
  ) {
    try {
      return await this.questionService.update(id, updateQuestionDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @MessagePattern(QuestionMsg.DELETE)
  async remove(@Payload('id') id: string) {
    try {
      return await this.questionService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
