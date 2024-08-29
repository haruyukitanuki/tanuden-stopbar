!macro customInstall
    ExecWait '"$INSTDIR\resources\dep_installers\dotnet-runtime-8.0.8-win-x64.exe" /passive /norestart'
    RMDir $INSTDIR\resources\dep_installers
!macroend