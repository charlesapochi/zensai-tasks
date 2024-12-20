"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/stable/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application

# Set the default settings module for the 'zensai' project
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Get the WSGI application
application = get_wsgi_application()
