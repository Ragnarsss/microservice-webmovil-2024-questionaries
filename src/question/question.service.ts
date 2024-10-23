import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/question.dto';
import { Question, QuestionDocument } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    try {
      const createdQuestion = new this.questionModel(createQuestionDto);
      return await createdQuestion.save();
    } catch (error) {
      throw new Error(`Error creating question: ${error.message}`);
    }
  }

  async findAll(): Promise<Question[]> {
    try {
      return await this.questionModel.find().exec();
    } catch (error) {
      throw new Error(`Error finding questions: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Question> {
    try {
      const question = await this.questionModel.findById(id).exec();
      if (!question) {
        throw new NotFoundException(`Question with ID ${id} not found`);
      }
      return question;
    } catch (error) {
      throw new Error(`Error finding question: ${error.message}`);
    }
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    try {
      const updatedQuestion = await this.questionModel
        .findByIdAndUpdate(id, updateQuestionDto, { new: true })
        .exec();
      if (!updatedQuestion) {
        throw new NotFoundException(`Question with ID ${id} not found`);
      }
      return updatedQuestion;
    } catch (error) {
      throw new Error(`Error updating question: ${error.message}`);
    }
  }

  async remove(id: string): Promise<Question> {
    try {
      const deletedQuestion = await this.questionModel
        .findByIdAndDelete(id)
        .exec();
      if (!deletedQuestion) {
        throw new NotFoundException(`Question with ID ${id} not found`);
      }
      return deletedQuestion;
    } catch (error) {
      throw new Error(`Error deleting question: ${error.message}`);
    }
  }
}
