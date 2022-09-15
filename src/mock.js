export const mockedCoursesList = [
  {
    id: 'course1',
    title: 'JavaScript',
    description: 'some text',
    creationDate: '8/3/2021',
    duration: 160,
    authors: ['author1', 'author2'],
  },
  {
    id: 'course2',
    title: 'Angular',
    description: 'some text 2',
    creationDate: '10/11/2020',
    duration: 210,
    authors: ['author3', 'author4'],
  },
];

export const mockedAuthorsList = [
  {
    id: 'author1',
    name: 'Vasiliy Dobkin',
  },
  {
    id: 'author2',
    name: 'Nicolas Kim',
  },
  {
    id: 'author3',
    name: 'Anna Sidorenko',
  },
  {
    id: 'author4',
    name: 'Valentina Larina',
  },
];

export const mockedUserState = {
  isAuth: true,
  name: 'Test Name',
  email: 'test@email.com',
  token: 'test token',
  role: 'admin',
};

export const mockedState = {
  user: mockedUserState,
  courses: mockedCoursesList,
  authors: mockedAuthorsList,
};

export const mockedStore = {
  getState: () => mockedState,
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};
