import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Song extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  artist: string;

  @Prop()
  album: string;

  @Prop()
  duration: number;

  @Prop({ required: true })
  fileUrl: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
