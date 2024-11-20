from django.test import TestCase
from todos.models import TodoItem
from rest_framework.test import APIClient
from rest_framework import status


class TodoItemModelTest(TestCase):
    def setUp(self):
        self.todo = TodoItem.objects.create(title="Test Todo", completed=False)

    def test_todo_item_creation(self):
        """Test creating a TodoItem instance."""
        self.assertEqual(self.todo.title, "Test Todo")
        self.assertFalse(self.todo.completed)

    def test_todo_item_string_representation(self):
        """Test the string representation of a TodoItem."""
        self.assertEqual(str(self.todo), "Test Todo")


class TodoItemAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.todo = TodoItem.objects.create(title="Sample Todo", completed=False)

    def test_get_todo_list(self):
        """Test retrieving a list of TodoItems."""
        response = self.client.get("/api/todos/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Sample Todo")

    def test_create_todo_item(self):
        """Test creating a new TodoItem."""
        payload = {"title": "New Todo", "completed": False}
        response = self.client.post("/api/todos/", payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TodoItem.objects.count(), 2)
        self.assertEqual(TodoItem.objects.last().title, "New Todo")

    def test_update_todo_item(self):
        """Test updating a TodoItem."""
        payload = {"title": "Updated Todo", "completed": True}
        response = self.client.put(f"/api/todos/{self.todo.id}/", payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo.refresh_from_db()
        self.assertEqual(self.todo.title, "Updated Todo")
        self.assertTrue(self.todo.completed)

    def test_delete_todo_item(self):
        """Test deleting a TodoItem."""
        response = self.client.delete(f"/api/todos/{self.todo.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(TodoItem.objects.count(), 0)
