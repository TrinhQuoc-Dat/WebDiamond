import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './schemas/contact.schema';
import { ContactsService } from './contacts.service';
import { ContactsPublicController, ContactsAdminController } from './contacts.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }])],
  controllers: [ContactsPublicController, ContactsAdminController],
  providers: [ContactsService],
  exports: [MongooseModule],
})
export class ContactsModule {}
