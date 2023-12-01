import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'
import { pause } from '../../utils'

const albumApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      // REMOVE IN PROD
      await pause(1000)
      return fetch(...args)
    }
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (result, error, arg) => {
          return [
            {
              type: 'Album',
              id: arg.id
            }
          ]

        },
        query: (user) => {
          return {
            url: '/albums',
            params: { userId: user.id },
            method: 'GET'
          }
        }
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [{
            type: 'Album',
            id: arg.id
          }]
        },
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName()
            }
          }
        }
      })
    }
  }
})

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumApi
export { albumApi }