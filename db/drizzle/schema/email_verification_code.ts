// import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
// import { users } from "./users";
// import { relations } from "drizzle-orm";

// export const emailVerificationCodes = pgTable('email_verification_codes', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   code: varchar('code').notNull(),
//   userId: uuid('user_id').notNull().unique().references(() => users.id,{onDelete: 'cascade'}),
//   email: varchar('email').notNull(),
//   expiresAt: timestamp('expires_at').notNull(),
//   sentAt: timestamp('sent_at').notNull(),
// });

// export const emailVerificationCodeRealtions = relations(emailVerificationCodes, ({  one }) => ({
//     users: one(users,{
//       fields: [emailVerificationCodes.userId],
//       references: [users.id],
//     }),
// }));
