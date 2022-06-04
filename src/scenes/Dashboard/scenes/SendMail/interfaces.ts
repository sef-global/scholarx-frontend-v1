export interface EmailGroups {
  label: string;
  value: string;
}

export interface Email {
  message: string;
  subject: string;
  mailGroup: string[];
  // additionalEmails: string[];
}
