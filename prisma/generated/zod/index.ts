import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','taskColor']);

export const KanbanScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name']);

export const SprintScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','beginAt','endAt','kanbanId']);

export const SwimlaneScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','category','title','body','point','sprintId']);

export const TaskScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','title','body','status','swimlaneId','assigneeId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.coerce.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  taskColor: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// KANBAN SCHEMA
/////////////////////////////////////////

export const KanbanSchema = z.object({
  id: z.coerce.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
})

export type Kanban = z.infer<typeof KanbanSchema>

/////////////////////////////////////////
// SPRINT SCHEMA
/////////////////////////////////////////

export const SprintSchema = z.object({
  id: z.coerce.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  beginAt: z.coerce.date(),
  endAt: z.coerce.date(),
  kanbanId: z.coerce.number(),
})

export type Sprint = z.infer<typeof SprintSchema>

/////////////////////////////////////////
// SWIMLANE SCHEMA
/////////////////////////////////////////

export const SwimlaneSchema = z.object({
  id: z.coerce.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  category: z.string(),
  title: z.string(),
  body: z.string().nullable(),
  point: z.coerce.number().transform((n) => n === 0 ? null : n).nullable(),
  sprintId: z.coerce.number(),
})

export type Swimlane = z.infer<typeof SwimlaneSchema>

/////////////////////////////////////////
// TASK SCHEMA
/////////////////////////////////////////

export const TaskSchema = z.object({
  id: z.coerce.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  title: z.string(),
  body: z.string().nullable(),
  status: z.string(),
  swimlaneId: z.coerce.number(),
  assigneeId: z.coerce.number().transform((n) => n === 0 ? null : n).nullable(),
})

export type Task = z.infer<typeof TaskSchema>
