## 目录结构

```
├─api(Backend api)
├─reactjs(React sources)
├─rnApp(React Native sources)
├─wa(django project)
```

## 使用

```shell
python manage.py makemigrations wa

python manage.py migrate

python manage.py runserver

```

访问 `http://127.0.0.1:8000/api/` 即可