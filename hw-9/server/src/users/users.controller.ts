import {
  Controller,
  Post, Get, Body, Param,
  UseInterceptors,
  UploadedFile,
  UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { ImageParseFilePipe } from '@/shared/pipes/ImageParseFilePipe';
import { RoleGuard } from '@/shared/guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(FileInterceptor('icon'))
  @UseGuards(RoleGuard('admin'))
  @Post()
  async create(
    @Body('name') name: string,
    @UploadedFile(ImageParseFilePipe) icon?: Express.Multer.File
  ) {
    const iconUrl = icon ? await this.usersService.storeUserIcon(icon) : icon
    const user = await this.usersService.storeUser({ name, iconUrl })

    return user
  }

  @Get()
  async getAll() {
    const list = await this.usersService.getAllUsers()
    return { items: list }
  }

  @Get(':id/icon')
  async getUserIcon(
    @Param('id') id: string,
  ) {
    return await this.usersService.getUserIconLink(id)
  }
}
