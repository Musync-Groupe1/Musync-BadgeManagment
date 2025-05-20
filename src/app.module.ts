import { Module } from '@nestjs/common';
import { BadgeModule } from './badge.module';
import { PrismaModule } from 'prisma/prisma.module';
import { KafkaModule } from './kafka/kafka.module';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    BadgeModule,
    PrismaModule,
    KafkaModule,
    KeycloakConnectModule.register({
      authServerUrl: process.env.KEYCLOACK_URL,
      realm: process.env.KEYCLOACK_REALM,
      clientId: process.env.KEYCLOACK_CLIENT_ID,
      secret: process.env.KEYCLOACK_SECRET!,
    }),
  ],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },

    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },

    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
