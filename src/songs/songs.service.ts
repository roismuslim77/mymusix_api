import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song } from './schema/songs.schema';
import { CreateSongDto } from './dto/create-song.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SongsService {
  constructor(@InjectModel(Song.name) private songModel: Model<Song>) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const newSong = new this.songModel(createSongDto);
    return newSong.save();
  }

  async findAll(): Promise<Song[]> {
    return this.songModel.find().exec();
  }

  async findOne(id: string): Promise<Song> {
    return this.songModel.findById(id).exec();
  }
}
