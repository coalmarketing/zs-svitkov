import { zssFetch } from "../fetcher";

export type ContactCategoryType = "contacts" | "info" | "generic";

export type ContactCategory = {
  id: number;
  name: string;
  order: number;
  type: ContactCategoryType;
};

export type ContactPerson = {
  id: number;
  name: string;
  position?: string | null;
  email?: string | null;
  phone?: string | null;
};

export type BankAccount = {
  label: string;
  accountNumber: string;
};

export type SchoolInfo = {
  name: string;
  street?: string | null;
  city?: string | null;
  ico?: string | null;
  dataBox?: string | null;
  bankAccounts?: BankAccount[] | null;
  cashDeskUrl?: string | null;
};

export type ContactsGroup = {
  category: ContactCategory;
  contacts?: ContactPerson[]; // when type = "contacts"
  info?: SchoolInfo; // when type = "info"
  items?: string[]; // when type = "generic"
};

export async function getContactsGrouped() {
  return zssFetch<ContactsGroup[]>(`/api/contacts`, {
    revalidate: 300,
    tags: ["contacts"],
  });
}
