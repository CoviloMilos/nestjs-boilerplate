import { PostEntity } from './post.entity';
import { UserEntity } from './user.entity';

export * from './base.entity';
export * from './user.entity';
export * from './post.entity';

export const entities = [UserEntity, PostEntity];
