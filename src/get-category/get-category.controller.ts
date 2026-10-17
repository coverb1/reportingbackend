import { Controller, Get, Injectable } from '@nestjs/common';
import { GetCategoryService } from './get-category.service.js';

@Controller('categories')
export class GetCategoryController {
  constructor(
    private readonly getCategoryService: GetCategoryService,
  ) {}

  @Get()
  findAll() {
    return this.getCategoryService.findAll();
  }
}
