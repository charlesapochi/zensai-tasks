import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

// Mock Axios
jest.mock('axios');

describe('Zensai Todo App', () => {
  beforeEach(() => {
    // Mock initial GET response
    axios.get.mockResolvedValue({
      data: [
        { id: 1, title: "Sample Todo", completed: false },
        { id: 2, title: "Another Todo", completed: true },
      ],
    });

    // Mock POST response
    axios.post.mockResolvedValue({
      data: { id: 3, title: "New Task", completed: false },
    });

    // Mock PUT response for toggling
    axios.put.mockResolvedValue((request) => ({
      data: { ...request.data },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the app and displays todos', async () => {
    render(<App />);

    // Wait for todos to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText(/Sample Todo/i)).toBeInTheDocument();
      // expect(screen.getByText(/Another Todo/i)).toBeInTheDocument();
    });
  });

  test('can add a new todo', async () => {
    render(<App />);

    // Enter a new task
    const input = screen.getByPlaceholderText(/Add a task/i);
    const addButton = screen.getByText(/add task/i);

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    // Wait for the new task to appear in the list
    await waitFor(() => {
      expect(screen.getByText(/New Task/i)).toBeInTheDocument();
    });
  });

  test('displays error when trying to add an empty todo', async () => {
    render(<App />);

    const addButton = screen.getByText(/add task/i);
    fireEvent.click(addButton);

    // Check for error feedback (toast)
    await waitFor(() => {
      expect(screen.getByText(/Task name cannot be empty!/i)).toBeInTheDocument();
    });
  });

  
});
