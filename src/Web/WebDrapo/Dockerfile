FROM mcr.microsoft.com/dotnet/aspnet:10.0
ARG source=.
WORKDIR /app
EXPOSE 9991
COPY ${source:-obj/Docker/publish} .
ENTRYPOINT ["dotnet", "WebDrapo.dll"]
