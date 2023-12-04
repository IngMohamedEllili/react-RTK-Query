import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const photoApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      return fetch(...args)
    }
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          const tags = result.map((photo) => {
            return { type: 'Photos', id: photo.id }
          })
          tags.push({
            type: 'AlbumsPhoto',
            id: album.id
          })
          return tags
        },
        query: (album) => {
          return {
            url: '/photos',
            params: { albumId: album.id },
            method: 'GET'
          }
        }
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, akbum) => {
          return [{
            type: 'AlbumsPhoto',
            id: akbum.id
          }]
        },
        query: (album) => {
          return {
            url: '/photos',
            body: {
              albumId: album.id,
              url: faker.image.abstract(150, 150, true),
            },
            method: 'POST'
          }
        }
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, args) => {
          return [{
            type: 'Photos',
            id: args.id
          }]
        },
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: 'DELETE'
          }
        }
      })
    }
  }
})

export { photoApi }
export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photoApi