from .serializers import FileSerializer
from .models import File
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser  # These are for file upload, not for json, xml, etc. So, we need to use them in the view to parse the request data which contains the file.
from rest_framework.response import Response
from rest_framework import status

class FileView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # These are for file upload, not for json, xml, etc. So, we need to use them in the view to parse the request data which contains the file.
    def get(self, request):
        files = File.objects.all()
        serializer = FileSerializer(files, many=True)
        # build absolute url
        for file in serializer.data:
            file['file'] = request.build_absolute_uri(file['file'])
        
        return Response(serializer.data)

    def post(self, request):
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
