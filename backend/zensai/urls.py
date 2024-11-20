from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from graphene_django.views import GraphQLView
from .views import home

urlpatterns = [
    path('', home), 
    path('admin/', admin.site.urls),
    path('api/todos/', include('todos.urls')),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema')),
    path('graphql/', GraphQLView.as_view(graphiql=True)),
]
