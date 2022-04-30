import type { Prisma } from '@prisma/client'

import { db } from 'src/lib/db'

import { validate, validateWith } from '@redwoodjs/api'

export const contacts = () => {
  return db.contact.findMany()
}

export const contact = ({ id }: Prisma.ContactWhereUniqueInput) => {
  return db.contact.findUnique({
    where: { id },
  })
}

interface CreateContactArgs {
  input: Prisma.ContactCreateInput
}

export const createContact = async ({ input }: CreateContactArgs) => {
  validate(input.email, 'email', { email: true })

  const latestByEmail = await db.contact.findFirst({
    where: { email: input.email.trim() },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      name: true,
      createdAt: true,
    },
  })

  validateWith(() => {
    const fiveMinutesAgo = new Date()
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5)

    if (latestByEmail.createdAt > fiveMinutesAgo) {
      throw new Error(
        'You have already sent us a message. Kindly wait before sending another'
      )
    }
  })

  return db.contact.create({
    data: input,
  })
}
