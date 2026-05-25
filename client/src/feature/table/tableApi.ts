import { baseApi } from "@/feature/base/baseApi";
import {
  type ModifyTableDetailsRequestDto,
  type CreateTableRequestDto,
  type Table,
  type Position,
  type Timeslot,
} from "@/feature/table/tableTypes";
import { tableRoutes } from "@/feature/table/tableEndpoints";

export const tableApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTables: builder.query<Table[], void>({
      query: () => tableRoutes.tables,
      providesTags: ["Tables"],
    }),
    createTable: builder.mutation<Table, CreateTableRequestDto>({
      query: (body) => ({
        url: tableRoutes.tables,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tables"],
    }),
    modifyTable: builder.mutation<
      Table,
      { id: number; data: ModifyTableDetailsRequestDto }
    >({
      query: ({ id, data }) => ({
        url: tableRoutes.table(id),
        method: "PATCH",
        body: data,
      }),
    }),
    deleteTable: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: tableRoutes.table(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Tables"],
    }),
    modifyTablePosition: builder.mutation<
      Table,
      { id: number; data: Position }
    >({
      query: ({ id, data }) => ({
        url: tableRoutes.position(id),
        method: "PATCH",
        body: data,
      }),
    }),
    getTableTimesLots: builder.query<Timeslot[], { id: number; date?: string }>(
      {
        query: ({ id, date }) => tableRoutes.timeslots(id, date),
        providesTags: ["Timeslot"],
      },
    ),
  }),
  overrideExisting: false,
});

export const {
  useGetTablesQuery,
  useCreateTableMutation,
  useModifyTableMutation,
  useDeleteTableMutation,
  useModifyTablePositionMutation,
  useGetTableTimesLotsQuery,
} = tableApi;
