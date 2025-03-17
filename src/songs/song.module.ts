import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { Song, SongSchema } from './songs.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
