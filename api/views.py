from django.shortcuts import render
from django.http import HttpResponse
from .models import Links


# Create your views here.
def index(request):
        return HttpResponse("this is index.html")
    
def p(request, link):
    # 查询链接是不存在
    try:
        db_link = Links.objects.get(link=link)
    # 不存在，添加一条新数据
    except Links.DoesNotExist:
        db_link = Links.objects.create(link=link,count= 1)
        return HttpResponse("create")
    # 存在，数量加一
    else:
        db_link.count += 1
        db_link.save()
        return HttpResponse(link + str(db_link.count))