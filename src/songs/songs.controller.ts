
import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';

@Controller('songs')
@UseGuards(AuthGuard('jwt'))
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  async findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Folder penyimpanan
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // Maksimal 10MB
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createSongDto: CreateSongDto) {
    const fileUrl = `/uploads/${file.filename}`;
    return this.songsService.create({ ...createSongDto, fileUrl });
  }
}
