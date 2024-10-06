import { pgTable, uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { sessions } from './sessions';
import { resetTokens } from './reset_token';
import { roleEnum } from './enums';


export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: varchar('first_name').notNull(),
  middleName: varchar('middle_name'),
  lastName: varchar('last_name').notNull(),
  email: varchar('email').notNull(),
  hashedPassword: varchar('hashed_password').notNull(),
  role: roleEnum('role').default('USER').notNull(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdateFn( ()=> new Date()).notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
    // emailVerificationCode: one(emailVerificationCodes,{
    //   fields: [users.id],
    //   references: [emailVerificationCodes.userId],
    // }),
  sessions: many(sessions),
  resetTokens: many(resetTokens),
}));


export type User = typeof users.$inferSelect; // return type when queried
export type ClientUser = Omit<typeof users.$inferSelect, "hashedPassword">; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type