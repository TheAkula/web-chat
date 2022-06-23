import { Contact as ContactType } from "../../../types";
import { Contact } from "./contact";

interface ContactsListProps {
  contacts: ContactType[];
}

export const ContactsList = ({ contacts }: ContactsListProps) => {
  return (
    <div>
      {contacts.map((c) => (
        <Contact key={c.id} {...c} />
      ))}
    </div>
  );
};
