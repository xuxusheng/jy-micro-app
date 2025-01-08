import { registerAs } from '@nestjs/config'

export const shaoshanConfig = registerAs('shaoshan', () => ({
  url: process.env.SHAOSHAN_URL || 'http://192.168.4.122',
  clientId: process.env.SHAOSHAN_CLIENT_ID || 'gateway',
  clientSecret: process.env.SHAOSHAN_CLIENT_SECRET || 'gateway',
  hwID: process.env.SHAOSHAN_HW_ID || 'io.cs',
  hwAppKey:
    process.env.SHAOSHAN_HW_APP_KEY ||
    'pO#1XtJ35/=jdkJ%#%f39aRL+jb6A%Q.8AAr#/V47qQIL$.=/'
}))
