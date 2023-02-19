from django.db import models

# Create your models here.
class File(models.Model):
    file = models.FileField(upload_to='files')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name