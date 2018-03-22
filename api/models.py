from django.db import models

# Create your models here.
class Links(models.Model):
    link = models.CharField(max_length=200)
    count = models.IntegerField()