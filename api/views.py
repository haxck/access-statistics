from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core import serializers
from .models import Links


# Create your views here.
def index(request):
        return render(request, "index.html")
    
def p(request, link):
    # 查询链接是不存在
    try:
        db_link = Links.objects.get(link=link)
    # 不存在，添加一条新数据
    except Links.DoesNotExist:
        db_link = Links.objects.create(link=link,count= 1)
        return redirect(link)
    # 存在，数量加一
    else:
        db_link.count += 1
        db_link.save()
        return redirect(link)
def g(request): 
    # db_link =  Links.objects.all()
    db_link = serializers.serialize("json", Links.objects.all())
    return HttpResponse(db_link,content_type="application/json") 

