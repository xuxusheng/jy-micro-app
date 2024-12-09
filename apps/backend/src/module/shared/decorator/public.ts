import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'

export const IS_INTERNAL_PUBLIC_KEY = 'isInternalPublicKey'

// 将某个接口标记为 public，
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

// 将某个接口标记为 internal public ，
export const InternalPublic = () => SetMetadata(IS_INTERNAL_PUBLIC_KEY, true)
