"use server";

// import { Customer } from '@/types/schema'
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { Customer } from "@prisma/client";
import { checkAuth } from "@/lib/checkAuth";
import { authenticatedAction } from "@/lib/safe-action";
import { CustomerInputSchema } from "./validation";
import {
  createCustomerUseCase,
  getAllCustomersUseCase,
} from "@/use-cases/customer";

export const createCustomerAction = authenticatedAction
  .createServerAction()
  .input(CustomerInputSchema)
  .handler(async ({ input }) => {
    await createCustomerUseCase(input);
  });

export const getAllCustomersAction = authenticatedAction
  .createServerAction()
  .handler(async () => {
    return await getAllCustomersUseCase();
  });

// export const getAllCustomersAction(): Promise<Customer[] | undefined> {
//   await checkAuth()

// }

export async function updateCustomer(id: string, data: Partial<Customer>) {
  await checkAuth();
  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data,
    });
    revalidatePath("/customers");

    return { success: true, data: updatedCustomer };
  } catch (error) {
    console.error("Error updating customer:", error);
    return { success: false, error: "Failed to update customer" };
  }
}

export async function getCustomerById(id: string) {
  const customer = await prisma.customer.findUnique({ where: { id } });
  return { success: true, data: customer };
}
export async function getCustomerByEmail(email: string) {
  await checkAuth();
  const customer = await prisma.customer.findUnique({ where: { email } });
  return { success: true, data: customer };
}
