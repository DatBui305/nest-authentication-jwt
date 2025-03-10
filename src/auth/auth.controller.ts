import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthPayloadDto } from 'src/auth/dto/auth.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from 'src/auth/guards/local.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    console.log('Status method');
    console.log(req.user);
    return req.user;
  }
}
