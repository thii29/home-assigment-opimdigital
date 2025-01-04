import * as yup from 'yup'

export const createBannerSchema = yup.object({
  bannerName: yup.string().required('이 필드는 필수입니다'),
  link: yup.string().required('이 필드는 필수입니다'),
  order: yup
    .string()
    .required('이 필드는 필수입니다')
    .test({
      name: 'check-order',
      message: '이 필드는 필수입니다 ',
      test: function (value: string | number) {
        if (typeof value === 'undefined' || value === '') return false
        return true
      }
    }),
  bannerType: yup.string().required('이 필드는 필수입니다'),
  texts : yup.array().default([]),
  status: yup.string().required('이 필드는 필수입니다')
})

export type CreateBannerSchemaType = yup.InferType<typeof createBannerSchema>
