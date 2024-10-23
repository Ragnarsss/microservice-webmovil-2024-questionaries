import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import {
  Questionnaire,
  QuestionnaireDocument,
} from './entities/questionnaire.entity';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire.name)
    private questionnaireModel: Model<QuestionnaireDocument>,
  ) {}

  async create(
    createQuestionnaireDto: CreateQuestionnaireDto,
  ): Promise<Questionnaire> {
    try {
      const createdQuestionnaire = new this.questionnaireModel(
        createQuestionnaireDto,
      );
      return await createdQuestionnaire.save();
    } catch (error) {
      throw new Error(`Error creating questionnaire: ${error.message}`);
    }
  }

  async findAll(): Promise<Questionnaire[]> {
    try {
      return await this.questionnaireModel.find().exec();
    } catch (error) {
      throw new Error(`Error finding questionnaires: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Questionnaire> {
    try {
      const questionnaire = await this.questionnaireModel.findById(id).exec();
      if (!questionnaire) {
        throw new NotFoundException(`Questionnaire with ID ${id} not found`);
      }
      return questionnaire;
    } catch (error) {
      throw new Error(`Error finding questionnaire: ${error.message}`);
    }
  }

  async update(
    id: string,
    updateQuestionnaireDto: UpdateQuestionnaireDto,
  ): Promise<Questionnaire> {
    try {
      const updatedQuestionnaire = await this.questionnaireModel
        .findByIdAndUpdate(id, updateQuestionnaireDto, { new: true })
        .exec();
      if (!updatedQuestionnaire) {
        throw new NotFoundException(`Questionnaire with ID ${id} not found`);
      }
      return updatedQuestionnaire;
    } catch (error) {
      throw new Error(`Error updating questionnaire: ${error.message}`);
    }
  }

  async remove(id: string): Promise<Questionnaire> {
    try {
      const deletedQuestionnaire = await this.questionnaireModel
        .findByIdAndDelete(id)
        .exec();
      if (!deletedQuestionnaire) {
        throw new NotFoundException(`Questionnaire with ID ${id} not found`);
      }
      return deletedQuestionnaire;
    } catch (error) {
      throw new Error(`Error deleting questionnaire: ${error.message}`);
    }
  }
}
