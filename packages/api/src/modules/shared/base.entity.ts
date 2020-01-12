import {
  BaseEntity as TBaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"
import { ID, Field, ObjectType } from "type-graphql"

@ObjectType()
export abstract class BaseEntity<T = {}> extends TBaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date

  // Helpers

  async update(data: Partial<T>) {
    Object.assign(this, data)
    return this.save()
  }

  async destroy(): Promise<boolean> {
    await this.remove()
    return true
  }
}
