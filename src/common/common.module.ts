import { Global, Module } from '@nestjs/common';
import { CommonUserRepository } from './repositories/common-user.repository';
import { CommonRoleRepository } from './repositories/common-role.repository';

@Global()
@Module({
  imports: [],
  providers: [CommonUserRepository, CommonRoleRepository],
  exports: [CommonUserRepository, CommonRoleRepository],
})
export class CommonModule {}
