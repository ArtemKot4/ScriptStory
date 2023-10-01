@echo off
if "%1" == "-cc1" goto :L
%~dp0\clang50++.exe -target x86_64-none-linux-android --sysroot %~dp0\..\sysroot -D__ANDROID_API__=21 %*
if ERRORLEVEL 1 exit /b 1
goto :done
:L
rem target/triple already spelled out.
%~dp0\clang50++.exe %*
if ERRORLEVEL 1 exit /b 1
:done
