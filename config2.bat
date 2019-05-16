@echo off
cmd /k "cd %~dp0\flask\Scripts & activate & cd ../../app & python __init__.py"