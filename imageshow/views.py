from django.shortcuts import render, redirect
from django.contrib import messages
from django.conf import settings
import os


def home(request):
    if request.method == 'POST':
        if 'file' in request.FILES:
            uploaded_file = request.FILES['file']
            
            # Construct the path to store the file
            file_path = os.path.join(settings.MEDIA_ROOT, 'uploads', uploaded_file.name)
            
            # Save the file to the specified path
            with open(file_path, 'wb+') as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)

            # Construct the URL path of the uploaded file
            file_url = settings.MEDIA_URL + 'uploads/' + uploaded_file.name
            print(file_url, "uuuuuuuuuuuuuuuuurrrrrrrrrrrrrrrrrrrrrrrrrrlllllllllllllllllll")
            # Now you have the URL path of the file
            # You can use it as needed in your application
            return render(request, 'index.html', {'image_file': file_url})
        else:
            messages.error(request,"No files attached..! Attach a glb file and try again..!")
            return render(request,'index.html')
    else:
        return render(request, 'index.html')
