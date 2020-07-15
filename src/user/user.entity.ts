import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { RolesEnum } from '../shared/enum/roles.enum';

@Entity()
export class UserEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  roles: RolesEnum[];

  @Column()
  username: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  tagLine: string;

  @Column({ nullable: true })
  gardens: string[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }

  async savePassword(password: string): Promise<boolean> {
    try {
      const salt = await bcrypt.genSalt();
      this.passwordHash = await bcrypt.hash(password, salt);
      return true;
    } catch (error) {
      return false;
    }
  }

  addGarden(gardenId: string) {
    if (Array.isArray(this.gardens) && this.gardens.length) {
      this.gardens = [...this.gardens, gardenId];
    } else {
      this.gardens = [gardenId];
    }
  }

  removeGarden(gardenId: string) {
    this.gardens = this.gardens.filter(item => item !== gardenId);
  }
}
