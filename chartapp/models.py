from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    json = models.CharField(max_length=255)
    father_json = models.CharField(max_length=255)

