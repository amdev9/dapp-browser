mkdir ..\..\main\dist\dapps\lib\build -p
copy build\app.bundle.js ..\..\main\dist\dapps\lib\build\app.bundle.js
xcopy  ..\download ..\..\main\dist\dapps\download\* /s /y
