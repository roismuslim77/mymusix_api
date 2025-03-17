
import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('songs')
@ApiBearerAuth()
@Controller('songs')
@UseGuards(AuthGuard('jwt'))
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil semua lagu' })
  @ApiResponse({ status: 200, description: 'Berhasil mendapatkan daftar lagu' })
  async findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil detail lagu berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Berhasil mendapatkan detail lagu' })
  @ApiResponse({ status: 404, description: 'Lagu tidak ditemukan' })
  async findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload lagu' }) 
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
          example: 'My Awesome Song',
        },
        artist: {
          type: 'string',
          example: 'John Doe',
        },
        album: {
          type: 'string',
          example: 'New Album',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Lagu berhasil diunggah' })
  @ApiResponse({ status: 400, description: 'Gagal mengunggah lagu' })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', 
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
