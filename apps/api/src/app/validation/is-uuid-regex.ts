const uuidRegex =
  /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}/;

export const isUUID = (uuid: string): boolean => !!uuid.match(uuidRegex);
