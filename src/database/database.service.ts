import * as url from 'url';
import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import databaseEnvUrl from './configs/database.env';

const parsedUrl = url.parse(databaseEnvUrl);

@Injectable()
export class DatabaseService {
  public pool = new Pool({
    user: parsedUrl.auth.split(':')[0],
    password: parsedUrl.auth.split(':')[1],
    host: parsedUrl.hostname,
    database: parsedUrl.pathname.slice(1),
    port: Number.parseInt(parsedUrl.port, 10),
    max: 10,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 3000,
  });
}
