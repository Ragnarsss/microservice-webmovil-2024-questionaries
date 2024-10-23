import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuestionnaireDocument = HydratedDocument<Questionnaire>;

@Schema({ timestamps: true, _id: true })
export class Questionnaire {
  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true, unique: true })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ default: false })
  isCompleted: boolean;
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
