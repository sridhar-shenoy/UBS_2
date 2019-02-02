@ECHO OFF
IF NOT "%~f0" == "~f0" GOTO :WinNT
@"C:\logstash-6.5.4\vendor\jruby\bin\jruby.exe" "C:/logstash-6.5.4/vendor/bundle/jruby/2.3.0/bin/tilt" %1 %2 %3 %4 %5 %6 %7 %8 %9
GOTO :EOF
:WinNT
@"C:\logstash-6.5.4\vendor\jruby\bin\jruby.exe" "%~dpn0" %*
