const mockAxios = {
  create: jest.fn(() => mockAxios), // Supports the Axios.create() method when running tests
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
};

export default mockAxios;
