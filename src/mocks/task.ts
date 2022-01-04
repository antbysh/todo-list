import faker from "faker";

export const mockTask = (status: "complete" | "incomplete") => ({
  title: faker.random.words(3),
  status,
  id: faker.datatype.uuid(),
});
