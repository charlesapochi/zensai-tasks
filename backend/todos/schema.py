import graphene
from graphene_django.types import DjangoObjectType
from .models import TodoItem

# Define a GraphQL type for the TodoItem model
class TodoItemType(DjangoObjectType):
    class Meta:
        model = TodoItem
        fields = "__all__"

# Create a Query class
class Query(graphene.ObjectType):
    all_todos = graphene.List(TodoItemType)

    def resolve_all_todos(self, info, **kwargs):
        return TodoItem.objects.all()

# Create a Mutation class for CRUD operations
class CreateTodoItem(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)

    todo = graphene.Field(TodoItemType)

    def mutate(self, info, title):
        todo = TodoItem.objects.create(title=title)
        return CreateTodoItem(todo=todo)

class Mutation(graphene.ObjectType):
    create_todo = CreateTodoItem.Field()

# Define the schema
schema = graphene.Schema(query=Query, mutation=Mutation)
