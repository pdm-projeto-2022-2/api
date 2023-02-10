import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PostgreeService extends PrismaClient{
    constructor(){
        super(
            {
                datasources:{
                    db:{
                        url: process.env.DATABASE_URL
                    }
                }
            }
        )
    }
}
