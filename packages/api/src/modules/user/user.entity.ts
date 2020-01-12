import { Entity, BeforeInsert } from "typeorm"
import { ObjectType } from "type-graphql"
import bcrypt from "bcryptjs"

import { BaseEntity } from "../shared/base.entity"
import { StringField } from "../shared/fields"

@ObjectType()
@Entity()
export class User extends BaseEntity<User> {
  @StringField({ unique: true })
  email: string

  @StringField({ graphql: false })
  password: string

  @StringField()
  firstName: string

  @StringField()
  lastName: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
