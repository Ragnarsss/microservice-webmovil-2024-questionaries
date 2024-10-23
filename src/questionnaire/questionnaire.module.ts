import { Module } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from 'src/question/entities/question.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Question',
        schema: QuestionSchema,
      },
    ]),
  ],
  providers: [QuestionnaireService],
})
export class QuestionnaireModule {}
