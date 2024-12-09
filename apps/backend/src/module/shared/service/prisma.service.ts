// import { Injectable, OnModuleInit } from '@nestjs/common'
// import { Prisma, PrismaClient } from '@prisma/client'
// import { UserRoleEnum } from '../../user/enum/user-role.enum'
// import { UserTypeEnum } from '../../user/enum/user-type.enum'
//
// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   constructor() {
//     super({
//       log: ['query', 'info', 'warn', 'error'],
//       errorFormat: 'pretty'
//     })
//   }
//
//   async onModuleInit() {
//     await this.$connect()
//
//     await this.initialUser()
//     await this.initialSensorGroup()
//     await this.initialSouthDeviceCommType()
//     await this.initialCdcType()
//     await this.initialDataObject()
//     await this.initialSouthPlugin()
//   }
//
//   // 初始化用户及角色
//   private initialUser = async () => {
//     // 初始化角色
//     const initialRoles = [
//       {
//         code: UserRoleEnum.Admin,
//         name: '管理员',
//         remark: '系统内置角色，不允许删除',
//         order: 100
//       },
//       {
//         code: UserRoleEnum.Member,
//         name: '普通用户',
//         remark: '系统内置角色，不允许删除',
//         order: 200
//       }
//     ]
//
//     await Promise.all(
//       initialRoles.map((role) =>
//         this.userRole.upsert({
//           where: { code: role.code },
//           create: role,
//           update: {}
//         })
//       )
//     )
//
//     // 初始化用户
//     await this.user.upsert({
//       where: {
//         username: 'admin'
//       },
//       create: {
//         username: 'admin',
//         remark: '系统内置管理员用户，不允许删除',
//         type: UserTypeEnum.User,
//         roles: {
//           connect: { code: UserRoleEnum.Admin }
//         },
//         password: {
//           create: {
//             hash: '$2y$12$KJgI.6P4lp3LXCj95Sh.bO7IJQzHyGX778vsuRG1PvrmYp4MJmQWe'
//           }
//         }
//       },
//       update: {
//         roles: {
//           set: [{ code: UserRoleEnum.Admin }]
//         },
//         password: {
//           upsert: {
//             create: {
//               hash: '$2y$12$KJgI.6P4lp3LXCj95Sh.bO7IJQzHyGX778vsuRG1PvrmYp4MJmQWe'
//             },
//             update: {
//               hash: '$2y$12$KJgI.6P4lp3LXCj95Sh.bO7IJQzHyGX778vsuRG1PvrmYp4MJmQWe'
//             }
//           }
//         }
//       }
//     })
//   }
//
//   // 初始化传感器组
//   private initialSensorGroup = async () => {
//     const initialGroupCodes = [
//       'LPHD',
//       'SIML',
//       'MMXN',
//       'SPDC',
//       'SPDA',
//       'SVBR',
//       'SPTR',
//       'GGIO',
//       'RDRE',
//       'ZBSH',
//       'SPDB',
//       'SIMH'
//     ]
//
//     await this.$transaction(async (trx) => {
//       const sensorGroups = await trx.sensorGroup.findMany({
//         where: { code: { in: initialGroupCodes } }
//       })
//
//       // 不存在的组
//       const notExistGroupCodes = initialGroupCodes.filter(
//         (code) => !sensorGroups.some((group) => group.code === code)
//       )
//
//       if (notExistGroupCodes.length > 0) {
//         await trx.sensorGroup.createMany({
//           data: notExistGroupCodes.map((code) => ({
//             code,
//             name: code,
//             remark: '系统内置传感器组'
//           }))
//         })
//       }
//     })
//   }
//
//   // 初始化南向设备通信类型
//   private initialSouthDeviceCommType = async () => {
//     const initialCommTypes: Prisma.SouthDeviceCommTypeCreateManyInput[] = [
//       {
//         code: 'mms_client',
//         name: '61850客户端',
//         remark: '系统内置通信类型'
//       },
//       { code: 'sp', name: '串口通信', remark: '系统内置通信类型' },
//       {
//         code: 'tcp_client',
//         name: 'tcp客户端',
//         remark: '系统内置通信类型'
//       },
//       {
//         code: 'tcp_server',
//         name: 'tcp服务端',
//         remark: '系统内置通信类型'
//       },
//       {
//         code: 'http_client',
//         name: 'http客户端',
//         remark: '系统内置通信类型'
//       }
//     ]
//
//     await this.$transaction(async (trx) => {
//       const commTypes = await trx.southDeviceCommType.findMany({
//         where: {
//           code: { in: initialCommTypes.map((type) => type.code) }
//         }
//       })
//
//       const notExistCommTypes = initialCommTypes.filter(
//         (type) => !commTypes.some((commType) => commType.code === type.code)
//       )
//
//       if (notExistCommTypes.length > 0) {
//         await trx.southDeviceCommType.createMany({
//           data: notExistCommTypes
//         })
//       }
//     })
//   }
//
//   // 初始化 CDC 类型
//   private initialCdcType = async () => {
//     const initialCdcTypes: Prisma.CdcTypeCreateManyInput[] = [
//       {
//         code: 'YC_FLOAT',
//         name: '遥测浮点型',
//         remark: '系统内置 CDC 类型'
//       },
//       {
//         code: 'YX_BOOL',
//         name: '遥信BOOL型',
//         remark: '系统内置 CDC 类型'
//       },
//       {
//         code: 'YC_INT',
//         name: '遥测整型',
//         remark: '系统内置 CDC 类型'
//       },
//       {
//         code: 'YX_INT',
//         name: '遥信整型',
//         remark: '系统内置 CDC 类型'
//       },
//       {
//         code: 'YS_INT',
//         name: '遥设整型',
//         remark: '系统内置 CDC 类型'
//       },
//       {
//         code: 'YT_FLOAT',
//         name: '遥调浮点型',
//         remark: '系统内置 CDC 类型'
//       }
//     ]
//
//     await this.$transaction(async (trx) => {
//       const cdcTypes = await trx.cdcType.findMany({
//         where: {
//           code: { in: initialCdcTypes.map((type) => type.code) }
//         }
//       })
//
//       const notExistCdcTypes = initialCdcTypes.filter(
//         (type) => !cdcTypes.some((cdcType) => cdcType.code === type.code)
//       )
//
//       if (notExistCdcTypes.length > 0) {
//         await trx.cdcType.createMany({
//           data: notExistCdcTypes
//         })
//       }
//     })
//   }
//
//   // 初始化数据对象
//   private initialDataObject = async () => {
//     const initialDataObjects: Prisma.DataObjectCreateManyInput[] = [
//       {
//         code: 'file_num',
//         name: '文件编号',
//         importanceLevel: 1,
//         unit: '',
//         order: 0,
//         remark: '系统内置数据对象',
//         cdcTypeCode: 'YC_INT',
//         sensorGroupCode: 'RDRE'
//       },
//       {
//         code: 'file_time',
//         name: '文件时间',
//         importanceLevel: 1,
//         unit: '',
//         order: 1,
//         remark: '系统内置数据对象',
//         cdcTypeCode: 'YC_INT',
//         sensorGroupCode: 'RDRE'
//       },
//       {
//         code: 'sensor_type',
//         name: '传感器类型',
//         importanceLevel: 1,
//         unit: '',
//         order: 6,
//         remark: '系统内置数据对象',
//         cdcTypeCode: 'YC_INT',
//         sensorGroupCode: 'RDRE'
//       },
//       {
//         code: 'sensor_channel',
//         name: '传感器通道',
//         importanceLevel: 1,
//         unit: '',
//         order: 7,
//         remark: '系统内置数据对象',
//         cdcTypeCode: 'YC_INT',
//         sensorGroupCode: 'RDRE'
//       },
//       {
//         code: 'file_type',
//         name: '文件类型编号',
//         importanceLevel: 1,
//         unit: '',
//         order: 8,
//         remark: '系统内置数据对象',
//         cdcTypeCode: 'YC_INT',
//         sensorGroupCode: 'RDRE'
//       }
//     ]
//
//     await this.$transaction(async (trx) => {
//       const dataObjects = await trx.dataObject.findMany({
//         where: {
//           code: { in: initialDataObjects.map((dataObject) => dataObject.code) }
//         }
//       })
//
//       const notExistDataObjects = initialDataObjects.filter(
//         (dataObject) =>
//           !dataObjects.some(
//             ({ code, sensorGroupCode }) =>
//               code === dataObject.code &&
//               sensorGroupCode === dataObject.sensorGroupCode
//           )
//       )
//
//       if (notExistDataObjects.length > 0) {
//         await trx.dataObject.createMany({
//           data: notExistDataObjects
//         })
//       }
//     })
//   }
//
//   // 初始化南向插件
//   private initialSouthPlugin = async () => {
//     await this.$transaction(async (trx) => {
//       // 山东和兑
//       const heiduiPlugin = await this.southPlugin.upsert({
//         where: { name: 'hedui_mms_client' },
//         update: {},
//         create: {
//           name: 'hedui_mms_client',
//           soFileName: '',
//           ruleFileName: '',
//           remark: '系统内置南向插件'
//         }
//       })
//
//       // 初始化插件的同时，将其对应的南向设备属性模版也初始化一下
//       const initialSouthDeviceAttrTemplates: Prisma.SouthDeviceAttrTemplateCreateManyInput[] =
//         [
//           {
//             code: 'iedName',
//             name: 'ied名',
//             defaultValue: '',
//             remark: '系统内置南向设备属性模版',
//             southPluginId: heiduiPlugin.id,
//             commTypeCode: 'mms_client'
//           },
//           {
//             code: 'aNetIP',
//             name: 'A网IP',
//             defaultValue: '',
//             remark: '系统内置南向设备属性模版',
//             southPluginId: heiduiPlugin.id,
//             commTypeCode: 'mms_client'
//           },
//           {
//             code: 'bNetIP',
//             name: 'B网IP',
//             defaultValue: '',
//             remark: '系统内置南向设备属性模版',
//             southPluginId: heiduiPlugin.id,
//             commTypeCode: 'mms_client'
//           },
//           {
//             code: 'port',
//             name: '端口',
//             defaultValue: '102',
//             remark: '系统内置南向设备属性模版',
//             southPluginId: heiduiPlugin.id,
//             commTypeCode: 'mms_client'
//           },
//           {
//             code: 'icdFileName',
//             name: 'icd文件名',
//             defaultValue: '',
//             remark: '系统内置南向设备属性模版',
//             southPluginId: heiduiPlugin.id,
//             commTypeCode: 'mms_client'
//           },
//           {
//             code: 'rcbCfgFile',
//             name: '报告控制块配置文件',
//             defaultValue: '',
//             remark: '系统内置南向设备属性模版',
//             southPluginId: heiduiPlugin.id,
//             commTypeCode: 'mms_client'
//           },
//           {
//             code: 'remote_set_dir',
//             name: '文件上传服务端目录',
//             defaultValue: '',
//             remark: '系统内置南向设备属性模版',
//             southPluginId: heiduiPlugin.id,
//             commTypeCode: 'mms_client'
//           }
//         ]
//
//       const southDeviceAttrTemplates =
//         await trx.southDeviceAttrTemplate.findMany({
//           where: {
//             southPluginId: heiduiPlugin.id,
//             commTypeCode: 'mms_client',
//             code: {
//               in: initialSouthDeviceAttrTemplates.map(
//                 (template) => template.code
//               )
//             }
//           }
//         })
//
//       const notExistSouthDeviceAttrTemplates =
//         initialSouthDeviceAttrTemplates.filter(
//           (template) =>
//             !southDeviceAttrTemplates.some(
//               ({ code, commTypeCode }) =>
//                 code === template.code && commTypeCode === template.commTypeCode
//             )
//         )
//
//       if (notExistSouthDeviceAttrTemplates.length > 0) {
//         await trx.southDeviceAttrTemplate.createMany({
//           data: notExistSouthDeviceAttrTemplates
//         })
//       }
//
//       // 初始化插件的同时，将其对应的传感器属性模版也初始化一下
//       const initialSensorAttrTemplates: Prisma.SensorAttrTemplateCreateManyInput[] =
//         [
//           {
//             code: 'ref',
//             name: 'ln节点全路径',
//             defaultValue: '',
//             remark: '系统内置传感器属性模版',
//             southPluginId: heiduiPlugin.id,
//             sensorGroupCode: 'SPDA'
//           },
//           {
//             code: 'ref',
//             name: 'ln节点全路径',
//             defaultValue: '',
//             remark: '系统内置传感器属性模版',
//             southPluginId: heiduiPlugin.id,
//             sensorGroupCode: 'RDRE'
//           },
//           {
//             code: 'local_prefix',
//             name: '文件下载客户端目录',
//             defaultValue: '',
//             remark: '系统内置传感器属性模版',
//             southPluginId: heiduiPlugin.id,
//             sensorGroupCode: 'RDRE'
//           },
//           {
//             code: 'remote_download_dir',
//             name: '文件下载服务端目录',
//             defaultValue: '',
//             remark: '系统内置传感器属性模版',
//             southPluginId: heiduiPlugin.id,
//             sensorGroupCode: 'RDRE'
//           }
//         ]
//
//       const sensorAttrTemplates = await trx.sensorAttrTemplate.findMany({
//         where: {
//           southPluginId: heiduiPlugin.id,
//           code: {
//             in: initialSensorAttrTemplates.map((template) => template.code)
//           }
//         }
//       })
//
//       const notExistSensorAttrTemplates = initialSensorAttrTemplates.filter(
//         (template) =>
//           !sensorAttrTemplates.some(
//             ({ code, sensorGroupCode }) =>
//               code === template.code &&
//               sensorGroupCode === template.sensorGroupCode
//           )
//       )
//
//       if (notExistSensorAttrTemplates.length > 0) {
//         await trx.sensorAttrTemplate.createMany({
//           data: notExistSensorAttrTemplates
//         })
//       }
//     })
//   }
// }
