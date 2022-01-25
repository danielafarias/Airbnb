import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PropertiesModule } from './properties/properties.module';
import { ReservationModule } from './reservation/reservation.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PropertiesModule, ReservationModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
